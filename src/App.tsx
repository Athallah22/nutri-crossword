import { useState, useCallback } from "react";
import puzzlesData from "./data/puzzles.json";
import type { PuzzleBank } from "./types/puzzle";
import { useTheme } from "./hooks/useTheme";
import { HomePage } from "./pages/HomePage";
import { TutorialPage } from "./pages/TutorialPage";
import { GamePage } from "./pages/GamePage";

type Screen = "home" | "tutorial" | "game";

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const { theme, toggleTheme } = useTheme();
  const bank = puzzlesData as unknown as PuzzleBank;
  const puzzles = bank.puzzles || [];

  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);

  const getRandomPuzzleIndex = useCallback(
    (excludeCurrent: boolean = true) => {
      if (puzzles.length <= 1) return 0;
      if (!excludeCurrent) {
        return Math.floor(Math.random() * puzzles.length);
      }
      let nextIdx = Math.floor(Math.random() * puzzles.length);
      while (nextIdx === currentPuzzleIndex) {
        nextIdx = Math.floor(Math.random() * puzzles.length);
      }
      return nextIdx;
    },
    [puzzles.length, currentPuzzleIndex]
  );

  const handleStartGame = useCallback(() => {
    // Pick a random puzzle on game start
    const randomIndex = getRandomPuzzleIndex(false);
    setCurrentPuzzleIndex(randomIndex);
    setCurrentScreen("game");
  }, [getRandomPuzzleIndex]);

  const handleResetGame = useCallback(() => {
    // Option A: Automatically randomize to a different puzzle package on reset
    const nextRandomIndex = getRandomPuzzleIndex(true);
    setCurrentPuzzleIndex(nextRandomIndex);
  }, [getRandomPuzzleIndex]);

  const handleNextPuzzle = useCallback(() => {
    if (puzzles.length > 0) {
      setCurrentPuzzleIndex((prev) => (prev + 1) % puzzles.length);
    }
  }, [puzzles.length]);

  const currentPuzzle = puzzles[currentPuzzleIndex] || puzzles[0];

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#121212] text-[#171717] dark:text-[#F5F5F5] font-sans antialiased transition-colors duration-200">
      {currentScreen === "home" && (
        <HomePage
          theme={theme}
          onToggleTheme={toggleTheme}
          onStartGame={handleStartGame}
          onOpenTutorial={() => setCurrentScreen("tutorial")}
        />
      )}

      {currentScreen === "tutorial" && (
        <TutorialPage
          theme={theme}
          onToggleTheme={toggleTheme}
          onBack={() => setCurrentScreen("home")}
          onStartGame={handleStartGame}
        />
      )}

      {currentScreen === "game" && currentPuzzle && (
        <GamePage
          key={currentPuzzle.id}
          puzzle={currentPuzzle}
          totalPuzzles={puzzles.length}
          puzzleIndex={currentPuzzleIndex + 1}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNextPuzzle={handleNextPuzzle}
          onResetGame={handleResetGame}
          onGoHome={() => setCurrentScreen("home")}
          onOpenTutorial={() => setCurrentScreen("tutorial")}
        />
      )}
    </div>
  );
}

export default App;




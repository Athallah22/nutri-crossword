import React, { useState } from "react";
import type { Puzzle } from "../types/puzzle";
import { useGame } from "../hooks/useGame";
import { GameHeader } from "../components/game/GameHeader";
import { CrosswordBoard } from "../components/crossword/CrosswordBoard";
import { QuestionPanel } from "../components/game/QuestionPanel";
import { RoundStatus } from "../components/game/RoundStatus";
import { AnswerControls } from "../components/game/AnswerControls";
import { AudioSettings } from "../components/audio/AudioSettings";
import { CompletionModal } from "../components/game/CompletionModal";

import type { Theme } from "../hooks/useTheme";

interface GamePageProps {
  puzzle: Puzzle;
  puzzleIndex?: number;
  totalPuzzles?: number;
  theme?: Theme;
  onToggleTheme?: () => void;
  onNextPuzzle?: () => void;
  onResetGame?: () => void;
  onGoHome: () => void;
  onOpenTutorial: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({
  puzzle,
  puzzleIndex = 1,
  totalPuzzles = 5,
  theme = "light",
  onToggleTheme,
  onNextPuzzle,
  onResetGame,
  onGoHome,
  onOpenTutorial,
}) => {
  const {
    gameState,
    selectedQuestion,
    matrix,
    stats,
    audio,
    unfilledLettersCount,
    isAntiSpoilActive,
    selectQuestion,
    useHint,
    cancelRound,
    markAnswerCorrect,
    markAnswerIncorrect,
    skipQuestion,
    revealAnswerZeroPoints,
    resetGame,
  } = useGame(puzzle);

  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);

  const isRoundActive =
    gameState.roundStatus === "playing" ||
    gameState.roundStatus === "answering" ||
    gameState.roundStatus === "wrong-action";

  const hintsUsedForSelected = selectedQuestion
    ? gameState.hintsUsed[selectedQuestion.id] || 0
    : 0;

  return (
    <div className="h-screen w-full bg-[#FFF9ED] dark:bg-[#121212] text-[#171717] dark:text-[#F5F5F5] flex flex-col justify-between select-none overflow-hidden transition-colors">
      {/* Top Bar Header */}
      <GameHeader
        stats={stats}
        roundNumber={gameState.roundNumber}
        puzzleIndex={puzzleIndex}
        totalPuzzles={totalPuzzles}
        puzzleTitle={puzzle.title}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenAudioSettings={() => setIsAudioModalOpen(true)}
        onOpenTutorial={onOpenTutorial}
        onResetGame={onResetGame || resetGame}
      />

      {/* Main Game Screen Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-2 sm:py-3 flex flex-col justify-between gap-2.5 sm:gap-3 min-h-0 overflow-hidden">
        {/* Status Callout Banner */}
        <RoundStatus
          status={gameState.roundStatus}
          durationRemaining={gameState.durationRemainingSeconds}
        />

        {/* 2-Column Core Game Layout: Board (60%) + Question Panel (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 items-stretch flex-1 min-h-0 my-auto">
          {/* Left / Grid Board (approx 7 cols = ~58-60%) */}
          <section className="lg:col-span-7 flex flex-col items-center justify-center min-h-0 h-full">
            <CrosswordBoard
              matrix={matrix}
              selectedQuestion={selectedQuestion}
              answeredQuestionIds={gameState.answeredQuestionIds}
              revealedLetterCoords={gameState.revealedLetterCoords}
              onSelectQuestion={selectQuestion}
              isRoundActive={isRoundActive}
            />
          </section>

          {/* Right / Question Details (approx 5 cols = ~40-42%) */}
          <section className="lg:col-span-5 flex flex-col justify-between min-h-0 h-full">
            <QuestionPanel
              question={selectedQuestion}
              roundStatus={gameState.roundStatus}
              hintsUsed={hintsUsedForSelected}
              unfilledCount={unfilledLettersCount}
              isAntiSpoilActive={isAntiSpoilActive}
              onUseHint={useHint}
            />
          </section>
        </div>

        {/* Facilitator Control Bar at Bottom */}
        <AnswerControls
          roundStatus={gameState.roundStatus}
          isQuestionSelected={!!selectedQuestion}
          onMarkCorrect={markAnswerCorrect}
          onMarkIncorrect={markAnswerIncorrect}
          onSkipQuestion={skipQuestion}
          onRevealAnswerZeroPoints={revealAnswerZeroPoints}
          onCancelRound={cancelRound}
        />
      </main>

      {/* Audio Settings Modal */}
      <AudioSettings
        preferences={audio.preferences}
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        onVolumeChange={audio.setVolume}
        onTrackChange={audio.setTrack}
        onToggleMute={audio.toggleMute}
        onToggleSfx={audio.toggleSfx}
        onTestMusic={audio.testMusic}
        onStopTest={audio.stopTest}
      />

      {/* Completion Modal */}
      {gameState.completed && (
        <CompletionModal
          stats={stats}
          onRestart={onResetGame || resetGame}
          onNextPuzzle={onNextPuzzle}
          onGoHome={onGoHome}
        />
      )}
    </div>
  );
};



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
  const [isReviewingBoard, setIsReviewingBoard] = useState(false);

  const isRoundActive =
    gameState.roundStatus === "playing" ||
    gameState.roundStatus === "answering" ||
    gameState.roundStatus === "wrong-action";

  const hintsUsedForSelected = selectedQuestion
    ? gameState.hintsUsed[selectedQuestion.id] || 0
    : 0;

  const handleRestart = () => {
    setIsReviewingBoard(false);
    if (onResetGame) {
      onResetGame();
    } else {
      resetGame();
    }
  };

  const handleNextPuzzle = () => {
    setIsReviewingBoard(false);
    onNextPuzzle?.();
  };

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
        onResetGame={handleRestart}
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
      {gameState.completed && !isReviewingBoard && (
        <CompletionModal
          stats={stats}
          questions={puzzle.questions}
          puzzleTitle={puzzle.title}
          incorrectQuestionIds={gameState.incorrectQuestionIds}
          onRestart={handleRestart}
          onNextPuzzle={onNextPuzzle ? handleNextPuzzle : undefined}
          onGoHome={onGoHome}
          onReviewBoard={() => setIsReviewingBoard(true)}
        />
      )}

      {/* Floating Bottom Button When Reviewing Board */}
      {gameState.completed && isReviewingBoard && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            type="button"
            onClick={() => setIsReviewingBoard(false)}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] font-black rounded-xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-sm sm:text-base"
          >
            <span className="text-xl">🏆</span>
            <span>Buka Skor & Kunci Jawaban</span>
          </button>
        </div>
      )}
    </div>
  );
};



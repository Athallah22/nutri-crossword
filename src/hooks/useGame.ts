import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import type { GameState } from "../types/game";
import type { Puzzle, Question } from "../types/puzzle";
import { buildCrosswordGrid } from "../engine/crosswordEngine";
import { calculateGameStats } from "../engine/progressEngine";
import { calculateScore } from "../engine/scoreEngine";
import { MonotonicTimer, FIXED_ROUND_DURATION } from "../services/timerService";
import { audioService } from "../services/audioService";
import { useAudio } from "./useAudio";
import confetti from "canvas-confetti";

export function useGame(puzzle: Puzzle) {
  const { matrix, questionMap, cellQuestionMap } = useMemo(
    () => buildCrosswordGrid(puzzle),
    [puzzle]
  );
  const audio = useAudio();

  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    selectedQuestionId: null,
    roundStatus: "idle",
    answeredQuestionIds: [],
    incorrectQuestionIds: [],
    hintsUsed: {},
    revealedLetterCoords: {},
    currentDurationSeconds: null,
    durationRemainingSeconds: null,
    completed: false,
    roundNumber: 1,
  });

  const timerRef = useRef<MonotonicTimer>(new MonotonicTimer());

  // Clean up on component unmount
  useEffect(() => {
    const timer = timerRef.current;
    return () => {
      timer.stop();
      audioService.stop();
    };
  }, []);

  const selectedQuestion: Question | null = useMemo(() => {
    if (!gameState.selectedQuestionId) return null;
    return questionMap.get(gameState.selectedQuestionId) || null;
  }, [gameState.selectedQuestionId, questionMap]);

  const stats = useMemo(() => {
    return calculateGameStats(
      puzzle.questions,
      gameState.answeredQuestionIds,
      gameState.incorrectQuestionIds,
      gameState.score
    );
  }, [
    puzzle.questions,
    gameState.answeredQuestionIds,
    gameState.incorrectQuestionIds,
    gameState.score,
  ]);

  // Check game completion
  useEffect(() => {
    if (
      gameState.answeredQuestionIds.length > 0 &&
      gameState.answeredQuestionIds.length === puzzle.questions.length &&
      !gameState.completed
    ) {
      setGameState((prev) => ({
        ...prev,
        completed: true,
        roundStatus: "completed",
      }));
      audioService.stop();
      audioService.playCorrectSound();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  }, [
    gameState.answeredQuestionIds,
    puzzle.questions.length,
    gameState.completed,
  ]);

  /**
   * Starts a round when a question is selected
   */
  const selectQuestion = useCallback(
    async (questionId: string) => {
      if (gameState.answeredQuestionIds.includes(questionId)) return;
      if (
        gameState.roundStatus === "playing" ||
        gameState.roundStatus === "answering" ||
        gameState.roundStatus === "wrong-action"
      ) {
        return;
      }

      const q = questionMap.get(questionId);
      if (!q) return;

      const duration = FIXED_ROUND_DURATION;

      setGameState((prev) => ({
        ...prev,
        selectedQuestionId: questionId,
        roundStatus: "playing",
        currentDurationSeconds: duration,
        durationRemainingSeconds: duration,
      }));

      // Play audio safely
      audio.playMusic().catch((err) => {
        console.warn("Audio playback issue:", err);
      });

      // Start monotonic timer
      timerRef.current.start(duration, {
        onTick: (remainingSec) => {
          setGameState((prev) => ({
            ...prev,
            durationRemainingSeconds: remainingSec,
          }));
        },
        onComplete: () => {
          audioService.stop();
          audioService.playStopAlertSound();
          setGameState((prev) => ({
            ...prev,
            roundStatus: "answering",
            durationRemainingSeconds: 0,
          }));
        },
      });
    },
    [gameState.answeredQuestionIds, gameState.roundStatus, questionMap, audio]
  );

  /**
   * Calculate unfilled letters remaining for selected question
   */
  const unfilledLettersCount = useMemo(() => {
    if (!selectedQuestion) return 0;
    let count = 0;
    for (let i = 0; i < selectedQuestion.answer.length; i++) {
      const r =
        selectedQuestion.direction === "across"
          ? selectedQuestion.row
          : selectedQuestion.row + i;
      const c =
        selectedQuestion.direction === "across"
          ? selectedQuestion.col + i
          : selectedQuestion.col;
      const key = `${r},${c}`;
      const qIds = cellQuestionMap.get(key) || [];
      const isFilled =
        qIds.some((qid) => gameState.answeredQuestionIds.includes(qid)) ||
        !!gameState.revealedLetterCoords[key];
      if (!isFilled) {
        count++;
      }
    }
    return count;
  }, [
    selectedQuestion,
    cellQuestionMap,
    gameState.answeredQuestionIds,
    gameState.revealedLetterCoords,
  ]);

  const isAntiSpoilActive = unfilledLettersCount <= 1 && unfilledLettersCount > 0;

  /**
   * Smart 3-Tier Hint with Anti-Spoil Protection:
   * When only 1 unfilled letter remains (e.g. short word like KOI with 2 letters already filled),
   * do NOT auto-reveal the last remaining letter via Hint 1 or Hint 3.
   * Instead, offer text clue (Hint 2) so participants must deduce the answer themselves!
   */
  const useHint = useCallback(() => {
    if (!gameState.selectedQuestionId) return;
    const q = questionMap.get(gameState.selectedQuestionId);
    if (!q) return;

    const currentHints = gameState.hintsUsed[q.id] || 0;
    if (currentHints >= 3) return;

    let nextHintLevel = currentHints + 1;
    const newRevealed = { ...gameState.revealedLetterCoords };

    // Helper to check if a cell coordinate is already filled
    const isCellAlreadyFilled = (row: number, col: number) => {
      const qIds = cellQuestionMap.get(`${row},${col}`) || [];
      return qIds.some((qid) => gameState.answeredQuestionIds.includes(qid));
    };

    // Calculate unfilled letters count
    let unfilledCount = 0;
    for (let i = 0; i < q.answer.length; i++) {
      const r = q.direction === "across" ? q.row : q.row + i;
      const c = q.direction === "across" ? q.col + i : q.col;
      const key = `${r},${c}`;
      if (!isCellAlreadyFilled(r, c) && !newRevealed[key]) {
        unfilledCount++;
      }
    }

    // Anti-Spoil Rule: If only 1 letter is unfilled, skip letter reveal (Level 1 / 3) and unlock text clue (Level 2)
    if (unfilledCount <= 1) {
      if (currentHints === 0) {
        // Jump directly to Hint 2 (Text Clue) without revealing the final letter
        nextHintLevel = 2;
      } else {
        // If already unlocked text clue, do not reveal the last remaining letter
        return;
      }
    } else {
      // Level 1: Find the FIRST UNFILLED letter in the question
      if (nextHintLevel === 1) {
        for (let i = 0; i < q.answer.length; i++) {
          const r = q.direction === "across" ? q.row : q.row + i;
          const c = q.direction === "across" ? q.col + i : q.col;
          const key = `${r},${c}`;
          if (!isCellAlreadyFilled(r, c) && !newRevealed[key]) {
            newRevealed[key] = q.answer[i].toUpperCase();
            break;
          }
        }
      }
      // Level 3: Find the LAST UNFILLED letter in the question
      else if (nextHintLevel === 3) {
        for (let i = q.answer.length - 1; i >= 0; i--) {
          const r = q.direction === "across" ? q.row : q.row + i;
          const c = q.direction === "across" ? q.col + i : q.col;
          const key = `${r},${c}`;
          if (!isCellAlreadyFilled(r, c) && !newRevealed[key]) {
            newRevealed[key] = q.answer[i].toUpperCase();
            break;
          }
        }
      }
    }

    audioService.playCorrectSound();

    setGameState((prev) => ({
      ...prev,
      hintsUsed: {
        ...prev.hintsUsed,
        [q.id]: nextHintLevel,
      },
      revealedLetterCoords: newRevealed,
    }));
  }, [
    gameState.selectedQuestionId,
    gameState.hintsUsed,
    gameState.revealedLetterCoords,
    gameState.answeredQuestionIds,
    questionMap,
    cellQuestionMap,
  ]);

  /**
   * Cancel active round
   */
  const cancelRound = useCallback(() => {
    timerRef.current.stop();
    audioService.stop();
    setGameState((prev) => ({
      ...prev,
      roundStatus: "idle",
      selectedQuestionId: null,
      currentDurationSeconds: null,
      durationRemainingSeconds: null,
    }));
  }, []);

  /**
   * Mark answer as correct (+100 points)
   */
  const markAnswerCorrect = useCallback(() => {
    if (gameState.roundStatus !== "answering" || !gameState.selectedQuestionId)
      return;

    const q = questionMap.get(gameState.selectedQuestionId);
    if (!q) return;

    audioService.playCorrectSound();
    const pointsGained = calculateScore(q.points);

    setGameState((prev) => {
      const isAlreadyAnswered = prev.answeredQuestionIds.includes(q.id);
      const newAnswered = isAlreadyAnswered
        ? prev.answeredQuestionIds
        : [...prev.answeredQuestionIds, q.id];
      return {
        ...prev,
        score: prev.score + pointsGained,
        answeredQuestionIds: newAnswered,
        roundStatus: "idle",
        selectedQuestionId: null,
        roundNumber: prev.roundNumber + 1,
        currentDurationSeconds: null,
        durationRemainingSeconds: null,
      };
    });
  }, [gameState.roundStatus, gameState.selectedQuestionId, questionMap]);

  /**
   * Mark answer as incorrect -> transitions to wrong-action for facilitator choice
   */
  const markAnswerIncorrect = useCallback(() => {
    if (gameState.roundStatus !== "answering" || !gameState.selectedQuestionId)
      return;

    const q = questionMap.get(gameState.selectedQuestionId);
    if (!q) return;

    audioService.playIncorrectSound();

    setGameState((prev) => {
      const newIncorrect = prev.incorrectQuestionIds.includes(q.id)
        ? prev.incorrectQuestionIds
        : [...prev.incorrectQuestionIds, q.id];
      return {
        ...prev,
        incorrectQuestionIds: newIncorrect,
        roundStatus: "wrong-action",
      };
    });
  }, [gameState.roundStatus, gameState.selectedQuestionId, questionMap]);

  /**
   * Wrong Answer Option 1: Skip question to try again later
   */
  const skipQuestion = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      roundStatus: "idle",
      selectedQuestionId: null,
      roundNumber: prev.roundNumber + 1,
      currentDurationSeconds: null,
      durationRemainingSeconds: null,
    }));
  }, []);

  /**
   * Wrong Answer Option 2: Reveal official answer (0 points)
   */
  const revealAnswerZeroPoints = useCallback(() => {
    if (!gameState.selectedQuestionId) return;
    const q = questionMap.get(gameState.selectedQuestionId);
    if (!q) return;

    audioService.playStopAlertSound();

    setGameState((prev) => {
      const isAlreadyAnswered = prev.answeredQuestionIds.includes(q.id);
      const newAnswered = isAlreadyAnswered
        ? prev.answeredQuestionIds
        : [...prev.answeredQuestionIds, q.id];
      return {
        ...prev,
        answeredQuestionIds: newAnswered,
        roundStatus: "idle",
        selectedQuestionId: null,
        roundNumber: prev.roundNumber + 1,
        currentDurationSeconds: null,
        durationRemainingSeconds: null,
      };
    });
  }, [gameState.selectedQuestionId, questionMap]);

  /**
   * Reset the whole game
   */
  const resetGame = useCallback(() => {
    timerRef.current.stop();
    audioService.stop();
    setGameState({
      score: 0,
      selectedQuestionId: null,
      roundStatus: "idle",
      answeredQuestionIds: [],
      incorrectQuestionIds: [],
      hintsUsed: {},
      revealedLetterCoords: {},
      currentDurationSeconds: null,
      durationRemainingSeconds: null,
      completed: false,
      roundNumber: 1,
    });
  }, []);

  return {
    gameState,
    selectedQuestion,
    matrix,
    questionMap,
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
  };
}

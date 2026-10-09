import type { GameStats } from "../types/game";
import type { Question } from "../types/puzzle";

export function calculateGameStats(
  questions: Question[],
  answeredQuestionIds: string[],
  incorrectQuestionIds: string[],
  currentScore: number
): GameStats {
  const totalQuestions = questions.length;
  const completedQuestions = answeredQuestionIds.length;
  const correctCount = completedQuestions;
  const incorrectCount = incorrectQuestionIds.length;
  const percentage = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

  return {
    totalQuestions,
    completedQuestions,
    correctCount,
    incorrectCount,
    totalScore: currentScore,
    percentage,
  };
}

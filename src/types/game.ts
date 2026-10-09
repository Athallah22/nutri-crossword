export type RoundStatus =
  | "idle"
  | "playing"
  | "answering"
  | "wrong-action"
  | "evaluating"
  | "completed"
  | "cancelled"
  | "audio-error";

export interface GameStats {
  totalQuestions: number;
  completedQuestions: number;
  correctCount: number;
  incorrectCount: number;
  totalScore: number;
  percentage: number;
}

export interface AudioPreferences {
  volume: number;
  selectedTrack: string;
  isMuted: boolean;
  soundEffectsEnabled: boolean;
}

export interface GameState {
  score: number;
  selectedQuestionId: string | null;
  roundStatus: RoundStatus;
  answeredQuestionIds: string[];
  incorrectQuestionIds: string[];
  hintsUsed: Record<string, number>; // questionId -> hint count (0, 1, 2, 3)
  revealedLetterCoords: Record<string, string>; // "row,col" -> char
  currentDurationSeconds: number | null;
  durationRemainingSeconds: number | null;
  completed: boolean;
  roundNumber: number;
}

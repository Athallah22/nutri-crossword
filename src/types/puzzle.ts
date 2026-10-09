export type Direction = "across" | "down";

export interface Question {
  id: string;
  number: number;
  direction: Direction;
  row: number;
  col: number;
  answer: string;
  clue: string;
  category: string;
  points: number;
  hint?: string;
}

export interface CrosswordCellData {
  row: number;
  col: number;
  correctLetter: string;
  currentLetter?: string;
  number?: number;
  questionIds: string[];
  isBlocked: boolean;
}

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  rows: number;
  cols: number;
  questions: Question[];
}

export interface PuzzleBank {
  puzzles: Puzzle[];
}


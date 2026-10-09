import type { CrosswordCellData, Puzzle, Question } from "../types/puzzle";

export interface BuildGridResult {
  matrix: CrosswordCellData[][];
  questionMap: Map<string, Question>;
  cellQuestionMap: Map<string, string[]>; // "row,col" -> questionIds
}

/**
 * Builds a 2D matrix of cells based on puzzle definition.
 */
export function buildCrosswordGrid(puzzle: Puzzle): BuildGridResult {
  const { rows, cols, questions } = puzzle;
  const questionMap = new Map<string, Question>();
  const cellQuestionMap = new Map<string, string[]>();
  const cellCharMap = new Map<string, string>();
  const cellNumberMap = new Map<string, number>();

  // Process all questions
  questions.forEach((q) => {
    questionMap.set(q.id, q);

    const startKey = `${q.row},${q.col}`;
    // Assign number to starting cell
    if (!cellNumberMap.has(startKey)) {
      cellNumberMap.set(startKey, q.number);
    }

    const answer = q.answer.toUpperCase();
    for (let i = 0; i < answer.length; i++) {
      const r = q.direction === "across" ? q.row : q.row + i;
      const c = q.direction === "across" ? q.col + i : q.col;
      const key = `${r},${c}`;

      // Check conflict
      const char = answer[i];
      if (cellCharMap.has(key) && cellCharMap.get(key) !== char) {
        console.warn(`Grid letter mismatch at (${r},${c}): existing ${cellCharMap.get(key)} vs new ${char}`);
      }
      cellCharMap.set(key, char);

      const existingQIds = cellQuestionMap.get(key) || [];
      if (!existingQIds.includes(q.id)) {
        existingQIds.push(q.id);
      }
      cellQuestionMap.set(key, existingQIds);
    }
  });

  // Construct matrix
  const matrix: CrosswordCellData[][] = [];
  for (let r = 0; r < rows; r++) {
    const rowCells: CrosswordCellData[] = [];
    for (let c = 0; c < cols; c++) {
      const key = `${r},${c}`;
      const isBlocked = !cellCharMap.has(key);
      rowCells.push({
        row: r,
        col: c,
        correctLetter: cellCharMap.get(key) || "",
        number: cellNumberMap.get(key),
        questionIds: cellQuestionMap.get(key) || [],
        isBlocked,
      });
    }
    matrix.push(rowCells);
  }

  return { matrix, questionMap, cellQuestionMap };
}

/**
 * Gets all cell coordinates for a given question.
 */
export function getQuestionCells(q: Question): Array<{ row: number; col: number }> {
  const cells: Array<{ row: number; col: number }> = [];
  for (let i = 0; i < q.answer.length; i++) {
    const r = q.direction === "across" ? q.row : q.row + i;
    const c = q.direction === "across" ? q.col + i : q.col;
    cells.push({ row: r, col: c });
  }
  return cells;
}

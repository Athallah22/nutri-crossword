/**
 * Calculates score for answering a question.
 */
export function calculateScore(points: number, isSecondChance = false): number {
  if (isSecondChance) {
    return Math.floor(points * 0.75); // 75% for second chance if configured
  }
  return points;
}

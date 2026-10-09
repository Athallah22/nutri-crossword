import { normalizeAnswer } from "../utils/normalizeAnswer";

/**
 * Validates whether the given answer matches the target official answer.
 */
export function validateAnswer(input: string, officialAnswer: string): boolean {
  const normInput = normalizeAnswer(input);
  const normOfficial = normalizeAnswer(officialAnswer);
  return normInput.length > 0 && normInput === normOfficial;
}

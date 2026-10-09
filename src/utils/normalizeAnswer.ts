/**
 * Normalizes user answer by trimming, converting to uppercase,
 * and removing non-alphanumeric characters.
 */
export function normalizeAnswer(input: string): string {
  if (!input) return "";
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

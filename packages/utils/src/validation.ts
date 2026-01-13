/**
 * Validation utilities
 */

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns True if valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate price is positive
 * @param price - Price to validate
 * @returns True if price is positive number
 */
export function isValidPrice(price: number): boolean {
  return typeof price === 'number' && price > 0 && isFinite(price);
}

/**
 * Validate prompt length
 * @param prompt - User prompt to validate
 * @param minLength - Minimum length (default: 10)
 * @param maxLength - Maximum length (default: 200)
 * @returns True if prompt length is valid
 */
export function isValidPrompt(
  prompt: string,
  minLength: number = 10,
  maxLength: number = 200
): boolean {
  return (
    typeof prompt === 'string' &&
    prompt.trim().length >= minLength &&
    prompt.trim().length <= maxLength
  );
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize user input (remove potentially harmful characters)
 * @param input - User input to sanitize
 * @returns Sanitized input
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
}

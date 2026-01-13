/**
 * Error handling utilities
 */

/**
 * Custom error class for FashionDeck application errors
 */
export class FashionDeckError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'FashionDeckError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for invalid user input
 */
export class ValidationError extends FashionDeckError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

/**
 * Error for marketplace API failures
 */
export class MarketplaceError extends FashionDeckError {
  constructor(message: string, public marketplace: string) {
    super(message, 'MARKETPLACE_ERROR', 503);
    this.name = 'MarketplaceError';
  }
}

/**
 * Error for ML service failures
 */
export class MLServiceError extends FashionDeckError {
  constructor(message: string) {
    super(message, 'ML_SERVICE_ERROR', 503);
    this.name = 'MLServiceError';
  }
}

/**
 * Error for when no results are found
 */
export class NoResultsError extends FashionDeckError {
  constructor(message: string = 'No outfits found matching your criteria') {
    super(message, 'NO_RESULTS', 404);
    this.name = 'NoResultsError';
  }
}

/**
 * Format error for API response
 * @param error - Error object
 * @returns Formatted error response
 */
export function formatErrorResponse(error: unknown): {
  error: string;
  code: string;
  statusCode: number;
} {
  if (error instanceof FashionDeckError) {
    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      code: 'INTERNAL_ERROR',
      statusCode: 500,
    };
  }

  return {
    error: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
  };
}

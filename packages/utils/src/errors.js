"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoResultsError = exports.MLServiceError = exports.MarketplaceError = exports.ValidationError = exports.FashionDeckError = void 0;
exports.formatErrorResponse = formatErrorResponse;
class FashionDeckError extends Error {
    constructor(message, code, statusCode = 500) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'FashionDeckError';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.FashionDeckError = FashionDeckError;
class ValidationError extends FashionDeckError {
    constructor(message) {
        super(message, 'VALIDATION_ERROR', 400);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class MarketplaceError extends FashionDeckError {
    constructor(message, marketplace) {
        super(message, 'MARKETPLACE_ERROR', 503);
        this.marketplace = marketplace;
        this.name = 'MarketplaceError';
    }
}
exports.MarketplaceError = MarketplaceError;
class MLServiceError extends FashionDeckError {
    constructor(message) {
        super(message, 'ML_SERVICE_ERROR', 503);
        this.name = 'MLServiceError';
    }
}
exports.MLServiceError = MLServiceError;
class NoResultsError extends FashionDeckError {
    constructor(message = 'No outfits found matching your criteria') {
        super(message, 'NO_RESULTS', 404);
        this.name = 'NoResultsError';
    }
}
exports.NoResultsError = NoResultsError;
function formatErrorResponse(error) {
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
//# sourceMappingURL=errors.js.map
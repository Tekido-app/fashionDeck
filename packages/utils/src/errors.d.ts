export declare class FashionDeckError extends Error {
    code: string;
    statusCode: number;
    constructor(message: string, code: string, statusCode?: number);
}
export declare class ValidationError extends FashionDeckError {
    constructor(message: string);
}
export declare class MarketplaceError extends FashionDeckError {
    marketplace: string;
    constructor(message: string, marketplace: string);
}
export declare class MLServiceError extends FashionDeckError {
    constructor(message: string);
}
export declare class NoResultsError extends FashionDeckError {
    constructor(message?: string);
}
export declare function formatErrorResponse(error: unknown): {
    error: string;
    code: string;
    statusCode: number;
};

/**
 * API Client for FashionDeck Backend
 * 
 * Handles all API communication with the NestJS backend
 */

import { Outfit } from "@fashiondeck/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface QueryRequest {
  prompt: string;
}

export interface QueryResponse {
  outfits: Outfit[];
  count: number;
  processingTime?: number;
  aesthetic?: string;
  warnings?: string[];
}

export interface QueryError {
  statusCode: number;
  message: string;
  error: string;
  suggestions?: string[];
}

/**
 * Submit a styling query to the backend
 */
export async function submitQuery(prompt: string): Promise<QueryResponse> {
  const response = await fetch(`${API_BASE_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error: QueryError = await response.json();
    throw new QueryApiError(error.message, error.statusCode, error.suggestions);
  }

  return response.json();
}

/**
 * Custom error class for API errors
 */
export class QueryApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public suggestions?: string[]
  ) {
    super(message);
    this.name = "QueryApiError";
  }
}

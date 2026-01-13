-- FashionDeck Database Initialization Script
-- This script runs automatically when the PostgreSQL container starts for the first time

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create initial schema (migrations will handle the rest)
-- This is just to verify the database is working

-- Verify pgvector is installed
SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';

-- Create a test table to verify vector functionality
CREATE TABLE IF NOT EXISTS _vector_test (
    id SERIAL PRIMARY KEY,
    embedding vector(512)
);

-- Insert a test vector
INSERT INTO _vector_test (embedding) VALUES (array_fill(0, ARRAY[512])::vector);

-- Clean up test table
DROP TABLE _vector_test;

-- Log success
DO $$
BEGIN
    RAISE NOTICE 'FashionDeck database initialized successfully with pgvector extension';
END $$;

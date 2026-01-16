/**
 * Style Input Component
 *
 * Main search input for styling queries
 */

"use client";

import { useState, KeyboardEvent } from "react";

interface StyleInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
  collapsed?: boolean;
}

export default function StyleInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = "Describe the vibe… e.g., korean minimal fit, size M",
  collapsed = false,
}: StyleInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && value.trim().length >= 10) {
      onSubmit();
    }
  };

  const handleSubmit = () => {
    if (!isLoading && value.trim().length >= 10) {
      onSubmit();
    }
  };

  return (
    <div
      className={`relative ${
        collapsed ? "w-full max-w-2xl" : "w-full max-w-3xl mx-auto"
      }`}
    >
      <div
        className={`relative flex items-center border-2 transition-all duration-300 ${
          isFocused
            ? "border-editorial-text shadow-md"
            : "border-editorial-divider shadow-sm"
        } ${collapsed ? "rounded-full" : "rounded-2xl"} bg-white overflow-hidden`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={isLoading}
          className={`flex-1 px-6 ${
            collapsed ? "py-3" : "py-4 md:py-5"
          } text-editorial-text placeholder-editorial-text-muted/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
            collapsed ? "text-sm" : "text-base md:text-lg"
          }`}
        />

        {value.trim().length >= 10 && (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mr-2 px-4 py-2 bg-editorial-text text-white rounded-full text-sm font-medium hover:bg-editorial-text-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Styling...
              </>
            ) : (
              <>
                Style this
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="inline-block"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
        )}
      </div>

      {value.trim().length > 0 && value.trim().length < 10 && (
        <p className="text-xs text-editorial-text-muted/60 mt-2 ml-6">
          Please enter at least 10 characters
        </p>
      )}
    </div>
  );
}

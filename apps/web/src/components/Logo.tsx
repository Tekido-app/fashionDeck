import React from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showText?: boolean;
}

export function Logo({
  className = "",
  variant = "dark",
  showText = true,
}: LogoProps) {
  const isDark = variant === "dark";
  const fg = isDark ? "white" : "black";
  const bg = isDark ? "black" : "white";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Background circle */}
          <circle cx="50" cy="50" r="48" fill={fg} />

          {/* Geometric F logo path */}
          <path d="M35 28 H 50 V 72 H 35 Z" fill={bg} />
          <path d="M50 28 H 75 V 40 H 50 Z" fill={bg} />
          <path d="M50 48 H 70 V 60 H 50 Z" fill={bg} />

          {/* Dot */}
          <circle cx="75" cy="68" r="6" fill={bg} />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-bold text-xl tracking-tight ${variant === "dark" ? "text-white" : "text-black"}`}
        >
          FashionDeck
        </span>
      )}
    </div>
  );
}

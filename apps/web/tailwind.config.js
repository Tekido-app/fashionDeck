/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shadow: {
          DEFAULT: "#000000", // Strict Black
          light: "#242423",
          muted: "#575756",
        },
        dust: {
          DEFAULT: "#CFDBD5",
          light: "#E2E9E6",
        },
        ivory: {
          DEFAULT: "#E8EDDF",
          light: "#FBFBF9",
        },
        tuscan: {
          DEFAULT: "#E9BA31",
          light: "#F5CB5C",
          dark: "#D4A316",
        },
        surface: {
          50: "#FFFFFF",
          100: "#FBFBF9",
          200: "#E8EDDF",
          300: "#CFDBD5",
          900: "#1A1A19",
          950: "#0A0A09",
        },
        // Editorial Palette
        editorial: {
          white: "#FAFAFA",
          text: "#111111",
          "text-muted": "#222222",
          accent: "#D9C9A3",
          divider: "#E8E8E8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-outfit)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      boxShadow: {
        premium:
          "0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
        vibrant:
          "0 10px 15px -3px rgba(14, 165, 233, 0.2), 0 4px 6px -4px rgba(14, 165, 233, 0.1)",
      },
      marquee: "marquee 25s linear infinite",
      runway: "runway 1.5s linear infinite",
      scanner: "scanner 2s ease-in-out infinite",
      popup: "popup 0.5s ease-out forwards",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      runway: {
        "0%": { backgroundPosition: "0 0" },
        "100%": { backgroundPosition: "0 40px" },
      },
      scanner: {
        "0%": { top: "0%" },
        "50%": { top: "100%" },
        "100%": { top: "0%" },
      },
      popup: {
        "0%": { opacity: "0", transform: "scale(0.9) translateY(20px)" },
        "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
      },
    },
  },
  plugins: [],
};

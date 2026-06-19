import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          100: "#D6EAF8",
          300: "#85C1E9",
          500: "#2E86C1",
          700: "#1B4F72",
          900: "#0D2B3E",
        },
        jungle: {
          100: "#D5F5E3",
          300: "#82E0AA",
          500: "#27AE60",
          700: "#1E6B3C",
        },
        sand: {
          100: "#FDFBEE",
          300: "#F9E79F",
          500: "#D4AC0D",
          700: "#9A7D0A",
        },
        cream: "#FAF7F2",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.14)",
        hero: "0 20px 60px rgba(13,43,62,0.35)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, rgba(13,43,62,0.25) 0%, rgba(13,43,62,0.65) 100%)",
        "card-overlay":
          "linear-gradient(to top, rgba(13,43,62,0.85) 0%, transparent 60%)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        88: "22rem",
        128: "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;

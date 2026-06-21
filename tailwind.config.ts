import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#0D0D14",
        "bg-card": "#13131F",
        "bg-elevated": "#1A1A2E",
        "neon-primary": "#7C3AED",
        "neon-secondary": "#06B6D4",
        "neon-green": "#10B981",
        "neon-yellow": "#FACC15",
        "neon-red": "#EF4444",
        "text-primary": "#F1F1F8",
        "text-secondary": "#9898B0",
        "text-muted": "#55556A",
        border: "#2A2A3D",
      },
      fontFamily: {
        heading: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      boxShadow: {
        "neon-primary": "0 0 16px rgba(124, 58, 237, 0.5)",
        "neon-cyan": "0 0 20px rgba(6, 182, 212, 0.2)",
        "neon-active": "0 0 12px rgba(124, 58, 237, 0.4)",
        "glow-purple": "0 0 20px rgba(124, 58, 237, 0.25)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;

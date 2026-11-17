import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: {
      serif: ["Cormorant Garamond", "Georgia", "serif"],
      sans: ["Lato", "system-ui", "sans-serif"],
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    colors: {
      sp: {
        cream: "#FBF6EC",
        surface: "#FFFDF8",
        ink: "#2B2118",
        muted: "#6B5D50",
        line: "#E4D8C5",
        rust: "#A63D24",
        tint: "#F6E4DC",
        tintline: "#E8C9BD",
        green: "#2E6B50",
        danger: "#9B1C1C",
      },
      background: "rgb(var(--background))",
      foreground: "rgb(var(--foreground))",
      card: {
        DEFAULT: "rgb(var(--card))",
        foreground: "rgb(var(--card-foreground))",
      },
      popover: {
        DEFAULT: "rgb(var(--popover))",
        foreground: "rgb(var(--popover-foreground))",
      },
      primary: {
        DEFAULT: "rgb(var(--primary))",
        foreground: "rgb(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "rgb(var(--secondary))",
        foreground: "rgb(var(--secondary-foreground))",
      },
      muted: {
        DEFAULT: "rgb(var(--muted))",
        foreground: "rgb(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "rgb(var(--accent))",
        foreground: "rgb(var(--accent-foreground))",
      },
      destructive: {
        DEFAULT: "rgb(var(--destructive))",
        foreground: "rgb(var(--destructive-foreground))",
      },
      border: "rgb(var(--border))",
      input: "rgb(var(--input))",
      ring: "rgb(var(--ring))",
    },
  }},
  plugins: [require("tailwindcss-animate")],
};
export default config;

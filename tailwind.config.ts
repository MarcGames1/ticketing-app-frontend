import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      base: ["0.8125rem", "1.4375rem"],
      xl: ["1.5rem", "1.875rem"],
      lg: ["1.125rem", "1.4375rem"],
      md: ["0.9375rem", "1.1875rem"],
      sm: ["0.75rem", "0.9375rem"],
    },
    extend: {
      colors: {
        black: "#000112",
        veryDarkGrey: "#20212C",
        darkGrey: "#2B2C37",
        darkGreyLine: "#3E3F4E",
        mediumGrey: "#828fa3",
        lightGreyLine: "#e4ebfa",
        lightGrey: "#f4f7fd",
        mainPurple: "#635FC7",
        mainPurpleHover: "#A8A4FF",
        mainRed: "#EA5555",
        mainRedHover: "#FF9898",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      letterSpacing: {
        widest: "0.15rem",
      },
      boxShadow: {
        main: "0px 4px 6px rgba(54, 78, 126, 0.101545)",
        secondary: "0px 10px 20px rgba(54, 78, 126, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
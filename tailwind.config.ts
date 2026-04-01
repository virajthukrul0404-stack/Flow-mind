import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./tests/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#1e1b4b"
        },
        accent: {
          100: "#f3e8ff",
          300: "#d8b4fe",
          500: "#8b5cf6",
          700: "#6d28d9"
        },
        ink: "#111827",
        mist: "#f8fafc",
        glow: "#f59e0b"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 70px -28px rgba(79, 70, 229, 0.45)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        aurora: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) scale(1)",
            opacity: "0.7"
          },
          "50%": {
            transform: "translate3d(2%, -3%, 0) scale(1.08)",
            opacity: "1"
          }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        pulseLine: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        }
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        aurora: "aurora 14s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        "pulse-line": "pulseLine 4s linear infinite"
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.28), transparent 28%), radial-gradient(circle at 80% 0%, rgba(139,92,246,0.2), transparent 24%), radial-gradient(circle at 85% 80%, rgba(14,165,233,0.14), transparent 26%), linear-gradient(135deg, rgba(248,250,252,0.98), rgba(238,242,255,0.95))"
      }
    }
  },
  plugins: []
};

export default config;

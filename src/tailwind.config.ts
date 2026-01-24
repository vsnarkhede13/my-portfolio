import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "gradient": "gradient 15s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "blob": "blob 8s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-shift": "gradient-shift 3s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blob: {
          "0%, 100%": {
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          },
          "25%": {
            borderRadius: "58% 42% 75% 25% / 76% 46% 54% 24%",
          },
          "50%": {
            borderRadius: "50% 50% 33% 67% / 55% 27% 73% 45%",
          },
          "75%": {
            borderRadius: "33% 67% 58% 42% / 63% 68% 32% 37%",
          },
        },
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "gradient-shift": {
          to: {
            backgroundPosition: "200% center",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
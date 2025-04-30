module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff", // Lightest
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8", // Primary accent
          500: "#0ea5e9", // Main primary
          600: "#0284c7", // Darker
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e", // Darkest
        },
        secondary: {
          400: "#a78bfa", // Soft purple accent
          600: "#7c3aed", // Vibrant secondary
        },
        success: {
          400: "#34d399", // Fresh green
          600: "#059669",
        },
        warning: {
          400: "#fbbf24", // Sunny yellow
          600: "#d97706",
        },
        danger: {
          400: "#f87171", // Coral red
          600: "#dc2626",
        },
        dark: {
          800: "#1e293b", // Dark bg
          900: "#0f172a", // Darker bg
        },
        light: {
          50: "#f8fafc", // Off-white
          100: "#f1f5f9",
        },
      },
    },
  },
  plugins: [],
};

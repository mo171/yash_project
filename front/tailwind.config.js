/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dashboard-bg": "#0f172a",
        "panel-bg": "rgba(30, 41, 59, 0.7)",
        "panel-border": "rgba(148, 163, 184, 0.1)",
        "accent-blue": "#38bdf8",
        "accent-green": "#22c55e",
        "accent-red": "#ef4444",
      },
    },
  },
  plugins: [],
};

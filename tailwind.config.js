/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: "#420812",
        wine: "#9B1327",
        merlot: "#C42B43",
        cream: "#F1EEE7",
        champagne: "#C2B79C",
        charcoal: "#080808",
        rose: "#54212B",
        ink: "#111111"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"]
      },
      boxShadow: {
        editorial: "0 24px 80px rgba(0,0,0,.34)",
        glow: "0 0 32px rgba(155,19,39,.2)"
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, rgba(216,184,106,.75), transparent)"
      }
    }
  },
  plugins: []
};

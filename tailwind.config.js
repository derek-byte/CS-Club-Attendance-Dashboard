/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111827",
        backgroundaccent: "#334155",
        accent: "#3b81f6",
        text: "#ddd",
        textdimmed: "#9ca3af",
      }
    },
  },
  plugins: [],
}
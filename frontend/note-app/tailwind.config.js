/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        note: {
          yellow: { default: '#fef08a', border: '#fde047' },
          blue: { default: '#bfdbfe', border: '#93c5fd' },
          pink: { default: '#fbcfe8', border: '#f9a8d4' },
          purple: { default: '#e9d5ff', border: '#d8b4fe' },
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
    },
  },
  plugins: [],
}


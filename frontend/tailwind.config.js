/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mvu: {
          50: '#fcf8ee',
          100: '#f7eecc',
          200: '#eed995',
          300: '#e4bf57',
          400: '#dba529',
          500: '#c58a18',
          600: '#a36812',
          700: '#824b13',
          800: '#6d3d17',
          900: '#5c3318',
          950: '#35190b',
        },
      },
      fontFamily: {
        sans: ['Kanit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

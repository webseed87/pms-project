/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 
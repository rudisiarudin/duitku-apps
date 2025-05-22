/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // aktifkan dark mode via class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',  // breakpoint desktop
      xl: '1280px',
      '2xl': '1536px',
    },
    },
  },
  plugins: [],
}

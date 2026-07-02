/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#003264',
          light: '#2A70B9',
          50: "#eef7ff",
          100: "#dcefff",
          200: "#b2e1ff",
          300: "#6dcaff",
          400: "#20b0ff",
          500: "#0095ff",
          600: "#0076df",
          650: "#2A70B9",
          700: "#005db4",
          800: "#004f95",
          900: "#00417a",
          950: "#003264",
        },
        secondary: {
          DEFAULT: '#003264',
          light: '#2A70B9'
        },
        tertiary: {
          DEFAULT: '#45CEBF',
          light: '#70F3E5',
          dark: '#3DB8AA',
          50: '#EEFEFF',
          100: '#CCF2F3',
          200: '#99E5E6',
          300: '#66D8D9',
          400: '#33CCCD',
          500: '#00BFC0',
          600: '#00999A',
          700: '#007374',
          800: '#004D4E',
        },
        actions: {
          cancel: '#FF6C6C',
          error: '#FF0000',
          success: '#4CAF50',
          warning: '#FFC107',
          info: '#2196F3',
        },
      },
    },
  },
  plugins: [],
}

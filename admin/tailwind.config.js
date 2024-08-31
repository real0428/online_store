/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          50: '#F7F7F7',
          100: '#F1F1F1',
          200: '#DDDDDD',
          300: '#C2C2C2',
          400: '#999999',
          500: '#727272',
          600: '#555555',
          700: '#424242',
          800: '#2F2F2F',
          900: '#101010'
        },
        primary: {
          50: '#f4f6f8',
          100: '#e7e9f2',
          400: '#4863c7',
          500: '#445a7e'
        }
      },
    },
  },
  plugins: [],
}


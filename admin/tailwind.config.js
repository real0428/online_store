/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    spacing: {
      '1': '2px',
      '2': '4px',
      '3': '6px',
      '4': '8px',
      '5': '10px',
      '6': '12px',
      '7': '14px',
      '8': '16px',
      '9': '18px',
      '10': '20px',
      '11': '22px',
      '12': '24px',
      '13': '26px',
      '14': '28px',
      '15': '30px',
      '16': '32px',
      '17': '34px',
      '18': '36px',
      '19': '38px',
      '20': '40px'
    },
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
          200: '#dfe2f0',
          500: '#445a7e'
        },
        secondary: {
          500: '#BA255B'
        }
      },
    },
  },
  plugins: [],
}


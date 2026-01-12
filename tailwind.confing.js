/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        gillsans: ['GillSans', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        semibold: '600',
        bold: '700',
        ultrabold: '800',
      },
    },
  },
  plugins: [],
}

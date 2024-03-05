/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily:{
        'roboto-thin': ['Roboto', 'sans-serif'],
        'roboto-light': ['Roboto', 'sans-serif'],
        'roboto-regular': ['Roboto', 'sans-serif'],
        'roboto-medium': ['Roboto', 'sans-serif'],
        'roboto-bold': ['Roboto', 'sans-serif'],
        'roboto-black': ['Roboto', 'sans-serif'],
        'roboto-thin-italic': ['Roboto', 'sans-serif'],
        'roboto-light-italic': ['Roboto', 'sans-serif'],
        'roboto-regular-italic': ['Roboto', 'sans-serif'],
        'roboto-medium-italic': ['Roboto', 'sans-serif'],
        'roboto-bold-italic': ['Roboto', 'sans-serif'],
        'roboto-black-italic': ['Roboto', 'sans-serif'],
      },
      fontWeight:{
        '100': 100,
        '200': 200,
        '300': 300,
        '400': 400,
        '500': 500,
        '600': 600,
        '700': 700,
        '800': 800,
        '900': 900,
      }
    },
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

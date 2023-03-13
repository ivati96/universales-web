/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'regal-blue': {
          '50': '#ebfaff',
          '100': '#d1f4ff',
          '200': '#aeecff',
          '300': '#76e3ff',
          '400': '#35d0ff',
          '500': '#07afff',
          '600': '#0089ff',
          '700': '#0070ff',
          '800': '#005dd7',
          '900': '#003974',
        },
        'wattle': {
          '50': '#fafbeb',
          '100': '#eff5cc',
          '200': '#e6ed9b',
          '300': '#d7de4e',
          '400': '#d7d837',
          '500': '#c8c32a',
          '600': '#ac9d22',
          '700': '#8a741e',
          '800': '#735d20',
          '900': '#634e20',
        },
      
      }
    },
  },
  plugins: [],
}

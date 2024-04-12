// tailwind.config.js

const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    './imports/ui/**/*.{html,js,jsx,tsx}', // Simplified glob pattern
    './client/**/*.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        slate: colors.slate,
        gray: colors.gray,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
      borderColor: ['checked', 'hover', 'focus'],
    },
  },
  plugins: [
    forms,
  ],
};

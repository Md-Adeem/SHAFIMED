
// // tailwind.config.js
// const defaultTheme = require('tailwindcss/defaultTheme');
// const colors = require('tailwindcss/colors');

// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter', ...defaultTheme.fontFamily.sans],
//         heading: ['Poppins', ...defaultTheme.fontFamily.sans],
//       },
//       colors: {
//         // Use slate instead of gray for softer, modern neutrals
//         slate: colors.slate,
//         // Our primary brand color
//         teal: colors.teal,
//       }
//     },
//   },
//   plugins: [],
// }







const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Use slate instead of gray for softer, modern neutrals
        slate: colors.slate,
        // Our primary brand color
        teal: colors.teal,
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};

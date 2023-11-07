import colors from 'tailwindcss/colors';

// Setup TailwindCSS in Vite project with Prettier and Storybook:
// - https://tailwindcss.com/docs/guides/vite
// - https://tailwindcss.com/blog/automatic-class-sorting-with-prettier
// - https://storybook.js.org/recipes/tailwindcss

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    data: {
      // ordered by priority (lowest to highest)
      'focus-visible': 'focus-visible=true',
      'focused': 'focused=true',
      'hovered': 'hovered=true',
      'pressed': 'pressed=true',
      'invalid': 'invalid=true',
      'disabled': 'disabled=true',
    },
    colors: {
      // single colors
      current: colors.current,
      inherit: colors.inherit,
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      // palettes
      gray: colors.gray,
      accent: colors.blue,
      success: colors.emerald,
      warning: colors.rose,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class', // required for Storybook dark mode support (see `.storybook/preview.ts`)
};

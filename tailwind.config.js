// Setup TailwindCSS in Vite project with Prettier and Storybook:
// - https://tailwindcss.com/docs/guides/vite
// - https://tailwindcss.com/blog/automatic-class-sorting-with-prettier
// - https://storybook.js.org/recipes/tailwindcss

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // required for Storybook dark mode support (see `.storybook/preview.ts`)
};

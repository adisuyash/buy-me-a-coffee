/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
          'default-sky-blue': '#61dafb',
          'default-lemon-yellow': '#f4f666',
      }
    },
  },
  plugins: [],
};

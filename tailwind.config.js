/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 10px 15px -5px rgb(0 0 0 / 0.1)',
        'cumsom-hover': '0px 10px 15px -5px rgb(0 0 0 / 0.3)',
      }
    },
  },
  plugins: [],
}
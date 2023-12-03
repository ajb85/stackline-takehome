/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
      },
      colors: {
        "banner-blue": "#052849",
        "panel-white": "#FFFFFF",
      },
    },
  },
  plugins: [],
};

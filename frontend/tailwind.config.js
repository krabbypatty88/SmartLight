/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
        primary: "#4B4EDD",
          "primary-dark": "#3A3BCD",
        dark: "#1C1B03",
        light: "#DFE1DA",
        accent: "#BDCAEB",
      },
  },
  plugins: [],
}
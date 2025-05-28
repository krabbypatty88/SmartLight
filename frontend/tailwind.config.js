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
        black: "#000000",
        white: "#ffffff",
        blue: {
          500: "#3B82F6",
          600: "#2563EB",
        },
        gray: {
          500: "#6B7280",
          600: "#4B5563",
        },
        red: {
          500: "#Ff0000"
        }
      },
  },
  plugins: [],
}
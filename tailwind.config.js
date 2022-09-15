/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkblue: "#011540",
        blue: "#023583",
        lightblue: "#6ecbf5",
        purple: "#853987",
        pink: "#fe3e8a",
        lightpink: "#ff7aaf",
        red: "#fe0060",
        coral: "#fe6675",
        green: "#00ff0d",
      },
    },
  },
  plugins: [],
}

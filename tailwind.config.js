/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkblue: "#010f2b",
        blue: "#002863",
        lightblue: "#6ecbf5",
        purple: "#6d3987",
        pink: "#df4381",
        lightpink: "#ff7aaf",
        red: "#fe0060",
        coral: "#fe6675",
        green: "#34daa9",
      },
    },
  },
  plugins: [],
}

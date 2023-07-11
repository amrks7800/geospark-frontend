/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#4E4FEB",
        "secondary-blue": "#068FFF",
        "light-gray": "#EEEEEE",
      },
      boxShadow: {
        main: "0 0 40px rgba(0,0,0,.102)",
      },
      dropShadow: {
        main: "0 0 40px rgba(0,0,0,.102)",
      },
    },
  },
  plugins: [],
}

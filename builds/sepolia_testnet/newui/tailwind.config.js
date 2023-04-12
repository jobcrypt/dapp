/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.js", "./pages/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        jcBlue: "#1F49DD",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

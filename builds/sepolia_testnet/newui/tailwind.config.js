/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.js", "./pages/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        baiJam: ["Bai Jamjuree", "sans-serif"],
      },
      colors: {
        jcBlue: "#1F49DD",
        jcDarkBlue: "#273CC8",
        jcPurple: "#592ADE",
        overlay: "#D9D9D9",
        gradient: "gradient-to-b from-jcBlue to-jcPurple",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

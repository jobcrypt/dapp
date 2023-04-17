/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    content: ["./node_modules/flowbite/**/*.js", "./pages/**/*.{html,js}"],
    transform: (content) => content.replace(/taos:/g, ""),
  },
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
  safelist: [
    "!duration-[0ms]",
    "!delay-[0ms]",
    'html.js :where([class*="taos:"]:not(.taos-init))',
  ],
  plugins: [require("flowbite/plugin", "taos/plugin")],
};

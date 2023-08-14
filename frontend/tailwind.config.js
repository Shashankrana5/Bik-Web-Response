/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    color: {
      "primary-amber": "#fffbeb",
      "tprimary-gray": "#9ca3af",
      "bprimary-yellow": "#a16207",
      shadowprimary: "#a2621f",
      primarytheme: "#c2410c",
      primary: "orange",
      pri: "#fff7ed",
    },
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin")],
};

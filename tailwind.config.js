/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite-typography"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};

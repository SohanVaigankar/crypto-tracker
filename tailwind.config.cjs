/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
    colors:{
      "primary-bg": "#555555",
      "secondary-bg": "#F8FAFC",
      "tertary-bg": "#FFFFFF",
      "utility-bg": "#EFF2F5",
      "utility-2-bg": "#919EAB",
      "arrow-utility-bg": "#A8B0C1",
      "primary-font": "#000000",
      "secondary-font": "#222531",
      "tertary-font": "#656C7E",
      "star": "#ABB4C2",
      "pagination-font": "#0052FE",
      "utility-2-font": "#919EAB",
      "gap-up": "#16C784",
      "gap-down": "#EA3943",
    }
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#010101",
        secondary: "#f2f0ea",
        "yellow-light": "#edcf5d",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      transitionTimingFunction: {
        cubic: "cubic-bezier(0.645,0.045,0.355,1)",
      },
    },
  },
  plugins: [],
};

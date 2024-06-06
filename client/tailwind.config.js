/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#76ABAE",
        "dark":"#171616",
      },
      boxShadow: {
        'lg': "0px 4px 20px 5px #333131",
      },
      backgroundImage: {
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
       // primary: '#F5385D',
       primary: 'linear-gradient(to right, #33BBC5 0%, #614BC3 100%)',
      }
    },
  },
  plugins: [],
}


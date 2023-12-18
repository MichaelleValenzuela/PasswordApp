/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx.tsx}",
    //'./node_modules/vue-tailwind-datepicker/**/*.js'
    "./formkit.config.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "app": "url('/img/2.png')"
      }
    },
  },
  plugins: [],
}


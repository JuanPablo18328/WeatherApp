/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'backgroundMajor': "url('../public/paisaje-montanas.png')",
      }
    },
  },
  plugins: [],
}


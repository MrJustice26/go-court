module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "dark-graphite": "#1d1e1f",
        "graphite": "#262728"
      }
    }, 
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

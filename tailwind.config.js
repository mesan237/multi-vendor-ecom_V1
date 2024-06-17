import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Define custom colors
        components: {
          light: "rgb(55 65 81)",
          dark: "hsl(215deg 27.91% 16.86%)", // Same color for dark mode
        },
        page: {
          light: "hsl(220.91deg 39.29% 10.98%)",
          dark: "hsl(220.91deg 39.29% 10.98%)", // Same color for dark mode
        },
        txt: {
          light: "hsl(0deg 0% 97.25%)",
          dark: "hsl(0deg 0% 97.25%)", // Same color for dark mode
        },
      },
    },
  },

  plugins: [forms],
});

// components : hsl(215deg 27.91% 16.86%)
// background : hsl(220.91deg 39.29% 10.98%)
// text-color : hsl(0deg 0% 97.25%)

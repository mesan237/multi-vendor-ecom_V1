import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
const withMT = require("@material-tailwind/react/utils/withMT");

<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
=======
>>>>>>> 78f855a2e71d9f3660d1b33e2b24c82276a91b1f
module.exports = withMT({
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
<<<<<<< HEAD
  ],
  safelist: [
    "w-64",
    "w-1/2",
    "rounded-l-lg",
    "rounded-r-lg",
    "bg-gray-200",
    "grid-cols-4",
    "grid-cols-7",
    "h-6",
    "leading-6",
    "h-9",
    "leading-9",
    "shadow-lg",
    "bg-opacity-50",
    "dark:bg-opacity-80",
=======
>>>>>>> 78f855a2e71d9f3660d1b33e2b24c82276a91b1f
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

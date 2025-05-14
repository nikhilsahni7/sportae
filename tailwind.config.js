/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include paths to all component files
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};

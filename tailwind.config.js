/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Color Scheme
        'text': '#090401',
        'background': '#FFFCFA',
        'primary': '#159FF4',
        'secondary': '#D9D9D9',
        'accent': '#1E33D2',
        // Dark Mode Color Scheme
        'darkText': '#f6ede7',
        'darkBackground': '#070504',
        'darkPrimary': '#c4b1a6',
        'darkSecondary': '#2c696e',
        'darkAccent': '#fb7418'
       },
    },
  },
  plugins: [],
}


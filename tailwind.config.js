/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      mobile: '640px', // define o breakpoint "mobile"
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1536px',
    },
  },
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [],
}
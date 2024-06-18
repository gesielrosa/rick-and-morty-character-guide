/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Creepster"', 'system-ui', 'sans-serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        background: '#1F1F1F',
        foreground: '#0A0A0A',
        border: '#3D3D3D',
        turquoise: '#00B5CC',
        lizard: '#B2DF28',
      },
    },
  },
  plugins: [],
};

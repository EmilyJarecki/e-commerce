/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1400px'},
      // => @media (max-width: 1400px) { ... }

      'lg': {'max': '1000px'},
      // => @media (max-width: 1000px) { ... }

      'md': {'max': '730px'},
      // => @media (max-width: 730px) { ... }

      'sm': {'max': '500px'},
      // => @media (max-width: 500px) { ... }
    },

  },
  plugins: [
    
  ],
};

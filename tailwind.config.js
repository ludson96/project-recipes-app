/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f0fb',
          100: '#ebdff7',
          200: '#d9c2ef',
          300: '#be99e3',
          400: '#8958A3',
          500: '#41197F', // Primary GourmetLab Purple
          600: '#38156e',
          700: '#2f115c',
          800: '#260d4b',
          900: '#1b0936',
        },
        dark: {
          surface: '#12161a',
          card: '#1b2228',
          border: '#2a343d',
        }
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px -2px rgba(249, 115, 22, 0.08)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        spin: 'spin 1s linear infinite ',
        medium: 'spin 1.5s linear infinite ',
        slow: 'spin 2.5s linear infinite ',
        slide: 'slide 20s linear infinite',

      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')

  ]
}
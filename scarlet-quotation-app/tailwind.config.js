import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        scarletRed: '#C0392B',
        scarletDarkRed: '#922B21',
        scarletBlack: '#1A1A1A',
        scarletBg: '#FAFAFA',
        scarletGray: '#E8E8E8',
      },
    },
  },
  plugins: [forms],
}


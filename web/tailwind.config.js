const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: '#DC4F22',
        'primary-dark': '#C83000',
        secondary: '#FFC940',
        accent: '#222222',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
        mono: ['Courier New', 'Monaco', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

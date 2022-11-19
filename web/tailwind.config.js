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
        background: '#FFFDFA',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['var(--font-serif)', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'Courier New', 'Monaco', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.5rem', '0.75rem'],
      },
    },
  },
  plugins: [],
};

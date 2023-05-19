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
        // primary: '#DC4F22', // Original from Figma; too washed out
        primary: '#df3700',
        'primary-dark': '#C83000',
        secondary: '#FFC940',
        accent: '#222222',
        background: '#FFFDFA',
        'gray-450': '#89909c',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['var(--font-serif)', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'Courier New', 'Monaco', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        sm: ['0.85rem', '1.25rem'],
        xs: ['0.7rem', '0.9rem'],
        '2xs': ['0.5rem', '0.75rem'],
      },
      translate: {
        '1/2-star': 'calc(50% - 0.5rem)',
      },
    },
  },
  plugins: [],
};

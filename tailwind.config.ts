// 📁 frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';
import { slate, indigo, amber, green } from 'tailwindcss/colors';

const config: Config = {
  darkMode: 'class', // ✅ Enable dark mode using class strategy
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: indigo,
        accent: amber,
        success: green,
        background: slate[50],
        foreground: slate[900],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Clash Display', 'ui-serif', 'Georgia'],
      },
      boxShadow: {
        soft: '0 4px 14px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;

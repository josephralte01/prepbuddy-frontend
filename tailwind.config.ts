// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        prep: {
          primary: '#0077E6',
          secondary: '#5BB5FF',
          accent: '#F5A623',
          dark: '#123B63',
          light: '#F8F9FC'
        }
      }
    }
  },
  plugins: []
}

export default config

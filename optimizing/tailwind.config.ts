import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1da1f2',
        'secondary': '#14171a',
      },
      spacing: {
        '128':'32rem',
        '144':'36rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        antonio: ['var(--font-antonio)'],
        cooper: ['var(--cooper-font)'],
        ibm: ['var(--font-ibm-sans)'],
        passt: ['var(--font-press-start)'],
      }
    },
  },
  plugins: [],
}
export default config

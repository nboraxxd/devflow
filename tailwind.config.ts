import { type PluginAPI } from 'tailwindcss/types/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        primary: {
          700: '#FF2121',
          500: '#FF7000',
          300: '#E2995F',
          100: '#FEF1E6',
        },
        dark: {
          100: '#000000',
          200: '#0F1117',
          300: '#151821',
          400: '#212734',
          500: '#3F4354',
        },
        light: {
          900: '#FFFFFF',
          850: '#FDFDFD',
          800: '#F4F6F8',
          700: '#DCE3F1',
          600: '#C8D0E0',
          500: '#7B8EC8',
          400: '#858EAD',
        },
        'accent-blue': '#1DA1F2',
        'light-b': 'rgba(200, 203, 217, 0.33)',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        spaceGrotesk: ['var(--font-spaceGrotesk)'],
      },
      boxShadow: {
        'light-100':
          '0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)',
        'light-200': '-10px 10px 20px 0px rgba(218, 213, 213, 0.10)',
        'light-300': '10px 10px 20px 0px rgba(218, 213, 213, 0.10)',
        'light-header': '10px 10px 20px 0px rgba(218, 213, 213, 0.19)',
        'dark-100': '0px 2px 10px 0px rgba(46, 52, 56, 0.10)',
        'dark-200': '2px 0px 20px 0px rgba(39, 36, 36, 0.04)',
      },
      backgroundImage: {
        'auth-dark': "url('/assets/images/auth-dark.png')",
        'auth-light': "url('/assets/images/auth-light.png')",
      },
      screens: {
        xs: '420px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), addVariablesForColors],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: PluginAPI) {
  const allColors = flattenColorPalette(theme('colors')) as Record<string, string>

  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ':root': newVars,
  })
}

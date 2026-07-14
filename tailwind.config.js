/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Outfit', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Core brand palette
        carbon: {
          950: '#050507',
          900: '#0a0b0f',
          850: '#0d0f14',
          800: '#111318',
          750: '#14161d',
          700: '#181b22',
          650: '#1c1f28',
          600: '#20242e',
          550: '#252934',
        },
        slate: {
          ...require('tailwindcss/colors').slate,
        },
        // Terminal green
        neon: {
          50:  '#e8fff2',
          100: '#c6ffe0',
          200: '#89ffbf',
          300: '#3dff93',
          400: '#00e85c',
          500: '#00c94d',
          600: '#00a33d',
          700: '#008030',
          800: '#005e21',
          900: '#003d15',
        },
        // Vivid blue
        signal: {
          50:  '#e8f4ff',
          100: '#c7e4ff',
          200: '#8fccff',
          300: '#3db0ff',
          400: '#0094ff',
          500: '#0079e0',
          600: '#005eb8',
          700: '#004590',
          800: '#002e6a',
          900: '#001845',
        },
        // Amber for warnings
        amber: {
          ...require('tailwindcss/colors').amber,
        },
        // Red for errors/alerts
        danger: {
          400: '#ff4d6d',
          500: '#e5173a',
          600: '#c01030',
        },
        // Indigo-violet secondary accent
        violet: {
          50:  '#f3f1ff',
          100: '#e9e5ff',
          200: '#d4ccff',
          300: '#b4a9ff',
          400: '#7c6aff',
          500: '#6652f5',
          600: '#5540e0',
          700: '#4330be',
          800: '#38289a',
          900: '#2e2278',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-end infinite',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-in': 'fadeIn 0.25s ease-out',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',     opacity: '1' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px 1px rgba(0,232,92,0.25)' },
          '50%':       { boxShadow: '0 0 20px 4px rgba(0,232,92,0.55)' },
        },
      },
      boxShadow: {
        'glow-neon':   '0 0 16px 2px rgba(0,232,92,0.35)',
        'glow-signal': '0 0 16px 2px rgba(0,148,255,0.35)',
        'inner-sm': 'inset 0 1px 4px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}

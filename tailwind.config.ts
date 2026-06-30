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
        chery: {
          red: '#C41E3A',
          'red-dark': '#A01830',
          'red-light': '#E84A5F',
          navy: '#0A0A1A',
          'navy-2': '#12122A',
          charcoal: '#1E1E2E',
          cream: '#F8F6F3',
          gold: '#D4AF37',
          'gold-dim': '#B8962E',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#0A0A1A',
          muted: '#F5F5F7',
          border: '#E8E8ED',
        },
        text: {
          primary: '#1A1A2E',
          secondary: '#6B6B80',
          muted: '#A0A0B0',
          inverse: '#FFFFFF',
        },
        semantic: {
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#DC2626',
          info: '#2563EB',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['96px', { lineHeight: '1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-l': ['72px', { lineHeight: '1.05', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h1': ['56px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h2': ['40px', { lineHeight: '1.15', fontWeight: '700' }],
        'h3': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h4': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'body-l': ['20px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-s': ['14px', { lineHeight: '1.5' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
        '128': '128px',
      },
      borderRadius: {
        'button': '8px',
        'card': '16px',
        'modal': '24px',
        'input': '10px',
        'media': '12px',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(10,10,26,0.08)',
        'card-hover': '0 20px 40px rgba(10,10,26,0.12)',
        'cta': '0 8px 32px rgba(196,30,58,0.35)',
        'navbar': '0 4px 20px rgba(10,10,26,0.08)',
        'modal': '0 40px 80px rgba(10,10,26,0.25)',
        'elevated': '0 12px 40px rgba(10,10,26,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'slide-left': 'slideLeft 0.4s ease-out forwards',
        'slide-right': 'slideRight 0.4s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
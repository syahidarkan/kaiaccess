/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // KAI Access Premium Color Palette - BookingToGo Inspired
        kai: {
          primary: '#0052CC',
          'primary-dark': '#003D99',
          'primary-light': '#0065FF',

          secondary: '#FF6B35',
          'secondary-dark': '#E85A28',
          'secondary-light': '#FF8C5C',

          purple: '#6B4CE6',
          'purple-dark': '#5538D1',
          'purple-light': '#8B6FF0',

          orange: '#FF6B35',
          'orange-dark': '#E85A28',
          'orange-light': '#FF8C5C',

          grey: {
            50: '#FAFBFC',
            100: '#F4F5F7',
            200: '#EBECF0',
            300: '#DFE1E6',
            400: '#B3B9C4',
            500: '#8993A4',
            600: '#6B778C',
            700: '#505F79',
            800: '#334155',
            900: '#172B4D',
          },

          blue: {
            50: '#E9F2FF',
            100: '#CCE0FF',
            200: '#99C2FF',
            300: '#66A3FF',
            400: '#3385FF',
            500: '#0052CC',
            600: '#0043A8',
            700: '#003585',
            800: '#002861',
            900: '#001A3D',
          },

          accent: {
            gold: '#FFB020',
            teal: '#00C7B7',
            purple: '#6B4CE6',
            pink: '#FF5793',
          }
        },
        success: '#00875A',
        warning: '#FFAB00',
        error: '#DE350B',
        info: '#0052CC',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'float': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'inner-light': 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.04)',
        'premium': '0 16px 48px rgba(0, 82, 204, 0.12)',
        'glow': '0 0 24px rgba(0, 82, 204, 0.2)',
        'kai': '0 4px 16px rgba(0, 82, 204, 0.1)',
        'soft': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'large': '0 12px 32px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      backgroundImage: {
        'kai-gradient': 'linear-gradient(135deg, #0052CC 0%, #0065FF 100%)',
        'kai-header': 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
        'kai-premium': 'linear-gradient(135deg, #0052CC 0%, #6B4CE6 100%)',
        'kai-sunset': 'linear-gradient(135deg, #FF6B35 0%, #FFB020 100%)',
        'kai-modern': 'linear-gradient(135deg, #00C7B7 0%, #0052CC 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

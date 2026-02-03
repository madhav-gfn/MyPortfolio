/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#000000',
          600: '#1a1a1a',
          700: '#333333',
        },
        accent: {
          500: '#ffffff',
          600: '#f5f5f5',
          700: '#e5e5e5',
        },
        dark: {
          900: '#000000',
          800: '#0a0a0a',
          700: '#1a1a1a',
          600: '#2a2a2a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(255, 0, 0, 0.3)',
        'glow-accent': '0 0 20px rgba(255, 0, 0, 0.2)',
        'glow-lg': '0 0 40px rgba(255, 0, 0, 0.3)',
        'glow-xl': '0 0 60px rgba(255, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(255, 0, 0, 0.8)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
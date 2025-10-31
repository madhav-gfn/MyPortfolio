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
          500: '#7C5CFF',
          600: '#6B46FF',
          700: '#5A3BDB',
        },
        accent: {
          500: '#00E0A1',
          600: '#00C78A',
          700: '#00AD73',
        },
        dark: {
          900: '#0D1117',
          800: '#161B22',
          700: '#21262D',
          600: '#30363D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(124, 92, 255, 0.5)',
        'glow-accent': '0 0 20px rgba(0, 224, 161, 0.5)',
        'glow-lg': '0 0 40px rgba(124, 92, 255, 0.3)',
        'glow-xl': '0 0 60px rgba(124, 92, 255, 0.2)',
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
          'from': { boxShadow: '0 0 20px rgba(124, 92, 255, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(124, 92, 255, 0.8)' },
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
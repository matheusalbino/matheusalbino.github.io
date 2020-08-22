const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.css'],
  corePlugins: {
    container: false
  },
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      colors: {
        primary: {
          default: '#23263A',
          dark: '#1E2031',
          darkest: '#191B29'
        },
        secondary: '#FFFFFF',
        highlight: {
          default: '#4fd1c5',
          dark: '#32C3B4',
          darkest: '#2AA296'
        }
      }
    }
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      const container = {
        '.container': {
          maxWidth: theme('screens.xl'),
          margin: '0 auto'
        }
      };

      const containerMediaQueries = {
        [`@media (max-width: ${theme('screens.xl')})`]: {
          '.container': {
            padding: `0 ${theme('padding.4')}`
          }
        }
      };

      addComponents([container, containerMediaQueries]);
    })
  ],
  future: {
    removeDeprecatedGapUtilities: true
  }
};

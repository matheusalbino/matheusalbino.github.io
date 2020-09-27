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
          default: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          darkest: 'var(--color-primary-darkest)'
        },
        secondary: 'var(--color-secondary)',
        highlight: {
          default: 'var(--color-highlight)',
          dark: 'var(--color-highlight-dark)',
          darkest: 'var(--color-highlight-darkest)'
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
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
};

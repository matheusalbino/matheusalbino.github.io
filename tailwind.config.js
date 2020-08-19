module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.css'],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        primary: '#23263A',
        secondary: '#FFFFFF',
        highlight: '#4fd1c5'
      }
    }
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true
  }
};

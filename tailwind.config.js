module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.css'],
  theme: {
    extend: {
      animation: {
        'spin-20': 'spin 20s linear infinite',
      }
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [],
}

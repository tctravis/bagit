/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    colors: {
      white: {
        default: '#ffffff',
      },
      lightgrey: {
        default: '#eeeeee',
      },
      grey: {
        default: '#cccccc',
      },
      darkgrey: {
        default: '#333333',
      },
      fareastern: {
        default: '#DA0808',
      },
      eastern: {
        default: '#82C606',
      },
      central: {
        default: '#0888DC',
      },
      southern: {
        default: '#F56C0A',
      },
      northern: {
        default: '#9D2C19',
      },
      northwestern: {
        default: '#F5D201',
      },
      western: {
        default: '#099D0D',
      },
      error: 'red'
    },
    screens: {
      xsm: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    opacity: ['disabled'],
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
    options: {
      whitelistPatterns: [
        /-eastern$/,
        /-northern$/,
        /-northwestern$/,
        /-southern$/,
        /-western$/,
        /-fareastern$/,
        /-central$/,
      ],
    },
  },
}

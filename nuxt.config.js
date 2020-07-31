export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/_site.scss', '@/assets/css/partials/_icons.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/filters.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    [
      'nuxt-global-base-components',
      {
        componentsPath: '~/components',
        recursive: false,
        regex: /^(\.\/.*)*Base[A-Z].+\.(vue|jsx?)$/,
      },
    ],
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['faMountain'],
          },
        ],
      },
    ],
    'nuxt-webfontloader',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.BAGIT_FIREBASE_API_KEY,
          authDomain: process.env.BAGIT_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.BAGIT_FIREBASE_DATABASE_URL,
          projectId: process.env.BAGIT_FIREBASE_PROJECT_ID,
          storageBucket: process.env.BAGIT_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.BAGIT_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.BAGIT_FIREBASE_APP_ID,
          measurementId: process.env.BAGIT_FIREBASE_MEASUREMENT_ID,
        },
        services: {
          firestore: true,
          // https://firebase.nuxtjs.org/guide/options/#auth
          auth: {
            initialize: {
              // onAuthStateChangedMutation:
              //   'users/ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'users/onAuthStateChangedAction',
            },
          },
        },
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  webfontloader: {
    google: {
      families: ['Itim'],
    },
  },
  loading: {
    color: 'black',
    throttle: 0,
  },
  generate: {
    fallback: true,
  },
  env: {
    currentUserId: process.env.CURRENT_USER_ID,
  },
  router: {
    middleware: ['hills', 'user'],
  },
}

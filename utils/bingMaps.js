// import Vue from 'vue'

// import VueBingMaps from 'vue-bing-maps'

// // Default configuration
// // Vue.use(VueBingMaps)
// Vue.use(VueBingMaps, {
//   debug: true,
// })

//const API_KEY = 'AIzaSyCWAaBJsI1234TI18PITVy7p0Qb6ht123';
const API_KEY = process.env.bingMapsApiKey
const CALLBACK_NAME = 'bingMapsCallback'

let initialized = !!window.microsoft
let resolveInitPromise
let rejectInitPromise
// This promise handles the initialization
// status of the google maps script.
const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve
  rejectInitPromise = reject
})

export default function init() {
  // If Google Maps already is initialized
  // the `initPromise` should get resolved
  // eventually.
  if (initialized) return initPromise

  initialized = true
  // The callback function is called by
  // the Google Maps script if it is
  // successfully loaded.

  window[CALLBACK_NAME] = () => resolveInitPromise(window.Microsoft)

  // We inject a new script tag into
  // the `<head>` of our HTML to load
  // the Google Maps script.
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = `https://www.bing.com/api/maps/mapcontrol?key=${API_KEY}&callback=${CALLBACK_NAME}`
  script.onerror = rejectInitPromise
  document.querySelector('head').appendChild(script)

  return initPromise
}

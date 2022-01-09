// see https://github.com/xkjyeah/vue-google-maps/issues/563
export const bingMapsInit = new Promise((resolve, reject) => {
  const API_KEY = process.env.bingMapsApiKey
  const CALLBACK_NAME = 'bingMapsCallback'

  if (process.client) {
    window[CALLBACK_NAME] = resolve

    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=${API_KEY}&callback=${CALLBACK_NAME}`
    script.onerror = reject
    document.querySelector('head').appendChild(script)
  }
})

import Vue from 'vue'

Vue.filter('capitalize', (val) => val.toUpperCase())

Vue.filter('lowercase', (val) => val.toLowerCase())

Vue.filter('kebabCase', (val) =>
  val
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
)

Vue.filter('camelCase', (val) =>
  val
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
      idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()
    )
    .replace(/\s+/g, '')
)

Vue.filter('removeSpaces', (val) => val.replace(/\s/g, ''))

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  const utilities = {
    getThemeColor(cssCustomPropName) {
      const themeColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--${cssCustomPropName}`)
      return themeColor
    },
  }
  inject('utilities', utilities)
}

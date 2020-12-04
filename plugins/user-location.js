const userLocation = {
    userLoc: false,
    getUserLoc() {
        if (window.navigator.geolocation) {
            // console.log('here')
            return window.navigator.geolocation
                .getCurrentPosition(this.userLocSuccess, this.userLocError)
        } else {
            return false
        }
    },
    userLocSuccess(position) {
        console.log('success')
        return 'success'
    },
    userLocError() {
        console.log('error')
        return 'error'
    },
}

export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('userLocation', userLocation)
}
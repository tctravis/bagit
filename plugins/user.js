/* eslint-disable */
export default function ({
    $fire.auth,
    route,
    redirect,
    store
  }) {
    if (
      $fire.auth.currentUser === null
    ) {
      if (
        route.name === 'user-edit-profile') {
        return redirect('/')
      }
    } else {
      return store.dispatch('users/fetchUser', $fire.auth.currentUser.uid)
    }
  }
/* eslint-disable */
export default function ({
    $fireAuth,
    route,
    redirect,
    store
  }) {
    if (
      $fireAuth.currentUser === null
    ) {
      if (
        route.name === 'user-edit-profile') {
        return redirect('/')
      }
    } else {
      return store.dispatch('users/fetchUser', $fireAuth.currentUser.uid)
    }
  }
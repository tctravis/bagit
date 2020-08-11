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
      route.path !== '/' &&
      route.name !== 'hills-list' &&
      route.name !== 'hills-id' &&
      route.name !== 'user-login' &&
      route.name !== 'user-register') {
      return redirect('/')
    }
  } else {
    return store.dispatch('users/fetchUser', $fireAuth.currentUser.uid)
  }
}

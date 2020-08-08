/* eslint-disable */
export default function ({
  $fireAuth,
  route,
  redirect,
  store
}) {
  if (
    $fireAuth.currentUser === null &&
    route.name !== 'user-login' &&
    route.name !== 'user-register'
  ) {
    return redirect('/user/login')
  } else {
    return store.dispatch('users/fetchUser', $fireAuth.currentUser.uid)
  }
}

/* eslint-disable */
export default function ({
  $fire,
  route,
  redirect,
  store
}) {
  if (
    $fire.auth.currentUser === null
  ) {
    if (
      route.name === 'user-edit-profile' || route.name === 'user-stats') {
      return redirect('/')
    }
  } else {
    return store.dispatch('users/fetchUser', $fire.auth.currentUser.uid)
  }
}

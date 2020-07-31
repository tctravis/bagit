export default function ({ $fireAuth, route, redirect }) {
  if (
    $fireAuth.currentUser === null &&
    route.name !== 'user-login' &&
    route.name !== 'user-register'
  ) {
    return redirect('/user/login')
  }
}

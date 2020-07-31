export default function ({ $fireAuth, route, redirect }) {
  if ($fireAuth.currentUser === null && route.name !== 'user-login') {
    return redirect('/user/login')
  }
}

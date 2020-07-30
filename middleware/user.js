export default function (context) {
  return context.store.dispatch('users/fetchUser', context.env.currentUserId)
}

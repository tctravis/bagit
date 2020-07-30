export default function (context) {
  return context.store.dispatch('hills/fetchHills')
}

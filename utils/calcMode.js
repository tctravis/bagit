export default function calcMode(a) {
  return Object.values(
    a.reduce((count, e) => {
      if (!(e in count)) {
        count[e] = [0, e]
      }

      count[e][0]++
      return count
    }, {})
  ).reduce((a, v) => (v[0] < a[0] ? a : v), [0, null])[1]
}

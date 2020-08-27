export default function calcDistance(loc1, loc2) {
  const R = 6371e3 // metres
  const φ1 = (loc1.lat * Math.PI) / 180 // φ, λ in radians
  const φ2 = (loc2.lat * Math.PI) / 180
  const Δφ = ((loc2.lat - loc1.lat) * Math.PI) / 180
  const Δλ = ((loc2.lon - loc1.lon) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const d = R * c // in metres
  return Math.round(d)
}

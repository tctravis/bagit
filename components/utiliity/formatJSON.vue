<template>
  <div class="text-white">
    <h1>Hills</h1>
    <pre>{{ hillsJSON | pretty }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  filters: {
    pretty: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2)
    },
  },
  computed: {
    ...mapGetters('hills', ['getHills']),
    hills() {
      let hills = [...this.getHills]
      return hills
    },
    hillsJSON() {
      return JSON.stringify(this.reformatHills)
    },
    reformatHills() {
      let reformatHills = []
      this.hills.forEach((hill) => {
        let newId = this.getHillId(hill)
        let reformatHill = {
          os_map: hill.os_map.toString(),
          lng: hill.lng.toString(),
          height_ft: hill.height_ft.toString(),
          name: hill.name.toString(),
          area: hill.area.toString(),
          prom_ft: hill.prom_ft.toString(),
          prom_m: hill.prom_m.toString(),
          os_grid_ref: hill.os_grid_ref.toString(),
          height_m: hill.height_m.toString(),
          id: newId,
          lat: hill.lat.toString(),
        }
        reformatHills.push(reformatHill)
      })
      return reformatHills
    },
  },
  methods: {
    getHillId(hill) {
      let newHillId = null
      const height = hill.height_m

      const hillNames = hill.name.split(' ')
      let initials = ''
      hillNames.forEach((hillName) => {
        if (hillName.charAt(0) !== '(') {
          initials += hillName.charAt(0)
        }
      })
      newHillId = initials + height

      return newHillId
    },
  },
}
</script>

<style lang="scss" scoped></style>

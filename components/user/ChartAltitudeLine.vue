<template>
  <div>
    <LineChart :chart-data="chartData"></LineChart>
  </div>
</template>

<script>
import { theme } from '~tailwind.config'
import LineChart from '@/components/charts/LineChart.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    LineChart,
  },
  props: {
    bags: {
      Type: Array,
      required: true,
    },
  },
  computed: {
    chartData() {
      let bagLabels = this.bags.map(function (bag) {
        return bag.name
      })
      let bagAltitudes = this.bags.map(function (bag) {
        return bag.height_m
      })

      let data = {
        labels: bagLabels,
        datasets: [
          {
            label: 'Altitude climbed',
            data: bagAltitudes,
          },
        ],
        options: {},
      }
      return data
    },
  },
}
</script>

<style lang="scss" scoped></style>

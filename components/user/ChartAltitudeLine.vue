<template>
  <div>
    <LineChart :chartData="chartData"></LineChart>
  </div>
</template>

<script>
import { theme } from '~tailwind.config'
import LineChart from '@/components/charts/LineChart.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    bags: {
      Type: Array,
      required: true,
    },
  },
  components: {
    LineChart,
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
    ...mapGetters('hills', ['getHills']),
  },
}
</script>

<style lang="scss" scoped></style>

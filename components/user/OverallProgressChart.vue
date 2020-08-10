<template>
  <div>
    <PieChart :chartData="chartData"></PieChart>
  </div>
</template>

<script>
import { theme } from '~tailwind.config'
import PieChart from '@/components/charts/PieChart.vue'
import { mapGetters } from 'vuex'
export default {
  props: {
    bags: {
      Type: Array,
      required: true,
    },
  },
  components: {
    PieChart,
  },
  computed: {
    chartData() {
      let totalBags = this.bags.length
      let totalUnclimbed = this.getTotalHills - totalBags

      let data = {
        datasets: [
          {
            label: 'Wainwrights Bagged',
            data: [totalBags, totalUnclimbed],
            backgroundColor: [
              theme.colors.western.default,
              theme.colors.grey.default,
            ],
            hoverBackgroundColor: [
              theme.colors.central.default,
              theme.colors.lightgrey.default,
            ],
          },
        ],
        labels: [totalBags + ' bags', totalUnclimbed + ' to bag'],
        options: {
          cutoutPercentage: 20,
          legend: {
            labels: {
              fontColor: 'red',
            },
          },
        },
      }
      return data
    },
    ...mapGetters('hills', ['getTotalHills']),
  },
}
</script>

<style lang="scss" scoped></style>

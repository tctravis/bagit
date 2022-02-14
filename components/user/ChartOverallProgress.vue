<template>
  <div>
    <ChartsPieChart :chart-data="chartData"></ChartsPieChart>
  </div>
</template>

<script>
import { theme } from '~tailwind.config'
import { mapGetters } from 'vuex'

export default {
  props: {
    bags: {
      Type: Array,
      required: true,
    },
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
              theme.colors.western.DEFAULT,
              theme.colors.grey.DEFAULT,
            ],
            hoverBackgroundColor: [
              theme.colors.central.DEFAULT,
              theme.colors.lightgrey.DEFAULT,
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

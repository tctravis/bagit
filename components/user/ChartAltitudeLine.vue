<template>
  <ChartContainer>
    <template #title>Altitude</template>
    <template #tooltip>
      <TooltipInfo>
        <BaseParagraph>
          'Altitude bagged' is calculated using the prominence (rather than the
          altitude) of all the Wainwrights you have bagged.
        </BaseParagraph>
      </TooltipInfo></template
    >
    <template #chart><LineChart :chart-data="chartData"></LineChart></template>
  </ChartContainer>
</template>

<script>
// import { theme } from '~tailwind.config'
import LineChart from '@/components/charts/LineChart.vue'
import { mapState } from 'vuex'
export default {
  components: {
    LineChart,
  },
  computed: {
    ...mapState({
      userBags: (state) => state.users.user.bags,
    }),
    sortedBags() {
      let sortedBags = [...this.userBags]
      return sortedBags.sort((a, b) => {
        if (a.date < b.date) return -1
        if (a.date > b.date) return 1
        return 0
      })
    },
    chartData() {
      let bagLabels = this.sortedBags.map(function (bag) {
        return bag.name
      })
      let bagAltitudes = this.sortedBags.map(function (bag) {
        return bag.height_m
      })

      let data = {
        labels: bagLabels,
        datasets: [
          {
            label: 'Altitude climbed',
            data: bagAltitudes,
            backgroundColor: 'rgba(9, 157, 13, 0.2)',
            borderColor: 'rgba(9, 157, 13, 1)',
          },
        ],
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 500,
                  suggestedMax: 1000,
                },
              },
            ],
          },
        },
      }
      return data
    },
  },
}
</script>

<style lang="scss" scoped></style>

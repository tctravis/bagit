<template>
  <ChartsChartContainer>
    <template #title>Altitude</template>
    <template #tooltip>
      <WidgetsTooltipInfo>
        <BaseParagraph>
          'Altitude bagged' is calculated using the prominence (rather than the
          altitude) of all the Wainwrights you have bagged.
        </BaseParagraph>
      </WidgetsTooltipInfo></template
    >
    <template #chart><ChartsLineChart :chart-data="chartData" /></template>
  </ChartsChartContainer>
</template>

<script>
import { mapState } from 'vuex'

export default {
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

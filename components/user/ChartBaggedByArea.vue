<template>
  <ChartsChartContainer>
    <template #title>Bagged by area</template>
    <template #chart
      ><ChartsChart chart-type="bar" :chart-data="chartData"
    /></template>
  </ChartsChartContainer>
</template>

<script>
import { theme } from '~tailwind.config'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      hills: (state) => state.hills.hills,
      userBags: (state) => state.users.user.bags,
      areas: (state) => state.hills.areas,
    }),
    sortedAreas() {
      let areas = [...this.areas]
      return areas.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    },
    chartLabels() {
      let areaLabels = this.sortedAreas.map(function (area) {
        return area.name
      })
      return areaLabels
    },
    totalHillsInArea() {
      let hillsInAreaData = []
      this.sortedAreas.forEach((area) => {
        let hillsInArea = this.hills.filter((hill) => hill.area === area.id)
        hillsInAreaData.push(hillsInArea.length)
      })
      return hillsInAreaData
    },
    totalBagsInArea() {
      let bagsInAreaData = []
      this.sortedAreas.forEach((area) => {
        let bagsInArea = this.userBags.filter((bag) => bag.area === area.id)
        bagsInAreaData.push(bagsInArea.length)
      })
      return bagsInAreaData
    },
    areaColourThemes() {
      let areaThemeData = {
        bgColors: [],
      }
      this.sortedAreas.forEach((area) => {
        const areaColor = this.$utilities.getThemeColor(area.className)
        areaThemeData.bgColors.push(areaColor)
      })
      return areaThemeData
    },
    chartData() {
      const defaultChartColor = this.$utilities.getThemeColor('grey')
      let data = {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Total hills',
            data: this.totalHillsInArea,
            backgroundColor: defaultChartColor,
          },
          {
            label: 'Total bags',
            data: this.totalBagsInArea,
            backgroundColor: this.areaColourThemes.bgColors,
          },
        ],
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          elements: {
            rectangle: {
              borderWidth: 2,
            },
          },
          title: {
            display: false,
            text: 'Bagged by area',
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
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

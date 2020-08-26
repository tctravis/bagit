<template>
  <Chart chart-type="bar" :chart-data="chartData" />
</template>

<script>
import { theme } from '~tailwind.config'
import Chart from '@/components/charts/Chart.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    Chart,
  },
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
        console.log('bags in area ', bagsInArea)
        bagsInAreaData.push(bagsInArea.length)
      })
      return bagsInAreaData
    },
    areaColourThemes() {
      let areaThemeData = {
        bgColors: [],
      }
      this.sortedAreas.forEach((area) => {
        areaThemeData.bgColors.push(theme.colors[area.className].default)
      })
      return areaThemeData
    },
    chartData() {
      let data = {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Total hills',
            data: this.totalHillsInArea,
            backgroundColor: theme.colors.grey.default,
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

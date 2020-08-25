<template>
  <div class="max-w-4xl">
    <canvas ref="lineChart" width="200" height="140"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: {
    chartData: Object,
  },
  data: function () {
    return {
      myChart: null,
    }
  },
  watch: {
    chartData() {
      this.myChart.update()
    },
  },
  mounted() {
    let chartEl = this.$refs.lineChart
    // eslint-disable-next-line
    this.myChart = new Chart(chartEl, {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets,
      },
      options: this.chartData.options,
    })
  },
}
</script>

<style lang="scss" scoped></style>

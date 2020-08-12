<template>
  <div class="max-w-4xl">
    <canvas width="200" height="200" ref="lineChart"></canvas>
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
  watch: {
    chartData() {
      this.myChart.update()
    },
  },
}
</script>

<style lang="scss" scoped></style>

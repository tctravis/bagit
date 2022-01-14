<template>
  <div class="max-w-4xl">
    <canvas ref="lineChart" width="200" height="140"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      myChart: null,
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.myChart.data.labels = this.chartData.labels
        this.myChart.data.datasets = this.chartData.datasets
        this.myChart.update()
      },
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

<template>
  <div class="relative">
    <canvas :ref="chartId" class="h-56"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: {
    chartType: {
      type: String,
      required: true,
    },
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
  computed: {
    chartId() {
      return 'chart' + this._uid
    },
  },
  watch: {
    chartData() {
      this.myChart.update()
    },
  },
  mounted() {
    let chartEl = this.$refs[this.chartId]
    // eslint-disable-next-line
    this.myChart = new Chart(chartEl, {
      type: this.chartType,
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

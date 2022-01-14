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
    chartDatasets() {
      return this.chartData.datasets
    },
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
    this.initChart()
  },
  methods: {
    initChart() {
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
  },
}
</script>

<style lang="scss" scoped></style>

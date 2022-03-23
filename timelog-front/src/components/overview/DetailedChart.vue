<template>
  <div class="dashboard-card">
    <div class="mb-4">
    <el-select
      placeholder="Select Month"
      class="mx-2"
      v-model="selectedMonth"
      @change="handleSelection"
    >
      <el-option
        v-for="month in months"
        :key="month.label"
        :label="month.label"
        :value="month.value"
      >
        {{ month.label }}
      </el-option>
    </el-select></div>
    <apexchart
      :options="options"
      :series="series"
      :height="chartHeight"
    ></apexchart>
  </div>
</template>

<script>
import months from '@/utils/selection/months';
import getChartHeight from '@/utils/helpers/getChartHeight';

export default {
  name: 'DetailedChart',
  data() {
    return {
      months,
      selectedMonth: months[0].value,
      chartHeight: null,
      series: [],
      options: {
        chart: {
          type: 'bar',
          stacked: true,
          fontFamily: 'Fira Sans',
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        title: {
          text: 'Hours by author',
        },
        xaxis: {
          categories: [],
        },
        fill: {
          opacity: 1,
        },
      },
    };
  },
  async created() {
    this.chartHeight = getChartHeight(300, 400, 600);

    const chartData = await this.$store.dispatch('getTimePerAuthor');
    this.setChartData(chartData);
  },
  methods: {
    async handleSelection() {
      let data;
      if (this.selectedMonth === 'All') {
        data = await this.$store.dispatch('getTimePerAuthor');
      } else {
        data = await this.$store.dispatch(
          'getTimePerAuthor',
          this.selectedMonth
        );
      }
      this.setChartData(data);
    },
    setChartData(chartData) {
      this.series = chartData.globalData;
      this.options = {
        ...this.options,
        xaxis: {
          categories: chartData.projects,
        },
      };
    },
  },
};
</script>

<style></style>

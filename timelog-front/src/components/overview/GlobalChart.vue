<template>
  <div class="dashboard-card admin-chart">
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
      </el-select>
    </div>
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
  name: 'GlobalChart',
  data() {
    return {
      months,
      selectedMonth: months[0].value,
      chartHeight: null,
      options: {
        chart: {
          fontFamily: 'Fira Sans',
          type: 'bar',
        },
        title: {
          text: 'Hours by project',
        },
        plotOptions: {
          bar: {
            distributed: true,
            horizontal: true,
          },
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: '',
          data: [],
        },
      ],
    };
  },
  async created() {
    const data = await this.$store.dispatch('getTimePerProject');
    this.chartHeight = getChartHeight(300, 400, 600);

    this.setChartData(data);
  },
  methods: {
    async handleSelection() {
      let data;
      if (this.selectedMonth === 'All') {
        data = await this.$store.dispatch('getTimePerProject');
      } else {
        data = await this.$store.dispatch(
          'getTimePerProject',
          this.selectedMonth
        );
      }
      this.setChartData(data);
    },
    setChartData(data) {
      this.series[0].data = data.globalData;
      this.options = {
        ...this.options,
        xaxis: {
          categories: data.projects,
        },
      };
    },
  },
};
</script>

<style lang="scss"></style>

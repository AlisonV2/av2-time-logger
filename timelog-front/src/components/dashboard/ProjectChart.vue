<template>
  <div class="dashboard-card" v-if="showChart">
    <apexchart :options="options" :series="series"></apexchart>
  </div>
  <Placeholder v-else />
</template>

<script>
import Placeholder from '@/components/dashboard/Placeholder';

export default {
  name: 'ProjectChart',
  components: {
    Placeholder,
  },
  data() {
    return {
      showChart: false,
      options: {
        chart: {
          fontFamily: 'Fira Sans',
          type: 'bar',
        },
        title: {
          text: 'Hours by project (current month)',
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
    const data = await this.$store.dispatch('getUserTime');
    if (data.hours.length) {
      this.showChart = true;
    }
    this.series[0].data = data.hours;
    this.options = {
      ...this.options,
      xaxis: {
        categories: data.projects,
      },
    };
  },
};
</script>

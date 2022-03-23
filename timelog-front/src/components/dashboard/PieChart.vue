<template>
  <div class="dashboard-card" v-if="series.length">
    <apexchart type="pie" :options="options" :series="series"></apexchart>
  </div>
  <Placeholder v-else />
</template>

<script>
import Placeholder from '@/components/dashboard/Placeholder';

export default {
  name: 'PieChart',
  components: {
    Placeholder,
  },
  data() {
    return {
      series: [],
      options: {
        chart: {
          type: 'pie',
          fontFamily: 'Fira Sans',
        },
        title: {
          text: 'Time logged (current month)',
        },
        labels: [],
      },
    };
  },
  async created() {
    const data = await this.$store.dispatch('getUserTime');
    console.log(data)

    this.series = data.hours;
    this.options = {
      ...this.options,
      labels: data.projects,
    };
  },
};
</script>

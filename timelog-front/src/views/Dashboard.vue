<template>
  <div class="row mt-4">
    <div class="col-12 col-lg-6 mb-4">
      <ProjectChart v-if="showCharts"/>
    </div>
    <div class="col-12 col-lg-6 mb-4">
      <PieChart v-if="showCharts"/>
    </div>
    <div class="col-12 mt-4">
      <AuthorTable @tableUpdated="updateCharts"/>
    </div>
  </div>
</template>

<script>
import ProjectChart from '@/components/dashboard/ProjectChart';
import PieChart from '@/components/dashboard/PieChart';
import AuthorTable from '@/components/dashboard/AuthorTable';

export default {
  name: 'Dashboard',
  components: {
    PieChart,
    AuthorTable,
    ProjectChart,
  },
  data() {
    return {
      showCharts: true,
    }
  },
  methods: {
    updateCharts() {
      this.showCharts = false;
      this.$nextTick(() => {
        this.showCharts = true;
      })
    }
  }
};
</script>

<style></style>

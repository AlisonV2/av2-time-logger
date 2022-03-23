<template>
  <div class="row mt-4">
    <div class="col-12">
      <div class="nav-tabs">
        <p
          class="mx-4"
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[activeTab === tab ? 'is-active' : '']"
        >
          {{ tab }}
        </p>
      </div>
    </div>
    <div class="col-12 mt-4" v-if="activeTab === 'Time per project'">
      <GlobalChart />
    </div>
    <div class="col-12 mt-4" v-if="activeTab === 'Time per author'">
      <DetailedChart />
    </div>
    <div class="col-12 mt-4" v-if="activeTab === 'Global'">
      <DataTable />
    </div>
  </div>
</template>

<script>
import GlobalChart from '@/components/overview/GlobalChart';
import DetailedChart from '@/components/overview/DetailedChart';
import DataTable from '@/components/overview/DataTable';

export default {
  name: 'Global',
  components: {
    DetailedChart,
    DataTable,
    GlobalChart,
  },
  data() {
    return {
      tabs: ['Global', 'Time per project', 'Time per author'],
      activeTab: 'Global',
    };
  },
};
</script>

<style lang="scss">
.nav-tabs {
  display: flex;
  border-bottom: 2px solid #dee2e6;
  p {
    margin-bottom: 0.5rem;
    cursor: pointer;
    font-family: $accent-font;
    font-weight: 500;
    &.is-active {
      color: $primary;
    }
  }
}
</style>

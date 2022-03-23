<template>
  <div class="dashboard-card text-center">
    <p>Sorry, no logs yet !</p>
    <div class="btn-center mb-4">
      <router-link :to="{ name: 'Logger' }"
        ><el-button>Add some logs</el-button></router-link
      >
    </div>
    <img
      class="img-fluid"
      :src="require('@/assets/img/summer-holidays.png')"
      alt=""
      v-if="type === 'holidays'"
    />
    <img
      class="img-fluid"
      :src="require('@/assets/img/sun-umbrella.png')"
      alt=""
      v-if="type === 'sun'"
    />
  </div>
</template>

<script>
export default {
  name: 'Placeholder',
  props: ['type'],
};
</script>

<style lang="scss" scoped>
.dashboard-card {
  img {
    max-height: 250px;
  }
}
</style>

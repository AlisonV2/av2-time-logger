<template>
  <Navbar />
  <div class="container admin-container">
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/nav/Navbar';

export default {
  name: 'Admin',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
.admin-container {
  padding-bottom: 3rem;
  min-height: 70vh;
}
</style>

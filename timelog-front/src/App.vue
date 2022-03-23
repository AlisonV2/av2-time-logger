<template>
  <router-view />
  <Footer />
</template>

<script>
import Footer from '@/components/nav/Footer'
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Footer
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
  },
  created() {
    this.$store.dispatch('initLogin');
  },
};
</script>

<style>
</style>

<template>
  <div class="container">
    <div class="row auth-row">
      <div class="col-12 col-xl-6">
        <img class="img-fluid home-img" :src="require('@/assets/img/logo.png')" />
      </div>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm';

export default {
  name: 'Home',
  components: {
    LoginForm
  },
};
</script>

<style lang="scss">
  .auth-row {
    min-height: 80vh;
    img {
      max-width: 25%;
      margin: 1rem 0.5rem;
    }
  }

@include bp-up(xl) {
.auth-row {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  img {
    max-width: 90%;
  }
}
}
</style>

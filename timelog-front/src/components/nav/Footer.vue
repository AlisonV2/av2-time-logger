<template>
  <footer class="container-fluid">
    <p>
      &copy; {{ year }} <a href="https://weloop.org" target="_blank">WeLOOP</a>
    </p>
    <p class="footer-small">
      WeLOOP S.A.R.L. - Rue du Bourg 254, 59130 Lambersart - info@weloop.org -
      T.V.A.: FR 90830184420
    </p>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss">
footer {
  font-family: $default-font;
  font-size: 16px;
  margin-top: 2rem;
  padding: 1rem 0rem;
  text-align: center;
  box-shadow: 0px -4px 3px rgba(0 0 0 / 8%);
  p {
    margin-bottom: 0;
    a {
      text-decoration: none;
      color: $default;
      &:hover {
        color: $primary;
      }
    }
  }
  .footer-small {
    font-size: 14px;
  }
}
</style>

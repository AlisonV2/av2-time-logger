<template>
  <footer>
    <p class="footer-small">
      &copy; {{ year }}
      <a href="https://alisonvandromme.com" target="_blank">Alison Vandromme</a>
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
  margin-top: 2rem;
  padding: 1rem 0rem;
  text-align: center;
  box-shadow: 0px -4px 3px rgba(0 0 0 / 8%);
  .footer-small {
      margin-bottom: 0;
      font-size: 14px;
      a {
        text-decoration: none;
        color: $default;
        font-size: 14px;
        &:hover {
          color: $primary;
        }
    }
  }
}
</style>

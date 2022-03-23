<template>
  <div class="auth-form col-10 col-xl-6" @submit.prevent="login">
    <h2 class="title text-center mb-4">Welcome back !</h2>
    <el-form ref="form" label-position="top">
      <el-form-item label="Email" size="large">
        <el-input v-model="form.email" placeholder="Enter your email" />
      </el-form-item>
      <el-form-item label="Password" size="large">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
        />
      </el-form-item>
      <el-form-item>
        <div class="btn-center mt-4">
          <el-button type="primary" @click="login">Login</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
    };
  },
  methods: {
    async login() {
      const userData = {
        email: this.form.email,
        password: this.form.password,
      };
      try {
        const response = await this.$store.dispatch('login', userData);
        if (response.status === 200) {
          this.$router.push({ name: 'Dashboard' });
        } else {
          ElMessage.error('Oops, something went wrong')
        }
      } catch (err) {
        ElMessage.error(err.message)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-form {
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
</style>

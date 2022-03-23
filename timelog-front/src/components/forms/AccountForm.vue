<template>
  <div class="col-12 col-xl-8 account-form">
    <div class="section-header">
      <h3>Your account</h3>
      <el-divider></el-divider>
    </div>
    <p><span>Username:</span> {{ username }}</p>
    <p><span>Email:</span> {{ email }}</p>
    <div class="section-header">
      <h3>Change your password</h3>
      <el-divider></el-divider>
    </div>
    <el-form ref="form" :model="form" label-position="top" class="mt-4">
      <el-form-item label="Current password">
        <el-input type="password" v-model="form.old_password" />
        <span class="form-error">{{ errors.old_password }}</span>
      </el-form-item>
      <el-form-item label="New password">
        <el-input type="password" v-model="form.new_password" />
        <span class="form-error">{{ errors.new_password }}</span>
      </el-form-item>
      <el-form-item label="Confirm password">
        <el-input type="password" v-model="form.password_confirmation" />
        <span class="form-error">{{ errors.password_confirmation }}</span>
      </el-form-item>
      <div class="btn-right mt-4">
        <el-button type="primary" @click="changePassword"
          >Change password</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AccountForm',
  data() {
    return {
      username: '',
      email: '',
      form: {
        old_password: '',
        new_password: '',
        password_confirmation: '',
      },
      errors: {
        old_password: '',
        new_password: '',
        password_confirmation: '',
      },
    };
  },
  created() {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
  },
  methods: {
    changePassword() {
      const isValid = this.validateForm();
      if (!isValid) {
        return this.$message({
          message: 'Please check your form',
          type: 'error',
        });
      }
      this.$store
        .dispatch('changePassword', {
          oldPassword: this.form.old_password,
          newPassword: this.form.new_password,
        })
        .then((res) => {
          if (res === 200) {
            this.$message({
              message: 'Password changed successfully',
              type: 'success',
            });
            this.form = {
              old_password: '',
              new_password: '',
              password_confirmation: '',
            };
          } else {
            this.$message({
              message: 'Password change failed',
              type: 'error',
            });
          }
        })
        .catch(() => {
          this.$message({
            message: 'Password change failed',
            type: 'error',
          });
        });
    },
    checkErrors() {
      let errors = {};
      if (this.form.old_password === '') {
        errors.old_password = 'Please enter your current password';
      }
      if (this.form.new_password === '') {
        errors.new_password = 'Please enter your new password';
      }
      if (this.form.password_confirmation === '') {
        errors.password_confirmation = 'Please enter your new password again';
      }
      if (this.form.new_password !== this.form.password_confirmation) {
        errors.password_confirmation = 'Passwords do not match';
      }
      if (this.form.new_password.length < 8) {
        errors.new_password = 'Password must be at least 8 characters';
      }
      this.errors = errors;
    },
    validateForm() {
      this.checkErrors();
      return Object.keys(this.errors).length === 0;
    },
  },
};
</script>

<style lang="scss">
.account-form {
  margin: 0 auto;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  .section-header {
    margin-top: 2rem;
    h3 {
      font-size: 1.2rem;
      color: $default;
      margin-bottom: 0;
    }
    .el-divider {
      border-top: 2px solid $primary;
    }
  }
}
</style>

<template>
  <div class="row mt-4">
    <div class="col-12 col-xl-8 logger-form">
      <LogForm @submitted="handleSubmit" />
    </div>
  </div>
</template>

<script>
import LogForm from '@/components/forms/LogForm';
import { ElMessage } from 'element-plus';

export default {
  name: 'Logger',
  components: {
    LogForm,
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    async handleSubmit(log) {
      try {
        const response = await this.$store.dispatch('createLog', log);
        if (response.status === 201) {
          this.handleSuccess();
          this.resetForm();
        } else {
          this.handleError();
        }
      } catch (err) {
        this.handleError();
      }
    },
    handleSuccess() {
      ElMessage({
        message: 'Log created!',
        type: 'success',
      });
    },
    handleError() {
      ElMessage({
        message: 'Oops, something went wrong',
        type: 'error',
      });
    },
    resetForm() {
      this.form = {
        project: '',
        date: '',
        time: 0,
        halfday: 0,
        notes: '',
      };
    },
  },
};
</script>

<style lang="scss">
.logger-form {
  margin: 0 auto;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  .time-item {
    display: flex;
    .el-input-number:nth-child(1) {
      margin-right: 1rem;
    }
  }
  .el-form-item {
    margin-bottom: 1.5rem !important;
    .el-select,
    .el-date-editor {
      width: 50% !important;
    }
  }
}

@include bp-down(lg) {
  .logger-form {
    width: 90%;
    .el-form-item {
      .el-select,
      .el-date-editor {
        width: 100% !important;
      }
    }
  }
}
</style>

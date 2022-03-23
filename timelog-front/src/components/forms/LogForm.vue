<template>
  <el-form ref="form" :model="form" label-position="top">
    <el-form-item label="Project">
      <el-select v-model="form.project" style="width: 50%" filterable>
        <el-option
          v-for="item in projects"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="R&amp;D">
      <el-select v-model="form.rd" style="width: 50%" filterable>
        <el-option
          v-for="item in rd"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Date">
      <el-date-picker
        v-model="form.date"
        type="date"
        placeholder="Pick a date"
        format="DD/MM/YYYY"
        value-format="DD/MM/YYYY"
      ></el-date-picker>
    </el-form-item>
    <div class="time-item">
      <el-form-item label="Time (in hours)">
        <el-input-number
          v-model="form.time"
          :min="0"
          @change="handleTimeChange"
        />
      </el-form-item>
      <el-form-item label="Time (half-day)">
        <el-input-number
          v-model="form.halfday"
          :min="0"
          @change="handleDayChange"
        />
      </el-form-item>
    </div>
    <el-form-item label="Notes">
      <el-input
        v-model="form.notes"
        autosize
        type="textarea"
        placeholder="Please enter your comments"
      />
    </el-form-item>
    <el-form-item>
      <div class="btn-center mt-4">
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import projects from '@/utils/selection/projects';
import rd from '@/utils/selection/rd';

export default {
  name: 'LogForm',
  props: ['data'],
  data() {
    return {
      form: {
        project: '',
        rd: '',
        date: '',
        time: 0,
        halfday: 0,
        notes: '',
      },
    };
  },
  computed: {
    projects() {
      return projects.slice(1);
    },
    rd() {
      return rd.slice(1);
    },
  },
  created() {
    if (this.data) {
      this.form = this.data;
    }
  },
  methods: {
    formatData() {
      const username = localStorage.getItem('username');
      const rawDate = this.form.date;

      return {
        author: username,
        project: this.form.project,
        rd: this.form.rd,
        date: this.form.date,
        month: rawDate.split('/')[1],
        year: rawDate.split('/')[2],
        time: this.form.time,
        notes: this.form.notes,
      };
    },
    handleTimeChange(data) {
      this.form.time = data;
      this.form.halfday = data / 4;
    },
    handleDayChange(data) {
      this.form.halfday = data;
      this.form.time = data * 4;
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
    handleSubmit() {
      const log = this.formatData();
      this.$emit('submitted', log);
      this.resetForm();
    },
  },
};
</script>

<style></style>

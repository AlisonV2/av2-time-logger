<template>
  <div class="dashboard-card">
    <div class="row">
      <div class="col-11 mb-4">
        <el-select
          placeholder="Select Author"
          class="mx-2"
          @change="handleSelection"
          v-model="selectedAuthor"
        >
          <el-option
            v-for="author in authors"
            :key="author.label"
            :label="author.label"
            :value="author.value"
          >
            {{ author.label }}
          </el-option>
        </el-select>
        <el-select
          placeholder="Select Month"
          class="mx-2"
          v-model="selectedMonth"
          @change="handleSelection"
        >
          <el-option
            v-for="month in months"
            :key="month.label"
            :label="month.label"
            :value="month.value"
          >
            {{ month.label }}
          </el-option>
        </el-select>
        <el-select
          placeholder="Select Project"
          class="mx-2"
          v-model="selectedProject"
          @change="handleSelection"
        >
          <el-option
            v-for="project in projects"
            :key="project.label"
            :label="project.label"
            :value="project.value"
          >
            {{ project.label }}
          </el-option>
        </el-select>
        <el-select
          placeholder="Select R&amp;D"
          class="mx-2"
          v-model="selectedRd"
          @change="handleSelection"
        >
          <el-option
            v-for="rd in rd"
            :key="rd.label"
            :label="rd.label"
            :value="rd.value"
          >
            {{ rd.label }}
          </el-option>
        </el-select>
      </div>
      <div class="col-1 mb-4">
        <div class="btn-right mb-4">
          <el-button @click="exportData" class="mx-2">Export</el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData" row-key="id" highlight-current-row>
      <el-table-column prop="author" label="Author" />
      <el-table-column prop="project" label="Project" />
      <el-table-column prop="rd" label="R&#38;D" />
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="time" label="Time (hours)" />
    </el-table>
    <div class="btn-right mt-4">
      <el-pagination
        background
        small
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        @current-change="setPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import months from '@/utils/selection/months';
import authors from '@/utils/selection/authors';
import projects from '@/utils/selection/projects';
import rd from '@/utils/selection/rd';
import exportToCsv from '@/utils/exportToCsv';
import formatFilters from '@/utils/helpers/formatFilters';

export default {
  name: 'DataTable',
  data() {
    return {
      selectedAuthor: authors[0].value,
      selectedMonth: months[0].value,
      selectedProject: projects[0].value,
      selectedRd: rd[0].value,
      authors,
      months,
      projects,
      rd,
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      page: 1,
    };
  },
  async created() {
    try {
      const response = await this.$store.dispatch('getAllLogs');
      this.tableData = response.rows;
      this.totalCount = response.count;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async exportData() {
      const filters = this.formatFilters();
      const csvString = await this.$store.dispatch('exportLogs', filters);
      exportToCsv(csvString);
    },
    async handleSelection() {
      const filters = this.formatFilters();
      const data = await this.$store.dispatch('getAllLogs', filters);

      this.tableData = data.rows;
      this.totalCount = data.count;
    },
    async setPage(val) {
      this.page = val;
      const filters = this.formatFilters();
      const data = await this.$store.dispatch('getAllLogs', {...filters, page: val});
      this.tableData = data.rows;
      this.totalCount = data.count;
    },
    formatFilters() {
      return formatFilters(
        this.selectedAuthor,
        this.selectedMonth,
        this.selectedProject,
        this.selectedRd
      );
    }
  },
};
</script>

<style lang="scss">
.row-details {
  margin-left: 3.5rem;
  p {
    margin-bottom: 0.5rem !important;
    .row-details-title {
      font-weight: 600;
    }
  }
}
</style>

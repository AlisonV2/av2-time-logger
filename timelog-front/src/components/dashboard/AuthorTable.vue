<template>
  <div class="dashboard-card">
    <div class="btn-right">
      <el-button @click="exportData">Export</el-button>
    </div>
    <el-table
      ref=""
      :data="pagedData"
      row-key="id"
      highlight-current-row
      @currentChange="handleChange"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div class="row-details">
            <p>
              <span class="row-details-title">Project:</span>
              {{ props.row.project }}
            </p>
            <p>
              <span class="row-details-title">Date:</span> {{ props.row.date }}
            </p>
            <p>
              <span class="row-details-title">Time:</span> {{ props.row.time }}
            </p>
            <p>
              <span class="row-details-title">Notes:</span>
              {{ props.row.notes }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project" label="Project" />
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="time" label="Time (hours)" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleModal(scope.$index)"
            >Edit</el-button
          >
          <el-button type="text" size="small" @click="deleteLog"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
     <div class="btn-right mt-4">
      <el-pagination
        background
        small
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="tableData.length"
        @current-change="setPage"
      ></el-pagination>
    </div>
    <el-dialog
      v-model="showModal"
      title="Edit log"
      width="50%"
      destroy-on-close
    >
      <LogForm :data="form" @submitted="handleEdit" />
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import LogForm from '@/components/forms/LogForm';
import exportToCsv from '@/utils/exportToCsv';
import paginateTable from '@/mixins/paginateTable';

export default {
  name: 'AuthorTable',
  components: {
    LogForm,
  },
  mixins: [paginateTable],
  data() {
    return {
      showModal: false,
      currentRow: {},
      form: {},
      index: null,
      tableData: [],
    };
  },
  async created() {
    try {
      const { data } = await this.$store.dispatch('getLogsByAuthor');
      this.tableData = data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async exportData() {
      const csvString = await this.$store.dispatch('exportAuthorLogs');
      exportToCsv(csvString);
    },
    async handleEdit(log) {
      const { id } = this.currentRow;
      try {
        const response = await this.$store.dispatch('updateLog', {
          id: id,
          log: log,
        });
        this.updateTableData(id, log);
        if (response.status !== 200) {
          return this.handleError();
        }
        this.showModal = false;
        this.handleSuccess();
      } catch (err) {
        this.handleError();
      }
    },
    handleModal(index) {
      const data = this.tableData[index];
      this.currentRow = data;
      this.form = {
        project: data.project,
        rd: data.rd,
        date: data.date,
        time: data.time ?? 0,
        halfday: data.time / 4 ?? 0,
        notes: data.notes,
      };
      this.showModal = true;
      console.log(this.currentRow);
    },
    handleChange(data) {
      this.currentRow = data;
    },
    updateTableData(id, log) {
      const index = this.tableData.findIndex((item) => item.id === id);
      this.tableData.splice(index, 1, log);
      this.$emit('tableUpdated', this.tableData);
    },
    deleteLog() {
      setTimeout(() => {
        this.handleConfirm();
      }, 0);
    },
    handleConfirm() {
      ElMessageBox.alert(
        'Are you sure you want to delete this log?',
        'Delete log',
        {
          confirmButtonText: 'Yes',
          callback: () => {
            this.$store.dispatch('deleteLog', this.currentRow.id);
            const data = this.tableData.filter(
              (item) => item.id !== this.currentRow.id
            );
            this.$emit('deleted', data);
          },
        }
      );
    },
    handleSuccess() {
      ElMessage({
        message: 'Log updated!',
        type: 'success',
      });
    },
    handleError() {
      ElMessage({
        message: 'Oops, something went wrong',
        type: 'error',
      });
    },
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

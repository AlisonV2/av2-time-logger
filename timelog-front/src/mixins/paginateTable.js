export default {
  data() {
    return {
      pageSize: 10,
      page: 1,
    };
  },
  computed: {
    pagedData() {
      return this.tableData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },
  methods: {
    setPage(val) {
      this.page = val;
    },
  },
};
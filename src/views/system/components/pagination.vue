<template>
  <el-pagination
    style="margin:6px 0 0 0"
    background
    :current-page.sync="pagination.pageIndex"
    :page-size="pagination.pageSize"
    :page-sizes="pagination.pageSizes"
    :total="pagination.total"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['a', 'b'],
  data() {
    return {
      pagination: {
        pageIndex: 1,
        total: 0,
        pageSize: 5,
        pageSizes: [5, 10, 15, 20, 25, 30]
      }
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pagination.pageIndex = 1
      this.pagination.pageSize = pageSize
      this.tableData = this.allTableData.filter((item, index) => {
        return index < pageSize
      })
    },
    handleCurrentChange(page) {
      const index = this.pagination.pageSize * (page - 1)
      const nums = this.pagination.pageSize * page
      const tables = []
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i])
        }
        this.tableData = tables
      }
    },
    setPaginatons() {
      this.pagination.total = this.allTableData.length
      this.pagination.pageIndex = 1
      this.pagination.pageSize = 5
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagination.pageSize
      })
    }
  }
}
</script>


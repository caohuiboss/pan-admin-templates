<template>
  <div class="notices">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <i class="el-icon-message-solid" />
          系统公告
        </span>
      </div>
      <div class="filter-container">
        <el-form :inline="true">
          <el-form-item>
            <el-autocomplete
              v-model="listQuery.title"
              placeholder="请根据标题查询"
              prefix-icon="el-icon-search"
              style="width: 300px;"
              class="filter-item inline-input"
              :fetch-suggestions="querySearch"
              clearable
              @select="handleSelect"
              @keyup.enter.native="handleSearch"
            />
          </el-form-item>
          <el-form-item>
            <el-button v-waves class="filter-item" type="primary" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>

        <el-table
          v-loading="listLoading"
          border
          size="mini"
          :data="tableData"
          style="width: 100%"
          height="253"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column label="序号" width="100" type="index" align="center" />
          <el-table-column prop="date" label="日期" sortable width="150" align="center" />
          <el-table-column prop="name" label="姓名" width="150" align="center" />
          <el-table-column prop="title" label="标题" align="center" />
          <el-table-column label="查看" width="150" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                plain
                @click="seeNotices(scope.$index, scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </div>
    </el-card>
    <dialogs ref="notices" />
  </div>
</template>

<script>
import waves from '@/directive/waves'
import dialogs from '../dialog/index'
export default {
  directives: { waves },
  components: { dialogs },
  data() {
    return {
      listLoading: true,
      listQuery: {
        title: ''
      },
      dialogVisible: false,
      tableData: [],
      allTableData: [],
      filterTabelData: [],
      restaurants: [],
      pagination: {
        pageIndex: 1,
        total: 0,
        pageSize: 5,
        pageSizes: [5, 10, 15, 20, 25, 30]
      }
    }
  },
  created() {
    // this.getList()
  },
  updated() {
    this.restaurants = this.loadAllTitle()
  },
  methods: {
    formatter(row, column) {
      return row.address
    },
    getList() {
      this.axios('myApi/noticeList').then(response => {
        this.allTableData = response.data.data.items
        this.filterTabelData = response.data.data.items
        this.setPaginatons()
        this.listLoading = false
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      // cb(results)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 300)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAllTitle() {
      var titleArr = []
      this.tableData.forEach(item => {
        titleArr.push({ value: item.title })
      })
      return titleArr
    },
    setPaginatons() {
      this.pagination.total = this.allTableData.length
      this.pagination.pageIndex = 1
      this.pagination.pageSize = 5
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagination.pageSize
      })
    },
    seeNotices(index, data) {
      this.$refs.notices.notices(index, data)
    },
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
    handleSearch() {
      if (!this.listQuery.title) {
        this.$message({
          type: 'warning',
          message: '请输入需要查询的标题'
        })
        this.getList()
        return false
      }
      this.allTableData = this.filterTabelData.filter(item => {
        return item.title === this.listQuery.title
      })
      this.setPaginatons()
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss">
.notices {
  .el-card__body {
    padding: 6px;
  }
  .el-card__header {
    padding: 6px;
    border-bottom: 1px solid #e6ebf5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: gainsboro;
  }
  .filter-container {
    padding-bottom: 0px;
  }
}
</style>

<style scoped>
.el-form-item {
  margin-top: 6px;
  margin-bottom: 0px;
}
</style>


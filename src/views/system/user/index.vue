<template>
  <div class="PersonnelManagement">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :label-position="labelPosition" :inline="true">
          <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addRow">增加</el-button>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              v-model="listQuery.name"
              placeholder="姓名"
              prefix-icon="el-icon-search"
              style="width: 120px;"
              size="mini"
              class="filter-item inline-input"
              :fetch-suggestions="querySearch"
              clearable
              @select="handleSelect"
              @keyup.enter.native="handleSearch"
            />
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" filterable placeholder="科室" size="mini" style="width: 120px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" filterable placeholder="职位" size="mini" style="width: 120px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" filterable placeholder="职称" size="mini" style="width: 120px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="info" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-folder-add" size="mini" @click="importAction">人员信息导入</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-refresh" :disabled="disabled" size="mini" @click="Debounce(PersonneData)" />
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <el-table
          v-loading="listLoading"
          :data="tableData"
          style="width: 100%"
          border
          size="mini"
          height="790"
        >
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="UserID" label="UserID" width="160" />
          <el-table-column prop="UserName" label="UserName" width="60" align="center" />
          <el-table-column prop="CreatDate" label="CreateDate" />
          <el-table-column prop="UserCode" label="UserCode" />
          <!-- <el-table-column prop="job" label="职位" />
          <el-table-column prop="jobname" label="职称" />
          <el-table-column prop="job_content" label="职位描述" width="620" /> -->
          <el-table-column label="操作" fixed="right" align="center" width="220">
            <template slot-scope="scope">
              <el-button
                type="info"
                size="mini"
                icon="el-icon-edit"
                @click.native.prevent="editRow(scope.$index, scope.row)"
              >修改</el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
              >删除</el-button>
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
    <upload ref="openUpload" :title="title" />
    <dia-log ref="dialog" @dialog="formData" @dialogEdit="editData" />
  </div>
</template>
<script>
import diaLog from '../components/personne'
import upload from '../components/upload'
import { SelectUser } from '@/api/system_user'

export default {
  name: 'PersonnelManagement',
  components: { diaLog, upload },
  data() {
    return {
      title: '人员信息导入',
      labelPosition: 'right',
      listLoading: true,
      listQuery: {
        id: 0,
        name: '',
        content: ''
      },
      newData: {},
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
      },
      options: [
      ],
      value: '',
      disabled: false,
      SelectUser: {
        pageIndex: 1,
        pageSize: 10,
        condition: ''
      }
    }
  },
  created() {
    this.PersonneData()
  },
  updated() {
    this.restaurants = this.loadAllTitle()
  },
  methods: {
    Debounce(fn) {
      this.disabled = true
      this.PersonneData()
      setTimeout(() => {
        this.disabled = false
      }, 2000)
    },
    PersonneData() {
      SelectUser(this.SelectUser).then(res => {
        this.tableData = res.data
        this.listLoading = false
      })
    },
    addRow() {
      this.$refs.dialog.openDialog()
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    editRow(index, row) {
      this.$refs.dialog.openDialogEdit(index, row)
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
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    loadAllTitle() {
      var titleArr = []
      this.tableData.forEach(item => {
        titleArr.push({ value: item.name })
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
      if (!this.listQuery.name) {
        this.$message({
          type: 'warning',
          message: '请输入需要查询的职位'
        })
        this.PersonneData()
        return false
      }
      this.allTableData = this.filterTabelData.filter(item => {
        return item.name === this.listQuery.name
      })
      this.setPaginatons()
    },
    importAction() {
      this.$refs.openUpload.openUpload()
    },
    handleSelect(item) {
      console.log(item)
    },
    formData(a) {
      this.tableData.unshift(a)
    },
    editData(a) {
      console.log(...a)
    }
  }
}
</script>
<style lang="scss">
.PersonnelManagement {
  margin: 4px;
  .el-card__body {
    padding: 6px;
  }
  .el-card__header {
    padding: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: gainsboro;
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item:nth-child(1) {
      margin-left: 10px;
      margin-right: 20px;
    }
  }
}
</style>

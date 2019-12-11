<template>
  <div>
    <el-table :data="list" border size="mini" fit highlight-current-row height="282" style="width: 100%">
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
    <dialogs ref="notices" />
  </div>
</template>

<script>
import dialogs from '../../dialog/index'
export default {
  components: { dialogs },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'myOne'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 100,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.axios('myApi/noticeList').then(response => {
        this.list = response.data.data.items
        this.loading = false
      })
    },
    seeNotices(index, data) {
      this.$refs.notices.notices(index, data)
    }
  }
}
</script>


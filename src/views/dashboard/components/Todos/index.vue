<template>
  <div class="todos">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <i class="el-icon-menu" />
          待办事项
        </span>
      </div>
      <div class="filter-container">
        <el-tabs v-model="activeName" type="border-card" :tab-position="tabPosition" style="height: 356px;" @tab-click="handleClick">
          <el-tab-pane label="我的事项" name="1">我的事项</el-tab-pane>
          <el-tab-pane label="待办事项" name="2">待办事项</el-tab-pane>
          <el-tab-pane label="退回事项" name="3">退回事项</el-tab-pane>
          <el-tab-pane label="其他事项" name="4">其他事项</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: 'top',
      activeName: '1'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss">
.todos {
  .el-card__body {
    padding: 0px;
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

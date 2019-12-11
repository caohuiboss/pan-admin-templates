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
        <el-tabs v-model="activeName" style="margin-top:3px;" type="border-card">
          <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
            <keep-alive>
              <tab-pane v-if="activeName==item.key" :type="item.key" @create="showCreatedTimes" />
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import tabPane from './components/TabPane'

export default {
  name: 'Tab',
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: '我的事项', key: 'myOne' },
        { label: '待办事项', key: 'myTwo' },
        { label: '退回事项', key: 'myThree' },
        { label: '其他事项', key: 'myFour' }
      ],
      activeName: 'myOne',
      createdTimes: 0// 基数
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes += 1
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

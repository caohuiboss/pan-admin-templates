<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
    <el-form v-model="labelPosition" size="small" label-width="80px">
      <el-form-item label="发布者">
        <el-input disabled :value="data.name" />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input disabled :value="data.date" />
      </el-form-item>
      <el-form-item label="发布内容">
        <el-input disabled type="textarea" :value="data.content" :rows="12" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">知道了</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      index: '',
      data: '',
      labelPosition: 'left',
      title: ''
    }
  },
  methods: {
    notices(index, data) {
      this.index = index
      this.data = data
      this.title = `序号：${index} ${data.title}`
      this.dialogVisible = true
    }
  }
}
</script>

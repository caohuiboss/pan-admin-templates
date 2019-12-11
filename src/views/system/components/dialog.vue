<template>
  <el-dialog title="输入增加的树名" :visible.sync="dialogVisible" width="30%">
    <el-form>
      <el-form-item label="树名">
        <el-input v-model="treeName" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="okData()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      treeName: ''
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    okData() {
      if (this.treeName !== '') {
        this.$emit('treename', this.treeName)
        this.treeName = ''
        this.dialogVisible = false
      } else {
        this.$message({
          type: 'warning',
          message: '树名不能为空！'
        })
      }
    }
  }
}
</script>

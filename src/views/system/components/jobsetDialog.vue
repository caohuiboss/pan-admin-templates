<template>
  <el-dialog title="设置职位" :visible.sync="dialogVisible" width="30%">
    <el-form v-model="labelPosition" :model="formData" size="small">
      <el-form-item label="职位编码">
        <el-input v-model="formData.id" />
      </el-form-item>
      <el-form-item label="职位名称">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="职位描述">
        <el-input v-model="formData.content" type="textarea" :rows="8" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="index===''?okData():editData()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      labelPosition: 'left',
      index: '',
      formData: {
        id: '',
        name: '',
        content: ''
      }
    }
  },
  methods: {
    openDialogEdit(index, row) {
      this.dialogVisible = true
      this.index = index
      this.formData.id = row.id
      this.formData.name = row.name
      this.formData.content = row.content
    },
    openDialog() {
      this.formData.id = this.formData.name = this.formData.content = ''
      this.dialogVisible = true
    },
    okData() {
      if (
        this.formData.id !== '' ||
        this.formData.name !== '' ||
        this.formData.content !== ''
      ) {
        this.$emit('dialog', this.formData)
        this.dialogVisible = false
      } else {
        this.$message({
          type: 'warning',
          message: '输入框不能为空！'
        })
      }
    },
    editData() {
      if (
        this.formData.id !== '' ||
        this.formData.name !== '' ||
        this.formData.content !== ''
      ) {
        this.$emit('dialogEdit', [this.formData, this.index])
        this.dialogVisible = false
      } else {
        this.$message({
          type: 'warning',
          message: '输入框不能为空！'
        })
      }
    }
  }
}
</script>

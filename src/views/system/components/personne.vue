<template>
  <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" class="dialogs" width="30%">
    <el-form :label-position="labelPosition" label-width="80px" :model="formData" size="small">
      <el-form-item label="姓名">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="科室">
        <el-select v-model="value" filterable placeholder="科室">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职位">
        <el-select v-model="value" filterable placeholder="职位">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职称">
        <el-select v-model="value" filterable placeholder="职称">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="formData.accounts" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="formData.password2" />
      </el-form-item>
      <br>
      <el-form-item label="角色管理">
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
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
        content: '',
        accounts: '',
        password: '',
        password2: ''
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      cities: ['系统管理员', '资料录入员', '责任人员', '评审分组'],
      checkboxGroup1: ['系统管理员']
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
<style lang="scss">
.dialogs {
  .el-dialog__header {
    padding: 10px 20px;
    padding-bottom: 10px;
    font-weight: bold;
  }

  .el-dialog__body {
    padding: 6px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;

  .el-form-item--small.el-form-item {
      margin-bottom: 4px;
    }
  }
}
</style>


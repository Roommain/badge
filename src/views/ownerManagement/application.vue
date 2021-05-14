<template>
  <div class="add-ass">
      <el-form ref="assessData" status-icon :rules="rules" :model="assessData" label-width="120px">
          <el-form-item label="创新创业计划书" prop="courseContent">
            <!-- <el-input v-model="assessData.rented" type="textarea" rows="10" style="width:500px"></el-input><span class="day"></span> -->
            <div ref="editor" style="text-align:left"></div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('assessData')">提交申请</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import E from 'wangeditor'
var editor;
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      assessData:{
        courseContent:'',
      },
      // 品牌
      brandOptions: [{
        value: '1',
        label: '创新课程'
      }, {
        value: '2',
        label: '创业课程'
      }],

      rules: {
        courseContent: [
          { required: true, message: '请输入内容', trigger: 'change' }
        ],
      }
    }
  },

  mounted() {
      var That = this;
      editor = new E(this.$refs.editor);
      editor.config.onchange = function(html){
        That.assessData.courseContent = html
      }
      editor.create()
  },
  methods: {
      submitForm(assessData) {
        this.$refs[assessData].validate((valid) => {
          if (valid) {
            this.$axios
                .post('/api/course/insert',this.assessData)
                .then(data => {
                  this.$Message.success(data.data.msg);
                  // this.resetForm(assessData);
                }).catch(() => {
                  this.$Message.error('获取失败');
                  return;
                });
          } else {
            return false;
          }
        });
      },
      resetForm(assessData) {
        this.$refs[assessData].resetFields();
      },
  }
}
</script>

<style  lang="less">
.add-ass{
  .day {
    font-size: 18px;
    margin-left: 5px;
  }
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
</style>

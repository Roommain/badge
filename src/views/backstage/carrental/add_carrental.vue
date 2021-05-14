<template>
  <div class="add-ass">
      <el-form ref="assessData" status-icon :rules="rules" :model="assessData" label-width="80px">
          <el-form-item label="题目名称" prop="title">
            <el-input v-model="assessData.title" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>        
          <el-form-item label="选项 A." prop="sectionA">
            <el-input v-model="assessData.sectionA" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="选项 B." prop="sectionB">
            <el-input v-model="assessData.sectionB" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="选项 C." prop="sectionC">
            <el-input v-model="assessData.sectionC" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="选项 D." prop="sectionD">
            <el-input v-model="assessData.sectionD" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="答案" prop="correctSection">
                <el-select v-model="assessData.correctSection" placeholder="请选择答案" style="width:500px">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>   
          <el-form-item>
            <el-button type="primary" @click="submitForm('assessData')">新建题目</el-button>
            <el-button @click="resetForm('assessData')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
// /subject/insertOneSubject
//   private String title;
//   private String sectionA;
//   private String sectionB;
//   private String sectionC;
//   private String sectionD;
//   private String correctSection;

// /subject/listAll 无参数
export default {
  data() {
    return {
      brandOptions:[{
        value: 'A',
        label: 'A'
      }, {
        value: 'B',
        label: 'B'
      }, {
        value: 'C',
        label: 'C'
      }, {
        value: 'D',
        label: 'D'
      }],
      assessData:{
        title:'',
        sectionA:'',
        sectionB:'',
        sectionC:'',
        sectionD:'',
      },
      rules: {
        title: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
        sectionA: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        sectionB: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        sectionC: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        sectionD: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
      submitForm(assessData) {
        this.$refs[assessData].validate((valid) => {
          if (valid) {
            this.$axios
                .post('/api/subject/insertOneSubject',this.assessData)
                .then(data => {
                  this.$Message.success(data.data.msg);
                  this.resetForm(assessData);
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

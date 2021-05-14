<template>
  <div class="add-ass">
      <el-form ref="assessData" status-icon :rules="rules" :model="assessData" label-width="80px">
          <el-form-item label="学生姓名" prop="stuName">
            <el-input v-model="assessData.stuName" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>      
          <el-form-item label="学校名称" prop="schoolName">
            <el-input v-model="assessData.schoolName" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="专业名称" prop="majorName">
            <el-input v-model="assessData.majorName" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="比赛名字" prop="compareName">
            <el-input v-model="assessData.compareName" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>      
          <el-form-item label="比赛等级" prop="compareLevel">
            <el-input v-model="assessData.compareLevel" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="获得名称" prop="obtainName">
            <el-input v-model="assessData.obtainName" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="添加附件">
            <el-upload
              class="upload-demo"
              :on-success="OnSuccess"
              drag
              action="api/file/uploadFile"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('assessData')">提交审核</el-button>
            <el-button @click="resetForm('assessData')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assessData:{
        stuName:'',
        schoolName:'',
        majorName:'',
        compareName:'',
        compareLevel:'',
        obtainName:'',
        fileUrl:''
      },
      rules: {
        stuName: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
        schoolName: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        majorName: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        compareName: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        compareLevel: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        obtainName: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    // /innovation/insertOneInnovation 创新创业比赛申报
    // private String stuName;
    // private String schoolName;
    // private String majorName;
    // private String compareName;
    // private String compareLevel;
    // private String obtainName;
    // private String fileUrl;
      OnSuccess(file, fileList){
        console.log(file, fileList,'成功');
        this.assessData.fileUrl = file.data
      },
      submitForm(assessData) {
        this.$refs[assessData].validate((valid) => {
          if (valid) {
            this.$axios
                .post('/api/innovation/insertOneInnovation',this.assessData)
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
      selectChange () {
        if (this.assessData.vehicleType != '' && this.assessData.displacement != '') {
            const params = {
                vehicleType : this.assessData.vehicleType,
                displacement : this.assessData.displacement
            };
            this.$axios
                .post('api/vehicleTypeRented/selectOne',params)
                .then(data => {
                    if (data.data.code == 200 && data.data.msg == "暂无相关数据") {
                      this.assessData.rented = '';
                      this.assessData.profit = '';
                    }else if (data.data.code == 200 && data.data.msg == "成功") {
                      this.assessData.rented = data.data.data.rented;
                      this.assessData.profit = data.data.data.profit;
                    }else {
                      this.$Message.error(data.data.msg);
                    }
                }).catch(() => {
                    this.$Message.error('获取失败');
                    return;
                });
        }
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

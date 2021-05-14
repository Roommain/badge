<template>
  <div class="add-ass">
      <el-form ref="assessData" status-icon :rules="rules" :model="assessData" label-width="80px">
          <el-form-item label="徽章名称" prop="name">
            <el-input v-model="assessData.name"  placeholder="请输入名称" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="徽章类型" prop="flag">
                <el-select v-model="assessData.flag" placeholder="请选择" style="width:500px">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>          
          <!-- <el-form-item label="团队公告" prop="teamNotice">
            <el-input v-model="assessData.teamNotice" type="textarea" maxlength="100" rows="4" show-word-limit style="width:500px"></el-input><span class="day"></span>
          </el-form-item> -->
          <el-form-item label="徽章图标" prop="image">
            <el-input v-model="assessData.image" placeholder="请输入图片的base64" type="textarea" rows="9" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('assessData')">新增徽章</el-button>
            <el-button @click="resetForm('assessData')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
// /badge/insertNewBadge 新增徽章 参数：
//     private String code;

//     private String name;

//     private Integer flag;  0-普通，1-优秀
    
//     private String image; 图片base64
export default {
  data() {
    return {
      assessData:{
        code:'1',
        name:'',
        flag:null,
        image:'',
      },
      brandOptions: [{
        value: 0,
        label: '普通徽章'
      }, {
        value: 1,
        label: '奖励徽章'
      }],
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
        flag: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        image: [
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
                .post('api/badge/insertNewBadge',this.assessData)
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

<template>
  <div class="add-ass">
      <el-form ref="assessData" status-icon :rules="rules" :model="assessData" label-width="80px">
          <el-form-item label="团队名称" prop="teamName">
            <el-input v-model="assessData.teamName" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="团队人数" prop="totalPeopleNum">
                <el-select v-model="assessData.totalPeopleNum" placeholder="请选择人数" style="width:500px">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>          
          <el-form-item label="团队公告" prop="teamNotice">
            <el-input v-model="assessData.teamNotice" type="textarea" maxlength="100" rows="4" show-word-limit style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="团队介绍" prop="teamDescription">
            <el-input v-model="assessData.teamDescription" type="textarea" maxlength="200" rows="5" show-word-limit style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('assessData')">创建团队</el-button>
            <el-button @click="resetForm('assessData')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
// /team/insertOneTeam 新增 参数：
//     private String teamName;
//     private String teamDescription;
//     private String teamNotice;
//     totalPeopleNum 总人数
export default {
  data() {
    return {
      assessData:{
        teamName:'',
        totalPeopleNum:'',
        teamDescription:'',
        teamNotice:'',
      },
      brandOptions: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '6',
        label: '6'
      }, {
        value: '7',
        label: '7'
      }, {
        value: '8',
        label: '8'
      }, {
        value: '9',
        label: '9'
      }],
      rules: {
        teamName: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
        totalPeopleNum: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        teamDescription: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        teamNotice: [
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
                .post('/api/team/insertOneTeam',this.assessData)
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

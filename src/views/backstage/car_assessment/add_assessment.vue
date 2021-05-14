<template>
  <div class="add-ass">
      <el-form ref="assessData" status-icon :rules="rules" :model="assessData" label-width="80px">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="assessData.courseName" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>   
          <el-form-item label="课程分类" prop="courseType">
            <el-select v-model="assessData.courseType" placeholder="请选择分类" style="width:500px">
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>  
          <el-form-item label="课程时长" prop="courseTime">
            <el-input v-model="assessData.courseTime" style="width:500px"></el-input><span class="day"></span>/ 分钟
          </el-form-item>        
          <el-form-item label="课程介绍" prop="courseDescription">
            <el-input v-model="assessData.courseDescription" type="textarea" maxlength="200" rows="4" show-word-limit style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="课程内容" prop="courseContent">
            <!-- <el-input v-model="assessData.rented" type="textarea" rows="10" style="width:500px"></el-input><span class="day"></span> -->
            <div ref="editor" style="text-align:left"></div>
          </el-form-item>

          <el-form-item label="课程图片" prop="file">
            <el-upload
              :multiple="true"
              action="api/file/uploadFile"
              ref="upload"
              :on-change="onchange"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="OnSuccess"
              list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('assessData')">新建课程</el-button>
            <el-button @click="resetForm('assessData')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
// /course/insert 课程录入 参数：
//   private String courseName;
//   private String courseType;
//   private long courseTime;
//   private String courseDescription;
//   private String courseContent;
//   private String courseImgUrl;

// /course/update 课程修改 参数：
// private long id;
//   private String courseName;
//   private String courseType;
//   private long courseTime;
//   private String courseDescription;
//   private String courseContent;
//   private String courseImgUrl;

// /course/selectById 课程详情 参数： id

// /course/listCourseByCondition 列表查询 参数：
//  private String courseName;
//   private String courseType;
//   private String courseDescription;
//   private String courseContent;

import E from 'wangeditor'
var editor;
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      assessData:{
        courseName:'',
        courseType:'',
        courseTime:'',
        courseDescription:'',
        courseContent:'',
        courseImgUrl:''
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
        courseName: [
          { required: true, message: '请输入名称', trigger: 'change' },
        ],
        courseType: [
          { required: true, message: '请选择课程分类', trigger: 'change' },
        ],
        courseTime: [
          { required: true, message: '请输入时间', trigger: 'change' }
        ],
        courseDescription: [
          { required: true, message: '请输入简介', trigger: 'change' }
        ],
        courseContent: [
          { required: true, message: '请输入课程内容', trigger: 'change' }
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

      onchange(file,filesList) {
        //创建临时的路径来展示图片
        var windowURL = window.URL || window.webkitURL;
        this.src=windowURL.createObjectURL(file.raw);
        //重新写一个表单上传的方法
        this.param = new FormData();
        this.doUpload = true;
        // this.param.append('file', file.raw, file.name);
        for(var i = 0;i<filesList.length;i++) {
          this.param.append('file', filesList[i].raw, filesList[i].name);
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      OnSuccess(file, fileList){
        console.log(file, fileList,'成功');
        this.assessData.courseImgUrl = file.data
      },

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

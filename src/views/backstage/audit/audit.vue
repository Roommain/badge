<template>
  <div class="audit">

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未处理" name="first"></el-tab-pane>
        <el-tab-pane label="申报成功" name="second"></el-tab-pane>
        <el-tab-pane label="申报失败" name="third"></el-tab-pane>
      </el-tabs>

      <div class="box" v-show="auditShow" v-for="(item, index) in data" :key="index">
        <el-row>
          <el-col :span="12">
 <p class="user">学生姓名：<span>{{item.stuName}}</span> </p>
          </el-col>
          <el-col :span="12">
  <p class="user">学生学校：<span>{{item.schoolName}}</span> </p>
          </el-col>
          <el-col :span="12">
  <p class="user">专业：<span>{{item.majorName}}</span> </p>
          </el-col>
          <el-col :span="12">
            <p class="user">比赛名字：<span>{{item.compareName}}</span> </p>
          </el-col>
          <el-col :span="12">
<p class="user">比赛等级：<span>{{item.compareLevel}}</span> </p>
          </el-col>
          <el-col :span="12">
<p class="user">获得的名次：<span>{{item.obtainName}}</span> </p>            
          </el-col>
        </el-row>
        <p class="user">附件：<el-button @click="open(item.fileUrl)">查看</el-button> </p>
        <ul class="clearfix" v-if="item.status == 0"> 
          <li>
            <p>审核：</p>
            <el-button type="success" @click="onSubmit(item.id,1)">符合要求</el-button>
            <el-button type="info" @click="onSubmit(item.id,2)">不符合要求</el-button>
          </li>
        </ul>
      </div>
      <div class="nodata-img" v-show="!auditShow">
        <img src="../../../../static/img/timg.jpg" alt="">
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      pass:'',
      data:[],
      auditShow: false,
    }
  },
  created () {
    this.getAudit(0);
  },
  methods: {
      handleClick(tab) {
        console.log(tab.index);
        this.getAudit(tab.index);
      },
    open (url) {
      window.open(url)
    },
    getAudit(status) {
      var _this = this
      this.$axios
      .post('/api/innovation/listInnovationByCondition',{
        status:status
      })
      .then(data => {
        this.data = data.data.data;
        if (data.data.data.length == 0) {
          _this.auditShow = false;
        }else {
          _this.auditShow = true;
        }
      }).catch(() => {
        this.$Message.error('获取失败');
        return;
      });
    },
    onSubmit (id,num) {
      const params = {
          id : id,
          status:num
      };
      this.$axios
      .post('api/innovation/updateInnovation',params)
      .then(data => {
        this.getAudit(0);
      }).catch(() => {
        this.$Message.error('获取失败');
        return;
      });
    }
  },
}
</script>

<style  lang="less" scoped>
.audit {
  width: 100%;
  .box {
    width: 100%;
    height: 250px;
    background-color: #eee;
    margin-top: 10px;
    .user {
      padding: 10px;
      span {
        color: green;
      }
    }
    ul {
      display: flex;
    }
    ul li {
      // float: left;
      list-style: none;
      margin: 0 10px;
      p {
        margin-bottom: 10px;
      }
      img {
        width: 240px;
        height: 150px;
      }
    }
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
.nodata-img {
    width: 300px;
    img {
        width: 300px;
    }
}
</style>
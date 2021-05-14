<template>
    <div class="update-carrental">
        <div class="mar-20">
            <el-input placeholder="请输入名字" style="width: 300px" v-model="userName">
                
            </el-input> 
            <el-button icon="el-icon-search" @click="getCarData"></el-button>         
        </div>
        <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight"></Table>
        <div class="page">
            <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
        </div>
        <Modal
            v-model="modal"
            title="修改/详情"
            width=700
            :draggable="true"
            :footer-hide="true">
                <Form class="form" :model="formItem" :label-width="100">
                    <FormItem label="姓名">
                        <Input size="large" v-model="formItem.userName" style="width: 500px"></Input>
                    </FormItem>
                    <FormItem label="学校">
                        <Input size="large" v-model="formItem.schoolName" style="width: 500px"></Input>
                    </FormItem>
                    <FormItem label="专业">
                        <Input size="large" v-model="formItem.majorName" style="width: 500px"></Input>
                    </FormItem>
                    <FormItem label="邮箱" >
                        <!-- <span>{{formItem.email}}</span> -->
                        <Input size="large" v-model="formItem.email" style="width: 500px"></Input>
                    </FormItem>
                    <FormItem label="电话">
                        <!-- <span>{{formItem.telPhone}}</span> -->
                        <Input size="large" v-model="formItem.telPhone" style="width: 500px"></Input>
                    </FormItem>
                    <!-- <FormItem label="加入团队">
                        <span>{{formItem.teamName}}</span>
                    </FormItem> -->
                    <FormItem label="年龄" v-show="ageShow">
                        <!-- <span>{{formItem.age}}</span> -->
                        <Input size="large" v-model="formItem.age" style="width: 500px"></Input>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="formItem.sex">
                            <Radio label="男">男</Radio>
                            <Radio label="女">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="学生课程">
                        <el-card class="box-card" v-for="(item,index) in formItem.courseList" :key="index">
                            <el-row>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">
                                        <img :src="item.courseImgUrl" alt="">
                                    </div></el-col>
                                <el-col :span="18">
                                    <div class="grid-content bg-purple-light">
                                        <div slot="header" class="clearfix">
                                            <span class="title">课程名称：<span>{{item.courseName}}</span></span>
                                        </div>
                                        <div class="mar">
                                            <el-row>
                                            <el-col :span="12"><div class="grid-content bg-purple"><span> 课程类型：<span>{{changeCourse(item.courseType)}}</span></span></div></el-col>
                                            <el-col :span="12"><div class="grid-content bg-purple-light"><span> 课程状态：<span>{{changeStatus(item.status)}}</span></span></div></el-col>
                                            <!-- <el-col :span="12"><div class="grid-content bg-purple">课程进度：<span>{{item.studyTime}}</span>分钟 / <span>{{item.courseTime}}</span> 分钟<el-progress :text-inside="true" :stroke-width="16" :percentage="getPercentage(item.studyTime,item.courseTime,)"></el-progress></div></el-col> -->
                                            </el-row>
                                        </div>
                                        <div class="mar">
                                            <h4>课程介绍</h4>
                                            {{item.courseDescription}}
                                        </div>
                                    </div></el-col>
                            </el-row>
                        </el-card>
                    </FormItem>
                    <FormItem>
                        <Button size="large" @click="saveSubmit" type="primary" style="width: 500px;height: 42px;background-color: #5ab756;">保存</Button>
                    </FormItem>
                </Form>
        </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
        ageShow: false,
        formItem: {
            userName: '',
            schoolName:'',
            majorName:'',
            email: '',
            isVip: 0,
            sex: '',
            telPhone: '',
            age: 0,
            teamName:''
        },
        userName:'',
        modal:false,
        carData:{
            licensePlateNumber:'',
            city:'',
            carYear:'',
            gasolineType:'',//车油93，97
            vehicleDescription:'',//车辆描述
            vehicleRemark:'',//用车备注
            vehiclePictures:['',''],
        },
        licensePlateNumberArr:[],
        loading: true,//是否加载状态
        tableHeight: '',//table高度
        pageData:[],//分页数据
        pantectTotalSize: 0,//总数据
        page:1,
        size:20,
        columns: [
        {
            type: 'index',
            title: '序号',
            width: 70,
            align: 'center'
        },
        {
            title: '学生姓名',
            key: 'userName',
            align: 'center',
            ellipsis:true,
            tooltip:true,
        },
        {
            title: '学生邮箱',
            key: 'email',
            align: 'center',
            ellipsis:true,
            tooltip:true,
        },
        {
            title: '学生电话',
            key: 'telPhone',
            align: 'center',
            tooltip:true,
        },
        {
            title: '学生性别',
            key: 'sex',
            align: 'center',
            tooltip:true,
        },
        {
            title: '操作栏',
            key: 'action',
            fixed: 'right',
            width: 140,
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '10px'
                        },
                        on: {
                            click: () => {
                                this.updateUserInfo(params.row.id)
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style: {
                            marginRight: '10px'
                        },
                        on: {
                            click: () => {
                                this.deleteUser(params.row.id)
                            }
                        }
                    }, '删除')
                ]);
            }
        }
      ],
    }
  },
  created() {
    this.getCarData();
  },
  methods:{
    changeCourse (val) {
        if (val == '1') {
            return '创新课程'
        } else if (val == '2') {
            return '创业课程'
        }
    },

    changeStatus (val) {
        if (val == 0) {
            return '未完成'
        } else if (val == 1) {
            return '学习中'
        } else if (val == 2) {
            return '已完成'
        }
    },
    getPercentage (t1,t2) {
        return parseInt((t1*100)/t2)
    },
    //   /user/deleteUser
    deleteUser (id) {
        this.$axios.put('api/user/deleteUser',{
            id:[id]
        })
        .then(data => {
            this.getCarData();
        }); 
    },
    saveSubmit () {
        this.$axios.put('api/user/updateUserInfo',this.formItem)
        .then(data => {
            this.modal = false
            this.getCarData();
        }); 
    },
    //   /user/updateUserInfo 修改： userName，sex，teamName
    updateUserInfo (id) {
        this.modal = true
        this.$axios.post('api/user/selectUserCourseById',{
            id:id
        })
        .then(data => {
            this.formItem = data.data.data
        }); 
    },

    getCarData () {
        this.$axios.post('api/user/listStudentByCondition',{
            userName:this.userName
        })
        .then(data => {
            this.loading = false;
            if(data.data.code == 200){
              console.log(data);
              if (data.data.msg == '暂无相关数据') {
                  this.data = data.data.data || [];
                  this.pantectTotalSize = 0;
                  this.paging(this.data,this.page,this.size);
              }else {
                  this.data = data.data.data || [];
                  this.pantectTotalSize = data.data.data.length;
                  this.paging(this.data,this.page,this.size);
              }
            }else {
                this.$Message.error(data.data.msg);
            }
        }); 
    },
    // 控制表分页
    paging (number,page,size) {
        var startIndex = (page-1) * size;
        var endIndex = page * size;
        this.pageData = number.slice(startIndex,endIndex);
        if(this.pageData.length > 10){
            this.tableHeight = 520;
        }else{
            this.tableHeight = 0;
        }
    },
    // 改变page
    changePage (val) {
        this.page = val;
        this.paging (this.data,this.page,this.size);
    },
    //改变size
    changeSize (val) {
        this.size = val;
        this.paging (this.data,this.page,this.size);
    },
    clickrow (index) {
        this.modal = true;
        this.carData = index;
    },
    submitUpdate (result) {
        const params = {
          carYear : this.carData.carYear,
          displacement : this.carData.displacement,
          vehicleType : this.carData.vehicleType,
          autoOrHand : this.carData.autoOrHand,
          chairNumber : this.carData.chairNumber,
          gasolineType : this.carData.gasolineType,
          licensePlateNumber : this.carData.licensePlateNumber,
          city : this.carData.city,
          vehicleDescription : this.carData.vehicleDescription,
          vehicleRemark : this.carData.vehicleRemark,  
          result : result, 
          carOwner: this.carData.carOwner,
        };
        this.$axios
            .post('/api/car/examineUserCar',params)
            .then(data => {
                if (data.data.code == '200') {
                    this.$Message.success(data.data.msg);
                    this.getCarData();
                    this.modal = false;
                }else {
                    this.$Message.error('审核失败');
                }
            }).catch(() => {
                this.$Message.error('审核失败');
                return;
            });
    }
  },
}
</script>

<style  lang="less">
.page {
    margin-top: 10px;
    text-align: center;
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
.modal-form {
    width: 400px;
}
.modal-img {
    width: 250px;
    img {
        width: 250px;
        height: 150px;
    }
}
.modal-img,.modal-form {
    float: left;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.mar-20 {
    margin: 10px 0;
}
</style>
<template>
    <div>
        <div class="box-card">
            <el-select v-model="course.courseType" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input placeholder="请输入课程名字" style="width: 300px" v-model="course.courseName">
                
            </el-input> 
            <el-button icon="el-icon-search" @click="courseEsh"></el-button>
        </div>

        <el-card class="box-card" v-for="(item,index) in data" :key="index">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <img :src="item.courseImgUrl" alt="">
                    </div></el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple-light">
                        <div slot="header" class="clearfix">
                            <span class="title">课程名称：<span>{{item.courseName}}</span> </span>
                            <el-button style="float: right; padding: 3px 0" @click="addCourse(item.id)" type="text">加入课程</el-button>
                        </div>
                        <div class="mar">
                            <el-row>
                            <el-col :span="12"><div class="grid-content bg-purple"><span> 课程类型: <span>{{changeCourse(item.courseType)}}</span> </span></div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">课程时长：<span>{{item.courseTime}}</span> 分钟</div></el-col>
                            </el-row>
                        </div>
                        <div class="mar">
                            <h4>课程介绍</h4>
                            {{item.courseDescription}}
                        </div>
                    </div></el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
//  private String courseName;
//   private String courseType;
//   private String courseDescription;
//   private String courseContent;
    export default {
        data() {
            return {
                course:{
                    courseName:'',
                    courseType:''
                },
                options: [{
                value: '1',
                label: '创新课程'
                }, {
                value: '2',
                label: '创业课程'
                }],
                value: '',
                input3:'',
                formItem: {
                    userName: '',
                    email: '',
                    isVip: 0,
                    sex: '',
                    telPhone: '',
                    age: 0,
                },
                data:[]
            }
        },
        created() {
            this.requestInformation();
        },
        methods: {
            addCourse (id) {
                this.$axios.post('api/course/insertOneUserCourse',{
                    courseId:id
                })
                .then(data => {
                    console.log(data,'wwwwwwwwwwwww')
                    // if (data.data.code == 200) {
                    //     this.data = data.data.data;
                    // }else {
                    //     this.$Message.error(data.data.msg);
                    // }
                });
            },
            changeCourse (val) {
                if (val == '1') {
                    return '创新课程'
                } else if (val == '2') {
                    return '创业课程'
                }
            },

            courseEsh () {
                this.requestInformation();
            },
            //获取待审核数据
            requestInformation () {
                this.$axios.post('api/course/listCourseByCondition',this.course)
                .then(data => {
                    console.log(data,'wwwwwwwwwwwww')
                    if (data.data.code == 200) {
                        this.data = data.data.data;
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },
            add (name) {
                const param = {
                    userName:this.formItem.userName,
                    sex:this.formItem.sex,
                    teamName:name
                }
                this.$axios.put('api/user/updateUserInfo',param)
                .then(data => {
                    console.log(data);
                    if (data.data.code == 200) {
                        this.lightUp ();
                        this.$Message.success(data.data.msg);
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },

            lightUp (){
                const param = {
                    badgeId:9
                }
                this.$axios.post('api/badge/insertOneBadge',param)
                .then(data => {

                }); 
            },
        },
    }
</script>

<style lang="less" scoped>
.magr-20 {
    margin: 20px 0;
}
.box-card {
    width: 100%;
    margin: 20px auto;
    .mar {
        margin: 10px 0;
    }
}
.title {
    font-size: 16px;
}
.bg-purple img{
    width: 90%;
    background-size: 90%;
}
</style>

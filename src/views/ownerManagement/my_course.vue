<template>
    <div>
        <div class="box-card">
            <el-select v-model="course.courseType" placeholder="请选择课程类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="course.status" placeholder="请选择课程状态">
                <el-option
                v-for="item in optionsStatus"
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
                    <div class="grid-content bg-purple" @click="beginLearn(item.courseId)">
                        <img :src="item.courseImgUrl" alt="">
                    </div></el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple-light">
                        <div slot="header" class="clearfix">
                            <span @click="beginLearn(item.courseId)" class="title">课程名称：<span>{{item.courseName}}</span></span>
                            <el-button style="float: right; padding: 3px 0" @click="deleteUserCourse(item.courseId)" type="text">取消课程</el-button>
                        </div>
                        <div class="mar">
                            <el-row>
                            <el-col :span="6"><div class="grid-content bg-purple"><span> 课程类型：<span>{{changeCourse(item.courseType)}}</span></span></div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light"><span> 课程状态：<span>{{changeStatus(item.status)}}</span></span></div></el-col>
                            <el-col :span="5" v-if="item.status == 2"><div class="grid-content bg-purple-light"><span> 课程分数：<span>{{item.score}}</span></span></div></el-col>
                            <el-col :span="7"><div class="grid-content bg-purple">课程进度：<span>{{item.studyTime}}</span>分钟 / <span>{{item.courseTime}}</span> 分钟<el-progress :text-inside="true" :stroke-width="16" :percentage="getPercentage(item.studyTime,item.courseTime,)"></el-progress></div></el-col>
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
    export default {
        data() {
            return {
                percentage:80,
                course:{
                    courseName:'',
                    courseType:'',
                    status:''
                },
                options: [{
                value: '1',
                label: '创新课程'
                }, {
                value: '2',
                label: '创业课程'
                }],
                // 0-未完成，1-学习中，2-已完成
                optionsStatus: [{
                value: 0,
                label: '未完成'
                }, {
                value: 1,
                label: '学习中'
                }, {
                value: 2,
                label: '已完成'
                }],
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
            getPercentage (t1,t2) {
                return parseInt((t1*100)/t2)
            },
            deleteUserCourse (id) {
                this.$axios.post('api/course/deleteUserCourse',{
                    courseId:id
                })
                .then(data => {
                    if (data.data.code == 200) {
                        this.$Message.success(data.data.msg);
                        this.requestInformation();
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },
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
            courseEsh () {
                this.requestInformation();
            },
            beginLearn (id) {
                this.$router.push({name: '开始学习',params: {courseId: id}});
            },
            //获取待审核数据
            requestInformation () {
                this.$axios.post('api/course/listCourseByUserIdAndCondition',this.course)
                .then(data => {
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
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    color: #409EFF;
}
.bg-purple img{
    width: 90%;
    background-size: 90%;
}
</style>

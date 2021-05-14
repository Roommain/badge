<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>课程名称：<span>{{data.courseName}}</span> </span>
                <el-button  style="float: right; padding: 3px 20px" @click="logoutBeginLearn" type="text">退出学习</el-button>
                <span style="float: right; padding: 3px 0">学习时间：{{timer}}</span>
            </div>
            <div class="mar">
                <h2>课程内容</h2>
                <p v-html="data.courseContent"></p>
            </div>
            <div class="test" v-if="testTopic.length > 0">
                <div>
                    <h2>测试题目</h2>
                    <p class="title">{{indexNumber+1}}.{{testTopic[indexNumber].title}}</p>
                </div>
                <div style="margin-top: 20px">
                    <div v-for="(item,index) in testTopic[indexNumber].result" :key='index'>
                        <el-radio v-model="testTopic[indexNumber].radio" :label='item.value' border size="medium">{{item.option}}</el-radio>
                    </div>
                </div>
                <div>
                    <span>当前选择：</span>
                    <span>{{testTopic[indexNumber].radio}}</span>
                </div>

                <div class="btns">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <el-button-group>
                                    <el-button @click="change(-1)" icon="el-icon-arrow-left">上一题</el-button>
                                    <el-button type="primary" @click="change(1)">{{text}}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                                </el-button-group>                              
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <el-button class="submit" type="success" @click="submit()">提交</el-button>
                            </div>
                        </el-col>
                    </el-row>

                </div>

                <el-row>
                    <el-col :span="20">
                        <div>
                            <div>
                                <el-button-group>
                                    <el-button class="button-group" @click="changeIndexNumber(index)" v-for="(item,index) in testTopic" :key="index">{{item.radio ? item.radio : index+1}}</el-button>
                                </el-button-group>
                            </div>
                            <div>
                                <el-button-group>
                                    <el-button class="button-group" :class="{red:colorChange(item,index),green:!colorChange(item,index)}" @click="changeIndexNumber(index)" v-for="(item,index) in correctAnswer" :key="index" >{{item}}</el-button>
                                </el-button-group>                    
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grade">
                            得分：{{grade}}
                        </div>
                    </el-col>
                </el-row>

            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                courseId:'',
                text:'下一题',
                grade:0,
                timer:0,
                input3:'',
                formItem: {
                    userName: '',
                    email: '',
                    isVip: 0,
                    sex: '',
                    telPhone: '',
                    age: 0,
                },
                radio2: '',
                resultData:[],
                correctAnswer:[],
                indexNumber:0,
                testTopic:[
                    {
                        id:1,
                        title:'这道问题的答案是A',
                        radio:'',
                        result:[
                            {
                                model:'',
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                model:'',
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                model:'',
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                model:'',
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                    {
                        id:2,
                        title:'这道问题的答案是B',
                        radio:'',
                        result:[
                            {
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                    {
                        id:3,
                        title:'这道问题的答案是C',
                        radio:'',
                        result:[
                            {
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                    {
                        id:4,
                        title:'这道问题的答案是D',
                        radio:'',
                        result:[
                            {
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                    {
                        id:5,
                        title:'这道问题的答案是A',
                        radio:'',
                        result:[
                            {
                                model:'',
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                model:'',
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                model:'',
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                model:'',
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                    {
                        id:6,
                        title:'这道问题的答案是B',
                        radio:'',
                        result:[
                            {
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                    {
                        id:7,
                        title:'这道问题的答案是C',
                        radio:'',
                        result:[
                            {
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                    {
                        id:8,
                        title:'这道问题的答案是D',
                        radio:'',
                        result:[
                            {
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                    {
                        id:9,
                        title:'这道问题的答案是A',
                        radio:'',
                        result:[
                            {
                                model:'',
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                model:'',
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                model:'',
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                model:'',
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                    {
                        id:10,
                        title:'这道问题的答案是B',
                        radio:'',
                        result:[
                            {
                                value:'A',
                                option:'A.备选项1'
                            },
                            {
                                value:'B',
                                option:'B.备选项2'                                
                            },
                            {
                                value:'C',
                                option:'C.备选项1'
                            },
                            {
                                value:'D',
                                option:'D.备选项2'                                
                            }
                        ]
                    },
                ],
                id:'',
                data:{},
                daan:[]
            }
        },
        created() {
            this.id = this.$route.params.courseId
            this.requestInformation(this.id);
            setInterval(() => {
                this.timer++
            }, 1000);
        },
        methods: {
            colorChange (item,index) {
                if (this.resultData[index] == item) {
                    return false
                } else {
                    return true
                }
            },

            correctAnswerChange (item,index) {
                if (this.resultData[index] == item) {
                    return '对'
                } else {
                    return 'X'
                }
            },

            changeIndexNumber(index) {
                this.indexNumber = index
            },
            submit (){
                var _this = this
                _this.resultData = []
                _this.$confirm('是否提交?', '提交', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    _this.testTopic.forEach(element => {
                        _this.resultData.push(element.radio);
                    });
                    console.log(_this.resultData,'_this.resultData');
                    let number = 0
                    _this.correctAnswer = _this.daan
                    _this.correctAnswer.forEach((element,index) => {
                        if (element == _this.testTopic[index].radio) {
                            number += 10
                        }
                    });
                    _this.grade = number                    
                    this.$axios.post('api/course/updateUserCourse',{
                        score:_this.grade,
                        courseId:this.id,
                    }).then(data => {
                        this.$message({
                            type: 'success',
                            message: '成功!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            },
            change (index) {
                var _this = this
                _this.resultData=[]
                this.indexNumber += index
                if (this.indexNumber < 0) {
                    this.indexNumber = 0;
                    this.$Message.info('前面没有题了');
                } else if (this.indexNumber > this.testTopic.length-1) {
                    _this.resultData = [];
                    this.indexNumber = this.testTopic.length-1;
                    this.$confirm('当前为最后一道题, 是否提交?', '提交', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        _this.testTopic.forEach(element => {
                            _this.resultData.push(element.radio);
                        });
                        console.log(_this.resultData,'_this.resultData');
                        let number = 0
                        _this.correctAnswer = _this.daan
                        _this.correctAnswer.forEach((element,index) => {
                            if (element == _this.testTopic[index].radio) {
                                number += 10
                            }
                        });
                        _this.grade = number                    
                        this.$axios.post('api/course/updateUserCourse',{
                            score:_this.grade,
                            courseId:this.id,
                        }).then(data => {
                            this.$message({
                                type: 'success',
                                message: '成功!'
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });          
                    });
                }
            },
            logoutBeginLearn () {
                this.$axios.post('api/course/updateUserCourse',{
                    courseId:this.id,
                    studyTime:parseInt(this.timer/60),
                })
                .then(data => {
                    if (data.data.code == 200) {
                        
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
                this.$router.go(-1);//返回上一层
            },
            //获取待审核数据
            requestInformation (courseId) {
                this.$axios.post('api/course/selectById',{
                    id:courseId
                })
                .then(data => {
                    if (data.data.code == 200) {
                        this.data = data.data.data;
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });

                this.testTopic = []
                this.daan = []
                this.$axios.post('api/subject/listByCourseId',{
                    courseId:courseId
                })
                .then(data => {
                    if (data.data.code == 200) {
                        data.data.data.forEach(element => {
                            this.daan.push(element.correctSection)
                            this.testTopic.push({
                                id:element.id,
                                title:element.title,
                                radio:'',
                                result:[
                                    {
                                        value:'A',
                                        option:'A、'+element.sectionA
                                    },
                                    {
                                        value:'B',
                                        option:'B、'+element.sectionB                             
                                    },
                                    {
                                        value:'C',
                                        option:'C、'+element.sectionC
                                    },
                                    {
                                        value:'D',
                                        option:'D、'+element.sectionD                            
                                    }
                                ]
                            })
                        });
                        // this.data = data.data.data;
                        
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
    width: 96%;
    margin: 20px auto;
    .mar {
        margin: 10px 0;
    }
}

.test {
    font-size: 16px;
    .el-radio--medium.is-bordered {
        width: 100%;
        margin: 10px 0;
    }
}
.btns {
    margin:  20px 0;
}
.title {
    margin-top: 10px;
}
.button-group {
    width: 80px;
    
}
.red {
    border: 1px solid #F56C6C;
    color: #F56C6C;
}
.green {
    border: 1px solid #67C23A;
    color: #67C23A;
}
.grade {
    font-size: 24px;
}
.submit {
    margin-left: 100px;
}
</style>

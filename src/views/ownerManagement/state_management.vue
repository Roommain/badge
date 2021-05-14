<template>
    <div class="test">
        <div>
            <h2>题目</h2>
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
            <el-button-group>
                <el-button @click="change(-1)" icon="el-icon-arrow-left">上一题</el-button>
                <el-button type="primary" @click="change(1)">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>    
        </div>
        <div>
            <el-button-group>
                <el-button @click="changeIndexNumber(index)" v-for="(item,index) in testTopic" :key="index">{{index+1}}</el-button>
            </el-button-group>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                radio2: '',
                resultData:[],
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
                ]
            }
        },
        created() {

        },
        methods: {
            changeIndexNumber(index) {
                this.indexNumber = index
            },

            change (index) {
                var _this = this
                this.indexNumber += index
                if (this.indexNumber < 0) {
                    this.indexNumber = 0;
                    this.$Message.info('前面没有题了');
                }else if (this.indexNumber > this.testTopic.length-1) {
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
                        this.$axios.post('api/user/uploadScore',{
                            answer:_this.resultData
                        })
                        .then(data => {
                            console.log(data,'成绩');
                        });
                        this.$message({
                            type: 'success',
                            message: '成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });          
                    });
                }
            },
            //获取待审核数据
            getObjByCarOwner(){
                this.$axios.get('api/authentication/getObjByCarOwner')
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.getObjByCarOwnerData = data.data.data;
                        this.nodataimgShow = true;
                    }else {
                        this.nodataimgShow = false;
                    }
                });
            },
        },
    }
</script>

<style lang="less" scoped>
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
</style>

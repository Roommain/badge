<template>
    <div class="test">
        <div class="righttop" id="myChart"></div>

        <h2 class="h2">学习总时长：{{studyTime}} 分钟</h2>
    </div>
</template>
<script>
import * as echarts from 'echarts';
let myChart
    export default {
        data() {
            return {
                studyTime:'',
                option : {
                    title: {
                        text: '评估统计'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ["优秀徽章","徽章数量","连续登录天数"]
                    },
                    yAxis: {},
                    series: [{
                        type: 'bar',
                        data: [0,0,0]
                    }]
                }
            }
        },
        created () {
            // this.init()
            this.getCountStaticInfo()
        },
        mounted() {
            this.init()
            // this.getCountStaticInfo()
        },
        methods: {
            init () {
                myChart = echarts.init(document.getElementById('myChart'))
                myChart.setOption(this.option);
            },

            getCountStaticInfo(){
                this.$axios.post('api/user/countStaticInfo')
                .then(data => {
                    console.log(data.data.data,'data')
                    this.option.series[0].data=[data.data.data.youXiu, data.data.data.total, data.data.data.loginDay]
                    this.studyTime = data.data.data.studyTime,
                    myChart.setOption(this.option);
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
.righttop{
    width: 800px;
    height: 500px;
    margin: auto;
}
.h2 {
    width: 800px;
    height: 50px;
    margin: auto;
}
</style>

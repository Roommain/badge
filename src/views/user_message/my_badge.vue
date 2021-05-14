<template>
<div>
    <el-divider>普通徽章</el-divider>
    <div class="img-box">
        <el-row :gutter="10">
        <el-col :span="4" v-for="(item,idx) in pageData" :key='idx'>
            <div class="grid-content bg-purple" v-if="item.flag == 0 " >
            <el-card class="box-card">
                <el-row>
                <el-col :span="8"><div>
                    <img
                    :src='item.image'
                    alt=""
                    /></div></el-col>
                <el-col :span="16"
                    ><div class="left-p">
                    <h5 class="h5">{{item.name}}</h5>
                    </div></el-col
                >
                </el-row>
            </el-card>
            </div>
        </el-col>
        </el-row>
    </div>  
    <el-divider>奖励徽章</el-divider>
        <div class="img-box">
        <el-row :gutter="10">
        <el-col :span="4" v-for="(item,idx) in pageData" :key='idx'>
            <div class="grid-content bg-purple" v-if="item.flag == 1">
            <el-card class="box-card">
                <el-row>
                <el-col :span="8"><div>
                    <img
                    :src='item.image'
                    alt=""
                    /></div></el-col>
                <el-col :span="16"
                    ><div class="left-p">
                    <h5 class="h5">{{item.name}}</h5>
                    </div></el-col
                >
                </el-row>
            </el-card>
            </div>
        </el-col>
        </el-row>
    </div> 
</div>

</template>

<script>
import interlayer from '@/views/interlayer/interlayer'
export default {
    data() {
        return {
            pageData:[],
            emailData: [],
            ageShow: false,
            formItem: {
                userName: '',
                email: '',
                isVip: 0,
                sex: '',
                telPhone: '',
                age: 0,
                teamName:''
            }
        }
    },
    created() {
        this.requestInformation();
    },
    computed: {
        /**
        * 封装进行状态修改的方法
        * @param {Object} obj 当前渲染的对象
        */
       //是否实名
        newVip(){
            return function(obj) {
                if(obj == 0){
                    return '未实名';
                }
                 else if (obj == 1) {
                    return '已实名';
                }
            };
        },
    },
    methods: {
        filterMethod (value, option) {
            return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        },
        emailHandleSearch (value) {
            this.emailData = !value || value.indexOf('@') >= 0 ? [] : [
                value + '@qq.com',
                value + '@foxmail.com',
                value + '@163.com'
            ];
        },
        requestInformation () {
            this.$axios.get('api/user/queryUserInfo')
            .then(data => {
                if (data.data.code == 200) {
                    this.pageData = data.data.data.badge;
                    this.formItem = data.data.data.base;
                    if (data.data.data.base.isVip == 1) {
                        this.ageShow = true;
                    }
                }else {
                    this.$Message.error(data.data.msg);
                }
            });
        },
        saveSubmit () {
            const param = {
                userName:this.formItem.userName,
                sex:this.formItem.sex,
            }
            this.$axios.put('api/user/updateUserInfo',param)
            .then(data => {
                console.log(data);
                if (data.data.code == 200) {
                    this.$Message.success(data.data.msg);
                    this.requestInformation();
                    this.$cookie.set('userName',this.formItem.userName);
                    interlayer.$emit('active',this.formItem.userName);
                }else {
                    this.$Message.error(data.data.msg);
                }
            });
        }
    }

}
</script>

<style lang="less" scoped>
.userinfo {
    position: relative;
    .autonym {
        color: green;
    }
    .unAutonym {
        color: red;
    }
    .card {
        position: absolute;
        top: 50px;
        left: 50%;
        width: 500px;
        margin-left: -250px;
        background-color: rgba(255, 255, 255, 0.3);
        .title {
            font-size: 18px;
        }
        .form {
            margin-top: 30px;
        }
    }
    

}
.h5 {
    line-height: 45px;
}
</style>
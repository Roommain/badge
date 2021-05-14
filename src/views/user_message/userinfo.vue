<template>
<div>
    <div class="userinfo">
        <div class="card">
            <div>
                <Form class="form" :model="formItem" :label-width="100">
                    <FormItem label="姓名">
                        <Input size="large" v-model="formItem.userName" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="学校" v-show="adminShow">
                        <Input size="large" v-model="formItem.schoolName" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="专业" v-show="adminShow">
                        <Input size="large" v-model="formItem.majorName" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="邮箱" >
                        <!-- <span>{{formItem.email}}</span> -->
                        <Input size="large" v-model="formItem.email" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="电话">
                        <!-- <span>{{formItem.telPhone}}</span> -->
                        <Input size="large" v-model="formItem.telPhone" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="加入团队"  v-show="adminShow">
                        <span>{{formItem.teamName}}</span>
                    </FormItem>
                    <FormItem label="年龄" v-show="ageShow">
                        <!-- <span>{{formItem.age}}</span> -->
                        <Input size="large" v-model="formItem.age" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="formItem.sex">
                            <Radio label="男">男</Radio>
                            <Radio label="女">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem>
                        <Button size="large" @click="saveSubmit" type="primary" style="width: 300px;height: 42px;background-color: #5ab756;">保存</Button>
                    </FormItem>
                </Form>
            </div>
        </div> 
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
            adminShow:false,
            isAdmin:'',
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
            }
        }
    },
    created() {
        this.requestInformation();
        this.getUserName()
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
        getUserName () {
            this.isAdmin = this.$cookie.get('isAdmin') || '';
            if(this.isAdmin == '1'){
                this.adminShow = false;
            }else {
                this.adminShow = true;
            }
        },
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
            // const param = {
            //     userName:this.formItem.userName,
            //     sex:this.formItem.sex,
            //     sex:this.formItem.sex,
            //     sex:this.formItem.sex,
            // }
            this.$axios.put('api/user/updateUserInfo',this.formItem)
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
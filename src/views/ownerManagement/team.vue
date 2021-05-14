<template>
    <div>
        <div class="box-card">
            <el-input placeholder="请输入团队名称" v-model="input3" class="input-with-select">
                <el-button slot="append" @click="requestInformation" icon="el-icon-search"></el-button>
            </el-input>   
        </div>
        <el-card class="box-card" v-for="(item,index) in teamData" :key="index" >
            <div slot="header" class="clearfix">
                <span>团队名称: <span>{{item.teamName}}</span> </span>
                <el-button style="float: right; padding: 3px 0" @click="add(item.teamName)" type="text">加入团队</el-button>
            </div>
            <!-- <div class="mar">
               <span> 团队编号：4233 </span>
            </div> -->
            <div class="mar">
               <span> 团队人数：<span>{{item.currentPeopleNum}}</span>/<span>{{item.totalPeopleNum}}</span></span>
            </div>
            <div class="mar">
               <span> 创建者：<span>{{item.createUserName}}</span></span>
            </div>
            <div class="mar">
                <h4>团队公告</h4>
<span>{{item.teamNotice}}</span>
            </div>
            <div class="mar">
                <h4>团队介绍</h4>
<span>{{item.teamDescription}}</span>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                input3:'',
                formItem: {
                    userName: '',
                    email: '',
                    isVip: 0,
                    sex: '',
                    telPhone: '',
                    age: 0,
                },
                teamData:[]
            }
        },
        created() {
            this.requestInformation();
        },
        methods: {
            //获取待审核数据
            requestInformation () {
                var _this = this
                this.$axios.post('api/team/listTeamByCondition',{
                    teamName:this.input3,
                    teamDescription:''
                })
                .then(data => {
                    if (data.data.code == 200) {
                        _this.teamData = data.data.data;
                        console.log(_this.teamData,'_this.data');
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },
            add (name) {
                const param = {
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
        margin-bottom: 20px;
    }
}
</style>

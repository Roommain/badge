<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="我加入团队">
                <el-card class="box-card" v-if="JSON.stringify(data) != '{}'">
                    <div slot="header" class="clearfix">
                        <span>团队名称：<span>{{data.teamName}}</span> </span>
                        <el-button style="float: right; padding: 3px 0" @click="updateUserInfo" type="text">退出团队</el-button>
                    </div>
                    <div class="mar">
                    <span> 团队人数：<span>{{data.currentPeopleNum}}</span>/<span>{{data.totalPeopleNum}}</span></span>
                    </div>
                    <div class="mar">
                    <span> 创建者：<span>{{data.createUserName}}</span></span>
                    </div>
                    <div class="mar">
                        <h4>团队公告</h4>
                        <span>{{data.teamNotice}}</span>
                    </div>
                    <div class="mar">
                        <h4>团队介绍</h4>
                        <span>{{data.teamDescription}}</span>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="我创建团队">
                <div v-if="JSON.stringify(creatData) != '[]'">
                    <el-card class="box-card" v-for="(item,index) in creatData" :key="index">
                        <div slot="header" class="clearfix">
                            <span>团队名称：<span>{{item.teamName}}</span> </span>
                            <el-button style="float: right; padding: 3px 30px" @click="deleteOneTeam(item.id)" type="text">解散团队</el-button>
                            <el-button style="float: right; padding: 3px 0" @click="selectUserByTeamName(item.teamName)" type="text">查看团队人员</el-button>
                            <el-button style="float: right; padding: 3px 30px" @click="declareModalOpen(item.id)" type="text">创新创业项目申报</el-button>
                        </div>
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
              
                <Modal
                    v-model="modal"
                    title="团队人员"
                    width=500
                    :draggable="true"
                    :footer-hide="true">
                    <div>
                        <el-tag
                        class="tags"
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag.userName}}-{{tag.schoolName}}-{{tag.majorName}}-电话：{{tag.telPhone}}
                        </el-tag>             
                    </div>
                </Modal>

                <Modal
                    v-model="declareModal"
                    title="团队申报"
                    width=700
                    :draggable="true"
                    :footer-hide="true">
                    <div>
                        <div ref="editor" style="text-align:left"></div>
                    </div>
                    <div class="btns">
                        <el-button type="primary" @click="submitForm">提交申报</el-button>
                    </div>
                </Modal>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import E from 'wangeditor'
var editor;
    export default {
        data() {
            return {
                teamId:'',
                courseContent:'',
                modal:false,
                declareModal:false,
                dynamicTags:[],
                input3:'',
                formItem: {
                    userName: '',
                    email: '',
                    isVip: 0,
                    sex: '',
                    telPhone: '',
                    age: 0,
                },
                data:{},
                creatData:[]
            }
        },
        created() {
            this.requestInformation();
        },
        mounted() {
            var That = this;
            editor = new E(That.$refs.editor);
            editor.config.onchange = function(html){
                That.courseContent = html
            }
            editor.create()
            editor.txt.html(That.courseContent)
        },
        methods: {
            submitForm () {
                this.$axios.post('api/innovationApply/insertOneInnovation',{
                    content:this.courseContent,
                    teamId:this.teamId
                })
                .then(data => {
                    if (data.data.code == 200) {
                        this.$Message.success(data.data.msg);
                        this.declareModal = false
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },
            declareModalOpen (teamId) {
                this.declareModal = true
                this.teamId = teamId
            },
            // /team/deleteOneTeam 解散 参数：id 团队信息自增主键id
            deleteOneTeam (id) {
                this.$axios.post('api/team/deleteOneTeam',{id:id})
                .then(data => {
                    if (data.data.code == 200) {
                        this.$Message.success(data.data.msg);
                        this.requestInformation();
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },
            updateUserInfo () {
                this.$axios.put('api/user/updateUserInfo',{teamName:''})
                .then(data => {
                    if (data.data.code == 200) {
                        this.$Message.success(data.data.msg);
                        this.requestInformation();
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },
            handleClose(tag) {
                this.$confirm('此操作将移除团队成员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('api/team/logoutTeam',{id:tag.id})
                    .then(data => {
                        if (data.data.code == 200) {
                            this.$Message.success(data.data.msg);
                            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                        }else {
                            this.$Message.error(data.data.msg);
                        }
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },
            //获取待审核数据
            requestInformation () {
                this.$axios.post('api/team/selectByUserId',{id:''})
                .then(data => {
                    if (data.data.code == 200) {
                        this.data = data.data.data || {};
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });

                this.$axios.post('api/team/selectByCreateUserId',{id:''})
                .then(data => {
                    if (data.data.code == 200) {
                        this.creatData = data.data.data;
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });

                // this.$axios.post('api/team/selectUserByTeamName',{id:''})
                // .then(data => {
                //     if (data.data.code == 200) {
                //         this.creatData = data.data.data;
                //     }else {
                //         this.$Message.error(data.data.msg);
                //     }
                // });
            },
            selectUserByTeamName (name) {
                this.modal = true
                const param = {
                    teamName:name
                }
                this.$axios.put('api/team/selectUserByTeamName',param)
                .then(data => {
                    console.log(data);
                    if (data.data.code == 200) {
                        // this.lightUp ();
                        this.dynamicTags = data.data.data
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
.btns {
    margin: 10px 0;
}
.tags {
    margin: 10px;
}
</style>

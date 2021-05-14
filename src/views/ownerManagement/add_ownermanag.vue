<template>
    <Tabs type="card">
        <TabPane label="软件工程">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse>
        </TabPane>
        <TabPane label="计算机网络">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse>
        </TabPane>
        <TabPane label="数据结构">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse>
        </TabPane>
    </Tabs>
</template>
<script>
    export default {
        data() {
            return {
                activeNames: ['1'],
                nodataimgShow:false,
                passimgShow:false,
                nopassimgShow:false,
                getObjByCarOwnerData : [
                    {
                       vehiclePictures:[], 
                    }
                ],
                getCarInfoData: [
                    {
                       vehiclePictures:[], 
                    }
                ],
                getFailCarInfoData: [
                    {
                       vehiclePictures:[],
                    }
                ],
            }
        },
        created() {
            this.getObjByCarOwner();
            this.getCarInfo();
            this.getFailCarInfo();
        },
        methods: {
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
            //获取通过审核数据
            getCarInfo(){
                this.$axios.get('api/car/myCarInfo')
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.getCarInfoData = data.data.data;
                        this.passimgShow = true;
                    }else {
                        this.passimgShow = false;
                    }
                });
            },
            //获取为通过审核数据
            getFailCarInfo(){
                this.$axios.get('api/car/myFailCarInfo')
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.getFailCarInfoData = data.data.data;
                        this.nopassimgShow = true;
                    }else {
                        this.nopassimgShow = false;
                    }
                });
            },
            //删除
            cancel (licensePlateNumber) {
                const params = {
                    licensePlateNumber : licensePlateNumber,
                };
                this.$axios
                    .post('/api/authentication/deleteOneCarInfoPreprocess',params)
                    .then(data => {
                        if (data.data.code == 200) {
                            this.$Message.success(data.data.msg);
                            this.getObjByCarOwner();
                            this.getCarInfo();
                            this.getFailCarInfo();
                        }else {
                            this.$Message.error('删除失败');
                        }
                    }).catch(() => {
                        this.$Message.error('删除失败');
                    });
            }
        },
    }
</script>

<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.img-box {
    li {
        float: left;
        list-style: none;
        margin-right: 1%;
        width: 24%;
        height: 240px;
        p{
            margin-bottom: 10px;
        img {
            width: 100%;
            height: 100%;
            cursor: pointer;
            }
        }
    }
    .car-type {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 600;
        .cancel {
            color: red;
            cursor: pointer;
            float: right;
        }
    }
}
.nodata-img {
    width: 300px;
    img {
        width: 300px;
    }
}
</style>

<template>
    <div class="update-ass">
        <div class="mar-20">
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
            <el-button icon="el-icon-search" @click="getFlightData"></el-button>         
        </div>
        <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight"></Table>
        <div class="page">
            <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
        </div>
        <Modal
            v-model="modalCourseSubject"
            title="题目绑定"
            width=900
            :draggable="true"
            :footer-hide="true"> 
            <div>
                <div>已经绑定：</div>
                <div>
                    <el-tag
                        v-for="(tag,index) in checkedCities"
                        :key="index"
                        class="tags"
                        closable
                        @close="handleClose(tag)"
                        type="success">
                        {{tag}}
                    </el-tag>
                </div>
                <div>所有题目：</div>
                <div>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" :max="10" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="mar-20">
                    <el-button type="primary" @click="submitBind">确定绑定</el-button>
                </div>
            </div>
        </Modal>

        <Modal
            v-model="modalBadge"
            title="绑定完成课程徽章"
            width=900
            :draggable="true"
            :footer-hide="true"> 
            <div>
                <div>已经绑定：</div>
                <div>
                    <el-tag
                        v-for="(tag,index) in checkedBadge"
                        :key="index"
                        class="tags"
                        closable
                        @close="handleCloseBadge(tag)"
                        type="success">
                        {{tag}}
                    </el-tag>
                </div>
                <div>所有徽章：</div>
                <div>
                    <!-- <el-checkbox :indeterminate="isIndeterminateBadge" v-model="checkAll" @change="handleCheckAllChangeBadge">全选</el-checkbox> -->
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedBadge" :max="1" @change="handleCheckedBadgeChange">
                        <el-checkbox v-for="city in badgeAll" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="mar-20">
                    <el-button type="primary" @click="submitBindBadge">确定绑定</el-button>
                </div>
            </div>
        </Modal>
        <Modal
            v-model="modal"
            title="课程修改"
            width=900
            :draggable="true"
            :footer-hide="true">
      <el-form ref="assessData" class="modalh" status-icon :rules="rules" :model="assessData" label-width="80px">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="assessData.courseName" style="width:500px"></el-input><span class="day"></span>
          </el-form-item>   
          <el-form-item label="课程分类" prop="courseType">
            <el-select v-model="assessData.courseType" placeholder="请选择分类" style="width:500px">
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>  
          <el-form-item label="课程时长" prop="courseTime">
            <el-input v-model="assessData.courseTime" style="width:500px"></el-input><span class="day"></span>/ 分钟
          </el-form-item>        
          <el-form-item label="课程介绍" prop="courseDescription">
            <el-input v-model="assessData.courseDescription" type="textarea" maxlength="200" rows="4" show-word-limit style="width:500px"></el-input><span class="day"></span>
          </el-form-item>
          <el-form-item label="课程内容" prop="courseContent">
            <!-- <el-input v-model="assessData.rented" type="textarea" rows="10" style="width:500px"></el-input><span class="day"></span> -->
            <div ref="editor" style="text-align:left"></div>
          </el-form-item>

          <el-form-item label="课程图片" prop="file">
            <el-upload
              :multiple="true"
              action="api/file/uploadFile"
              ref="upload"
              :on-change="onchange"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="OnSuccess"
              :file-list="fileList"
              list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('assessData')">修改课程</el-button>
            <el-button @click="resetForm('assessData')">重置</el-button>
          </el-form-item>
      </el-form>
        </Modal>
    </div>
</template>

<script>
import E from 'wangeditor'
var editor;
export default {
    data() {
        return {
            courseId:'',
            fileList: [{url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            checkAll: false,
            checkedCities: [],
            cities: [],
            checkAllBadge: false,
            checkedBadge: [],
            badgeAll: [],
            isIndeterminate: true,
            isIndeterminateBadge: true,
            tags: [
                { name: '标签一'},
                { name: '标签二'},
                { name: '标签三'},
                { name: '标签四'},
                { name: '标签五'}
            ],

            dialogImageUrl: '',
            dialogVisible: false,
            assessData:{
                courseName:'',
                courseType:'',
                courseTime:'',
                courseDescription:'',
                courseContent:'',
                courseImgUrl:''
            },
            // 品牌
            brandOptions: [{
                value: '1',
                label: '创新课程'
            }, {
                value: '2',
                label: '创业课程'
            }],

            rules: {
                courseName: [
                { required: true, message: '请输入名称', trigger: 'change' },
                ],
                courseType: [
                { required: true, message: '请选择课程分类', trigger: 'change' },
                ],
                courseTime: [
                { required: true, message: '请输入时间', trigger: 'change' }
                ],
                courseDescription: [
                { required: true, message: '请输入简介', trigger: 'change' }
                ],
                courseContent: [
                { required: true, message: '请输入课程内容', trigger: 'change' }
                ],
            },

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
            title:'',
            assessData:{
                vehicleType:'',
                displacement:'',
                rented:'',
                profit:'',
            },
            modal:false,
            modalCourseSubject:false,
            modalBadge:false,
            loading: true,//是否加载状态
            tableHeight: '',//table高度
            pageData:[{
                courseName:'1',
                courseDescription:'88'
            }],//分页数据
            pantectTotalSize: 0,//总数据
            page:1,
            size:20,
            columns: [
                {
                    type: 'index',
                    title: '序号',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '课程名称',
                    key: 'courseName',
                    align: 'center',
                    ellipsis:true,
                    tooltip:true,
                },
                {
                    title: '课程分类',
                    key: 'courseType',
                    align: 'center',
                    ellipsis:true,
                    tooltip:true,
                },
                {
                    title: '课程介绍',
                    key: 'courseDescription',
                    align: 'center',
                    tooltip:true,
                },
                {
                    title: '操作栏',
                    key: 'action',
                    fixed: 'right',
                    width: 290,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.BadgeBind(params.row.id)
                                    }
                                }
                            }, '绑定徽章'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.CourseSubjectBind(params.row.id)
                                    }
                                }
                            }, '绑定题目'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.clickrow(params.row.id)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.deleteBatch(params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data: [],
            assessments:[]
        }
    },
    created() {
        var day = new Date();
        this.datevalue = day;
        this.getFlightData(); 
        this.getListAllData(); 
    },

      mounted() {
        var That = this;
        editor = new E(this.$refs.editor);
        editor.config.onchange = function(html){
            That.assessData.courseContent = html
        }
        editor.create()
    },
    methods:{
        submitBindBadge () {
            var arr = []
            this.checkedBadge.forEach(element => {
                arr.push(element.split('、')[0])
            });
            this.$axios.post('api/course/update',{
                id:this.courseId,
                badgeId:arr.toString()
            })
            .then(data => {
                this.modalBadge = false
            }); 
        },
        submitBind () {
            var arr = []
            console.log(this.checkedCities);
            this.checkedCities.forEach(element => {
                arr.push(element.split('、')[0])
            });
            this.$axios.post('api/subject/insertOrUpdateCourseSubject',{
                courseId:this.courseId,
                subjectIds:arr.toString()
            })
            .then(data => {
                this.modalCourseSubject = false
            }); 
        },
        getListAllData () {
            this.cities=[]
            this.$axios.post('api/subject/listAll',{
                title:''
            })
            .then(data => {
                data.data.data.forEach(element => {
                    console.log(element);
                    this.cities.push(element.id+"、"+element.title+'/A:'+element.sectionA+',B:'+element.sectionB+',C:'+element.sectionA+',D:'+element.sectionD) 
                });
            }); 

            this.badgeAll=[]
            this.$axios.get('api/badge/listAll')
            .then(data => {
                data.data.data.forEach(element => {
                    console.log(element);
                    this.badgeAll.push(element.id+"、"+element.name) 
                });
            });
        },
        handleClose(tag) {
            this.checkedCities.splice(this.checkedCities.indexOf(tag), 1);
        },
        handleCloseBadge(tag) {
            this.checkedBadge.splice(this.checkedBadge.indexOf(tag), 1);
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities.concat() : [];
            this.isIndeterminate = false;
        },
        handleCheckAllChangeBadge(val) {
            this.checkedBadge = val ? this.badgeAll.concat() : [];
            this.isIndeterminateBadge = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        handleCheckedBadgeChange(value) {
            let checkedCount = value.length;
            this.checkAllBadge = checkedCount === this.badgeAll.length;
            this.isIndeterminateBadge = checkedCount > 0 && checkedCount < this.badgeAll.length;
        },
        BadgeBind (id) {
            this.modalBadge = true
            this.courseId = id
        },

        CourseSubjectBind (id) {
            this.modalCourseSubject = true
            this.courseId = id
        },
        deleteBatch (id) {
            this.$axios.post('api/course/deleteBatch',{
                ids:[id]
            })
            .then(data => {
                this.getFlightData();
            }); 
        },
        onchange(file,filesList) {
        //创建临时的路径来展示图片
        var windowURL = window.URL || window.webkitURL;
        this.src=windowURL.createObjectURL(file.raw);
        //重新写一个表单上传的方法
        this.param = new FormData();
        this.doUpload = true;
        // this.param.append('file', file.raw, file.name);
        for(var i = 0;i<filesList.length;i++) {
          this.param.append('file', filesList[i].raw, filesList[i].name);
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      OnSuccess(file, fileList){
        console.log(file, fileList,'成功');
        this.assessData.courseImgUrl = file.data
      },

      submitForm(assessData) {
        this.$refs[assessData].validate((valid) => {
          if (valid) {
            this.$axios
                .post('/api/course/update',this.assessData)
                .then(data => {
                  this.$Message.success(data.data.msg);
                  // this.resetForm(assessData);
                  this.modal = false
                }).catch(() => {
                  this.$Message.error('获取失败');
                  return;
                });
          } else {
            return false;
          }
        });
      },
      resetForm(assessData) {
        this.$refs[assessData].resetFields();
      },
        getFlightData () {
            this.$axios.post('api/course/listCourseByCondition',this.course)
            .then(data => {
                this.loading = false;
                if(data.data.code == 200){
                    if (data.data.msg == '暂无相关数据') {
                        console.log(111111111);
                        this.data = data.data.data || [];
                        this.pantectTotalSize = 0;
                        this.paging(this.data,this.page,this.size);
                    }else {
                        console.log(2222222222);
                        this.data = data.data.data || [];
                        this.pantectTotalSize = data.data.data.length;
                        this.paging(this.data,this.page,this.size);
                    }
                }else {
                    this.$Message.error(data.data.msg);
                }
            }); 
        },
        // 控制表分页
        paging (number,page,size) {
            var startIndex = (page-1) * size;
            var endIndex = page * size;
            this.pageData = number.slice(startIndex,endIndex);
            if(this.pageData.length > 10){
                this.tableHeight = 520;
            }else{
                this.tableHeight = 0;
            }
        },
        // 改变page
        changePage (val) {
            this.page = val;
            this.paging (this.data,this.page,this.size);
        },
        //改变size
        changeSize (val) {
            this.size = val;
            this.paging (this.data,this.page,this.size);
        },
        clickrow (id) {
            var _this = this
            this.modal = true;
            this.$axios.post('api/course/selectById',{
                id:id
            })
            .then(data => {
                this.assessData = data.data.data
                editor.txt.html(data.data.data.courseContent)
                _this.fileList[0].url = data.data.data.courseImgUrl
            }); 
        },
        submitUpdate () {
            this.$axios
                .put('/api/vehicleTypeRented/updateOne',this.assessData)
                .then(data => {
                  this.$Message.success(data.data.msg);
                  this.getFlightData();
                  this.modal = false;
                }).catch(() => {
                  this.$Message.error('修改失败');
                  return;
                });
        }
    },
}
</script>

<style lang="less" scoped>
.page {
    margin-top: 10px;
    text-align: center;
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
.day {
    font-size: 18px;
    margin-left: 5px;
}
.mar-20 {
    margin: 10px 0;
}
.tags {
    margin: 10px;
}
.modalh {
    height: 600px;
    overflow-y: auto;
}
.mar-20 {
    margin: 10px;
}
</style>
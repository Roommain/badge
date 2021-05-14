<template>
    <div class="update-carrental">
        <div class="mar-20">
            <el-input placeholder="请输入题目名称" style="width: 300px" v-model="title">
                
            </el-input> 
            <el-button icon="el-icon-search" @click="getCarData"></el-button>            
        </div>
        <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight"></Table>
        <div class="page">
            <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
        </div>
        <Modal
            v-model="modal"
            title="修改"
            width=700
            :draggable="true"
            :footer-hide="true">
            <div class="clearfix">
                <el-form ref="assessData" status-icon :rules="rules" :model="assessData" label-width="80px">
                    <el-form-item label="题目名称" prop="title">
                        <el-input v-model="assessData.title" style="width:500px"></el-input><span class="day"></span>
                    </el-form-item>        
                    <el-form-item label="选项 A." prop="sectionA">
                        <el-input v-model="assessData.sectionA" style="width:500px"></el-input><span class="day"></span>
                    </el-form-item>
                    <el-form-item label="选项 B." prop="sectionB">
                        <el-input v-model="assessData.sectionB" style="width:500px"></el-input><span class="day"></span>
                    </el-form-item>
                    <el-form-item label="选项 C." prop="sectionC">
                        <el-input v-model="assessData.sectionC" style="width:500px"></el-input><span class="day"></span>
                    </el-form-item>
                    <el-form-item label="选项 D." prop="sectionD">
                        <el-input v-model="assessData.sectionD" style="width:500px"></el-input><span class="day"></span>
                    </el-form-item>
                    <el-form-item label="答案" prop="correctSection">
                            <el-select v-model="assessData.correctSection" placeholder="请选择答案" style="width:500px">
                            <el-option
                                v-for="item in brandOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            </el-select>
                    </el-form-item>   
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('assessData')">新建题目</el-button>
                        <el-button @click="resetForm('assessData')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
        title:'',
        brandOptions:[{
        value: 'A',
        label: 'A'
      }, {
        value: 'B',
        label: 'B'
      }, {
        value: 'C',
        label: 'C'
      }, {
        value: 'D',
        label: 'D'
      }],
      assessData:{
        id:'',
        title:'',
        sectionA:'',
        sectionB:'',
        sectionC:'',
        sectionD:'',
      },
      rules: {
        title: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
        sectionA: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        sectionB: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        sectionC: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        sectionD: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
      },
        modal:false,
        carData:{
            licensePlateNumber:'',
            city:'',
            carYear:'',
            gasolineType:'',//车油93，97
            vehicleDescription:'',//车辆描述
            vehicleRemark:'',//用车备注
            vehiclePictures:['',''],
        },
        licensePlateNumberArr:[],
        loading: true,//是否加载状态
        tableHeight: '',//table高度
        pageData:[],//分页数据
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
            title: '题目名称',
            key: 'title',
            align: 'center',
            ellipsis:true,
            tooltip:true,
        },
        {
            title: '选项A',
            key: 'sectionA',
            align: 'center',
            ellipsis:true,
            tooltip:true,
        },
        {
            title: '选项B',
            key: 'sectionB',
            align: 'center',
            ellipsis:true,
            tooltip:true,
        },
        {
            title: '选项C',
            key: 'sectionC',
            align: 'center',
            ellipsis:true,
            tooltip:true,
        },
        {
            title: '选项D',
            key: 'sectionD',
            align: 'center',
            ellipsis:true,
            tooltip:true,
        },
        {
            title: '答案',
            key: 'correctSection',
            align: 'center',
            tooltip:true,
        },
        {
            title: '操作栏',
            key: 'action',
            fixed: 'right',
            width: 160,
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
                                this.batchDeleteSubject(params.row.id)
                            }
                        }
                    }, '删除')
                ]);
            }
        }
      ],
    }
  },
  created() {
    this.getCarData();
  },
  methods:{
    //   /subject/batchDeleteSubject 批量或者单个删除 参数：ids:[1,2,3]
    batchDeleteSubject (id) {
        this.$axios.post('api/subject/batchDeleteSubject',{
            ids:[id]
        })
        .then(data => {
            this.getCarData();
        }); 
    },
    getCarData () {
        this.$axios.post('api/subject/listAll',{
            title:this.title
        })
        .then(data => {
            this.loading = false;
            if(data.data.code == 200){
              console.log(data);
              if (data.data.msg == '暂无相关数据') {
                  this.data = data.data.data || [];
                  this.pantectTotalSize = 0;
                  this.paging(this.data,this.page,this.size);
              }else {
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
        this.modal = true;
        this.$axios.post('api/subject/selectById',{
            id:id
        })
        .then(data => {
            this.assessData = data.data.data
        }); 
    },
    submitForm(assessData) {
    this.$refs[assessData].validate((valid) => {
        if (valid) {
        this.$axios
            .post('/api/subject/updateSubject',this.assessData)
            .then(data => {
                this.$Message.success(data.data.msg);
                this.resetForm(assessData);
                this.modal = false;
                this.getCarData();
            }).catch(() => {
                this.$Message.error('失败');
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
  },
}
</script>

<style  lang="less">
.page {
    margin-top: 10px;
    text-align: center;
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
.modal-form {
    width: 400px;
}
.modal-img {
    width: 250px;
    img {
        width: 250px;
        height: 150px;
    }
}
.modal-img,.modal-form {
    float: left;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.mar-20 {
    margin: 10px 0;
}
</style>
<template>
  <div class="car-rental">
    <el-card class="box-card">
      <el-divider><i class="el-icon-mobile-phone"></i>获得徽章</el-divider>
      <div class="img-box" v-show="carRentalShow">
        <el-row :gutter="10">
          <el-col :span="4" v-for="(item,idx) in pageData" :key='idx'>
            <div class="grid-content bg-purple">
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
      <div class="nodata-img" v-show="!carRentalShow">
        <img src="../../../static/img/timg.jpg" alt="" />
      </div>
      <div class="page">
        <el-divider><i class="el-icon-mobile-phone"></i>徽章类型</el-divider>
        <div>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div>
                  <img
                    src="../../../static/huizhang/meteorite-small.png"
                    alt=""
                  />
                </div>
                <span>陨石 徽章很常见,容易在刚开始学习时获得</span>
              </div>
            </el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div>
                  <img src="../../../static/huizhang/moon-small.png" alt="" />
                </div>
                <span>月亮 徽章较稀有,代表了你在学习上的投入</span>
              </div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div>
                  <img src="../../../static/huizhang/earth-small.png" alt="" />
                </div>
                <span>地球 徽章很罕见,需要大量的学习来获得.</span>
              </div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div>
                  <img src="../../../static/huizhang/sun-small.png" alt="" />
                </div>
                <span
                  >太阳 徽章是史诗级别的.
                  要获取太阳徽章需要经历真正的挑战和做出巨大的奉献.</span
                >
              </div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div>
                  <img
                    src="../../../static/huizhang/eclipse-small.png"
                    alt=""
                  />
                </div>
                <span>黑洞 徽章是一个未知的传奇,是最稀有的可汗学院奖励</span>
              </div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div>
                  <img
                    src="../../../static/huizhang/master-challenge-blue-small.png"
                    alt=""
                  />
                </div>
                <span>挑战徽章 是完成主题挑战的特别奖项.</span>
              </div></el-col
            >
          </el-row>
        </div>

        <!-- <div v-for="(item,index) in allData" :key='index'> -->
          <el-divider><i class="el-icon-mobile-phone"></i>普通徽章</el-divider>
          <div>
            <el-row :gutter="100">
              <el-col :span="8" v-for="(item1,index1) in allData" :key='index1'>
                <div class="grid-content bg-purple">
                  <el-card class="box-card" v-if="item1.flag == 0">
                    <el-row>
                      <el-col :span="8"
                        ><div>
                          <img
                          class="imgsize"
                            :src='item1.image'
                            alt=""
                          /></div
                      ></el-col>
                      <el-col :span="16"
                        ><div class="left-p">
                          <h6>{{item1.name}}</h6>
                        </div></el-col
                      >
                    </el-row>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>
        <!-- </div> -->
          <el-divider><i class="el-icon-mobile-phone"></i>奖励徽章</el-divider>
          <div>
            <el-row :gutter="100">
              <el-col :span="8" v-for="(item1,index1) in allData" :key='index1'>
                <div class="grid-content bg-purple">
                  <el-card class="box-card" v-if="item1.flag == 1">
                    <el-row>
                      <el-col :span="8"
                        ><div>
                          <img
                            class="imgsize"
                            :src='item1.image'
                            alt=""
                          /></div
                      ></el-col>
                      <el-col :span="16"
                        ><div class="left-p">
                          <h6>{{item1.name}}</h6>
                        </div></el-col
                      >
                    </el-row>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>
      </div>
    </el-card>
    <Footer />
    <div></div>
  </div>
</template>

<script>
import Footer from "@/components/footer";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      carRentalShow: true,
      pantectTotalSize: 0,
      page: 1,
      size: 20,
      pageData: [
        {image:'../../../static/huizhang/eclipse-small.png',name:'入门',title:'第一个'},
        {image:'../../../static/huizhang/moon-small.png',name:'入门',title:'第三个'},
      ],
      imgData: [],
      allData:[],
      arr:[
        {
          divider:'陨石 徽章徽章',
          children:[
            {src:'../../../static/huizhang/eclipse-small.png',name:'入门',title:'第一个'},
            {src:'../../../static/huizhang/eclipse-small.png',name:'入门',title:'第二个'},
            {src:'../../../static/huizhang/eclipse-small.png',name:'入门',title:'第三个'},
            {src:'../../../static/huizhang/eclipse-small.png',name:'入门',title:'第四个'},
            {src:'../../../static/huizhang/eclipse-small.png',name:'入门',title:'第五个'},
            {src:'../../../static/huizhang/eclipse-small.png',name:'入门',title:'第六个'},            
          ],
        },
        {
          divider:'月亮 徽章徽章',
          children:[
            {src:'../../../static/huizhang/moon-small.png',name:'入门',title:'第一个'},
            {src:'../../../static/huizhang/moon-small.png',name:'入门',title:'第二个'},
            {src:'../../../static/huizhang/moon-small.png',name:'入门',title:'第三个'},
            {src:'../../../static/huizhang/moon-small.png',name:'入门',title:'第四个'},
            {src:'../../../static/huizhang/moon-small.png',name:'入门',title:'第五个'},
            {src:'../../../static/huizhang/moon-small.png',name:'入门',title:'第六个'},            
          ],
        },
        {
          divider:'太阳 徽章徽章',
          children:[
            {src:'../../../static/huizhang/sun-small.png',name:'入门',title:'第一个'},
            {src:'../../../static/huizhang/sun-small.png',name:'入门',title:'第二个'},
            {src:'../../../static/huizhang/sun-small.png',name:'入门',title:'第三个'},
            {src:'../../../static/huizhang/sun-small.png',name:'入门',title:'第四个'},
            {src:'../../../static/huizhang/sun-small.png',name:'入门',title:'第五个'},
            {src:'../../../static/huizhang/sun-small.png',name:'入门',title:'第六个'},            
          ],
        },
      ]
    };
  },
  created() {
    this.getCarAll();
  },
  computed: {
    /**
     * 封装进行状态修改的方法
     * @param {Object} obj 当前渲染的对象
     */
    newAutoOrHand() {
      return function (obj) {
        if (obj == 0) {
          return "手动挡";
        } else if (obj == 1) {
          return "自动挡";
        }
      };
    },
  },
  methods: {
    particulars(licensePlateNumber) {
      // this.$Message.warning(licensePlateNumber);
      this.$router.push({
        name: "租车详情",
        params: {
          licensePlateNumber: licensePlateNumber,
        },
      });
    },
    getCarAll() {
      this.page = 1;
      this.$axios.get("api/badge/listAllByTel").then((data) => {
        if (data.data.code == 200) {
          this.imgData = data.data.data || [];
          if (data.data.msg == "暂无相关数据") {
            this.carRentalShow = false;
            this.pantectTotalSize = 0;
            this.paging(this.imgData, this.page, this.size);
          } else {
            this.carRentalShow = true;
            this.pantectTotalSize = data.data.data.length;
            this.paging(this.imgData, this.page, this.size);
          }
        } else {
          this.$Message.error(data.data.msg);
        }
      });

      this.$axios.get("api/badge/listAll").then((data) => {
        this.allData = data.data.data
      });
    },
    // 控制表分页
    paging(number, page, size) {
      var startIndex = (page - 1) * size;
      var endIndex = page * size;
      this.pageData = number.slice(startIndex, endIndex);
    },
    // 改变page
    changePage(val) {
      this.page = val;
      this.paging(this.imgData, this.page, this.size);
    },
  },
};
</script>

<style lang="less" scoped>
.car-rental {
  margin: 0 50px;
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .car-p {
    span {
      margin-right: 5px;
    }
  }
  .img-box {
    li {
      float: left;
      list-style: none;
      margin-right: 1%;
      width: 24%;
      height: 290px;
      p {
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 200px;
          cursor: pointer;
        }
      }
    }
    .car-type {
      font-size: 14px;
      // font-weight: 700;
    }
    .car-price {
      color: red;
      font-size: 14px;
      span {
        font-weight: 800;
      }
    }
  }
  .page {
    text-align: center;
  }
}
.nodata-img {
  width: 300px;
  img {
    width: 300px;
  }
}

.grid-content {
  margin-bottom: 20px;
}
.left-p {
  text-align: left;
}
.h5,h6 {
  line-height: 45px;
}
.imgsize {
  width: 40px;
  height: 40px;
}
</style>

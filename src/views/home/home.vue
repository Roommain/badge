<template>
    <div class="home">
        <el-carousel :interval="3000" type="card" height="500px">
            <el-carousel-item v-for="(item,index) in imgs" :key="index">
                <img class="img" :src="item.src" alt="">
            </el-carousel-item>
        </el-carousel> 
        <div class="classify">
            <div class="short">
                <p class="title">创新创业项目申报</p>
                <p class="text">学生填写信息，添加证明的附件</p>
            </div>
            <div class="short long">
                <p class="title">创新创业比赛申报</p>
                <p class="text">学生填写比赛信息，添加获得的奖状之类的附件</p>
            </div>
        </div>
        <ul>
            <li class="image-panel-item1">
                <h3>学习</h3>
                <p>周末带着室友一起学习</p>
                <p>感悟学习乐趣</p>
                <p>找到学习方法</p>
                <p>收获满满的幸福。</p>
            </li>
            <li class="image-panel-item2">
                <h3>徽章</h3>
                <p>每天获取相要的徽章，</p>
                <p>连续学习是个不错的选择,</p>
                <p>有你所喜</p>
                <p>平淡的周末添一抹亮色。</p>
            </li>
            <li class="image-panel-item3">
                <h3>个人</h3>
                <p>查看个人主页</p>
                <p>收藏徽章</p>
                <p>学习重知识</p>
                <p>助您在学习中取得成功。</p>
            </li>
            <li class="image-panel-item4">
                <h3>评价</h3>
                <p>系统对你评价</p>
                <p>想要尝试体验更多新鲜感，</p>
                <p>了解自己实力</p>
                <p>提升评价</p>
            </li>
        </ul>
        <!-- <Footer/> -->
    </div>
</template>

<script>
import Footer from '@/components/footer';
export default {
    components: {
        Footer
    },
    data() {
        return {
            imgs:[
                {src:'/static/huizhang/1.jpg'},
                {src:'/static/huizhang/2.jpg'},
                {src:'/static/huizhang/3.jpg'},
                {src:'/static/huizhang/4.jpg'},
                {src:'/static/huizhang/5.jpg'},
                {src:'/static/huizhang/6.jpg'},
            ]
        }
    },
}
</script>

<style lang="less" scoped>
.home {
    .img {
        width: 100%;
        height: 100%;
    }
    .classify {
        position: relative;
        display: flex;
        justify-content:space-between;
        z-index: 999;
        top: -60px;
        left: 50%;
        margin-left: -450px;
        width: 900px;
        // height: 300px;
        color: #fff;
        .short {
            width: 430px;
            height: 220px;
            background-color: #07cc7b;
            box-shadow: 0 15px 30px 0 rgba(0,192,107,.3);
            transition:all 0.4s ease;
            cursor: pointer;
            p {
                text-align: center;
                line-height: 50px;
            }
            .title {
                font-size: 24px;
                margin-top: 40px;
            }
            .text {
                font-size: 12px;
            }
        }
        .long {
            background-color: #2a8ef5;
            box-shadow: 0 15px 30px 0 rgba(17,97,229,.3);
        }
        .short:hover {
            transform: scale(1.15);
        }
    }
    ul {
        // position: relative;
        display: flex;
        justify-content:space-between;
        // top: -160px;
        width: 1200px;
        // height: 500px;
        margin: 0 auto;
        li {
            list-style: none;
            float: left;
            width: 245px;
            height: 350px;
            margin-right: 15px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            padding-left: 20px;
            opacity: .9;
            color: #fff;
            font-size: 12px;
            border-radius: 2px;   
            h3 {
                margin-top: 200px;
                font-size: 20px;
            }         
        }
        .image-panel-item1 {
            background-image: url('/static/huizhang/1.jpg');
        }
        .image-panel-item2 {
            background-image: url('/static/huizhang/2.jpg');
        }
        .image-panel-item3 {
            background-image: url('/static/huizhang/3.jpg');
        }
        .image-panel-item4 {
            background-image: url('/static/huizhang/4.jpg');
        }
    }
}


</style>

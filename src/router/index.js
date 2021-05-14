import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie';
import axios from 'axios' //引入axios
Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/collect'
    },
    {
      path: '/main',
      name: '主页',
      component: resolve => require(['@/views/main/main'], resolve),
      redirect: '/home',
      children:[
        {
            path: '/home',
            name: '首页',
            component: resolve => require(['@/views/home/home'], resolve),
        },
        {
          path: '/collect',
          name: '徽章',
          // meta: {
          //   permissions: true,
          // },
          component: resolve => require(['@/views/main/collect'], resolve),
        },
        // {
        //     path: '/owner',
        //     name: '成为车主',
        //     component: resolve => require(['@/views/main/owner'], resolve),
        // },
        // {
        //     path: '/carRental',
        //     name: '我要租车',
        //     component: resolve => require(['@/views/main/carRental'], resolve),
        // },
        {
          path: '/assess',
          name: '评估',
          meta: {
            permissions: true,
          },
          component: resolve => require(['@/views/main/assess'], resolve),
        },
        // {
        //   path: '/carRentalParticulars',
        //   name: '租车详情',
        //   component: resolve => require(['@/views/main/carRentalParticulars'], resolve),
        // },
        {
            path: '/login',
            name: '登录',
            component: resolve => require(['@/views/login/login'], resolve),
        },
        {
            path: '/register',
            name: '注册',
            component: resolve => require(['@/views/register/register'], resolve),
        },
        {
            path: '/findPassword',
            name: '找回密码',
            component: resolve => require(['@/views/findPassword/findPassword'], resolve),
        },
        {
          path: '/message_main',
          name: '个人中心',
          redirect: '/userinfo',
          meta: {
            permissions: true,
          },
          component: resolve => require(['@/views/user_message/message_main'], resolve),
          children:[
            {
              path: '/changePassword',
              name: '修改密码',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/userChangePassword'], resolve),
            },
            {
              path: '/userinfo',
              name: '我的信息',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/userinfo'], resolve),
            },
            {
              path: '/my_badge',
              name: '我的徽章',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/my_badge'], resolve),
            },
            {
              path: '/game_declare',
              name: '创新创业比赛申报',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/game_declare'], resolve),
            },
            // {
            //   path: '/balanceEnquiry',
            //   name: '余额查询',
            //   meta: {
            //     permissions: true,
            //   },
            //   component: resolve => require(['@/views/user_message/balanceEnquiry'], resolve),
            // },
            // {
            //   path: '/orderInformation',
            //   name: '租客订单',
            //   meta: {
            //     permissions: true,
            //   },
            //   component: resolve => require(['@/views/user_message/orderInformation'], resolve),
            // },
            // {
            //   path: '/ownerOrderInformation',
            //   name: '车主订单',
            //   meta: {
            //     permissions: true,
            //   },
            //   component: resolve => require(['@/views/user_message/ownerOrderInformation'], resolve),
            // },
            // {
            //   path: '/certificate',
            //   name: '证件实名',
            //   meta: {
            //     permissions: true,
            //   },
            //   component: resolve => require(['@/views/user_message/certificate'], resolve),
            // },
          ]
        },
        {
          path: '/backstage',
          name: '后台管理',
          component: resolve => require(['@/views/backstage/backmain'], resolve),
          children:[
            //审核
            {
              path: '/drivinglicence',
              name: '创新创业比赛',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/audit/audit'], resolve),
            },
            {
              path: '/auditcar',
              name: '创新创业项目',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/audit/auditcar'], resolve),
            },
            {
              path: '/StudentInformation',
              name: '学生信息',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/ownercaraudit/ownercaraudit'], resolve),
            },
            {
              path: '/addBadge',
              name: '新增徽章',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/ownerManagement/addBadge'], resolve),
            },
            //课程管理
            {
              path: '/addassessment',
              name: '录入课程',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/car_assessment/add_assessment'], resolve),
            },
            {
              path: '/deleteassessment',
              name: '删除课程',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/car_assessment/delete_assessment'], resolve),
            },
            {
              path: '/updateassessment',
              name: '课程列表',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/car_assessment/update_assessment'], resolve),
            },
            //测试管理
            {
              path: '/addcarrental',
              name: '增加测试',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/carrental/add_carrental'], resolve),
            },
            {
              path: '/updatecarrental',
              name: '测试列表',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/carrental/update_carrental'], resolve),
            },
            {
              path: '/deletecarrental',
              name: '删除测试',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/carrental/delete_carrental'], resolve),
            },
            //订单管理
            {
              path: '/queryOrder',
              name: '订单查询',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/order/queryOrder'], resolve),
            },
            {
              path: '/disposeCar',
              name: '处理还车',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/order/disposeCar'], resolve),
            },
            {
              path: '/changeCar',
              name: '处理换车',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/order/changeCar'], resolve),
            },
          ]
        },
        {
          path: '/ownermanagement',
          name: '学习管理',
          component: resolve => require(['@/views/ownerManagement/course_main'], resolve),
          children:[
            {
              path: '/learning',
              name: '学习',
              component: resolve => require(['@/views/ownerManagement/add_ownermanag'], resolve),
            },
            {
              path: '/test',
              name: '测试',
              component: resolve => require(['@/views/ownerManagement/state_management'], resolve),
            },
            {
              path: '/my_course',
              name: '我的课程',
              component: resolve => require(['@/views/ownerManagement/my_course'], resolve),
            },
            {
              path: '/course_all',
              name: '全部课程',
              component: resolve => require(['@/views/ownerManagement/course_all'], resolve),
            },
          ]
        },
        {
          path: '/beginLearn',
          name: '开始学习',
          component: resolve => require(['@/views/ownerManagement/beginLearn'], resolve),
        },
        {
          path: '/teammain',
          name: '团队管理',
          component: resolve => require(['@/views/ownerManagement/team_main'], resolve),
          children:[
            {
              path: '/team',
              name: '加入团队',
              component: resolve => require(['@/views/ownerManagement/team'], resolve),
            },
            {
              path: '/myteam',
              name: '我的团队',
              component: resolve => require(['@/views/ownerManagement/my_team'], resolve),
            },
            {
              path: '/createteam',
              name: '创建团队',
              component: resolve => require(['@/views/ownerManagement/create_team'], resolve),
            },
            {
              path: '/application',
              name: '创新创业项目申报',
              component: resolve => require(['@/views/ownerManagement/application'], resolve),
            },
          ]
        },
      ]
    },

  ]
})

let startTime = Date.now()
let currentTime
router.beforeEach((to, from, next) => {
  console.log(from.path);
  if (from.path == '/learning') {
    currentTime = Date.now()
    console.log('startTime = ', startTime)
    console.log('用户由 ', from.path, ' 页面 跳转到 ', to.path, ' 页面，在 ', from.path, ' 页面停留了 ', currentTime - startTime, '毫秒。转换成秒数约为：', parseInt((currentTime - startTime) / 1000))
    let times =  parseInt((currentTime - startTime) / 1000)
    axios.post('api/user/updateStudyTime',{
      studyTime:times
    })
    .then(data => {
        console.log(data,'data')
    });
    startTime = Date.now()
  }
  if(to.meta.permissions){
    var token = cookie.get('userName');
    if(token){
      next();
    }else{
      next({
        name: "登录", path:'/login',
      });
      // Vue.prototype.$Message.warning('请先登录');
    }
  }else{
    next();
  }
});
export default router;

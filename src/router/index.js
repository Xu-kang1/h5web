import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Loan from '../views/loan'
const AboutUs = resolve => require(['../views/aboutUs'], resolve)
const Shop = resolve => require(['../views/shop'], resolve)
const List = resolve => require(['../views/list/list'], resolve)
const Adress = resolve => require(['../views/adress/adress'], resolve)
const perCenter = resolve => require(['../views/perCenter/perCenter'], resolve)
const perCenter_ = resolve => require(['../views/perCenter_/perCenter.vue'], resolve)
const Details = resolve => require(['../views/details/details'], resolve)
const Rule = resolve => require(['../views/rule/rule'], resolve)
const MyScore = resolve => require(['../views/myScore/myScore'], resolve)
const SignIn = resolve => require(['../views/signIn/signIn'], resolve)
const ScoreGain = resolve => require(['../views/scoreGain/scoreGain'], resolve)
// 论坛相关页面H5
const ForumPage = resolve => require(['../views/forum/home'], resolve)
const ForumDetail = resolve => require(['../views/forum/detail'], resolve)
const Message = resolve => require(['../views/forum/message'], resolve)
const ShowMore = resolve => require(['../views/forum/moreModel'], resolve)
const ModelDetail = resolve => require(['../views/forum/modelDetail'], resolve)
const AddCard = resolve => require(['../views/forum/addCard'], resolve)
const loginXmd = resolve => require(['../views/forum/login'], resolve)
const TextDemo = resolve => require(['../views/forum/upLoad'], resolve)
const UserCenter = resolve => require(['../views/forum/userCenter'], resolve)
const NickName = resolve => require(['../views/forum/nickname'], resolve)
// 论坛相关页面Android
const ForumPageA = resolve => require(['../views/forum_Android/home'], resolve)
const ForumDetailA = resolve => require(['../views/forum_Android/detail'], resolve)
const MessageA = resolve => require(['../views/forum_Android/message'], resolve)
const AddCardA = resolve => require(['../views/forum_Android/addCard'], resolve)
// 
const Login = resolve => require(['../views/login/login'], resolve)
const Login_ = resolve => require(['../views/login/login_'], resolve)
const Group = resolve => require(['../views/login/join'], resolve)
const Index = resolve => require(['../views/index/index'], resolve)
//
const Loan = resolve => require(['../views/others/Loan.vue'], resolve)
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savePosition) {
    console.log(savePosition)
    if (savePosition) {
      // alert(savePosition)
      return savePosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop
    },
    {// PC主页
      path: '/index',
      component: Index
    },
    {// 关于我们
      path: '/aboutus',
      component: AboutUs
    },
    {// 商城
      path: '/shop',
      component: Shop
    },
    {// 积分商城查看等多列表
      path: '/list',
      component: List
    },
    {// 收货地址
      path: '/adress',
      component: Adress
    },
    {// 个人中心
      path: '/perCenter',
      component: perCenter
    },
     {// 个人中心_new
      path: '/perCenter_',
      component: perCenter_
    },
    {// 商品详情
      path: '/details',
      component: Details
    },
    {// 签到规则
      path: '/rule',
      component: Rule
    },
    {// 我的积分
      path: '/myScore',
      component: MyScore
    },
    {// 签到
      path: '/signIn',
      component: SignIn
    },
    {// 积分规则
      path: '/scoreGain',
      component: ScoreGain
    },
    {// 论坛主页
      path: '/forum',
      name: 'ForumPage',
      component: ForumPage
      // meta: {
      //   keepAlive: true
      // }
    },
    {// xmd H5登陆页
      path: '/xmd_login',
      component: loginXmd
    },
    {// 帖子详情
      path: '/mainNote',
      name: 'ForumDetail',
      component: ForumDetail
    },
    {// 对应模块
      path: '/moduleDetail',
      component: ModelDetail
    },
    {// 我的消息
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        keepAlive: true
      }
    },
    {// 更多模块
      path: '/showMore',
      component: ShowMore
    },
    {// 发帖
      path: '/AddCard',
      component: AddCard
    },
    {// 个人中心
      path: '/userCenter',
      component: UserCenter
    },
    {// 修改昵称
      path: '/nickName',
      component: NickName
    },
    // forum_Android
     {// 论坛主页
      path: '/forum_',
      component: ForumPageA
      // meta: {
      //   keepAlive: true
      // }
    },
    {// 帖子详情
      path: '/mainNote_',
      name: 'ForumDetailA',
      component: ForumDetailA
    },
    {// 我的消息
      path: '/message_',
      name: 'MessageA',
      component: MessageA,
      meta: {
        keepAlive: true
      }
    },
    {// 发帖
      path: '/AddCard_',
      component: AddCardA
    },
    //
    {
      path: '/textDemo',
      component: TextDemo
    },
    {// 落地页
      path: '/login',
      component: Login
    },
     {// 落地页2
      path: '/login_',
      component: Login_
    },
    {// 加群
      path: '/group',
      component: Group
    },
    {// 借款
      path: '/loan',
      component: Loan
    }
  ]
})

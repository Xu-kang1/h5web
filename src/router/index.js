import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Loan from '../views/loan'
const AboutUs = resolve => require(['../views/aboutUs'], resolve)
// xmd新版关于我们
const About = resolve => require(['../views/others/xmd-aboust-us'], resolve)
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
const ScoreRule = resolve => require(['../views/rule/scoreRule'], resolve)
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
const LoginType = resolve => require(['../views/login/login_type1'], resolve)
const Group = resolve => require(['../views/login/join'], resolve)
const Index = resolve => require(['../views/index/index'], resolve)
//
const Loan = resolve => require(['../views/others/Loan'], resolve)
const FbLoan = resolve => require(['../views/others/fb_loan.vue'], resolve)
// 分享
const Products = resolve => require(['../views/share/share_products'], resolve)
// h5首页Tab列表
const Speed = resolve => require(['../views/xmdTabDetail/jisuxiaoe'], resolve)
const NoCheck = resolve => require(['../views/xmdTabDetail/buchazhengxin'], resolve)
// 借款H5页
const borrow = resolve => require(['../views/borrow/borrow.vue'], resolve)
// 精准推荐
const promote = resolve => require(['../views/borrow/promote.vue'], resolve)
const DownApp = resolve => require(['../views/list/appDown'], resolve)
// 防爆专家-意见反馈
const FeedBack = resolve => require(['../views/fbzj/FeedBack.vue'], resolve)
const ProcessDetails = resolve => require(['../views/fbzj_add/ProcessDetails'], resolve)
const fBJoin = resolve => require(['../views/fbzj_add/fb_join'], resolve)
const MyAccount = resolve => require(['../views/fbzj_add/MyAccount'], resolve)
const LandingPage = resolve => require(['../views/fbzj_add/fb_landingPage'], resolve)
const fBShare = resolve => require(['../views/fbzj_add/share'], resolve)
// 平台协议
const Agreement = resolve => require(['../views/fbzj_add/Agreement'], resolve)
// 提现相关页面
const Records = resolve => require(['../views/fbzj_add/fb_record'], resolve)
const RecordsDetails = resolve => require(['../views/fbzj_add/fb_recordDetail'], resolve)
const CashDrawal = resolve => require(['../views/fbzj_add/fb_tixian'], resolve)

// 新手红包
const NewerAwardActivity = resolve => require(['../views/inviteFriends/NewerAwardActivity'], resolve)
// 星美贷-邀请好友领红包
const InviteFriends = resolve => require(['../views/inviteFriends/InviteFriends'], resolve)
Vue.use(Router)

const router = new Router({
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
    {// PC主页
      path: '/',
      component: Index
    },
    {// 关于我们
      path: '/aboutus',
      component: AboutUs
    },
    {// 新版关于我们
      path: '/about',
      component: About
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
      component: perCenter,
      meta: { title: '个人中心' }
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
    {// 积分记录
      path: '/scoreRule',
      component: ScoreRule
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
    {// 落地页3 渠道类型
      path: '/login_2',
      component: LoginType
    },
    {// 加群
      path: '/group',
      component: Group
    },
    {// 借款 美秘
      path: '/loan',
      component: Loan
    },
    {// 分享每日新品
      path: '/products',
      component: Products

    },
    {// 极速小额
      path: '/speed',
      component: Speed
    },
    {// 不查征信
      path: '/nocheck',
      component: NoCheck
    },
    {// 借款H5页
      path: '/borrow',
      name: borrow,
      component: borrow
    },
    // 精准推荐
    {
      path: '/promote',
      component: promote,
      meta: { title: '精准推荐' } 
    },
    {
    	path: '/FeedBack',
    	component: FeedBack,
    	meta: { title: '意见反馈' }
    },
    // 防爆专家 进度详情
    {
      path: '/processDetails',
      component: ProcessDetails
    },
    {// 邀请好友
      path: '/fbJoin',
      component: fBJoin
    },
    {// 我的账户
      path: '/myAccount',
      component: MyAccount
    },
    {// 防爆专家落地页
      path: '/landingPage',
      component: LandingPage
    },
    {// 防爆专家分享下载页
      path: '/fbShare',
      component: fBShare
    },
    {// 平台服务协议
      path: '/agreement',
      component: Agreement
    },
    {// 防爆专家 借款页
      path: '/fbLoan',
      component: FbLoan
    },
    {// 防爆专家 提现记录
      path: '/fbRecords',
      component: Records
    },
    {// 防爆专家 提现结果详情
      path: '/recordDetails',
      component: RecordsDetails
    },
    {// 防爆专家 我要提现
      path: '/cashDrawal',
      component: CashDrawal
    },
    {// 星美贷 APP 下载页
      path: '/downApp',
      component: DownApp
    },
    {// 新手红包
    	path: '/NewerAwardActivity',
    	component: NewerAwardActivity,
    	meta: { title: '我要领新手红包' }
    },
    {// 星美贷-邀请好友领红包
    	path: '/InviteFriends',
    	component: InviteFriends,
    	meta: {title: '邀请好友领红包'}
    }
  ]
})
 
router.beforeEach((to, from, next) => {
 	/* 路由发生变化修改页面title */
 	if (to.meta.title) {
   		document.title = to.meta.title
 	}
 	next()
})

export default router

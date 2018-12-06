<template>
    <div>
        <div class="header">
            <div class="info_user">
                <img class="img" src="../../assets/user_icon.png" alt="">
                <div class="info">
                    <div class="user">{{phone}}</div>
                    <div class="score">积分：{{score}}</div>
                </div>
            </div>
            <div @click="goSignIn" class="signIn">
                <div v-if="showIcon" class="icon_date"></div>
                <!-- <div class="text_">已签到{{totalDays}}天</div> -->
                <div class="text_">签到</div>
                <div v-if ="!showIcon" class="right_icon"></div>
            </div>
            <div @click="goPage" class="scoreRule">
                <span class="icon_rule"></span>
                <span>积分规则</span>
            </div>
        </div>
        <mt-cell @click.native="goOut" class="vision" is-link title="积分商城"></mt-cell>
        <!-- <mt-cell @click.native="userCenter" class="vision" is-link title="个人中心"></mt-cell> -->
        <mt-cell @click.native="goABS" class="vision"
        title="关于我们"
        is-link>
        </mt-cell>
        <mt-cell class="vision" title="当前版本">{{version}}</mt-cell>
        <div @click="signOut" class="off">
            退出登录
        </div>
        <!-- 签到弹窗 -->
        <!-- <div v-if="show" class="mask"> -->
            <!-- 签到成功 -->
            <!-- <div v-if="iView" class="success">
                <div class="img_success">
                    <img src="../../../static/sign_success.png" alt="">
                    <div class="text_sign">
                        <div>恭喜你获得今日的签到积分奖励</div>
                        <div class="getScore">
                            <div class="icon_"></div>
                            <span style="color:#F77955;font-size:.14rem;font-weight:600;">+</span>
                            <div class="num_">{{UserData.thisSignNumber}}</div>
                            积分
                        </div>
                    </div>
                </div>
                <div @click="colseAlert" class="closed">
                    <img src="../../assets/closed.png" alt="">
                </div>
            </div> -->
        <!-- </div> -->
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            show: false,
            iView: false,
            lists: '',
            showIcon: true,
            // 用户信息
            UserData: '',
            // userNumber: '请登录',
            score: 0,
            phone: '请登录',
            version: '',
            userId: '',
            totalDays: '',
            allText: '签到得积分'
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            if (location.href.split('?')[1] !== undefined) {
                let URLParams = []
                console.log(123)
                let params = location.href.split('?')[1].split('&')
                for (let i = 0; i < params.length; i++) {
                    let aParam = params[i].split('=')
                    URLParams[aParam[0]] = aParam[1]
                }
                // 节点
                this.phone = URLParams['phone']
                this.version = URLParams['version']
                this.userId = URLParams['userId']
                localStorage.setItem('userId', this.userId)
                localStorage.setItem('phone', this.phone)
                localStorage.setItem('version', this.version)
            } 
            // else if (localStorage.getItem('phone') === undefined && localStorage.getItem('userId') === undefined) {
            //     console.log('xxx')
            // }
            this.getPageData()
            // console.log(this.userId,this.phone)
        },
         signOut () {
           window.xingMeiDai.logout()
           axios.get(`login/appLogout?id=${this.userId}`).then(res => {
                localStorage.clear()
               console.log('1')
           })
        },
        // 加载页面获取数据
        getPageData () {
            // 用户登录
            if (localStorage.getItem('totalDays')) {
                this.showIcon = false
                this.totalDays = localStorage.getItem('totalDays')
                this.allText = `已签到${this.totalDays}天`
            }
            console.log(this.totalDays)
            this.phone = localStorage.getItem('phone')
            console.log(this.phone)
            this.phone = `${this.phone.substring(0, 4)}****${this.phone.substring(8, 11)}`
            console.log(this.phone)
            if (this.userId !== undefined) {
                axios.post('/userIntegral/getIntegral', {
                    userId: localStorage.getItem('userId')
                }).then(res => {
                    console.log(res.data.data)
                    this.score = res.data.data.integralNumber
                })
            }
        },
        // 跳转第三方签到
        goSignIn () {
            axios.post('/duiba/autoLogin', {
                userId: localStorage.getItem('userId'),
                dbredirect: 'https://activity.m.duiba.com.cn/signactivity/index?id=90&dpm=53764.41.1.0&dcm=216.90.51.0'
            }).then(res => {
                let url = res.data.data
                let userAgent = navigator.userAgent.toLowerCase()
                if (userAgent.indexOf('app/android') != -1) {
                    window.xingMeiDai.startJiFenSign()
                } else {
                    window.location.href = res.data.data
                }
            })
        },
        // 签到领积分
        // signIn () {
        //     axios.post('/sign/clickSign', {
        //         userId: localStorage.getItem('userId')
        //     }).then(res => {
        //         this.UserData = res.data.data
        //         this.showIcon = false
        //         this.totalDays = this.UserData.signTotalDays
        //         localStorage.setItem('totalDays', this.totalDays)
        //         this.allText = `已签到${this.totalDays}天`
        //         console.log(this.UserData)
        //          if (res.data.msg === null) {
        //                 this.iView = true
        //                 this.show = true
        //         } else {
        //             this.$router.push({path: '/signIn'}) 
        //         }
        //     })
        // },
        colseAlert () {
            this.iView = false
            this.show = false
        },
        goPage () {
            this.$router.push({path: '/scoreGain', query: {userId: this.userId, phone: this.phone}}) 
        },
        // 关于我们
        goABS () {
            this.$router.push({path: '/aboutus', query: {tag: 1}}) 
        },
        userCenter () {
            this.$router.push({path: '/userCenter'}) 
        },
        // 获取数据
        // requestSign () {
        //     axios.post('/sign/clickSign', {
        //         userId: this.userId
        //     }).then(res => {
        //         this.lists = res.data.data
        //     })
        // },
        // 查询用户积分信息
        getScore () {
            axios.post('/userIntegral/getIntegral', {
                userId: localStorage.getItem('userId')
            }).then(res => {
                this.score = res.data.data.integralNumber
            })
        },
        // 获取第三方链接跳转
        goOut () {
            // console.log(window.xingMeiDai.startJiFenShangchen(res.data.data))
            axios.post('/duiba/autoLogin', {
                userId: localStorage.getItem('userId')
            }).then(res => {
                var url_ = res.data.data+""
                console.log(url_)
                let userAgent = navigator.userAgent.toLowerCase()
                if (userAgent.indexOf('app/android') != -1) {
                    window.xingMeiDai.startJiFenShangchen(url_)
                } else {
                    window.location.href = res.data.data
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.header{
    height:1.44rem;
    margin-top: -40px;
    margin-bottom: .09rem;
    font-size: .18rem;
    color:#ffffff;
    line-height:.25rem;
    overflow: hidden;
    position: relative;
    background:url('../../../static/bg1.png') no-repeat;
    background-size: 100%;
    .info_user{
        display: flex;
        align-items: center;
        position: absolute;
        bottom:.22rem;
    }
    .scoreRule{
        display: flex;
        align-items: center;
        position: absolute;
        right:.12rem;
        bottom:.78rem;
        font-size:.12rem;
        color:#ffffff;
        .icon_rule{
            display: inline-block;
            width:.11rem;
            height:.11rem;
            background:url('../../assets/icon-c.png') no-repeat;
            background-size: 100% 100%;
            margin-right:.02rem;
        }
    }
    .img{
        display: block;
        width:.7rem;
        height:.7rem;
        border-radius:50%;
        margin-left:.15rem;
        // margin-bottom:.1rem;
    }
    .info{
        margin-left:.12rem;
        text-align: left;
        .user{
            font-size:.18rem;
            line-height: .25rem;
        }
        .score{
            display: inline-block;
            text-align: center;
            min-width:.76rem;
            padding:0 .1rem;
            height:.2rem;
            border-radius: .9rem;
            background:#F78F68;
            font-size:.13rem;
            // transform: scale(0.9);
            line-height: .2rem;
            margin-top: .07rem;

        }
    }
    .signIn{
        display: flex;
        align-items: center;
        justify-content: center;
        width:1.08rem;
        height:.28rem;
        // line-height: .28rem;
        font-size:.13rem;
        background:#F7AD21;
        color:#ffffff;
        position: absolute;
        bottom:.3rem;
        right:-.1rem;
        border-radius: .28rem;
        .text_{
            font-size:.12rem;
        }
        .icon_date {
            width:.12rem;
            height:.12rem;
            background:url('../../assets/calendar.png') no-repeat;
            background-size: 100% 100%;
            margin-right:.02rem;
        }
        .right_icon{
            width:.06rem;
            height:.12rem;
            background:url('../../assets/right_w.png') no-repeat;
            background-size: 100% 100%;
            margin-left:.04rem;
        }
    }
}
.mint-cell{
    text-align: left;
    height: .48rem;
    font-size:.15rem;
}
 .mint-cell/deep/.mint-cell-wrapper{
        height:100%;
        line-height: .48rem;
    }
.vision{
    border-top: 1px solid #F4F4F4;
}
.off{
    margin-top: .31rem;
    text-align: center;
    font-size:.15rem;
    color:#333333;
    background: #ffffff;
    height: .48rem;
    line-height: .48rem;
}
.position_{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.mask{
    position: fixed;
    top:0;
    z-index:100000;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    .success{
        .position_();
        width:2.39rem;
        height:2.54rem;
        .img_success{
            position: relative;
            font-size:.12rem;
            .text_sign{
                width:100%;
                position: absolute;
                bottom:0;
                color:#cccccc;
                .getScore{
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    margin:.05rem 0 .08rem;
                    .num_{
                        font-size:.24rem;
                        color:#F77955;
                        position: relative;
                        top:.04rem;
                    }
                    .icon_{
                        width:.16rem;
                        height:.16rem;
                        background: url('../../assets/icon_tal.png') no-repeat;
                        background-size: 100% 100%;
                        margin-right:.03rem;
                    }
                }
            }
        }
        img{
            width:100%;
        }
        .text_{
            font-size: .16rem;
            line-height: .22rem;
            color:#ffffff;
            margin: .23rem 0 .19rem;
        }
        .closed{
            width:.24rem;
            height:.24rem;
            margin: .24rem auto;
            img{
                display: block;
                width:100%;
            }
        }
    }
}
</style>

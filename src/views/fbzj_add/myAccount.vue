<template>
    <div class="bg"  v-cloak>
        <div @click="goMyAccount" class="myCount">提现记录</div>
        <div class="price_">
            <div class="circle_ one"></div>
            <div class="circle_ two"></div>
            <p>可提现金额 (元）</p>
            <div class="num_">
                <span>￥</span><span class="total">{{dataList.userAsset}}</span>
            </div>
            <div @click="cashMoney" class="btn">去提现</div>
        </div>
        <div class="bgMargin"></div>
        <div class="main">
            <div class="flex_">
                <div class="text">奖励进度</div>
                <div @click="goList" class="details">进度详情<span class="right_icon"></span></div>
            </div>
            <div class="lists">
                <div class="list">
                    <div class="th">
                        <span class="num">{{dataList.haveRegister}}</span><span>人</span>
                    </div>
                    <div class="td">已邀请人数</div>
                </div>
                <div class="line"></div>
                <div class="list">
                    <div class="th">
                        <span class="num">{{dataList.haveBackup}}</span><span>人</span>
                    </div>
                    <div class="td">已完成包装</div>
                </div>
                 <div class="line"></div>
                <div class="list">
                    <div class="th">
                        <span class="num">{{dataList.haveGetAward}}</span><span>元</span>
                    </div>
                    <div class="td">已获得金额</div>
                </div>
            </div>
            <div class="boxshadow">
                <div class="imgBox">
                    <img class="img_1" src="../../assets/group_1.png" alt="">
                    <img class="img_2" src="../../assets/group_2.png" alt="">
                </div>
                <div class="intr">
                    <div class="list_text">发送邀请链接给好友</div>
                    <div class="list_text">好友通过链接注册并下载App</div>
                    <div class="list_text">用户完成包装即可获得奖励</div>
                </div>
            </div>
            <div class="bottom_">
                <div @click="InviteFriends" class="btnClick">立即邀请好友</div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            dataList: '',
            // userId: '84afa098-dd80-4495-b1c5-4b5b55cb7faa'
            userId: this.$route.query.userId
        }
    },
    beforeCreate () {
        document.querySelector('#app').style.marginTop = 0
        document.title = '我的账户'
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            axios.post('/fb/user/invitationList', {
                userId: this.userId,
                pageNumber: 1,
                pageSize: 10
            }).then(res => {
                this.dataList = res.data.data
            })
        },
        // 邀请好友
        InviteFriends () {
            if (JsBridge) {
                window.JsBridge.h5ToNative_share()
            }
        },
        goMyAccount () {
            this.$router.push({path: '/fbRecords', query: {userId: this.userId}})
        },
        // 提现
        cashMoney () {
            this.$router.push({path: '/cashDrawal', query: {userId:this.userId, priceNum: this.dataList.userAsset}})
            // axios.post('/fb/user/asset/withdrawCheck', {
            //     userId: this.userId,
            //     money: this.dataList.userAsset
            // }).then(res => {
            //     if (res.data.success === false) {
            //         this.$toast({
            //             message: '不满足提现要求',
            //             position: 'center',
            //             duration: 1500
            //         })
            //     } else if (res.data.success === true) {
            //         this.goDuiBa()
            //     } else {
            //         this.$toast({
            //             message: '请求超时，请稍后再试',
            //             position: 'center',
            //             duration: 1500
            //         })
            //     }
            // })
        },
        // 跳转进度详情页
        goList () {
            this.$router.push({path: '/processDetails', query: {uid: this.userId}})
        },
        // 跳转兑吧提现页面
        // goDuiBa () {
        //     axios.post('/duiba/autoLogin', {
        //         userId: this.userId,
        //         dbredirect: 'http://activity.m.duiba.com.cn/mobile/detail?itemId=53'
        //     }).then(res => {
        //         if (res.data.success) {
        //             window.location.href = res.data.data
        //         } else {
        //             this.$toast({
        //                 message: '请求出错',
        //                 position: 'center',
        //                 duration: 1500
        //             })
        //         }
        //     })
        // }
    }
}
</script>
<style lang="less" scoped>
.bg{
    position: absolute;
    width:100%;
    height:100%;
    background: #ffffff;
    overflow-x: hidden;
    .myCount{
        position: fixed;
        top:.4rem;
        right:-.15rem;
        width:.9rem;
        height:.25rem;
        text-align: left;
        text-indent: .15rem;
        line-height: .25rem;
        border-radius: .25rem;
        background:#F1F3FF;
        font-size:.12rem;
        z-index:10;
        color:#4F70E7;
    }
}
.bgMargin{
    height:.1rem;
    background:#F8F8F8;
}
.price_{
    position: relative;
    z-index:0;
    height: 1.76rem;
    color:#ffffff;
    text-align: center;
    background: #728EFF;
    overflow: hidden;
    .circle_{
        position: absolute;
        background:rgba(95,115,248,0.4);
        width:1.3rem;
        height:1.3rem;
        border-radius: 50%;
    }
    .one{
        left:.34rem;
        top:-.82rem;
        z-index:-1;
    }
    .two{
        width:1.7rem;
        height:1.7rem;
        top:-.54rem;
        right:.11rem;
        z-index:-1;
    }
    p{
        font-size: .11rem;
        padding-top:.15rem;
    }
    .num_{
        font-size:.24rem;
        margin-top:.05rem;
        margin-bottom:.08rem;
        .total{
            display: inline-block;
            line-height: .84rem;
            font-size:.6rem;
        }
    }
    .btn{
        width: 1.53rem;
        height:.34rem;
        line-height: .34rem;
        margin:0 auto;
        font-size:.14rem;
        color: #4F6DE7;
        background:#ffffff;
        border-radius: .19rem;
    }
}
.main{
    background: #ffffff;
    min-height:3.5rem;
    .flex_{
        font-size:.15rem;
        height:.5rem;
        margin-left:.12rem;
        margin-right:.17rem;
        display: flex;
        align-items:center;
        justify-content: space-between;
        .details{
            display: inline-flex;
            align-items: center;
            .right_icon{
                display: inline-block;
                width:.05rem;
                height:.1rem;
                margin-left:.06rem;
                background:url('../../assets/right_icon.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    .lists{
        display: flex;
        align-items: center;
        justify-content:space-between;
        padding-bottom:.14rem;
        margin-bottom:.14rem;
        .list{
            width:33%;
            font-size:.12rem;
            .th{
                color:#333333;
                line-height: .37rem;
                .num{
                    font-size:.26rem;
                }
            }
            .td{
                color:#999999;
            }
        }
        .line{
            width:.01rem;
            background:#EBEBEB;
            height:.37rem;
        }

    }
    .boxshadow{
        height:1.4rem;
        margin: 0 .15rem;
        box-shadow: .01rem .01rem .06rem .02rem rgba(237,237,237,0.50);
        border-radius: .06rem;
        margin-bottom:.5rem;
        .imgBox{
            img{
                display: block;
                margin:0 auto;
            }
            .img_1{
                width:1.43rem;
                padding-top:.09rem;
            }
            .img_2{
                width:2.73rem;
                margin-top:.28rem;
            }
        }
        .intr{
            display: flex;
            font-size:.11rem;
            align-items: center;
            justify-content:space-around;
            text-align: center;
            margin-top:.1rem;
            .list_text{
                width:26%;
            }
            div:nth-child(1){
                width:24%;
            }
            div:nth-child(2){
                width:1rem;
            }
        }
    }
    .bottom_{
        padding-bottom:.2rem;
    }
    .btnClick{
        width:3.05rem;
        height:.5rem;
        line-height: .5rem;
        font-size:.16rem;
        color:#ffffff;
        margin: 0 auto;
        background-image: linear-gradient(-270deg, #4F6AE6 0%, #55AEF3 100%);
        box-shadow: 0 .02rem .04rem 0 rgba(114,174,255,0.25);
        border-radius: .25rem;
    }
}
</style>

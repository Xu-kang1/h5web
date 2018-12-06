<template>
    <div>
        <mt-header fixed :title="details.goodsName">
            <router-link to="" tag='li' @click.native='goBack' slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <div class="img">
                <img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+details.goodsPic" alt="">
            </div>
            <div class="information">
                <div class="name">{{details.goodsName}}</div>
                <div class="price">
                    <span class="icon_"></span>{{details.goodsNeedIntegral}}&nbsp;
                    <span class="oldPrice">原价￥{{details.goodsOriginalPrice}}</span>
                    <span class="freigt oldPrice">运费：包邮</span>   
                </div>
            </div>
        </div>
        <div @click="goAddAdress" class="adress">
            <div class="adressDetail">
                <span class="adress_text">配送地址</span>
                <div :class="{color:canSee}" class="detail_">{{topUser}}<span class="block_">{{midUser}}</span></div>
                <!-- <span class="adress_text">配送地址</span>
                <span class="detail_">{{topUser}}<br/>{{midUser}}</span> -->
            </div>
            <div class="rightIcon"></div>
        </div>
        <div class="detailText">
            <div class="title">商品详情</div>
            <p class="">商品名称：{{details.goodsName}}</p>
            <p class="style_">颜色分类：{{details.goodsDescription}}</p>
        </div>
         <div class="imgBox">
            <img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+details.goodsPicDetail" alt="">
        </div>
        <div class="note">
            <div class="noteTitle">温馨提示：</div>
            <div class="list">
               <p>1、通过【我的—积分兑换记录】查看兑换信息。</p>
               <p>2、兑换成功后请尽快确认收货信息，如30天内未确认地址视为放弃商品兑换，商品将不再发放。</p>
                <p>3、实物商品确认收货信息成功后将在15个工作日内发放。请关注微信公众号：星美订阅H，查询物流信息。</p>
                <p>4、商品一经兑换，不支持取消订单。请用户兑换前仔细参照商品详情及使用规则。</p>
                <p>5、通过非正常行为获得积分后进行的兑换行为，商家有权不提供服务，商品不再发放，被扣除的积分不退还。</p>
            </div>
        </div>
        <div @click="exchange" class="fixed">立即兑换</div>
        <div v-show="show" class="mask">
            <!-- 确认兑换 -->
            <div v-if="option" class="exchange">
                <div class="alert_text">确认兑换商品？</div>
                <div class="btn">
                    <div  @click="choice" class="btn_yes">是</div>
                    <div @click="cancel" class="btn_no">否</div>
                </div>
            </div>
            <!-- 立即申请 -->
            <div v-if="noScore" class="point">
                <div class="text_">
                    您当前积分不足，暂时无法兑换该商品申请借款，可赚取更多积分
                </div>
                <div @click="goApply" class="btn_jion">立即申请</div>
            </div>
            <div @click="closed" v-if="iView" class="success">
                <div class="img_success">
                    <img src="../../../static/success.png" alt="">
                </div>
                <div class="text_">恭喜你，兑换成功!</div>
                <div class="closed">
                    <img src="../../assets/closed.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
import { Toast } from 'mint-ui'
export default {
    data () {
        return {
            tag: '',
            goodsId: '',
            // 需要传入userId
            userId: '',
            // mask
            show: false,
            // 兑换成功
            iView: false,
            details: '',
            userAdress: '',
            // 确认兑换
            option: false,
            // 积分不足
            noScore: false,
            topUser: '',
            midUser: '',
            canSee: false
        }
    },
    mounted () {
        this.goodsId = this.$route.query.goodsId
        this.tag = location.href.search('tag=1')
        this.getDetail()
    },
    methods: {
        closed () {
            this.iView = false
            this.show = false
        },
        exchange () {
            if (localStorage.getItem('userId')) {
                this.userId = localStorage.getItem('userId')
            } else {
                let URLParams = []
                let params = location.href.split('?')[1].split('&')
                for (let i = 0; i < params.length; i++) {
                    let aParam = params[i].split('=')
                    URLParams[aParam[0]] = aParam[1]
                }
                // 节点
                this.userId = URLParams['userId']
                localStorage.setItem('userId', this.userId)
                console.log(this.userId)
            }
            // 点击兑换操作
            if (this.userId === undefined) {
                Toast({
                    message: '您还未登陆，请登录',
                    duration: 2000
                })
            } else {
                this.show = true
                this.option = true
            }
        },
        // 返回上一页
        goBack () {
            // this.url = `rule`
            console.log(this.tag, location.href)
            // window.xingMeiDai.finish()
            if (this.tag !== -1) {
                this.$router.push({path: '/list'})
            } else {
                this.$router.push({path: '/'})
            }
        },
        // 积分不足，申请借贷
        goApply () {
            location.href = 'http://www.xingmeidai.com/xmd'
        },
        // 确认兑换
        choice () {
            axios.post('/integralGoods/exchange', {
                userId: this.userId,
                goodsId: this.goodsId,
                addressId: this.userAdress.addressId
            }).then(res => {
                // 判断兑换状态
                if (res.data.success) {
                    this.iView = true
                } else if (res.data.success === false) {
                    this.noScore = true
                }
            })
        },
        // 取消兑换
        cancel () {
            this.option = false
            this.show = false
        },
        // 添加地址详情页
        goAddAdress () {
            // 判断用户登录
            if (this.userId === undefined) {
                // 没有登陆，跳转登录页
                Toast({
                    message: '您还未登陆，请登录',
                    duration: 2000
                })
            } else {
                this.$router.push({path: '/adress', query: {goodsId: this.goodsId, userId: this.userId}})
            }
        },
        // 获取商品详情信息
        getDetail () {
            if (localStorage.getItem('userId')) {
                this.userId = localStorage.getItem('userId')
            } else {
                let URLParams = []
                let params = location.href.split('?')[1].split('&')
                for (let i = 0; i < params.length; i++) {
                    let aParam = params[i].split('=')
                    URLParams[aParam[0]] = aParam[1]
                }
                // 节点
                this.userId = URLParams['userId']
                localStorage.setItem('userId', this.userId)
                console.log(this.userId)
            }
            console.log(this.goodsId)
            axios.post('/integralGoods/goodsDetail', {
                userId: this.userId,
                goodsId: this.goodsId
            }).then(res => {
                if (res.data.data) {
                    this.details = res.data.data.integralGoodsModel
                    this.userAdress = res.data.data.addressList
                    console.log(this.userAdress, res.data.data)
                    if (this.userAdress.length !== 0) {
                        let length = this.userAdress.length - 1
                        this.canSee = true
                        this.topUser = `${this.userAdress[length].receiveName} ${this.userAdress[length].receivePhone}`
                        this.midUser = `${this.userAdress[length].receiveAddress} ${this.userAdress[length].receiveAddressDetail}`
                    } else {
                        this.topUser = '您还未填写收货信息，马上去填写'
                        this.midUser = ''
                    }
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
#app{
    overflow: hidden;
}
    .flex{
        display: flex;
        align-items: center;
    }
	.mint-header{
		background:#ffffff;
        color:#000;
        box-shadow: 0 0 1px #eeeeee;
    }
    .container{
        .img{
            width:100%;
            height:1.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                display: block;
                height: 100%;
            }
        }
    }
    .information{
        background:#ffffff;
        padding: 0 .12rem;
        font-size: .18rem;
        text-align: left;
            .name{
                font-size: .18rem;
                line-height: .25rem;
                margin-bottom: .04rem;
                padding-top:.1rem;
            }
            .price{
                position: relative;
                font-size: .24rem;
                color:#E33B32;
                line-height:.34rem;
                .oldPrice{
                    color: #999999;
                    font-size: .13rem;
                }
                .freigt{
                    display: block;
                    right:0;
                    bottom:0;
                    position: absolute;

                }
            }
            .icon_{
                display: inline-block;
                width: .13rem;
                height: .13rem;
                background: url('../../assets/icon_.png') no-repeat;
                background-size: 100% 100%;
                // margin-right:.05rem;
            }
    }
    .adress{
        background:#ffffff;
        height:.6rem;
        margin: .05rem 0;
        .flex();
        justify-content: space-between;
        font-size: .15rem;
        color:#999999;
        padding: 0 .12rem;
        .adressDetail{
            display: flex;
            align-items: center;
            .block_{
                display: block;
            }
        }
        .color{
            color:#343434;
        }
        .detail_{
            text-align: left;
            font-size: .12rem;
            margin-left: .1rem;
            color:#cccccc;
        }
        .rightIcon{
            width: .08rem;
            height: .15rem;
            background: url('../../assets/right_score.png') no-repeat;
            background-size: 100% 100%;
        }
    }
    .detailText{
        background:#ffffff;
        font-size: .17rem;
        text-align: left;
        padding: 0 .12rem;
        .title{
            padding: .1rem 0;
            font-weight: bold;
            line-height: .24rem;
        }
        .style_{
            margin: .02rem 0;
            padding-bottom:.1rem;
        }
        p{
            font-size: .14rem;
            color:#343434;
            line-height: .22rem;
        }
    }
    .imgBox{
        width:100%;
        height: 2.78rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            display: block;
            height:100%;
        }
    }
    .note{
        text-align: left;
        background:#ffffff;
        padding: 0 .12rem;
        margin-bottom:.5rem;
        .noteTitle{
            font-size:.14rem;
            color:#343434;
            padding: .18rem 0 .06rem;
            font-weight: 600;
        }
        .list{
            font-size:.13rem;
            p{
                line-height: .18rem;
                padding-bottom:.1rem;
            }
        }
    }
    .fixed{
        position: fixed;
        width:100%;
        bottom:0;
        z-index:10;
        background:#F59218;
        color:#ffffff;
        height:.5rem;
        line-height: .5rem;
        font-size:.16rem;
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
        .point,.exchange{
            width:2.9rem;
            height:1.7rem;
            background:#ffffff;
            font-size:.15rem;
            border-radius: .08rem;
            color:#343434;
            .position_();
            .alert_text{
                margin: .49rem 0 .46rem;
            }
            .btn{
                display:flex;
                justify-content: space-between;
                padding: 0 .2rem;
                >div{
                    width:1.15rem;
                    height:.36rem;
                    line-height: .36rem;
                    color:#ffffff;
                    background:#F59218;
                    border: 1px solid #F59218;
                    border-radius: .18rem;
                }
                .btn_no{
                    color:#F59218;
                    background:#ffffff;
                }
            }
        }
        .point{
            .text_{
                text-align: center;
                font-size:.15rem;
                color:#343434;
                line-height:.21rem;
                margin: .42rem .16rem .34rem;
            }
            .btn_jion{
                width:2.34rem;
                height:.36rem;
                line-height: .36rem;
                margin:0 auto;
                border-radius: .18rem;
                background:#F59218;
                color:#ffffff;
            }
        }
        .success{
            .position_();
            width:2.16rem;
            height:3.2rem;
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
                margin: 0 auto;
                img{
                    display: block;
                    width:100%;
                }
            }
        }
    }
</style>

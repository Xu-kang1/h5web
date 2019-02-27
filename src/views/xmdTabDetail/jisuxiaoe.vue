<template>
    <div class="bg">
        <mt-header fixed title="极速小贷">
            <router-link to="" tag='li' slot="left">
                <!-- <mt-button icon="back"></mt-button> -->
            </router-link>
        </mt-header>
        <div class="left_icon" @click="goBack"><span></span></div>
        <div class="box" ref='viewBox'>
            <div v-for="(list, index) in lists" :key="list.id" class="list">
                <div class="name">
                    <img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+list.url" alt=""><span class="title">{{list.name}}</span><span v-show="item!=''" v-for="item in lists[index].label.split('/')" :key="item.id" class="tag">{{item}}</span>
                </div>
                <div class="detail">
                    <div class="price">
                        <div class="num">{{list.max}}</div>
                        <span>可借额度(元)</span>
                    </div>
                    <div class="time">
                        <div class="top">最快{{list.paymentDate}}放款</div>
                        <div class="text">借贷期限{{list.termMin}}~{{list.termMax}}天</div>
                    </div>
                </div>
                <div class="line"></div>
                <div class="note">资料简单，极速下款</div>
                <div @click="goOut(index,list.productConfigureType)" class="btn">立即借款</div>
            </div>
        </div>
        <div class="btnNav">
            <div class="imgBox">
                <span class="img"></span>
                <div class="text">
                    <div class="logo">下载星美贷 领取888元红包</div>
                    <!--<div class="text_">每天都有新口子</div>-->
                </div>
            </div>
            <div @click="openApp" class="btn">立即查看</div>
            <div @click="closed" class="closed"></div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            lists: '',
            channelCode: this.$route.query.channelCode,
            type: '',
            userId: ''
        }
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'position:absolute;top:0;width:100%;height:100%;'
    },
    mounted () {
        this.getData()
        let _this = this
        window.addEventListener('scroll',  _this.handleScroll, true)
        let u = navigator.userAgent
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            document.querySelector('.btnNav').style.display= 'none'
        }
        this.getParmas()
    },
    methods: {
        // 获取页面加载数据
        getData () {
            axios.post('/app/index/new/product', {
                type: 'QUICK',
                pageSize: 30,
                pageNumber: 1,
                channelCode: this.channelCode
            }).then(res => {
                this.lists = res.data.data.content
                console.log(res.data.data)
            })
        },
        // 立即借款
        goOut (index,productConfigureType) {
            axios.post('/app/index/history/record', {
                userId: '',
                productId: this.lists[index].id,
                channelCode: this.channelCode
            }).then(res => {})
            this.checkStatus(index,productConfigureType)
        },
        // 第三方联合登陆
        checkStatus (index,productConfigureType) {
            if(productConfigureType == 1){	//是否联合登录产品
                if(this.userId != ''){	//有用户，调联合登录
                    axios.post('/union/login',{
                        'userId': this.userId,
                        'productId': this.lists[index].id
                    }).then(res => {
                        if(res.data.success == true){	//调用联合登录成功
                            location.href = res.data.data.url
                        }else{	//调用联合登录失败，直接跳转默认的url
                            location.href = this.lists[index].target
                        }
                        console.log(res.data)
                    }).catch((error) => {
                        console.log(error)
                    })
                }else{	//无用户，直接跳转
                    location.href = this.lists[index].target
                }
            }else{	//非联合登录产品
                location.href = this.lists[index].target
            }
        },
        // 检测页面滚动
        handleScroll () {
            let scrollTopEnd = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            setTimeout(() => {
                let scrollTopStart = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTopStart>scrollTopEnd) {
                    // console.log('向下滑动')
                        document.querySelector('.btnNav').style.visibility= 'hidden'
                } else if (scrollTopStart<scrollTopEnd) {
                    // console.log('向上滑动')
                        document.querySelector('.btnNav').style.visibility = 'visible'
                }
            },100)
        },
        openApp () {
            let u = navigator.userAgent
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1// android终端
            if (isAndroid) {
                try {
                    window.location.href = 'com.xingmeidai.xingmeidai://com.xingmeidai.xingmeidai'
                    // 统计下载渠道（途径）
                    axios.post('/app/event/record', {
                        userId: '',
                        channelCode: this.channelCode,
                        source: 'H5_DOWNLOAD'
                    }).then(res=> {})
                    setTimeout(() => {
                        window.location.href = 'http://xingmeidai.com/download/app-release-xmd-h5.apk'
                    },2000)
                } catch (e) {}
            }
        },
        // 返回首页
        goBack () {
            this.$router.go(-1)
        },
        // 关闭底部栏
        closed () {
            document.querySelector('.btnNav').style.display= 'none'
        },
          // 获取页面参数
        getParmas () {
            let URLParams = []
            if (location.href.split('?')[1] != undefined) {
                let params = location.href.split('?')[1].split('&')
                for (let i = 0; i < params.length; i++) {
                    let aParam = params[i].split('=')
                    URLParams[aParam[0]] = aParam[1]
                }
                this.userId = URLParams['userId']
                if (this.channelCode == undefined) {
                    this.channelCode = URLParams['channelCode']
                }
                // console.log(this.channelCode,this.userId)
                this.type = URLParams['type']
                console.log(this.type)
                if (this.type != undefined) {
                    this.showHeader = false
                    document.querySelector('#app').style.cssText = 'margin-top:0;'
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 .01rem .02rem 0 rgba(189,189,189,0.25);
}
header{
    font-size:.17rem;
}
.left_icon{
    position: fixed;
    z-index:999;
    top:0;
    left:10px;
    width:.4rem;
    height:40px;
    display: flex;
    align-items: center;
    span{
        display: inline-block;
        width:.1rem;
        height:.19rem;
        background:url('../../assets/left_cion_new.png') no-repeat;
        background-size:100% 100%;
    }
}
.bg{
    width:100%;
    min-height:80%;
    background-image:url('../../../static/jisuxiaodai.png');
    background-repeat: no-repeat;
    background-size:100%;
    background-color: #FF5442;
    padding-top:1.65rem;
    .btnNav{
        position: fixed;
        bottom:0;
        left:0;
        width: 100%;
        height:.53rem;
        background:rgba(0,0,0,0.75);
        z-index:10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .imgBox{
            margin-left: .15rem;
            height:100%;
            display:flex;
            align-items: center;
            .img{
                display: block;
                width:.4rem;
                height:.4rem;
                background:url('../../assets/logo_xmd.png') no-repeat;
                background-size:100% 100%;
            }
            .text{
                display: inline-flex;
                flex-direction:column;
                margin-left:.12rem;
                text-align: left;
                font-size:.1rem;
                color:#ffffff;
                .logo{
                    font-size:.15rem;
                    margin-bottom:.02rem;
                }
            }
        }
        .btn{
            width:.7rem;
            height:.28rem;
            line-height: .28rem;
            font-size:.12rem;
            color:#ffffff;
            background:#4F93F8;
            border-radius: .03rem;
            margin-right:.32rem;
        }
        .closed{
            position: absolute;
            top:0;
            right:0;
            width: .22rem;
            height:.22rem;
            background: url('../../assets/btn_closed.png') no-repeat;
            background-size: 50%;
            background-position: 50% 50%;
        }
    }
}
.box{
    width:3.34rem;
    position: relative;
    background:rgba(77,13,13,0.2);
    margin:0 auto;
    // margin-top:1.65rem;
    padding: .1rem .07rem 0.08rem;
    .list{
        box-shadow:.01rem .03rem .05rem .01rem rgba(110,18,18,0.2);
        border-radius:.03rem;
        height:1.27rem;
        background:#ffffff;
        margin-bottom:.08rem;
        padding-right: .12rem;
        padding-left:.15rem;
        position: relative;
        .name{
            height:.21rem;
            display: flex;
            align-items: center;
            padding: .1rem 0;
            img{
                display: inline-block;
                width: .21rem;
                height:.21rem;
                border-radius: 50%;
                margin-right:.07rem;
            }
            .title{
                font-size:.17rem;
                color:#1a1a1a;
            }
            .tag{
                font-size: 0.1rem;
                color: #FF9445;
                height: 0.16rem;
                line-height: 0.16rem;
                padding: 0 0.04rem;
                border-radius: 0.08rem;
                background: #FFF7F0;
                margin-left:.1rem;
            }
        }
        .detail{
            width:100%;
            font-size:.12rem;
            display: flex;
            text-align: left;
            .price{
                width:1.16rem;
                span{
                    display: inline-block;
                    color:#999999;
                    line-height: .16rem;
                    font-size:.11rem;
                    // margin-top:.02rem;
                }
            }
            .num{
                font-size:.21rem;
                color:#E6694C;
                line-height: .30rem;
            }
            .top{
                font-size:.12rem;
                line-height: .3rem;
            }
            .text{
                line-height: .16rem;
                // margin-top:.02rem;
            }
        }
        .line{
            margin: 0 .12rem;
            height:.1rem;
            background:#ffffff;
            border-bottom: 0.01rem solid #F2F2F2;
        }
        .note{
            line-height: .3rem;
            font-size:.12rem;
            color:#333333;
            text-align: left;
        }
        .btn{
            position: absolute;
            right:.12rem;
            bottom:.51rem;
            width:.65rem;
            height:.25rem;
            line-height: .25rem;
            background: #679DFF;
            border-radius: .03rem;
            font-size:.12rem;
            color:#ffffff;
        }
    }
}
</style>

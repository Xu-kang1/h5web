<template>
    <div>
        <!-- <mt-header fixed title="火爆推荐" v-if="showHeader">
            <router-link to="" tag='li' @click.native='handleBack' slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <div class="mainBox" v-if="showList">
            <swiper v-if="urlData.length>=1" class="nav" :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="item in urlData" :key="item.id">
                    <img class="img" :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+item.url">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="container">
                <div class="title">火爆推荐</div>
                <div  @click="goApply(index)" class="list" v-for="(list, index) in lists" :key="list.id">
                    <div class="icon_title">
                        <span class="icon" :style="{backgroundImage:'url(http://www.xingmeidai.com/portal/file/downloadImage?n=' + list.url + ')'}"></span><span class="name">{{list.name}}</span><span v-show="item!=''" v-for="item in lists[index].label.split('/')" :key="item.id" class="cell">{{item}}</span>
                    </div>
                    <div class="information">
                        <div class="text"><span>可借额度(元)：</span><span class="price">{{list.min}}-{{list.max}}</span></div>
                        <div class="text bottom"><span>期限：{{list.termMin}}~{{list.termMax}}天</span><span class="time">{{list.paymentDate}}放款</span></div>
                    </div>
                    <div class="btn"><span>立即申请</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    data () {
        return {
            showList: true,
            urlWeb:'',
            lists: null,
            urlData: '',
            channelCode: '',
            showHeader: true,
            mobile: null,
            swiperOption: {
                loop: true,
                autoplay: {
                    delay:3500,
                    disableOnInteraction: false
                },
                setWrapperSize :true,
                mousewheelControl : true,
                observeParents:true,
                on: {
                    click: ()=> {
                        let swiper = this.$refs.mySwiper.swiper
                        let i = swiper.activeIndex
                        location.href = 'http://www.xingmeidai.com/xmd/'+this.urlData[i].target
                    }
                }
            }
        }
    },
    beforeMount () {
        this.getChannelCode()
        document.title = '火爆推荐'
    },
    mounted () {
        this.getList()
        this.getBanner()
        document.querySelector('#app').style.marginTop = 0
    },
    methods: {
        // 获取页面参数
        getChannelCode () {
            let URLParams = []
            let params = location.href.split('?')[1].split('&')
            for (let i = 0; i < params.length; i++) {
                let aParam = params[i].split('=')
                URLParams[aParam[0]] = aParam[1]
            }
            // 节点
            this.channelCode = URLParams['channelCode']
            // this.mobile = URLParams['mobile']
            // axios.post('/meimi/index/autoRegister', {
            //     channelCode: this.channelCode,
            //     mobile: this.mobile
            // }).then(res => {})
        },
        // 获取banner
        getBanner () {
            axios.get('/fb/index/banner').then(res => {
                this.urlData = res.data.data
                if (this.urlData.length==1) {
                    this.swiperOption.loop = false
                }
            })
        },
        // 获取产品列表
        getList () {
            axios.post('/fb/index/proList').then(res => {
                this.lists = res.data.data.content
                console.log(this.lists)
            })
        },
        // 统计产品点击 立即申请跳转
        goApply (index) {
            console.log(typeof this.lists[index].id)
            axios.post('/app/index/history/record', {
                userId: '',
                productId: this.lists[index].id,
                channelCode: this.channelCode
            }).then(res => {
                this.showList = false
                let url = this.lists[index].target
                // let url = 'http://hwqb.calibrate.cn/landing/?token=9e0371bdd1b4429aae5a490217947803'
                //   location.href = this.lists[index].target
                let userAgent = navigator.userAgent.toLowerCase()
                if (userAgent.indexOf('app/android') != -1) {
                    if (JsBridge) {
                        window.JsBridge.h5ToNative_loading(url)
                    }
                } else {
                    window.location.href = this.lists[index].target
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 .01rem .02rem 0 rgba(189,189,189,0.25);
    z-index:99 !important
}
header{
    font-size:.17rem;
}
.nav{
    height:1.4rem;
    margin-bottom:.1rem;
    .img{
        width:100%;
        height:100%;
    }
}
.container{
    background:#ffffff;
    font-size:.12rem;
    text-align: left;
    padding: 0 .17rem 0 .15rem;
    .title{
        font-size:.16rem;
        line-height: .22rem;
        font-weight: 600;
        padding: .09rem 0;
    }
    .list{
        position: relative;
        .icon_title{
            display: flex;
            align-items: center;
            padding:.11rem 0;
            height:.2rem;
            line-height: .2rem;
            span{
                margin-right:.09rem;
            }
            .icon{
                display: inline-block;
                width:.2rem;
                height:.2rem;
                background-size:100% 100%;
                margin-right: .09rem;
            }
            .name{
                font-size:.15rem;
            }
            .cell{
                font-size:.1rem;
                color:#FF9445;
                height:.16rem;
                line-height:.16rem;
                padding: 0 .04rem;
                border-radius: .08rem;
                background:#FFF7F0;
            }
        }
        .information{
            padding-left:.05rem;
            border-bottom: .01rem solid #F4F4F4;
            .text{
                padding-left:.24rem;
            }
            span{
                display: inline-block;
                height:.2rem;
                line-height: .2rem;
                color:#999999;
            }
            .price{
                font-size:.14rem;
                color:#F8530C;
            }
            .time{
                margin-left: .4rem;
            }
            .bottom{
                padding: .08rem 0 .1rem;
                padding-left:.24rem;
            }
        }
        .btn{
            position: absolute;
            bottom:.21rem;
            right:.04rem;
            font-size:.13rem;
            color:#ffffff;
            background: #679DFF;
            width:.67rem;
            height:.24rem;
            // line-height: .24rem;
            display: flex;
            align-items: center;
            justify-content:center;
            text-align: center;
            border-radius: .03rem;
            span{
                display: block;
            }
        }
    }
}
</style>

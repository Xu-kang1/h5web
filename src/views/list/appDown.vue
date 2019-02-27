<template>
    <div class="bg">
        <div class="color">
            <img class="userIcon" src="../../assets/downAppUser.png" alt="">
            <!-- <img></div> -->
            <div class="notice">恭喜您！<br/>星美贷为您智能匹配如下机构</div>
            <div class="line_"></div>
            <div class="swiper">
                <div class="scroll-wrap">
                    <div class="setup">机构名称</div>
                    <ul class="scroll-content" :style="{ top, transition}">
                        <li v-for="item in prizeList" :key="item.id">{{item.name}}</li >  
                    </ul>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="list" style="margin-top:.1rem;">
                <div class="name">申请金额</div>
                <div class="text">500-10000元</div>
            </div>
            <div class="list">
                <div class="name">申请期限</div>
                <div class="text">7天-12个月</div>
            </div>
            <div @click="downLoad" class="downApp">立即申请</div>
            <div class="intro">市场有风险，借款需谨慎&nbsp;实际借款金额因个人情况/资质而定</div>
        </div>

        <div v-if="showMask" class="mask">
            <img src="../../../static/fb_mask_.png" alt="">
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
import vueSeamless from 'vue-seamless-scroll'
export default {
    data () {
        return {
            showMask: false,
            num: 0,
            channelCode: '',
            prizeList: [
                { name: '浙江吉利花互联网小额贷款有限公司' },
                { name: '山西安易信互联网小额贷款有限公司' },
                { name: '浙江吉利花互联网小额贷款有限公司' },
                { name: '山西安易信互联网小额贷款有限公司' }
            ],
            activeIndex: 0
        }
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'margin-top:0;'
    },
    beforeMount () {
        this.getChannelCode()
    },
    computed: {
        top() {
            // if (this.activeIndex = this.prizeList.length-1) 
            return - this.activeIndex * 0.2955 + 'rem';
        },
        transition() {
            return this.activeIndex === 0 ? 'none' : 'top 0.5s';
        }
    },
    mounted () {
        this.downLoad()
        setInterval(_ => {
            if(this.activeIndex < this.prizeList.length) {
                this.activeIndex ++
                if (this.activeIndex === this.prizeList.length) {
                    this.activeIndex = 0
                }
                console.log(this.activeIndex)
            } else {
                this.activeIndex = 0
            }
        }, 4000)
    },
    methods: {
        downLoad () {
            this.num++
            let u = navigator.userAgent
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1// android终端
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)// ios终端
            let isWeixin = u.toLowerCase().indexOf('micromessenger') != -1
            if (isWeixin && this.num>1) {
                this.showMask = true
            }else{
                // 非微信打开
                if (isAndroid) {
                    try {
                        // window.location.href = 'com.xingmeidai.xingmeidai://com.xingmeidai.xingmeidai'
                        // 统计下载渠道（途径）
                        axios.post('/app/event/record', {
                            userId: '',
                            channelCode: this.channelCode,
                            source: 'H5_DOWNLOAD'
                        }).then(res=> {})
                        if (this.num == 1) {
                            setTimeout(() => {
                               this.channelDemo()
                            },2000)
                        } else {
                           this.channelDemo()
                        }
                    } catch (e) {}
                } else if (isiOS) {
                    // this.$toast({
                    //     message: '抱歉，IOS正在开发中',
                    //     position: 'center',
                    //     duration: 1500
                    // })
                    setTimeout(() => {
                    this.$router.push({path: '/borrow', query: {channelCode: this.channelCode}})
                    },2000)
                }
            }
        },
        // 获取UV统计
        getUVCode () {
            axios.post('/h5/index/init', {
                channelCode: this.channelCode,
                mobile: '',
                type: ''
            }).then(res => {})
        },
        // 获取页面参数
        getChannelCode () {
            let URLParams = []
            if (location.href.split('?')[1] != undefined) {
                let params = location.href.split('?')[1].split('&')
                for (let i = 0; i < params.length; i++) {
                    let aParam = params[i].split('=')
                    URLParams[aParam[0]] = aParam[1]
                }
                this.channelCode = URLParams['channelCode']
                // if (this.channelCode == undefined) {
                //     this.channelCode = URLParams['channelCode']
                // }
                this.getUVCode()
            }
        },
        channelDemo () {
            if (this.channelCode === 'anVoZXlvdXBpbg') { //聚合优品渠道包
                window.location.href = 'http://www.xingmeidai.com/download/app-release-xmd-jhyp.apk'
            }else if (this.channelCode === 'eGluZ21laWRhaV9hcHBfa3VhaXNob3U') { //快手渠道
                window.location.href = 'http://www.xingmeidai.com/download/app-release-xmd-kuaishou.apk'
            } else if (this.channelCode === 'eGluZ21laWRhaV9hcHBfc291Z291') { //搜狗渠道
                window.location.href = 'http://www.xingmeidai.com/download/app-release-xmd-sougou.apk'
            } else {
                window.location.href = 'http://www.xingmeidai.com/download/app-release-xmd-message.apk'
            }
        }
    }
}
</script>
<style lang="less" scoped>
.bg{
    position: absolute;
    top:0;
    width:100%;
    height:100%;
    min-height:6.4rem;
    // background-image:url('../../../static/xmd_downLoad.png');
    background-repeat: no-repeat;
    background-size:100%;
    // background-position: top center;
    background-color: #ffffff;
    .color{
        // height:3.15rem;
        padding-top:.67rem;
        padding-bottom:.1rem;
        color:#ffffff;
        background:linear-gradient(-35deg,rgba(70,123,237,1),rgba(90,165,255,1));
        .userIcon{
            width:.95rem;
            height:.95rem;
            border-radius: 50%;
            // border: 1px solid #00c4f5;
            margin: 0 auto;
        }
        .notice{
            font-size: .2rem;
            line-height: .32rem;
            text-align: center;
            margin-top:.1rem;
        }
        .line_{
            width:86%;
            height:.01rem;
            margin:0 auto;
            margin-top:.33rem;
            background:rgba(255,255,255,.25);
        }
        .scroll-wrap{
            // width: 100%;
            margin:0 .14rem;
            margin-top:.1rem;
            display: flex;
            justify-content: space-between ;
            align-content: center;
            height: .3rem;
            overflow: hidden;
            font-size:.15rem;
            .setup{
                font-size:.17rem;
                line-height: .3rem;
            }
        }
        .scroll-content{
            position: relative;
            transition: top 0.5s;
            li{
                line-height: .3rem;
                text-align: center;
            }
        }
    }
    .box{
        display: flex;
        flex-direction:column;
        font-size:.15rem;
        .list{
            display: flex;
            // width:100%;
            height:.3rem;
            justify-content: space-between;
            align-items: center;
            margin-left:.18rem;
            margin-right:.14rem;
            color:#999999;
            .text{
                font-size:.16rem;
                color:#353535;
            }
        }
    }
    .downApp{
        margin:0 auto;
        width:2.6rem;
        // height:.5rem;
        line-height: .5rem;
        font-weight:500;
        margin-top:.75rem;
        border-radius: .5rem;
        color:#ffffff;
        font-size:.17rem;
        background:linear-gradient(-35deg,rgba(70,123,237,1),rgba(90,165,255,1));
        box-shadow:.01rem .02rem .05rem 0 rgba(79,140,255,0.65);
    }
    .intro{
        width:100%;
        margin-top:.16rem;
        font-size:.11rem;
        transform: scale(.92);
        color:#999999;
    }
}
.mask{
    position: absolute;
    top:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.8);
    z-index:10;
    img{
        position: absolute;
        top:.1rem;
        width:2.75rem;
        right:.15rem;
        z-index:11;
    }
}
</style>

<template>
    <div class="bg" :style="{backgroundImage:'url('+bgURL+')'}">
        <div @click="downLoad" class="downApp"></div>
        <div class="intro">市场有风险，借款需谨慎&nbsp;实际借款金额因个人情况/资质而定</div>
        <div v-if="showMask" class="mask">
            <img src="../../../static/fb_mask_.png" alt="">
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            showMask: false,
            bgURL: require('@/../static/666.png'),
            num: 0,
            channelCode: ''
        }
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'margin-top:0;'
    },
    beforeMount () {
        this.getChannelCode()
    },
    mounted () {
        this.downLoad()
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
                        window.location.href = 'com.xingmeidai.xingmeidai://com.xingmeidai.xingmeidai'
                        // 统计下载渠道（途径）
                        axios.post('/app/event/record', {
                            userId: '',
                            channelCode: this.channelCode,
                            source: 'H5_DOWNLOAD'
                        }).then(res=> {})
                        if (this.num >= 1) {
                            setTimeout(() => {
                                window.location.href = 'http://www.xingmeidai.com/download/app-release-xmd-message.apk'
                            },2000)
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
    background-color: #4F93F8;
    .downApp{
        position: absolute;
        top:5.46rem;
        left:.5rem;
        width:2.75rem;
        height:.46rem;
    }
    .intro{
        position: absolute;
        top:6.1rem;
        width:100%;
        font-size:.11rem;
        transform: scale(.92);
        color:#E7F0FE;
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

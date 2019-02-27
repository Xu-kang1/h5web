<template>
    <div class="bg" v-cloak>
        <div v-if="androidShow">
            <div class="img">
                <img src="../../../static/fb_share.jpg" alt="">
            </div>
            <div class="bottom">
                <div @click="downApp" class="btn"></div>
                <img src="../../../static/fb_share.bottom.png" alt="">
            </div>
            <div v-if="showMask" class="mask">
                <img src="../../../static/fb_mask_.png" alt="">
            </div>
        </div>
        <div v-if="iosShow" class="iosTag">
            <div class="imgCon">
                <img src="../../assets/fb_ios.png" alt="">
            </div>
            <!-- 无数据 -->
            <div class="invitation">
                <p>很抱歉，我们目前正在努力开发iOS客户端中，敬请期待...</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            showMask: false,
            androidShow: false,
            iosShow: false
        }
    },
    beforeMount () {
        document.title = '下载防爆专家APP领现金'
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1// android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)// ios终端
        if (isAndroid) {
            this.androidShow = true
        } else if (isiOS) {
            this.iosShow = true
        }
    },
    mounted () {
        document.querySelector('#app').style.cssText = 'margin-top:0'
        document.title = '下载防爆专家APP领现金'
    },
    methods: {
        downApp () {
            let u = navigator.userAgent
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1// android终端
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)// ios终端
            let isWeixin = u.toLowerCase().indexOf('micromessenger') != -1
            if (isWeixin) {
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
                        setTimeout(() => {
                            window.location.href = 'http://xingmeidai.com/download/fbzj_release.apk'
                        },2000)
                    } catch (e) {}
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.bg,.mask{
    position: absolute;
    top:0;
    width:100%;
    height:100%;
    background:#ffffff;
}
.mask{
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
.img{
    width:100%;
    img{
        width:100%;
    }
}
.bottom{
    position: fixed;
    bottom:0;
    z-index:1;
    .btn{
        position: absolute;
        width:.5rem;
        height:.3rem;
        width: 0.9rem;
        height: 0.5rem;
        right: .15rem;
        bottom: .2rem;
    }
    img{
        width:100%;
    }
}
.invitation{
    p{
        font-size:.14rem;
        color:#B1B1B1;
    }
    .btn{
        margin:0 auto;
        margin-top:.4rem;
        width:1.7rem;
        height:.36rem;
        line-height: .36rem;
        font-size:.16rem;
        color: #5297ED;
        box-sizing: border-box;
        border-radius:.24rem;
        border: .01rem solid rgba(114,174,255,0.25);
    }
}
.imgCon{
    margin-bottom:.15rem;
    margin-top:1.55rem;
    img{
        display: block;
        width:2.28rem;
        // height:1.2rem;
        margin:0 auto;
    }
}
</style>

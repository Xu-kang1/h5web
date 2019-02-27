<template>
<!-- fb活动页 -->
    <div class="bg" v-cloak>
        <div @click="goMyAccount" class="myCount">我的钱包</div>
        <img src="../../../static/fb_jion.jpg" alt="">
        <div @click="Invitation" class="join_"></div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            userId:'',
            channelCode: '',
            userData: ''
        }
    },
    beforeCreate () {
        document.title = '邀请好友赚现金'
    },
    beforeMount () {
        this.getLoginStatus()
        document.querySelector('#app').style.cssText = 'margin-top:0;overflow-x:hidden;'
    },
    mounted () {
         // 初始化UV统计
        axios.post('/h5/index/init', {
            channelCode: this.userData.channelCode,
            mobile: '',
            type: ''
        }).then(res => {})
    },
    methods: {
        // 立即申请
        Invitation () {
            // alert('点到我了。')
            if (this.userId) {
            // 用户分享
            window.JsBridge.h5ToNative_share()
            } else {
                this.getLoginStatus()
            }
            // this.$router.push({path: '/myAccount'})
        },
        // 跳转我的钱包
        goMyAccount () {
            if (this.userId) {
                this.$router.push({path: '/myAccount', query:{userId:this.userId}})
            } else {
                this.getLoginStatus()
            }
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
                this.userId = URLParams['userId']
                if (this.channelCode == undefined) {
                    this.channelCode = URLParams['channelCode']
                }
                // this.type = URLParams['type']
                // console.log(this.type)
                // if (this.type != undefined) {
                //     this.showHeader = false
                //     document.querySelector('#app').style.cssText = 'margin-top:0;'
                // }
            }
        },
        // 登录状态验证
        getLoginStatus () {
            if (JsBridge) {
                // let userId = ''
                window.JsBridge.h5ToNative_GetUserInfo((data) =>{
                    this.userData = JSON.parse(data)
                    // 判断登录状态
                    if (data.userId !== '100') {
                        this.userId = this.userData.userId
                        console.log('ok')
                    } else {
                        window.JsBridge.h5ToNative_login()
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.bg{
    position: relative;
    height:100%;
    .myCount{
        position: absolute;
        top:.8rem;
        right:-.15rem;
        width:.9rem;
        height:.25rem;
        text-align: left;
        text-indent: .15rem;
        line-height: .25rem;
        border-radius: .25rem;
        background:rgba(124,78,224,0.8);
        font-size:.12rem;
        color:#ffffff;
    }
    .join_{
        position: absolute;
        top:3.5rem;
        left:.6rem;
        border-radius: .47rem;
        width:2.57rem;
        height:.47rem;
    }
}
img{
    display: block;
    width:100%;
}
</style>

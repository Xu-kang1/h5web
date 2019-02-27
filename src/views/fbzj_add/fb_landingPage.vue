<template>
    <div>
        <!-- <mt-header fixed title="我要领新手红包">
            <router-link to="" tag='li' slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <div class="img">
            <div class="logo">
                <div class="logo_bg"></div>
                <div class="text">防爆专家</div>
            </div>
            <img src="../../../static/fb_ldy.jpg" alt="">
        </div>
        <div class="inputList">
            <div class="input">
                <input class="phone" type="number" oninput="if(value.length>11)value=value.slice(0,11)" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="phone" maxlength="11" placeholder="请输入手机号">
            </div>
            <div class="input code_">
                <input v-model="msg" type="text" class="SMScode">
                <span @click="sendMsg" :class="[iHas?'sendCode':'actived']">{{text}}</span>
            </div>
            <div @click="Regesiter" class="register">立即注册</div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
import { Toast } from 'mint-ui'
export default {
    data () {
        return {
            text: '获取验证码',
            phone: '',
            checkCode: '',
            channelCode: '',
            inviteCode: '',
            msg: '',
            iHas: true,
            counts: 60,
            timer: null,
            dataList: ''
        }
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'margin-top:0;position:absolute;top:0;width:100%;height:100%;background: #5151C9;'
        document.title = '我要领新手红包'
    },
    mounted () {
        this.getParmas()
        this.getUVCode()
    },
    methods: {
        // 发送验证码
        sendMsg () {
            console.log(this.phone.length)
            if (this.phone.length < 11) {
                Toast({
                    message: '请输入11位手机号',
                    position: 'center',
                    duration: 2000
                })  
            } else if (!(/^1[34578]\d{9}$/.test(this.phone))) {
                Toast({
                    message: '请输入正确的手机号',
                    position: 'center',
                    duration: 2000
                })
            } else {
                // 发送短信
                this.getTime()
            }
        },
        // 用户注册
        Regesiter () {
            if(this.msg && this.phone) {
                axios.post('/fb/user/register',{
                    mobile: this.phone,
                    checkCode: this.msg,
                    channelCode: this.channelCode,
                    inviteCode: this.inviteCode
                }).then(res => {
                    this.dataList = res.data.data
                    if (res.data.success) {
                        this.meaasge('注册成功')
                    } else {
                        this.meaasge('注册失败,请重试')
                    }
                    setTimeout(() => {
                        this.$router.push({path: '/fbShare'})
                    },2000)

                })
            } else {
                return false
            }
            
        },
        goShare () {
            this.$router.push({path: '/fbShare'})
        },
        // 获取UV统计
        getUVCode () {
            axios.post('/h5/index/init', {
                channelCode: this.channelCode,
                mobile: '',
                type: ''
            }).then(res => {})
        },
        // 发送短信验证码计时
        getTime () {
            if (this.counts < 60 && this.counts > 0) {
                // console.log(this.counts)
                return false
            } else {
                this.sendSMSCode()
                var count = 60
                this.meaasge('验证码已发送')
                this.timer = setInterval(() => {
                this.iHas = false
                count--
                this.counts = count
                this.text = '已发送' + '(' + this.counts + 's)'
                if (count <= 0) {
                    clearInterval(this.timer)
                    count = 60
                    this.text = '获取验证码'
                    this.iHas = true
                }
                }, 1000)
            }
        },
        // 提示框消息
        meaasge (msg) {
            this.$toast({
                message: msg,
                duration: 2000
            })
        },
        // 获取短信验证码
        sendSMSCode () {
            axios.post('/sms/appSend?mobile='+this.phone).then(res => {
                console.log('ok')
            })
        },
        // 链接获取参数
        getParmas () {
            if (location.href.split('?')[1] != undefined) {
                let URLParams = []
                let params = location.href.split('?')[1].split('&')
                for (let i = 0; i < params.length; i++) {
                    let aParam = params[i].split('=')
                    URLParams[aParam[0]] = aParam[1]
                }
                // 节点
                this.channelCode = URLParams['channelCode']
                this.inviteCode = URLParams['inviteCode']
                // if (sessionStorage.getItem('userId') != undefined) {
                //     this.userId = sessionStorage.getItem('userId') 
                // } else {
                //     this.userId = URLParams['userId']
                // }
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
.img{
    position: relative;
    .logo{
        position:absolute;
        height:.72rem;
        display: flex;
        align-items: center;
        font-size:.15rem;
        color:#ffffff;
        margin-left:.24rem;
        .logo_bg{
            width:.41rem;
            height:.41rem;
            background: url('../../assets/fb_logo.png') no-repeat;
            background-size:100% 100%;
            margin-right:.11rem;
        }
    }
    img{
        width:100%;
    }
}
.inputList{
    position: absolute;
    top:3.6rem;
    left:.44rem;
    width:2.79rem;
    .input{
        position: relative;
        width:100%;
        height:.47rem;
        border:.01rem solid rgba(192,204,255,1);
        border-radius: .48rem;
        background:#ffffff;
        margin-bottom:.15rem;
        input{
            position: absolute;
            height:100%;
            left:.31rem;
            font-size:.16rem;
        }
    }
    .SMScode{
        width:40%;
    }
    .code_{
        .sendCode,.actived{
            position: absolute;
            display: inline-block;
            right:0;
            width:1rem;
            height:.47rem;
            text-align: center;
            line-height: .47rem;
            font-size:.12rem;
            color:#5A83D8;
        }
        .actived{
            color:#b2b2b2;
        }
    }
    .register{
        width:3rem;
        height:.56rem;
        line-height: .56rem;
        margin-top:.23rem;
        font-size:.2rem;
        color:#ffffff;
        background: url('../../../static/fb_register.png') no-repeat;
        background-size:100% 100%;
    }
}
</style>

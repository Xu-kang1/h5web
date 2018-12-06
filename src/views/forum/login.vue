<template>
    <div class="page">
        <div class="box">
            <div class="login"></div>
        </div>
        <div class="reject">
            <div class="phone">
                <span class="icon_"></span>
                <input type="number" oninput="if(value.length>11)value=value.slice(0,11)" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="phone" maxlength="11" placeholder="请输入手机号码">
            </div>
            <div class="msg">
                <div class="input_">
                    <span class="icon_msg"></span>
                    <input type="number" v-model="msg" placeholder="请输入验证码">
                </div>
                <span @click="sendMsg" :class="[iHas  ? 'sendMsg' : 'default']">{{text}}</span>
            </div>
            <div @click="login" :class="[msg ? 'actived' : 'btn']">登录</div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
import { Toast } from 'mint-ui'
export default {
    data () {
        return {
            phone: '',
            msg: '',
            channelCode: 'Z29uZ3pob25naGFv',
            userInfo: '',
            //
            counts: 60,
            timer: null,
            iHas: true,
            text: '获取验证码'
        }
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
        // 登陆
        login () {
            if(this.msg && this.phone) {
                axios.post('/register/postNewRegister?mobile='+this.phone+'&checkCode='+this.msg+'&channelCode='+this.channelCode)
                .then(res => {
                    this.userInfo = res.data.data
                    localStorage.setItem('xmd_id', this.userInfo.id)
                    this.$router.push({path: '/forum'})
                    console.log('ok',this.userInfo)
                })
            } else {
                return false
            }
            
        },
        // 发送短信验证码计时
        getTime () {
            if (this.counts < 60 && this.counts > 0) {
                // console.log(this.counts)
                return false
            } else {
                var count = 60
                this.getMsg()
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
        getMsg () {
            axios.post('/sms/sendXmdNew?mobile='+this.phone).then(res => {
                console.log(res.data.msg)
                this.meaasge('验证码已发送')
            })
        }
    }
}
</script>
<style lang="less" scoped>
.border{
    border-bottom: .01rem solid #EFEFEF;
}
.page{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background:#ffffff;
    color:#333333;
    font-size:.15rem;
}
.box{
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height:2.2rem;
    .login{
        width:.94rem;
        height:.94rem;
        background:url('../../assets/logo_xmd.png') no-repeat;
        background-size: 100% 100%;
    }
}
.reject{
    padding: 0 .28rem;
    .phone,.msg{
        .border();
        display: flex;
        align-items: center;
        height:.4rem;
    }
    .msg{
        justify-content: space-between;
        margin-top: .06rem;
        .input_{
            display: inline-flex;
            align-items: center;
        }
        .sendMsg,.default{
            display: inline-block;
            font-size:.13rem;
            color:#C0C0C0;
        }
    }
    .icon_{
        display: inline-block;
        width:.15rem;
        height:.21rem;
        background: url('../../assets/xmd_phone.png') no-repeat center;
        background-size: 100% 100%;
    }
    .icon_{
        display: inline-block;
        width:.15rem;
        height:.21rem;
        background: url('../../assets/xmd_phone.png') no-repeat center;
        background-size: 100% 100%;
    }
    .icon_msg{
        display: inline-block;
        width:.17rem;
        height:.19rem;
        background: url('../../assets/xmd_msg.png') no-repeat center;
        background-size: 100% 100%;
    }
    input{
        display: inline-block;
        border:none;
        height:.34rem;
        line-height: .34rem;
        width:1.5rem;
        margin-left:.28rem;
        background-color:transparent;
        border:none;
        font-size:.15rem;
    }
    .btn,.actived{
        width:2.4rem;
        height:.4rem;
        line-height: .4rem;
        text-align: center;
        margin:0 auto;
        margin-top:.85rem;
        border-radius: .23rem;
        color:#C0C0C0;
        background: #E9E9E9;
    }
    .actived{
        color:#ffffff;
        background:#F5AB18;
    }
}
.page .reject/deep/.sendMsg{
    color:#F5AB18;
}
input::-webkit-input-placeholder{
    color:#D4D6E1;
    font-size:.15rem;
}
</style>



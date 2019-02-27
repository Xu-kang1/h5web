<template>
    <div class="bg">
       <div class="logo">
           <img src="../../assets/logo_xmd.png" alt="">
           <!-- <h2 class="text">星 美 贷</h2> -->
       </div>
       <!-- <div class="quota">
           <img src="../../../static/ed.png" alt="">
       </div>
       <div class="text_">您的贴身金融服务管家，申请借款即返现</div> -->
       <!-- <mt-swipe :show-indicators="false">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe> -->
        <div class="btm">
            <div class="scroll-wrap">
                <ul class="scroll-content" :style="{ top, transition}">
                    <li v-for="item in prizeList" :key="item.id">{{item.name}}</li >  
                </ul>
            </div>
            <input class="ipt" type="number" oninput="if(value.length>11)value=value.slice(0,11)" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="phone" maxlength="11" placeholder="请输入手机号">
            <div @click="getMoney" class="btn" id="btn">立即申请</div>
        </div>
        <div class="recored">市场有风险，借款需谨慎  实际借款金额因个人情况/资质决定<br/>北京星美互联有限公司 | 京ICP备18037794号 -1</div>
       <!-- <div class="bottom"></div> -->
       <!-- 弹窗 -->
       <div v-if="showMask" class="mask">
           <div class="alert">
               <div class="sheet">
                   <div>手机号码：{{phone}}</div>
                   <div class="input_">
                       <input type="number" class="code" v-model="code" placeholder="请输入短信验证码">
                       <div @click="getTime"  :class="[iHas?'sendCode':'actived']">{{text}}</div>
                   </div>
                   <div style="width:2.8rem"></div>
                   <div @click="confirm" class="confirm"><span>确认</span></div>
               </div>
               <img @click="closed" class="closed" src="../../assets/closed.png" alt="">
           </div>
       </div>
       <div id="captcha">
      </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
import gtInit from '../../assets/gt'
import vueSeamless from 'vue-seamless-scroll'
import { Toast } from 'mint-ui'
export default {
    // components: {
    //     vueSeamless
    //   },
    data () {
        return {
            listData: [],
             prizeList: [
                { name: '用户152****3490成功借款1200元' },
                { name: '用户136****5127成功借款1000元' },
                { name: '用户152****7167成功借款3000元' },
                { name: '用户130****3180成功借款2000元' },
                { name: '用户138****1386成功借款1500元' }
            ],
            activeIndex: 0,
            phone: '',
            iHas: true,
            showMask: false,
            counts: 60,
            timer: null,
            text: '获取验证码',
            code: '',
            channelCode: '',
            // 
            gtCapValid: '',
            geetest_challenge: '',
            geetest_validate: '',
            captchaObj: ''
        }
    },
   created () {
        this.initGtCaptcha()
    },
    mounted () {
        this.getChannelCode()
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
    computed: {
        top() {
            // if (this.activeIndex = this.prizeList.length-1) 
            return - this.activeIndex * 0.3 + 'rem';
        },
        transition() {
            return this.activeIndex === 0 ? 'none' : 'top 0.5s';
        }
    },
    methods: {
        // 页面加载
        getChannelCode () {
            let URLParams = []
            let params = location.href.split('?')[1].split('&')
            for (let i = 0; i < params.length; i++) {
                let aParam = params[i].split('=')
                URLParams[aParam[0]] = aParam[1]
            }
            // 节点
            this.channelCode = URLParams['channelCode']
            axios.get('/register/newDealChannelCode?channelCode='+this.channelCode)
        },
        getMoney () {
            if (!(/^1[34578]\d{9}$/.test(this.phone))) {
               Toast({
                message: '请填写正确的手机号码',
                position: 'center',
                duration: 2500
                })
                return false
            } else {
                this.captchaObj.verify()
            }
        },
        confirm () {
            if (this.code) {
                axios.post('/register/postNewRegister?mobile='+this.phone+'&checkCode='+this.code+'&channelCode='+this.channelCode).then(res => {
                    var u = navigator.userAgent
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1// android终端
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)// ios终端
                    if (res.data.success) {
                        if (isiOS) {
                            this.$router.replace({path: '/group'})
                        } else {
                            this.$router.replace({path: '/group'})
                            window.location.href = 'http://xingmeidai.com/download/app-release-xmd.apk'
                        }
                    } else {
                         Toast({
                        message: res.data.msg,
                        position: 'center',
                        duration: 2500
                        })
                    }
                    // if (isiOS) {
                    //     this.$router.replace({path: '/group'})
                    // } else {
                    //     this.$router.replace({path: '/group'})
                    //     window.location.href = 'http://xingmeidai.com/download/app-release-xmd.apk'
                    // }
                    //    this.$router.replace({path: '/group'})
                })
            } else {
                Toast({
                message: '请填写验证码',
                position: 'center',
                duration: 2500
                })
            }
        },
        // 获取短信验证码
        getSns () {
            axios.post('/sms/sendXmdNew?mobile='+this.phone).then(res => {
                console.log('ok')
            })
        },
        // 发送短信验证码计时
        getTime () {
            if (this.counts < 60 && this.counts > 0) {
                // console.log(this.counts)
                return false
            } else {
                this.getSns()
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
        closed () {
            this.showMask = false
        },
        // 验证
        initGtCaptcha () {
            var _this = this
              axios({
                url: '/geetest/startCaptcha', // 加随机数防止缓存
                method: 'get'
            }).then (res => {
                console.log(res.data.gt,res.data.challenge,res.data.success)
                  window.initGeetest({
                    gt: res.data.gt,
                    challenge: res.data.challenge,
                    offline: !res.data.success,
                    new_captcha: true,
                    https: true,
                    timeout: '5000',
                    product: 'bind',
                    width: '300px' 
                  },function (captchaObj) {
                        captchaObj.appendTo('#captcha')
                        // console.log(captchaObj)
                        _this.captchaObj = captchaObj
                        captchaObj.onReady(function () {
                        });
                        captchaObj.onSuccess(function () {
                            console.log(111)
                            _this.showMask = true
                            _this.getTime()
                        // _this.gtCapValid = captchaObj.getValidate();
                        })
                  })
            })
        }
    }
}
</script>
<style lang="less" scoped>
.bg{
    font-size:.15rem;
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    min-height: 4.8rem;
    background: url('../../../static/bg_.jpg') repeat-y center;
    background-size:100% 100%;
    .logo{
        display: flex;
        align-items: center;
        height:.4rem;
        color:#ffffff;
        font-size:.18rem;
        margin-top:.23rem;
        margin-left:.22rem;
        img{
            display: block;
            width:.4rem;
            height:.4rem;
            margin-right:.11rem;
        }
    }
    .quota{
        width:2.78rem;
        margin: .14rem auto;
        img{
            display: block;
            width:2.78rem;
        }
    }
    .text_{
        display: block;
        margin: 0 auto;
        margin-top:.15rem;
        width:3.13rem;
        height:.28rem;
        font-size:.14rem;
        line-height: .28rem;
        margin-bottom:.48rem;
        color:#ffffff;
        background: url('../../../static/logo_text.png') no-repeat center;
        background-size:100% 100%;
    }
    p{
        font-size:.14rem;
        color:#ffffff;
        text-align: center;
        margin-bottom:.1rem;
    }
    .ipt{
        font-size:.16rem;
        margin-bottom:.16rem;
    }
    input{
        width:3.2rem;
        height:.5rem;
        border-radius: .05rem;
        text-align: center;
        // text-indent: .13rem;
        margin-bottom:.22rem;
    }
    .btn{
        width:3.2rem;
        height:.46rem;
        line-height: .46rem;
        color:#ffffff;
        box-shadow:0 .08rem .16rem 0 rgba(247,190,130,0.48);
        background:rgba(255,168,0,1);
        border-radius: .03rem;
        font-size:.15rem;
        font-weight: 600;
        margin: 0 auto;
        text-align: center;
    }
    .bottom{
        width:100%;
        height:1rem;
    }
    .mask{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items:center;
        justify-content: center;
        .alert{
            width:3.3rem;
            height:2.83rem;
            .sheet{
                // height:2.05rem;
                background:#ffffff;
                border-radius: .05rem;
                padding: .29rem .25rem;
                font-size:.14rem;
                color:#333333;
                text-align: center;
                .input_{
                    margin-top:.25rem;
                    input::-webkit-input-placeholder{
                        color:#b3b3b3;
                        text-align: left;
                    }
                }
                .sendCode,.actived{
                    display: inline-block;
                    width:.92rem;
                    height:.46rem;
                    line-height:.46rem;
                    font-size:.15rem;
                    color:#F1B014;
                    border-radius: .05rem;
                    border: 0.01rem solid rgba(241,176,20,1);
                }
                .code{
                    display: inline-block;
                    float:left;
                    text-align: left;
                    width:1.75rem;
                    font-size:.15rem;
                    height:.46rem;
                    margin-right:.04rem;
                    border: .01rem solid rgba(217,217,217,1);
                    border-radius: .05rem;
                    text-indent: .15rem;
                    margin-bottom:.15rem;
                }
                .confirm{
                    width:2.8rem;;
                    height:.46rem;
                    line-height: .46rem;
                    color:#614604;
                    font-weight: 600;
                    margin-top:.15rem;
                    background:linear-gradient(0deg,rgba(255,189,31,1),rgba(255,217,63,1));
                    box-shadow:0 .06rem .1rem 0 rgba(255,197,73,0.45);
                    border-radius: .05rem;
                    display: flex;
                    justify-content: center;
                    span{
                        margin:0 auto;
                    }
                }
            }
            .closed{
                display: block;
                height:.3rem;
                width:.3rem;
                margin: 0 auto;
                margin-top:.48rem;
            }
        }
    }
}
.recored{
    font-size:.1rem;
    position: absolute;
    width:100%;
    margin: 0 auto;
    bottom:.3rem;
    color:#ffd48f;
    line-height:.5rem;
}
#app .sheet/deep/.actived{
    color:#b2b2b2;
    border-color: #b2b2b2;
}
input::-webkit-input-placeholder{
    color:#b3b3b3;
    text-align: center;
}
.mint-swipe{
    height:.2rem;
    color:#ffffff;
    margin-bottom:.1rem;
}
.scroll-wrap{
  width: 100%;
  margin-bottom:.1rem;
  height: .3rem;
  overflow: hidden;
}
.scroll-content{
  position: relative;
  transition: top 0.5s;
  li{
    line-height: .3rem;
    text-align: center;
  }
}
.btm{
    width:100%;
    position: absolute;
    bottom:1rem;
    margin:0 auto;
}
</style>

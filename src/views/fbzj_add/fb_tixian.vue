<template>
    <div>
        <div class="priceNum">
            <div class="name">可提现金额(元)</div>
            <div class="num">{{priceNum}}</div>
        </div>
        <div class="perInfo">
            <div class="list">
                <div class="user">支付宝账号</div>
                <input v-model="userNum" class="userNum userName" placeholder="请输入支付宝账号" type="text">
            </div>
            <div class="list">
                <div class="user">收款人姓名</div>
                <input v-model="userName" class="userName" placeholder="账号对应的认证姓名" type="text">
            </div>
        </div>
        <div class="cashNum">
            <div class="title">提现金额</div>
            <div class="cashChecked">
                <div @click="checkNum(index)" v-for="(list, index) in num" :key="list.id" class="unChecked" :class="{btnCheck:index===number}">{{list}}</div>
                <!-- <div class="btnCheck">50</div>
                <div class="unChecked">70</div> -->
            </div>
        </div>
        <div class="notice">
            <p>注意事项</p>
            <p>1.提现申请将在1-3小时内审批；如遇到高峰期，可能延迟到账，请耐心等待</p>
            <p>2.请及时关注“邀请好友赚现金->我的钱包->提现记录”，查看提现状态</p>
            <p>3.提现到账查询：支付宝->我的->账单，如果有名称为“防爆专家提现成功”的数据，即提现到账成功！</p>
        </div>
        <div @click="btnClick" class="btnClick">立即提现</div>
        <div v-if="showPopup" class="popup">
            <div class="alert">
                <div class="box">
                    <img src="../../assets/zf_icon.png" alt="">
                    <div class="text">余额不足!</div>
                    <div class="btnEarn">点击去赚钱</div>
                </div>
                <div @click="closedPopup" class="closed">
                    <img src="../../assets/closed.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            num: [20, 50, 70],
            number: null,
            userId: this.$route.query.userId,
            priceNum: this.$route.query.priceNum,
            userNum: null,
            userName: null,
            dataDetail: '',
            showPopup: false
        }
    },
    beforeCreate () {
        document.title = '我要提现'
        document.querySelector('#app').style.cssText = 'margin-top:0;'
    },
    methods: {
        checkNum (index) {
            this.number = index
        },
        // 提现条件判断
        btnClick () {
            if (this.userNum == undefined) {
                this.$toast({
                    message: '请输入支付宝账号',
                    position: 'center',
                    duration: 2500
                })
            } else if (this.userName == undefined) {
                this.$toast({
                    message: '请输入收款人姓名',
                    position: 'center',
                    duration: 2500
                })
            } else if (this.number === null) {
                this.$toast({
                    message: '请输入提现金额',
                    position: 'center',
                    duration: 2500
                })
            } else if (this.num[this.number] > this.priceNum) {
                this.showPopup = true
            } else {
                this.getOrder()
            }
        },
        closedPopup () {
            this.showPopup = false
        },
        // 获取提现
        getOrder () {
            axios.post('/fb/user/asset/withdrawCheck' ,{
                userId: this.userId,
                money: this.num[this.number],
                account: this.userNum,
                name: this.userName
            }).then(res => {
                if (res.data.success === true) {
                    this.dataDetail = res.data.data
                    sessionStorage.setItem('orderItem', JSON.stringify(this.dataDetail))
                    this.$router.push({path: '/recordDetails'})
                } else {
                    this.$toast({
                        message: res.data.msg,
                        position: 'center',
                        duration: 2000
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.bg{
    background:#ffffff;
}
.priceNum{
    margin-top:.09rem;
    height:1.1rem;
    .bg;
    text-align: center;
    .name{
        font-size:.11rem;
        padding-top:.2rem;
        color:#BEBEBE;
    }
    .num{
        font-size:.4rem;
        color:#333333;
        line-height:.56rem;
    }
}
.perInfo{
    padding-left:.13rem;
    font-size:.15rem;
    margin-bottom:.06rem;
    .bg;
    .list{
        display: flex;
        height:.48rem;
        align-items: center;
        border-bottom:.01rem solid #F4F4F4;
        input{
            display: block;
            border:none;
            margin-left:.18rem;
            height:100%;
            font-size:.15rem;
            &::-webkit-input-placeholder{
                color: #BEBEBE;
            }
        }
    }
}
.cashNum{
    height:1.12rem;
    padding: 0 .12rem;
    .bg;
    .title{
        font-size:.15rem;
        color:#343434;
        padding: .12rem 0;
        padding-bottom:.13rem;
        text-align: left;
    }
    .cashChecked{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btnCheck,.unChecked{
            width: 1.06rem;
            height: .5rem;
            font-size:.2rem;
            text-align: center;
            line-height:.48rem;
            border: .01rem solid #5297ED;
            border-radius: .03rem;
            box-sizing: border-box;
            color:#5297ED;
        }
        .btnCheck{
            background:#5297ED;
            color:#ffffff;
        }
    }
}
.notice{
    padding: .11rem;
    padding-bottom:0;
    font-size:.11rem;
    color: #999999;
    text-align: left;
    p{
        margin-top:.06rem;
        &:nth-child(1){
            margin-top:0;
        }
    }
}
.btnClick{
    width: 3.05rem;
    height:.5rem;
    margin:0 auto;
    color:#ffffff;
    font-size:.16rem;
    line-height: .5rem;
    margin-top:.37rem;
    margin-bottom:.2rem;
    border-radius: .25rem;
    background: #5297ED;
    box-shadow: 0 .02rem .04rem 0 rgba(114,174,255,0.50);

}
.popup{
    position: fixed;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    .alert{
        width: 2.4rem;
        .box{
            width:100%;
            height:2.1rem;
            background:#ffffff;
            border-radius: .08rem;
            position: relative;
            img{
                display: block;
                position: absolute;
                left:.545rem;
                width:1.31rem;
                top:-.39rem;
            }
            .text{
                text-align: center;
                font-size:.18rem;
                padding-top: .87rem;
                color:#161616;
            }
            .btnEarn{
                width:1.7rem;
                height:.36rem;
                line-height: .36rem;
                font-size:.16rem;
                color:#ffffff;
                margin:0 auto;
                margin-top:.35rem;
                background-image: linear-gradient(-270deg, #4F6AE6 0%,  #55AEF3 100%);
                box-shadow: 0 .02rem .04rem 0 rgba(114,174,255,0.25);
                border-radius: .19rem;
            }
        }
        .closed{
            width:.44rem;
            height:.44rem;
            margin: 0 auto;
            padding-top:.16rem;
            img{
                display: block;
                padding-top:.11rem;
                margin: 0 auto;
                width:.22rem;
                height:.22rem;
            }
        }
    }
}
</style>

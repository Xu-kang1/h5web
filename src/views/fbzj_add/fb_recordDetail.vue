<template>
    <div v-cloak>
        <div class="container">
            <img class="img" :src="imgSrc[index]" alt="">
            <div class="text">{{text[index]}}</div>
            <div class="listDetails">
                <div class="list">
                    <div class="listName">提现账号</div>
                    <div class="listVaule">{{orderData.withdrawAccount}}</div>
                </div>
                <div class="list">
                    <div class="listName">订单状态</div>
                    <div class="listVaule">{{orderData.withdrawStatus}}</div>
                </div>
                <div v-if="orderData.withdrawStatus === '提现失败'" class="list">
                    <div class="listName">失败原因</div>
                    <div class="listVaule">{{orderData.msg}}</div>
                </div>
                <div class="list">
                    <div class="listName">订单编号</div>
                    <div class="listVaule">{{orderData.withdrawId}}</div>
                </div>
                <div class="list">
                    <div class="listName">下单时间</div>
                    <div class="listVaule">{{orderData.createTime}}</div>
                </div>
            </div>
        </div>
        <div class="notice">请及时关注“邀请好友赚现金->我的钱包->提现记录”,查看提现状态</div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            // userId: '84afa098-dd80-4495-b1c5-4b5b55cb7faa',
            userId: this.$route.query.userId,
            withdrawId: this.$route.query.withdrawId,
            orderData: '',
            text: ['请耐心等待审核结果！' , '提现成功，交易完成！' , '很抱歉，您的提现审核未通过！'],
            imgSrc: [require('../../assets/order_sh.png') , require('../../assets/order_success.png') , require('../../assets/order_fail.png')],
            index: 0
        }
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'margin-top:0;'
        document.title = '提现结果'
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            let recordData = sessionStorage.getItem('orderItem')
            if (recordData != null) {
                this.orderData = JSON.parse(recordData)
                 if (this.orderData.withdrawStatus === '提现失败') {
                    this.index = 2
                }
                if (this.orderData.withdrawStatus === '提现成功') {
                    this.index = 1
                }
            } else {
                this.getMessage()
            }
        },
        // 请求数据
        getMessage () {
            axios.post('/fb/user/asset/withdrawDetail' , {
               withdrawId: this.withdrawId
            }).then( res => {
                if (res.data) {
                    this.orderData = res.data.data
                    if (this.orderData.withdrawStatus === '提现失败') {
                        this.index = 2
                    }
                    if (this.orderData.withdrawStatus === '提现成功') {
                        this.index = 1
                    }
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.container{
    text-align: center;
    background: #ffffff;
    .img{
        display: block;
        width:.6rem;
        height:.6rem;
        margin: 0 auto;
        padding-top:.23rem;
        margin-bottom:.24rem;
        // border-radius: 50%;
    }
    .text{
        font-size:.16rem;
        font-weight: 500;
        margin-bottom:.35rem;
    }
    .listDetails{
        padding: 0 .12rem;
        & .list:nth-last-child(1){
            margin-bottom:0;
            padding-bottom:.16rem;
        }
    }
    .list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size:.13rem;
        color:#999999;
        margin-bottom:.12rem;
        .listVaule{
            font-size:.14rem;
            color:#333333;
        }
    }

}
.notice{
    font-size:.11rem;
    width: 72%;
    color:#999999;
    margin:0 auto;
    margin-top:.1rem;
}
</style>

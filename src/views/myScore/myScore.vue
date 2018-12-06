<template>
    <div>
        <mt-header fixed title="我的积分">
            <router-link to="/signIn" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="banner">
            <div class="mysocre">
                <p class="available">可用积分</p>
                <div class="total">
                    <span class="icon_"></span><span class="totalNum">{{totalScore}}</span>
                </div>
            </div>
        </div>
        <div class="headerTitle">
            <div class="titleText"><span class="left_icon"></span>积分兑换记录</div>
        </div>
        <div class="recored" v-for="list in dataList" :key="list.id">
            <div class="lists">
                <div class="img">
                    <img :src="list.goodsPic" alt="">
                    <div class="goodsName">
                        <div class="name_">{{list.goodsName}}</div>
                        <div class="price_">
                            <span class="icon_"></span>
                            <span class="totalPrice">{{list.goodsNeedIntegral}}</span>
                        </div>
                    </div>
                </div>
                <div class="goodsName">
                    <div class="status">兑换成功</div>
                    <div class="num_">数量x1</div>
                </div>
            </div>
            <div class="userAdress">
                <div class="first">收货人：{{list.receiveName}} {{list.receivePhone}}</div>
                <div class="bottom_"><p>收货地址：{{list.receiveAddress}}</p></div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            dataList: '',
            totalScore: this.$route.query.totalScore
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            axios.post('/order/list', {
                userId: localStorage.getItem('userId')
            }).then(res => {
                this.dataList = res.data.data
                console.log(this.dataList)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 0 1px #eeeeee;
}
.banner{
    height:1rem;
    font-size:.15rem;
    color:#FFF0D3;
    background: #ffffff;
    padding: .15rem .15rem .1rem;
    .mysocre{
        border-radius: .08rem;
        height:100%;
        background:url('../../../static/score_bg.png') no-repeat;
        background-size: 100% 100%;
        box-shadow: .05rem .05rem .05rem #FFF0D4;
        .available{
            padding-top:.18rem;
        }
        .total{
            font-size:.48rem;
            color:#ffffff;
            .icon_{
                display: inline-block;
                width:.2rem;
                height:.22rem;
                margin-right:.1rem;
                background:url('../../assets/icon_3.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
.headerTitle{
    height:.38rem;
    padding: 0 .15rem;
    // margin-top: .08rem;
    border-bottom:1px solid #eeeeee;
    font-size:.15rem;
    color:#333333;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .titleText{
        font-weight: bold;
        display: inline-flex;
        align-items: center;
        .left_icon{
            display: inline-block;
            width:.04rem;
            height:.14rem;
            margin-right: .04rem;
            background:#F35F57;
            border-radius: .08rem;
        }
    }
}
.recored{
    .lists{
        height:1rem;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .12rem;
        font-size: .15rem;
        .img{
            display: flex;
            align-items: center;
            img{
                display: block;
                width:.8rem;
                height:.8rem;
                margin-right:.12rem;
            }
            .name_{
                color:#343434;
                margin-bottom:.14rem;
                font-weight: 400;
                text-align: left;
                width:1.2rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .price_{
                text-align: left;
                font-size:.12rem;
                color:#E33B32;
                .icon_{
                display: inline-block;
                width:.11rem;
                height:.11rem;
                background: url('../../assets/icon_.png') no-repeat;
                background-size:100% 100%;
            }
            }
        }
        .status{
            color:#FFA100;
            margin-bottom:.14rem;
        }
        .num_{
            text-align: right;
            color:#505050;
            font-size:.12rem;
        }

    }
   .userAdress{
       padding-left:.2rem;
       color:#666666;
       font-size:.12rem;
       text-align: left;
       background:#ffffff;
       .first{
           padding-bottom:.04rem;
       }
       div{
           padding-bottom:.12rem;
       }
       .bottom_{
           border-bottom: 1px solid #eeeeee;
       }
   }
}
</style>

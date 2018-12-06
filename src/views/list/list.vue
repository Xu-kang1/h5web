<template>
    <div v-cloak>
        <mt-header fixed title="积分兑换">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div v-if="showScore" class="totleScore">
            <span class="icon"></span>
            <span>我的积分</span>
            <span class="num">{{dataList.integralNumber}}</span>
        </div>
        <div class="goods">
            <div class="list" v-for="(list,index) in lists" :key="list.id">
                <div class="con">
                    <img class="img" :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+list.goodsPic" alt="">
                    <div class="information">
                        <div class="goodsName">{{list.goodsName}}</div>
                        <div class="price">
                            <span class="icon_"></span>
                            <span class="num_">{{list.goodsNeedIntegral}}</span>
                        </div>
                    </div>
                </div>
                <div @click="goDetail(index)" class="exchange">立即兑换</div>
            </div>
            <div class="margin"></div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            lists: '',
            dataList: '',
            showScore: false,
            userId: ''
        }
    },
    created () {
        this.getData()
    },
    mounted () {
        this.lists = this.$route.query.lists
        // this.getData()
    },
    methods: {
        goDetail (index) {
            console.log(this.lists[index].goodsId)
            this.$router.push({path: '/details', query: {goodsId: this.lists[index].goodsId, tag: 1}})
        },
        getData () {
            if (localStorage.getItem('userId') === null) {
                this.userId = ''
            } else {
               this.userId = localStorage.getItem('userId')
            }
            axios.post('/integralGoods/list', {
                userId: this.userId,
                pageNumber: 1,
                pageSize: 10
            }).then(res => {
                this.dataList = res.data.data
                this.lists = this.dataList.goodsList
                console.log(this.dataList)
                if (this.dataList.integralNumber !== 0) {
                    this.showScore = true
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .flex{
        display: flex;
        align-items: center;
    }
	.mint-header{
		background:#ffffff;
        color:#000;
        box-shadow: 0 0 1px #eeeeee;
    }
    .totleScore{
        color:#343434;
        font-size:.15rem;
        height:.5rem;
        line-height: .5rem;
        background:#ffffff;
        margin-bottom:.05rem;
        .flex();
        .icon{
            display: inline-block;
            margin-left:.33rem;
            margin-right:.07rem;
            width: .18rem;
            height: .18rem;
            background: url('../../assets/icon_1.png') no-repeat;
            background-size: 100% 100%;
        }
        .num{
            font-size: .18rem;
            color:#E33B32;
            margin-left: .14rem;
        }
    }
    .goods{
        padding-left:.2rem;
        background:#ffffff;
        .list{
            border-bottom: 1px solid #eeeeee;
            height: .78rem;
            .flex();
            justify-content:space-between;
            .con{
              .flex();
              color:#343434;
              .img{
                  height:.5rem;
                }
                .information{
                    margin-left:.1rem;
                    font-size: .15rem;
                    line-height: .21rem;
                    text-align: left;
                    .goodsName{
                        width:1.2rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                .price{
                    line-height: .16rem;
                    color:#E33B32;
                    font-size: .12rem;
                    .icon_{
                        display: inline-block;
                        width: .11rem;
                        height: .11rem;
                        background: url('../../assets/icon_.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .num_{
                        display: inline-block;
                        margin-top:.04rem;
                    }
                }
            }
            .exchange{
                font-size: .14rem;
                color:#FFA100;
                border: .01rem solid #FFA100;
                padding: .03rem .12rem;
                border-radius: .18rem;
                line-height: .2rem;
                margin-right: .14rem;
            }
        }
        .margin{
            height: .52rem;
        }

    }
</style>

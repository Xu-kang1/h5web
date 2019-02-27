<template>
    <div class="container">
        <div style="background:#ffffff;"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="30"
        v-show="!show">
            <div class="line"></div>
            <div class="list" v-for= '(list, index) in lists' :key="list.id">
                <img src="../../assets/zfb_icon.png" alt="">
                <div @click="geDetail(index)" class="listDetail">
                    <div class="left">
                        <div class="price">{{`支付宝提现${list.withdrawAmount}元`}}</div>
                        <div :class="[list.withdrawStatus=== 2 ? 'fail': 'status']">{{withdrawStatus[list.withdrawStatus]}}</div>
                    </div>
                    <div class="right">
                        <img src="../../assets/right_icon.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div v-show="show" class="noData">
            <img src="../../assets/order_noData.png" alt="">
            <div class="descript">没有提现记录</div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            lists: '',
            show: false,
            withdrawId: '',
            loading :true,
            num: 1,
            pageSize:13,
            withdrawStatus: ['待审核' , '提现成功' , '提现失败'],
            // userId: '84afa098-dd80-4495-b1c5-4b5b55cb7faa',
            userId: this.$route.query.userId

        }
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'margin-top:0;'
        document.title = '提现记录'
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            axios.post('/fb/user/asset/withdrawRecord' ,{
                userId: this.userId,
                pageNumber: this.num,
                pageSize: this.pageSize
            }).then(res => {
                if (res.data) {
                    if (this.num === 1) {
                        this.lists = res.data.data
                        this.loading  = false
                    } else {
                        console.log(this.num, res.data.data)
                        this.lists = this.lists.concat(res.data.data)
                        res.data.data.length < this.pageSize ? this.loading = true : this.loading  = false
                        this.lists.length <= 0 ? this.show = true : this.show = false
                    //     if (this.lists.length <= 0) {
                    //     this.show = true
                    // } else {
                    //     this.show = false
                    // }

                    }
                }
            })
        },
        geDetail (index) {
             this.$router.push({path: '/recordDetails', query: {withdrawId: this.lists[index].withdrawId}})
        },
        loadMore() {
            this.loading = true
            setTimeout(() => {
                this.num++
                this.getData()
            }, 500)
        }
    }
}
</script>
<style lang="less" scoped>
.container{
    position: absolute;
    width:100%;
    height:100%;
    background: #ffffff;
    font-size:.14rem;
    .line{
        width:100%;
        height:.1rem;
        background: #F8F8F8;
    }
    .list{
        margin-left:.18rem;
        height:.58rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: .01rem solid #F4F4F4;
        background: #ffffff;
        img{
            display: block;
            flex:0 1 .22rem;
            width:.22rem;
            height:.22rem;
            margin-right:.14rem;
            border-radius: 50%;
        }
        .listDetail{
            display: flex;
            flex:1 1 auto;
            align-items: center;
            text-align: left;
            justify-content: space-between;
            .status,.fail{
                font-size:.11rem;
                margin-top:.05rem;
            }
            .fail{
                color:#F8530C;
            }
            .right{
                img{
                    display: block;
                    width:.08rem;
                    height:auto;
                }

            }
        }
    }
    .noData{
        img{
            width: 2rem;
            margin-top:.5rem;
        }
        .descript{
            font-size:.12rem;
            text-align: center;
            margin-top: .2rem;
        }
    }
}
</style>

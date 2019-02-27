<template>
    <div class="container" v-cloak>
        <div class="tab">
            <span ref= 'tabWidth' @click='tab(index)' v-for='(list, index) in tabText' :key="list.id" class="li" :class="{actived:showClass==index}">{{list}}</span>
            <span class="line"></span>
            <div class="margin"></div>
        </div>
        <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="30"
        infinite-scroll-immediate-check = 'false'
        class="lists">
            <div v-show="!showTabList" v-for='item in register' :key="item.id" class="list">
                <div class="textList">
                    <div class="text">{{initStyle(item.inviteUserMobile)}}</div>
                    <div class="status">{{item.inviteStatus}}</div>
                </div>
            </div>
            <div v-show="showTabList" v-for='item in Award' :key="item.id" class="reward">
                <div class="textList">
                    <div class="text">{{initStyle(item.inviteUserMobile)}}</div>
                    <div class="price">
                        <span class="num_">+{{item.inviteUserAward}}</span>元
                    </div>
                </div>
            </div>
            <div v-if="showImg">
                <div class="imgCon">
                    <img src="../../assets/yaoqinghaoyou.png" alt="">
                </div>
                <!-- 无数据 -->
                <div class="invitation">
                    <p>暂时还没有奖励哦，快去邀请好友吧</p>
                    <div @click='Invitation' class="btn">立即邀请好友</div>
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
            items: [1,2,3,4,5],
            tabText: ['累计注册', '已获得奖励'],
            showClass: 0,
            showTabList: false,
            showImg: false,
            userId: this.$route.query.uid,
            dataList: '',
            register: null,
            Award: null,
            loading :true,
            num: 1,
            pageSize:13
        }
    },
    computed: {
        initStyle (item) {
            return function (item) {
                return item.substring(0,3) + '****' + item.substring(7)
            }
        }
    },
    mounted () {
        document.querySelector('#app').style.marginTop = 0
        document.title = '进度详情'
        this.getList()
    },
    methods: {
        getList () {
            axios.post('/fb/user/invitationList', {
                userId: this.userId,
                pageNumber: this.num,
                pageSize: this.pageSize
            }).then(res => {
                if (this.num === 1) {
                    this.dataList = res.data.data
                    this.register = this.dataList.accumulateRegister
                    this.Award = this.dataList.accumulateAward
                    if (res.data.data.accumulateRegister.length  <= 0) {
                        this.showImg = true
                    }
                    // this.loading  = false
                } else {
                    this.register = this.register.concat(res.data.data.accumulateRegister)
                    this.Award = this.Award.concat(res.data.data.accumulateAward)
                }
                if (res.data.data.accumulateRegister.length < this.pageSize && res.data.data.accumulateAward.length < this.pageSize) {
                    this.loading = true
                } else {
                    this.loading  = false
                }
                // console.log(this.num,this.register)
            })
        },
        // 邀请好友
        Invitation () {
            window.JsBridge.h5ToNative_share()
        },
        tab (index) {
            this.showClass = index
            this.showImg = false
            console.log(index)
            let left = document.querySelector('.line')
            if (this.register.length <= 0) {
                this.showImg = true
            } else if (this.Award.length <= 0) {
                this.showImg = true
            } else {
                 this.showImg = false
            }
            if (index === 1) {
                this.Award.length<=0 ? this.showImg = true : this.showImg = false
                this.showTabList = true
                left.style.cssText = 'left:calc(50% + (50% - 0.35rem)/2)'
                // left.style.left = '2.6375rem'
              
            } else {
                this.register.length<=0 ? this.showImg = true : this.showImg = false
                this.showTabList = false
                left.style.cssText = 'left:calc((50% - 0.35rem)/2)'
                // left.style.left = '.7625rem'
            }
        },
        // 加载更多
        loadMore() {
            this.loading = true
            console.log(111111)
            setTimeout(() => {
                this.num++
                this.getList()
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
    background:#ffffff;
}
.bg{
    background:#ffffff;
}
.actived{
    color:#333333;
}
.tab{
    position: fixed;
    width:100%;
    top:0;
    z-index:2;
    min-height:.5rem;
    line-height: .5rem;
    font-size:.15rem;
    color:#B1B1B1;
    .bg;
    .li{
        width:50%;
        height:.5rem;
        line-height: .5rem;
        line-height:inherit;
        display: inline-block;
    }
    .line{
        position: absolute;
        width:.35rem;
        height:.02rem;
        background:#4F93FE;
        bottom:.13rem;
        left:calc((50% - 0.35rem)/2);
    }
}
.margin{
    height:.05rem;
    background: #f8f8f8;
}
.lists{
    margin-top:.5rem;
    .list,.reward{
        background: #ffffff;
    }
    .textList{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size:.14rem;
        height:.48rem;
        margin-left:.15rem;
        padding-right:.15rem;
        border-bottom:1px solid #f4f4f4;
        .status{
            color:#b1b1b1;
            font-size:.13rem;
        }
        .price{
            .num_{
                font-size:.18rem;
                color:#F8530C;
            }
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
            height:1.2rem;
            margin:0 auto;
        }
    }
}
</style>

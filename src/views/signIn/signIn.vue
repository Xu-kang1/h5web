<template>
    <div class="page_">
        <mt-header fixed title="签到">
            <router-link to="" tag="li" @click.native="gaBack_" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="banner">
            <div @click="goRule" class="signRule">
                <span class="icon_sign"></span>
                <span class="text">签到规则</span>
            </div>
            <div class="signDate">
                <div class="text_">已累计签到</div>
                <div class="date_">
                    <div class="totalDays">
                        <span class="num_">{{signData.signTotalDays}}</span>
                        <span>天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="totalText">
            明日连续签到可领取{{signData.nextSignNumber}}积分
        </div>
        <div class="contant">
            <div class="picker">
                <div class="title_">
                    <span class="icon_text"></span>
                    <span class="text_">连续签到有更多惊喜哦</span>
                </div>
                <div class="dateList">
                    <div v-for="(i, index) in 7" :key="i.id" class="box">
                        <div :class="[i <= 1 ? 'actived_': 'timeList']">
                            <div class="num_">+{{(signData.thisSignNumber+10*i)>=70 ? 70 : (signData.thisSignNumber+10*i)}}</div>
                            <img v-if="i===1" src="../../assets/checked.png" alt="">
                            <img v-else src="../../assets//icon_.png" alt="">
                        </div>
                        <div class="nowDays">{{days[index]}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_">今日已签</div>
        <div class="totalScore">
            <span class="icon_"></span><span class="total_">{{signData.totalIntegralNumber}}</span>
        </div>
        <div @click="goPage" class="recoreds">
            <div>兑换记录</div>
            <div class="right_"></div>
            </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            signData: '',
            days: [],
            userId: ''
        }
    },
    beforeCreate () {
        this.userId = localStorage.getItem('userId')
        console.log(this.userId)
    },
    mounted () {
        this.getData()
    },
    methods: {
       goPage () {
           this.$router.push({path: '/myScore', query: {totalScore: this.signData.totalIntegralNumber}})
       },
       goRule () {
           this.$router.push({path: '/rule'})
       },
        // 获取签到数据
        getData () {
            console.log(localStorage.getItem('userId'))
            axios.post('/sign/clickSign', {
                userId: localStorage.getItem('userId')
            }).then(res => {
                this.signData = res.data.data
                console.log(this.signData.thisSignNumber)
            })
        },
        // 显示7天数据
        getDate () {
            let dayArr = []
            let nowDate = new Date('2018-2-27')
            let times = ''
            for (let i = 0; i < 7; i++) {
                nowDate.setDate(nowDate.getDate() + i)
                times = (nowDate.getMonth() + 1) + '.' + nowDate.getDate()
                dayArr.push(times)
            }
            this.days = dayArr
            console.log(dayArr)
        },
        gaBack_ () {
            this.$router.push({path: '/perCenter_'})
        }
    }
}
</script>
<style lang="less" scoped>
.page_{
    height:100%;
    background:#ffffff;
}
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 0 1px #eeeeee;
}
.banner{
    height:1.77rem;
    background: url('../../../static/sign_bj.png') no-repeat;
    background-size:100% 100%;
    .signRule{
        display: flex;
        align-items: center;
        justify-content:flex-end;
        font-size:.12rem;
        height:.18rem;
        padding-top:.06rem;
        margin-right:.17rem;
        color:#414141;
        .icon_sign{
            display: inline-block;
            width:.09rem;
            height:.1rem;
            margin-right:.05rem;
            background: url('../../assets/icon_sign.png') no-repeat;
            background-size: 100% 100%;
        }
    }
    .signDate{
        font-size:.15rem;
        color:#414141;
        text-align: center;
        .text_{
            margin:.14rem 0 .13rem;
            line-height:.21rem;
        }
        .date_{
            width:1.06rem;
            height:.85rem;
            background:url('../../assets/date.png') no-repeat;
            background-size: 100% 100%;
            margin:0 auto;
            border-radius: .08rem;
            box-shadow: .02rem 0.02rem .02rem #D8D8D8;
            .totalDays{
                margin-top:.18rem;
                display: inline-block;
                height:.67rem;
            }
            .num_{
                display: inline-block;
                font-size:.48rem;
                line-height:.67rem;
            }
        }
    }
}
.totalText{
    text-align: center;
    font-size:.14rem;
    color:#414141;
    line-height: .2rem;
    padding-bottom:.19rem;
    background: #ffffff;
}
.contant{
    height:1.13rem;
    padding:.15rem;
    background:#ffffff;
    .picker{
        border-radius: .08rem;
        background:#F8F8FA;
        padding:0 .14rem;
        height:100%;
        .title_{
            display: flex;
            align-items: center;
            height: .18rem;
            font-size:.13rem;
            color:#F77955;
            margin-top:.09rem;
            .icon_text{
                display: inline-block;
                width:.13rem;
                height:.11rem;
                background:url('../../assets/gift.png') no-repeat;
                background-size: 100% 100%;
                margin-right:.03rem;
            }
        }
        .dateList{
            display: flex;
            align-items: center;
            justify-content:space-between;
            font-size:.12rem;
            height:.86rem;
            color:#333333;
            .box{
                img{
                    display: block;
                    height:.1rem;
                    margin:0 auto;
                }
                .nowDays{
                    margin-top:.05rem;
                }
            }
        }
    }
}
.actived_,.timeList{
    width:.36rem;
    height:.4rem;
    text-align: center;
    background:#ffffff;
    border-radius: .04rem;
    .num_{
        padding: .07rem 0 .02rem;
        line-height:.17rem;
    }
}
.old_{
    background:#D9D9D9;
}
.actived_{
    color:#ffffff;
    background:#F77955;
}
.btn_,.click{
    width:2.34rem;
    height:.34rem;
    font-size:.15rem;
    line-height: .34rem;
    margin:.43rem auto;
    margin-bottom:.32rem;
    background:#D9D9D9;
    color:#ffffff;
    border-radius: .18rem;
}
.click{
    background:#D9D9D9;
}
.totalScore{
    margin:0 auto;
    font-size:.3rem;
    color:#F77955;
    line-height: .42rem;
    .icon_{
        display: inline-block;
        width:.16rem;
        height:.16rem;
        background: url('../../assets/icon_tal.png') no-repeat;
        background-size: 100% 100%;
        margin-right:.05rem;
    }
}
.recoreds{
    height:.2rem;
    font-size:.14rem;
    color:#a2a2a2;
    display: flex;
    align-items: center;
    justify-content:center;
    margin-top:.1rem;
    margin-bottom:.9rem;
    div{
        line-height: .2rem;
    }
    .right_{
        width:.06rem;
        height:.12rem;
        background:url('../../assets/right_score.png') no-repeat;
        background-size: 100% 100%;
        margin-left:.03rem;
    }
}
</style>

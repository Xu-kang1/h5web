<template>
    <div class="fixed">
        <mt-header v-if="showHeader" fixed title="积分规则">
            <router-link to="" @click.native="goBack" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <div class="title">积分获取方式</div>
            <div class="text_">
                <p>积分价值：100积分=1元</p>
                <p>1、签到领积分：<br/>
                用户可以每日前往签到页面进行签到，首日可领取1积分，连续签到可得3、5、7、10积分，连续签到每日可领取积分上限为10积分；若签到中断则重新计算，不计入等级积分，每月可有3次补签机会；</p>
                <p>2、论坛发帖领积分：<br/>
                登录后点击贷款超市内产品完成首次借贷申请，返回首页即可获得10积分，每个产品只能获取积分一次，单日每个用户最多可获得50积分；</p>
                <p>3、点击产品赚积分：<br/>
                每点击1个产品获得10积分，日上限50积分，每个产品有一次获取积分的机会。
                </p>
                <p>4、分享每日新品赚积分：<br/>
                在每日新品页分享每日新品给好友即可赚积分，每次分享可得10积分，日上限为50积分。
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
           showHeader: false
        }
    },
    mounted () {
        document.querySelector('#app').style.cssText = 'margin-top:0;'
    },
    methods: {
       goBack () {
           this.$router.go(-1) 
       } 
    }
}
</script>
<style lang="less" scoped>
.fixed{
    position: fixed;
    height:100%;
    width:100%;
    top:0;
    background:#ffffff;
}
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 0 1px rgba(193,193,193,0.25);
}
.container{
    padding:0 .12rem;
    text-align: left;
    .title{
        font-size:.14rem;
        font-weight: 600;
        line-height: .2rem;
        color:#343434;
        margin-top:.2rem;
        margin-bottom:.06rem;
    }
    .text_{
        font-size:.13rem;
        line-height: .18rem;
        p{
            margin-bottom:.1rem;
        }
    }
}
</style>

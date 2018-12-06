<template>
    <div class="fixed">
        <mt-header fixed title="积分获取方式">
            <router-link to="" @click.native="goBack" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <div class="title">积分获取方式</div>
            <div class="text_">
                <p>1、通过每日登录并签到获取积分；</p>
                <p>2、登录后点击贷款超市内产品完成首次借贷申请，返回首页即可获得10积分，每个产品只能获取积分一次，单日每个用户最多可获得50积分。</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
           userId: localStorage.getItem('userId'),
           phone: localStorage.getItem('phone')
        }
    },
    methods: {
       goBack () {
           this.$router.push({path: '/perCenter_'}) 
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
        margin-top:.6rem;
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

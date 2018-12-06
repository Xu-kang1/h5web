<template>
    <div>
        <mt-header fixed title="签到规则">
            <router-link to="/signIn" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="banner">
            <img src="../../../static/rule_bg.png" alt="">
            <span class="bigSize">签到规则</span>
        </div>
        <div class="title">
            <span class="icon_rule"></span>
            <span class="">签到规则</span>
        </div>
        <div class="rules">
            <div class="lists">
                <!-- <span class="cricle"></span> -->
                <p><span class="cricle"></span>用户每天在积分商城进行签到时，都会获得一定的积分奖励随着天数的增多，获得的积分也会越来越多。</p>
                <p><span class="cricle"></span>每次连续累计签到的周期为七天，即从第一次签到日算起七日内，连续7日签到可获得10、20、30、40、50、60、70积分，第8日开始每天签到可获得70积分，如中间断签将重新从0计算，并重新累计天数。</p>
                <p class="notice_">注：若出现违规行为（如作弊、恶意套取等行为）有权取消其参与资格。</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
div{
    color:#343434;
    background: #ffffff;
}
#app .mint-header-title{
    font-size:.17rem;
}
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 0 1px #eeeeee;
}
.banner{
    height: 1.3rem;
    position: relative;
    img{
        display: block;
        width:100%;
    }
    .bigSize{
        position: absolute;
        top:.45rem;
        left:.38rem;
        font-size:.3rem;
        color:#ffffff;
        // font-weight: bold;
    }
}
.title{
    margin-top: .08rem;
    height: .4rem;
    padding: 0 .12rem;
    display: flex;
    align-items: center;
    font-size:.15rem;
    .icon_rule{
        display: inline-block;
        width:.17rem;
        height:.16rem;
        margin-right:.04rem;
        background:url('../../assets/icon_.png') no-repeat center;
        background-size: 100% 100%;
    }
}
.lists{
    p{
        font-size:.13rem;
        line-height: .19rem;
        text-align: left;
        padding:0 .22rem;
        position: relative;
        margin-bottom:.1rem;
        .cricle{
            position: absolute;
            display: inline-block;
            width:.05rem;
            height:.05rem;
            background:#F5A418;
            border-radius: 50%;
            top:.07rem;
            left:.1rem;
        }
    }
    .notice_{
        color:#666666;
        font-size:.12rem;
        padding-bottom:.1rem;
    }
}
</style>

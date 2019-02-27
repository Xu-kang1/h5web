<template>
    <div class="box">
        <!-- <mt-header fixed title="积分规则">
            <router-link to="/signIn" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <div class="banner">
            <img src="../../../static/rule_bg.png" alt="">
            <span class="bigSize">积分规则</span>
        </div>
        <div class="title">
            <span class="icon_rule"></span>
            <span class="">积分价值：100积分=1元</span>
        </div>
        <div class="rules">
            <div class="lists">
                <!-- <span class="cricle"></span> -->
                <div><span class="cricle"></span>
                <span class="title_">签到领积分：</span>
                <p>用户可以每日前往签到页面进行签到，首日可领取1积分，连续签到可得3、5、7、10积分，连续签到每日可领取积分上限为10积分；若签到中断则从新计算，不计入等级积分，每月可有3次补签机会；</p>
                </div>
                <div><span class="cricle"></span>
                    <span class="title_">论坛发帖领积分：</span>
                    <p>在论坛发帖一次，将获得5积分，每日上限20积分，回帖可得1积分，每日上限10积分，同时优质内容被采纳，加精直接获得50积分，无上限；</p>
                </div>
                <div><span class="cricle"></span>
                    <span class="title_">点击产品赚积分：</span>
                    <p>每点击1个产品获得15积分，日上限75积分，每个产品只有一次获取积分的机会；</p>
                </div>
                <div><span class="cricle"></span>
                    <span class="title_">分享每日新品赚积分：</span>
                    <p>在每日新品页分享每日新品给好友即可赚积分，每次分享可得10积分，日上限为50积分。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'margin-top:0;'
        document.title = '积分规则'
    },
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
        font-size:.24rem;
        color:#ffffff;
        // font-weight: bold;
    }
}
.box{
    position: absolute;
    top:0;
    width:100%;
    height:100%;
    background: #ffffff;
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
        background:url('../../assets/jifen.png') no-repeat center;
        background-size: 100% 100%;
    }
}
.lists{
    div{
        font-size:.15rem;
        line-height: .19rem;
        text-align: left;
        padding:0 .22rem;
        position: relative;
        margin-bottom:.06rem;
        .title_{
            font-size:.14rem;
            margin-bottom:.02rem;
            display: inline-block;
        }
        p{
            font-size:.12rem;
            color:#999999;
            line-height: .19rem;
        }
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

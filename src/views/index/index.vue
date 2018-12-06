<template>
    <div class="container">
        <div class="bg">
            <img src="../../../static/bj.png" ondragstart="return false;" alt="">
        </div>
        <div class="content">
            <div class="logo">
                <img src="../../assets/logo_xmd.png" alt="">
                <span class="logoText">星美贷</span>
            </div>
            <div class="text">星美贷隶属于北京星美互联科技有限公司，本平台致力于打造国内专业的信用借款咨询服务平台，免费为个体借款用户和信贷机构提供便捷的信息对接服务。个体用户可以在本平台了解多家信贷机构及信贷机构产品的详细信息，同时信贷机构获得一个自由安全的抢单平台，寻找属于自己的优质客户。北京星美互联科技有限公司成立于2017年7月21日，主要从事技术开发、代理广告、咨询服务等多项服务。</div>
        </div>
        <div class="footer_">
            <div class="up"><span> ©2018 北京星美互联科技有限公司 All Rights Reserved </span><span class="show">| 京ICP备18037794号 -1</span></div>
            <div class="adress"><span>Email:www.xingmeidai.com</span><span>地址：浙江西湖区紫金众创小镇E2栋</span></div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    }
}
</script>
<style scoped>
.container{
    margin-top:-40px;
}
    .bg img{
        width:100%;
    }
    .content{
        margin:0 auto;
    }
    .text{
        font-size:18px;
        width:80%;
        color:#1A1A1A;
        margin:0 auto;
        margin-top:48px;
        margin-bottom:70px;
    }
    .logo{
        margin: 0 auto;
        margin-top:64px;
        width:100px;
        text-align: center;
        font-size:24px;
    }
    .logo img{
        width:100px;
        height:100px;
    }
    .logoText{
        display: block;
        margin-top:15px;
    }
    .footer_{
        width:100%;
        height:120px;
        color:#ffffff;
        font-size:14px;
        margin:0 auto;
        text-align: center;
        background:rgba(48,50,55,1)
    }
    .up{
        padding-top:36px;
        margin-bottom:15px;
    }
    .adress{
        width:100%;
        /* text-align: center; */
        margin:0
    }
    .adress span{
        display: inline-block;
        margin:0 15px; 
    }
    @media screen and (max-width: 580px) {
        .text {
            font-size:12px;
            margin-bottom:20px;
        }
        .logo{
            margin-top:20px;
            font-size:16px;
        }
        .logo img{
            width:50px;
            height:50px;
        }
        .logoText{
            display: block;
            margin-top:8px;
        }
        .footer_{
            position: absolute;
            width:100%;
            bottom:0;
            height:60px;
        }
        .up{
            padding-top:3px;
            margin-bottom:0;
        }
        .up span{
            font-size:10px;
            transform: scale(0.58);
        }
        .show{
            display: none;
        }
        .adress{
            width:100%;
            height:20px;
        }
        .adress span{
            font-size:12px;
            margin:0; 
            transform: scale(0.88);
        }
    }
</style>


<template>
    <div class="container">
        <div class="logo">
            <div class="logo_">
                <img class="first" src="../../assets/logo_index.png" alt="">
                <img class="second" src="../../assets/logo_text.png" alt="">
            </div>
            <ul class="tab">
                <li @click="addBottom(index)" v-for="(item, index) in li" :key="item.id" :class="{border_:istrue==index}">{{item}}</li>
            </ul>
        </div>
        <div class="bg aa">
            <img src="../../../static/banner_index.png" ondragstart="return false;" alt="">
        </div>
        <div class="content">
            <div class="bg_mask">
                <div class="box_ aa">
                <div class="title">
                    <span>公司简介</span>
                    <p></p>
                    <div class="en_">COMPANY PROFILE</div>
                </div>
                <div class="text">星美贷隶属于浙江讯源通网络科技有限公司。浙江讯源通网络科技有限公司，于 2018 年 3 月 27 日推出的贷款信息发布平台。星美贷通过科技驱动金融创新，专为中国优质城市白领人群提供高效、便捷、个性化的信用借款咨询服务；通过“星美贷”为大众富裕人群提供安全、专业的在线财富管理服务截至 2018 年 11 月 30 日，星美贷累计服务了 10 万借款用户， 18 万出借用户，累计促成借款总额达 1 . 89 亿元。</div>
                <div class="text">浙江讯源通网络科技有限公司建于2018年，总部位于金华。浙江讯源通网络科技有限公司是一家从事普惠金融和财富管理事业的金融科技企业，在支付、网贷、众筹、机器人投顾、智能保险、区块链等前沿领域积极布局，通过业务孵化和产业投资参与全球金融科技创新。成立以来，始终坚持以理念创新、模式创新和技术创新服务中国高成长性人群、大众富裕阶层和高净值人士，真正的让金融更美好。</div>
                <div class="text bottom">&nbsp; </div>
                <div class="title">
                    <span>互联网生活消费金融服务平台</span>
                    <p></p>
                </div>
                <div class="products">
                    <div class="list">
                        <img src="../../../static/zixun_1.png" alt="">
                        <div>在线咨询</div>
                    </div>
                    <div class="list">
                        <img src="../../../static/zixun_2.png" alt="">
                        <div>最快下载</div>
                    </div>
                    <div class="list">
                        <img src="../../../static/zixun_3.png" alt="">
                        <div>超多选择</div>
                    </div>
                    <div class="list">
                        <img src="../../../static/zixun_4.png" alt="">
                        <div>费用优惠</div>
                    </div>
                </div>
            </div>
            </div>
            <div class="app">
                <img src="../../../static/bj_new.png" alt="">
            </div>
            <div class="partners aa">
                <div class="title">
                    <span>合作伙伴</span>
                    <p></p>
                    <div class="en_ par">PARTAERS</div>
                </div>
                <div class="bgImg">
                    <img src="../../../static/partaers.png" alt="">
                </div>
            </div>
        </div>
        <div class="footer_ aa">
            <div class="foot_box">
                <div class="info">
                    <p>客服电话</p>
                    <p class="tell">客服电话：0579-83200383</p>
                </div>
                <div class="info">
                    <p>商务合作</p>
                    <p class="tell">wuhongbing@xingmeidai.com</p>
                </div>
                <!-- <div class="qrCode">
                    <p>星美贷官方微信</p>
                    <img src="../../../static/qrCode.png" alt="">
                </div> -->
            </div>
            <div class="up"><span>Copyright ©2018 浙江讯源通网络科技有限公司 All Rights Reserved </span><span class="show">| 京ICP备18037794号 -1</span></div>
            <div class="adress"><span>地址：浙江省金华市金东区高新技术产业园区管委会天山路1号2071办公室</span><span>电话： ‭0579-83200383</span></div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            li: ['首页', '产品介绍', '合作伙伴', '关于我们'],
            istrue: 0
        }
    },
    beforeCreate () {
        document.querySelector('body').style.background = '#ffffff'
    },
    methods: {
        addBottom (index) {
            this.istrue = index
            let lia = document.querySelectorAll('.aa')[index]
            lia.scrollIntoView()
            console.log(lia,index)
        }
    }
}
</script>
<style scoped>
body{
    background:#ffffff;
}
.container{
    margin-top:-40px;
}
.tab{
    display: flex;
    height:100%;
    align-items: center;
    font-size:14px;
     color:#ffffff;
     cursor: pointer;
     margin-right:10%;
}
.tab li{
    height:34px;
    line-height: 34px;
    padding: 0 10px;
    margin:0 25px;
    box-sizing: border-box;
}
.border_{
    border-bottom:2px solid #4F93FE;
}
    .bg img{
        width:100%;
    }
    .content{
        /* margin:0 auto;
        background:url('../../../static/bg_wenli.png') no-repeat;
        background-size:100%; */
    }
    .bg_mask{
        margin:0 auto;
        background:url('../../../static/bg_wenli.png') no-repeat;
        background-size:60%;
        background-position:  center right;
        padding-bottom:170px;
    }
    .box_{
        width:80%;
        margin:0 auto;
    }
    .title{
        font-size:40px;
        margin:0 auto;
        margin-top:25px;
        color:#333333;
    }
    title span{
        font-weight: bold;
    }
    .title p{
        width:100px;
        height:5px;
        background:#4F96FD;
        border-radius:3px;
        margin:15px auto;
    }
    .title .en_{
        color:#1a1a1a;
        font-size:24px;
    }
    .text{
        font-size:20px;
        text-indent: 40px;
        text-align: left;
        color:#1A1A1A;
        margin:10px auto;
    }
    .bottom{
        margin-bottom:72px;
    }
    .products{
        display: flex;
        font-size:24px;
        align-items: center;
        justify-content: space-around;
        margin-top:90px;
    }
    .products .list{
        display: inline-flex;
        align-items: center;
        flex-direction:column;
        width:150px;
    }
    .list img{
        display: block;
        margin-bottom:15px;
    }
    .logo{
        margin: 0 auto;
        width:100%;
        position: absolute;
        top:0;
        z-index:10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height:80px;
        font-size:14px;
        background:rgba(36,39,54,0.2);
    }
    .logo_{
        height:80px;
        display: inline-flex;
        align-items: center;
        margin-left:20%;
    }
    .logo .first{
        width:52px;
        height:42px;
        margin:0;
    }
    .logo .second{
        width:108px;
        height:35px;
        margin-left:10px;
    }
    .logo img{
        display: inline-block;
        margin-left:20%;
        margin-right:25px;
        width:70px;
        height:70px;
    }
    .app{
        width:100%;
    }
    .app img{
        display: block;
        width:100%;
    }
    .bgImg img{
        display: block;
        width:80%;
        margin: 0 auto;
        margin-bottom:68px;
    }
    .par{
        margin-bottom:83px;
    }
    .footer_{
        width:100%;
        min-height:120px;
        color:#ffffff;
        font-size:14px;
        margin:0 auto;
        text-align: center;
        background:#242736;
    }
    .qrCode p{
        margin-bottom:15px;
    }
    .foot_box{
        width:60%;
        font-size: 18px;
        min-height:150px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin:0 auto;
        padding-top:54px;
        text-align: center;
    }
    .tell{
        margin-top:54px;
    }
    .up{
        padding-top:36px;
        margin-bottom:15px;
    }
    .adress{
        width:100%;
        display: flex;
        justify-content:center;
        /* text-align: center; */
        padding-bottom:15px;
    }
    .adress span{
        display: inline-block;
        margin:0 15px; 
    }
    /* @media screen and (max-width: 580px) {
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
    } */
</style>


<template>
    <div>
        <div class="header">
            <div class="info_">
                <img class="img" src="../../assets/user_icon.png" alt="">
                <div>{{phone.substring(0,4)+'****'+phone.substring(8,11)}}</div>
            </div>
        </div>
        <mt-cell
        title="关于我们"
        to="/aboutUs"
        is-link>
        </mt-cell>
        <mt-cell class="vision" title="当前版本">{{version}}</mt-cell>
        <div @click="signOut" class="off">
            退出登录
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            phone: '',
            version: ''
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            let URLParams = []
            let params = location.href.split('?')[1].split('&')
            for (let i = 0; i < params.length; i++) {
                let aParam = params[i].split('=')
                URLParams[aParam[0]] = aParam[1]
            }
            // 节点
            this.phone = URLParams['phone']
            this.version = URLParams['version']
        },
         signOut () {
            if (JsBridge) {
                JsBridge.h5ToNative_logout()
                console.log('点击')
            }
        }
    }
}
</script>
<style lang="less" scoped>
.flex{
    display: flex;
    align-items: center;
}
.header{
    height:1.44rem;
    margin-top: -40px;
    margin-bottom: .09rem;
    font-size: .18rem;
    color:#ffffff;
    line-height:.25rem;
    background: linear-gradient(to right, #54A4F1 , #7991FF);
    // background-size: 100%;
    .img{
        display: block;
        width:.6rem;
        height:.6rem;
        margin:0 .2rem;
        // border-radius:50%;
        // margin: 0 auto;
        // padding-top: .34rem;
        // margin-bottom:.1rem;
    }
    .info_{
        padding-top: .54rem;
        .flex();
    }
}
.mint-cell{
    text-align: left;
    height: .48rem;
    font-size:.15rem;
}
 .mint-cell/deep/.mint-cell-wrapper{
        height:100%;
        line-height: .48rem;
    }
.vision{
    border-top: 1px solid #F4F4F4;
}
.off{
    margin-top: .31rem;
    text-align: center;
    font-size:.15rem;
    color:#333333;
    background: #ffffff;
    height: .48rem;
    line-height: .48rem;
}
</style>

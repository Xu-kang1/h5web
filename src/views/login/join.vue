<template>
    <div class="page">
        <mt-header fixed title="星美贷QQ群">
            <router-link to="" @click.native="cancel" slot="left">
            </router-link>
        </mt-header>
        <div class="img">
            <img src="../../../static/join_new.png" alt="">
        </div>
        <!-- <div class="text">
            <p>恭喜您已注册成功</p>
            <p>请加入“人工审核等待群”方便审核</p>
        </div> -->
        <a target="_blank" class="btn" :href="url"></a>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            url: null
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            axios.post('/app/index/qqShare').then(res=> {
                this.url = res.data.data.systemData
                console.log(this.url)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 .01rem .01rem 0 rgba(189,189,189,0.25);
}
header{
    font-size:.17rem;
}
.page{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto; 
    display: flex;
    align-items: center;
    background:#ffffff;
    .img{
        position: relative;
        width:100%;
        top:0;
        img{
            display: block;
            width:100%;
            margin: 0 auto;
        }
    }
    .text{
        position: relative;
        text-align: center;
        top:1rem;
        font-size:.16rem;
        color:#3B3B3B;
        line-height: .29rem;
    }
    .btn{
        display: block;
        position: absolute;
        width:100%;
        height:2rem;
        bottom:.5rem;
    }
}
</style>

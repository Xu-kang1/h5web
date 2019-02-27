<template>
    <div class="box">
        <mt-header v-if="showHeader" fixed title="积分记录">
            <router-link to="" @click.native="goBack" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <div class="black"></div>
            <div v-for="list in lists" :key="list.id" class="list">
                <div class="text_">
                    <div class="title_">{{list.description}}</div>
                    <div class="time">{{list.createTime}}</div>
                </div>
                <div  :class="list.flag?'plus':'min'" class="num_">{{list.flag?`+${list.integralNumber}`:`-${list.integralNumber}`}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
           showHeader: false,
           userId: '',
           lists: ''
        }
    },
    beforeMount () {
        this.getParmas()
    },
    mounted () {
        this.getScore()
        document.querySelector('#app').style.cssText = 'margin-top:0;'
        document.title="积分记录"
    },
    methods: {
       goBack () {
           this.$router.go(-1) 
       },
       getScore () {
           axios.post('/app/user/integral/record', {
               userId: this.userId
           }).then(res => {
               this.lists = res.data.data
           })
       },
        // 获取页面参数
        getParmas () {
            let URLParams = []
            if (location.href.split('?')[1] != undefined) {
                let params = location.href.split('?')[1].split('&')
                for (let i = 0; i < params.length; i++) {
                    let aParam = params[i].split('=')
                    URLParams[aParam[0]] = aParam[1]
                }
                this.userId = URLParams['userId']
                console.log(this.userId)

            }
        }
    }
}
</script>
<style lang="less" scoped>
#app{
    position: relative;
    top:0;
    width:100%;
    height:100%;
    background:#ffffff;
}
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 0 1px rgba(193,193,193,0.25);
}
.box{
    position: absolute;
    top:0;
    width:100%;
    height:100%;
    background: #ffffff;
}
.container{
    background: #ffffff;
    // height:100%;
    .black{
        height:.1rem;
        background:#F8F8F8;
    }
    .list{
        display: flex;
        padding-right: .15rem;
        margin-left:.2rem;
        background:#ffffff;
        align-items: center;
        justify-content: space-between;
        height:.48rem;
        font-size:.14rem;
        border-bottom: .01rem solid #F4F4F4;
        .text_{
            text-align: left;
            margin-left:-.05rem;
            color:#4c4c4c;
            .title_{
                line-height: .2rem;
            }
            .time{
                font-size:.11rem;
                color:#c9c9c9;
            }
        }
        .num_{
            font-size:.18rem;
            color:#F8530C;
        }
        .plus{
            color:#F8530C;
        }
        .min{
            color:#0EAD47;
        }
    }
}
</style>

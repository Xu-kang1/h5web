<template>
    <div>
        <mt-header v-if="showHeader" fixed title="全部模块">
            <router-link to="" tag='li' @click.native='goBack' slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="box">
            <div class="title">贷款专区</div>
            <div @click="goModule(index)" v-for="(list, index) in moduleList" :key="list.id" class="list">
                <div class="left">
                    <img :src="list.moduleIconUrl" alt="" class="icon"/>
                    <div class="icon_text">{{list.moduleName}}</div>
                </div>
                <div class="right">
                    <div class="totalNum">帖子总数 <span>{{list.totalTopic}}</span></div>
                    <div class="dayNum">今日 <span>{{list.todayTopic}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            moduleList: [],
            showHeader: false
        }
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'margin-top:0;'
        document.title = ''
    },
    created () {
        this.getTitle()
    },
    mounted () {
        document.title = '全部模块'
        this.moreModule()
    },
    methods: {
        // 加载更多模块
        moreModule () {
            axios.post('/tribune/module/list', {
                userId: '',
                pageNumber: 1,
                pageSize: 10
            }).then(res => {
                this.moduleList = res.data.data
                document.title = '全部模块'
            })
        },
        // 跳转对应的模块主页
        goModule (index) {
            this.$router.push({path: '/moduleDetail', query: {moduleId: this.moduleList[index].moduleId, tag: 2}})
        },
        // 返回首页
        goBack () {
            // this.$router.push({path: '/forum'})
            let userAgent = navigator.userAgent.toLowerCase()
            if (userAgent.indexOf('app/android') != -1) {
                    this.$router.push({path: '/forum_?'+sessionStorage.getItem('url')})
                } else {
                    this.$router.push({path: '/forum'})
            }
        },
        // 获取title
        getTitle () {
            document.title = ''
            let userAgent = navigator.userAgent.toLowerCase()
            if (userAgent.indexOf('app/android') != -1) {
                this.showHeader = false
            } else {
                this.showHeader = true
            }
        }
    }
}
</script>
<style lang="less" scoped>
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 .01rem .02rem 0 rgba(189,189,189,0.25);
}
header{
    font-size:.17rem;
}
.box{
    margin-top:.44rem;
    background:#ffffff;
    padding-left: .18rem;
    text-align: left;
    color:#333333;
    font-size:.14rem;
    .title{
        // border-bottom: .01rem solid #F4F4F4;
        font-size:.15rem;
        height:.38rem;
        line-height: .38rem;
    }
    .list{
        height:.48rem;
        display: flex;
        align-items: center;
        justify-content:space-between;
        border-top: .01rem solid #F4F4F4;
        .left,.right{
            display: inline-flex;
            font-size:.13rem;
             display: flex;
            align-items: center;
            // height:.48rem;
            // line-height: .48rem;
            .icon_text{
                margin-left:.08rem;
            }
            .icon{
                width:.25rem;
                height:.25rem;
                border-radius: 50%;
                // border: 1px solid red;
            }
            span{
                color:#b1b1b1;
            }
            .dayNum{
                margin-left:.18rem;
                margin-right:.16rem;
            }
        }
    }
}
</style>

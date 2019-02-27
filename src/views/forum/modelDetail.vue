<template>
    <!-- 模块对应帖子 -->
    <div class="page">
        <mt-header v-if="showHdader" fixed :title="tribuneModuleModel.moduleName">
            <router-link to="" tag='li' @click.native='goBack' slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="30">
            <div class="contain">
                <div 
                v-for="(list, index) in lists"
                :key="list.id"
                @click="goDetail(index)"
                class="list">
                    <div class="title">
                        <div v-show="list.isSuper==='0' ? true :false " class="tag_">精</div>
                        <div class="text">{{list.topicTitle}}</div>
                    </div>
                    <div class="main">
                        <div class="write allWidth">
                            <div class="te_">{{list.topicContent}}</div>
                        </div>
                        <div v-if="status[index]" class="imgSee">
                            <img v-show="i<3" v-for="(item, i) in arrImg[index]" :key="item.id" :src="item" alt="">
                        </div>
                        <div class="userInfo">
                            <img :src="list.userIcon" alt="" class="user">
                            <div class="text">{{list.userName}}<span>#{{list.moduleName}}#</span></div>
                        </div>
                    </div>
                    <div class="see">
                        <span class="read_"><i></i>{{list.topicViewsNumber}}</span>
                        <span class="talk"><i></i>{{list.topicCommentsNumber}}</span>
                    </div>
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
            lists: [],
            moduleId: '',
            tribuneModuleModel: '',
            timeComputed: [],
            status: [],
            arrImg: [],
            tag:'',
            num: 1,
            pageSize:10,
            loading :true,
            showHdader: false
        }
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'margin-top:0;'
        document.title = ''
    },
    created () {
        this.$nextTick(() => {
            this.getData()
        })
    },
    mounted () {
        this.getTitle()
        this.moduleId = this.$route.query.moduleId
        // this.getData()
        this.getParmas()
    },
    methods: {
        // 获取模块数据
        getData () {
            let arr1 = []
            axios.post('/tribune/module/moduleDetail', {
                userId: '',
                moduleId: this.moduleId,
                pageNumber: this.num,
                pageSize: this.pageSize
            }).then(res => {
                this.tribuneModuleModel = res.data.data.tribuneModuleModel
                document.title = this.tribuneModuleModel.moduleName
               let arr = [], arrPic =[]
                res.data.data.topicList.forEach((element, index) => {
                    arr1[index] = element
                    console.log(index,element.topicPic)
                    // 处理图片显示
                    if (element.topicPic !== null) {
                        arrPic[index] = element.topicPic.split(',')
                        arr[index] = true
                    } else {
                        arrPic[index] = ''
                        arr[index] = false
                    }
                })
                console.log(arr1)
                if (res.data.data.topicList.length === 0) {
                    this.loading = true
                } else {
                    this.loading  = false
                }
                if (this.num !== 1) {
                    this.lists = [...this.lists].concat(arr1)
                    this.status = this.status.concat(arr)
                    this.arrImg = this.arrImg.concat(arrPic)
                } else {
                    this.lists = res.data.data.topicList
                    this.status = arr
                    this.arrImg = arrPic
                }
                console.log(this.arrImg,this.status)
                // this.initTime()
            })
        },
        // 帖子详情
        goDetail(index) {
            axios.post('/tribune/topic/addView', {
                topicId: this.lists[index].topicId
            }).then(res => {})
            // console.log(this.topicList[index].topicId)
            let userAgent = navigator.userAgent.toLowerCase()
            if (userAgent.indexOf('app/android') != -1) {
                    this.$router.push({path: '/mainNote_', query: {topicId: this.lists[index].topicId}})
                } else {
                    this.$router.push({path: '/mainNote', query: {topicId: this.lists[index].topicId}})
            }
        },
        // 返回首页
        goBack () {
            if (this.tag == '2') {
                this.$router.push({path: '/showMore'})
            } else {
                let userAgent = navigator.userAgent.toLowerCase()
                if (userAgent.indexOf('app/android') != -1) {
                        this.$router.push({path: '/forum_?'+sessionStorage.getItem('url')})
                    } else {
                        this.$router.push({path: '/forum'})
                }
            }
        },
        loadMore() {
            this.loading = true
            console.log(this.num)
            setTimeout(() => {
                this.num++
                this.getData()
            }, 500)
        },
        getParmas () {
            if (location.href.split('?')[1] !== undefined) {
                let URLParams = []
                let params = location.href.split('?')[1].split('&')
                for (let i = 0; i < params.length; i++) {
                    let aParam = params[i].split('=')
                    URLParams[aParam[0]] = aParam[1]
                }
                // 节点
                this.tag = URLParams['tag']
            } 
        },
        // 获取title
        getTitle () {
            document.title = ''
            let userAgent = navigator.userAgent.toLowerCase()
            if (userAgent.indexOf('app/android') != -1) {
                this.showHdader = false
            } else {
                this.showHdader = true
            }
        }
    }
}
</script>
<style lang="less" scoped>
[v-cloak] {
  display:none !important;
}
.bgColor{
    background: #ffffff;
}
.page{
    position: relative;
    font-size: .12rem;
}
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 .01rem .02rem 0 rgba(189,189,189,0.25);
}
.is-fixed{
z-index:10;
}
header{
    font-size:.15rem;
}
.nav{
    height: 1rem;
    margin-top:.01rem;
    padding: 0 .12rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bgColor();
    .nav_list{
        width:.84rem;
        height:.68rem;
        border-radius: .06rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            display: block;
            // opacity: 0.8;
            position: absolute;
            top:0;
            z-index:0;
            width:100%;
            height:100%;
        }
        .text_{
            position: absolute;
            z-index:1;
            font-weight:600;
            font-size:.13rem;
            line-height: 100%;
            color:#ffffff;
        }
    }
}
.contain{
    font-size:.13rem;
    margin-top:.05rem;
    .list{
        padding:0 .18rem 0 .16rem;
        .bgColor();
        .main{
            text-align: left;
            border-bottom: .01rem solid #F4F4F4;
             .write{
                color:#666666;
                text-align: left;
                .te_{
                    font-size:.13rem;
                    text-overflow:ellipsis; 
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    height: .34rem;
                    line-height: .18rem;
                    color:#9e9e9e;
                }
                // .lag{
                //     height: .20rem;
                //     display: flex;
                //     align-items: center;
                //     justify-content: space-between;
                //     margin-top: .06rem;
                //     font-size: .12rem;
                //     .tag{
                //         color:#F5AB18;
                //     }
                // }
            }
            .imgSee{
                margin-top: .15rem;
                display: inline-flex;
                justify-content: flex-start;
                img{
                    display: inline-block;
                    width:1.06rem;
                    height: 1.02rem;
                    border-radius: .06rem;
                    margin-right:.12rem;
                }
            }
        }
    }
    .see{
        height:.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom:.05rem;
        .read_,.talk{
            display: inline-flex;
            width:50%;
            align-items: center;
            justify-content: center;
            color:#B1B1B1;
            font-size:.12rem;
            i{
                display: inline-block;
                width:.13rem;
                height:.09rem;
                margin-right:.04rem;
                margin-left:.1rem;
                background:url('../../assets/liulan.png') no-repeat center;
                background-size: .13rem .08rem;
            }
        }
        .talk{
            i{
                width:.13rem;
                height:.11rem;
                background:url('../../assets/pinglun.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    .title{
        height: .44rem;
        display: flex;
        align-items: center;
        .tag_{
            color:#5BA0FF;
            font-size:.11rem;
            line-height: .14rem;
            margin-right:.04rem;
            padding:.025rem .03rem;
            border: .01rem solid #5BA0FF;
            border-radius: .02rem;
        }
        .text{
            text-align: left;
            font-size:.16rem;
            // margin-left:.08rem;
            color:#333333;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
    .userInfo{
        display: flex;
        align-items: center;
        height:.18rem;
        color:#B1B1B1;
        margin: .13rem 0;
        .text{
            font-size:.11rem;
            span{
                display: inline-block;
                color:#F5AB18;
                font-size:.11rem;
                margin-left:.12rem;
            }
        }
        img{
            display: block;
            height:.18rem;
            width: .18rem;
            border-radius: 50%;
            // border: 1px solid #FFB951;
            margin-right:.08rem;
        }
        span{
            font-size:.12rem;
        }
    }
}
.width{
    width:2.25rem
}
.allWidth{
    width:100%;
}
.plus{
    position: fixed;
    bottom: .3rem;
    right:.2rem;
    .normal{
        width:.4rem;
        height:.4rem;
        margin-bottom:.08rem;
    }
}
.btn{
    background: url('../../assets/showMore.png') no-repeat center;
    background-size:50% 50%;
}
.btn,.normal,.closed{
    // position: fixed;
    text-align: center;
    position: relative;
    background-color:#F5AB18;
    width:.4rem;
    height:.4rem;
    line-height: .4rem;
    border-radius: 50%;
    z-index:100;
    color:#ffffff;
}
.closed{
    background: url('../../assets/showMore.png') no-repeat center;
    background-size:50% 50%; 
    background-color:rgba(117,117,117,0.75);
    transform: rotate(45deg);
}
.my{
    background: #5A9EF3;
}
.fatie{
    background:#F16161;
}
// 过度动画
.router-slid-enter-active, .router-slid-leave-active {
  transition: all .6s;
}
.router-slid-enter, .router-slid-leave-active {
  transform: translateY(.3rem);
  opacity: 0;
}
</style>

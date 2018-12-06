<template>
    <div class="page" v-cloak>
        <mt-header fixed title="论坛">
            <router-link to="" tag='li' @click.native='goBack' slot="left">
                <!-- <mt-button icon="back"></mt-button> -->
            </router-link>
        </mt-header>
        <div 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="30">
            <div class="nav">
                <div
                v-for="(list, index) in moduleList"
                :key="list.id"
                v-show="index<3"
                @click="goIndex(index)"
                class="nav_list">
                    <img :src="imgArr[index]" alt="" class="icon_">
                    <div class="text_">{{list.moduleName}}</div>
                </div>
                <div @click="viewMore" class="nav_list">
                    <img src="../../assets/more.png" alt="" class="icon_">
                    <div class="text_">更多模块</div>
                </div>
            </div>
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
                            <img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+list.userIcon" alt="" class="user">
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
        <div class="plus">
            <transition name="router-slid">
                <div v-show="showTag" class="tags">
                    <div @click="goMsg" class="normal my">我的</div>
                    <div @click="goAdd" class="normal fatie">发帖</div>
                </div>
            </transition>
            <div @click="showMore" :class="tagClass"></div>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            showTag: false,
            status: [],
            imgArr: [ require('../../assets/gfhd.png'), require('../../assets/jltd.png'), require('../../assets/dkjq.png'), require('../../assets/more.png')],
            timeComputed: [],
            tagClass: 'btn',
            // 论坛首页数据
            num: 1,
            pageSize: 10,
            loading: true,
            //
            lists: [],
            moduleList: [],
            arrImg: [],
            userId: localStorage.getItem('xmd_id')
        }
    },
    created () {
        this.$nextTick(() => {
            this.getData()
        })
    },
    mounted () {
        let _this = this
        // window.addEventListener('scroll',  _this.handleScroll, true)
        this.moreModule()
    },
    // computed: {
    //     getClass (index) {
    //         console.log(this.status[index])
    //         return this.status[index] ? 'width' : 'allWidth'
    //     }
    // },
    methods: {
        // 右下角“+”
        showMore () {
            this.showTag = !this.showTag
            this.showTag === false ? this.tagClass = 'btn' : this.tagClass = 'closed'
        },
        // 展示更多模块
        viewMore () {
           this.$router.push({path: '/showMore'}) 
        },
        // 跳转对应模块详情
        goIndex (index) {
           this.$router.push({path: '/moduleDetail', query: {moduleId: this.moduleList[index].moduleId}})
        },
        // 跳转帖子详情
        goDetail (index) {
            axios.post('/tribune/topic/addView', {
                topicId: this.lists[index].topicId
            }).then(res => {})
            this.$router.push({path: '/mainNote', query: {topicId: this.lists[index].topicId}})
        },
        // 发帖
        goAdd () {
            if (this.userId === null) {
                this.$router.push({path: '/xmd_login'})
            } else {
                this.$router.push({path: '/addCard'})
            }
        },
        // 我的
        goMsg () {
            if (this.userId === null) {
                this.$router.push({path: '/xmd_login'})
            } else {
                this.$router.push({path: '/message'})
            }
        },
        // 显示时间处理
        initTime () {
            let nowTime = new Date().getTime()
            let Difference,time = ''
            this.lists.forEach((item, index)=>{
                //计算时间
                Difference = ((nowTime - new Date(item.createTime).getTime())/1000)/60;
                if(0<Difference&&Difference<=60){
                    time = Math.floor(Difference)+'分钟前'
                }else if(1<(Difference/60)&&Difference/60<=24){
                    time = Math.floor(Difference/60)+'小时前'
                }
                else if(Difference/24>1){
                    time = Math.floor((Difference/60)/24)+'天前'
                }
                this.timeComputed.push(time)
            })
            console.log(this.timeComputed)
        },
        // 获取首页论坛帖子列表
        getData () {
           let arr1 = []
            axios.post('/tribune/topic/list', {
                userId: '',
                pageNumber: this.num,
                pageSize: this.pageSize
            }).then(res => {
                // console.log(res.data.data,this.num)
                let arr = [], arrPic =[]
                res.data.data.forEach((element, index) => {
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
                if (res.data.data.length === 0) {
                    this.loading = true
                } else {
                    this.loading  = false
                }
                if (this.num !== 1) {
                    this.lists = [...this.lists].concat(arr1)
                    this.status = this.status.concat(arr)
                    this.arrImg = this.arrImg.concat(arrPic)
                } else {
                    this.lists = res.data.data
                    this.status = arr
                    this.arrImg = arrPic
                }
                // this.status = arr
                this.initTime()
                console.log(this.arrImg,this.status)
            })
        },
        // 获取头部模块
        moreModule () {
            axios.post('/tribune/module/list', {
                userId: '',
                pageNumber: 1,
                pageSize: 10
            }).then(res => {
                this.moduleList = res.data.data
            })
        },
        loadMore() {
            this.loading = true
             setTimeout(() => {
                this.num++
                // alert(123)
                this.getData()
                this.loading = true
            }, 500)
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

<template>
    <div class="page" style="-webkit-overflow-scrolling:auto;">
        <mt-header fixed title="论坛">
            <router-link to="" tag='li' @click.native='goBack' slot="left">
                <!-- <mt-button icon="back"></mt-button> -->
            </router-link>
        </mt-header>
        <div 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="30">
        <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
            <div class="nav">
                <div
                v-for="(list, index) in moduleList"
                :key="list.id"
                v-show="index<3"
                @click="goIndex(index)"
                class="nav_list">
                    <img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+list.moduleIconUrl" alt="" class="icon_">
                    <div class="text_">{{list.moduleName}}</div>
                </div>
                <div @click="viewMore" class="nav_list">
                    <img src="../../assets/gengduo.png" alt="" class="icon_">
                    <div class="text_">更多模块</div>
                </div>
            </div>
            <div class="contain" ref="loadmore">
                <div 
                v-for="(list, index) in lists"
                :key="list.id"
                @click="goDetail(index)"
                class="list">
                    <div class="title">
                        <div v-show="list.isSuper" class="tag_">精</div>
                        <div class="text">{{list.topicTitle}}</div>
                    </div>
                    <div class="userInfo">
                        <img src="" alt="" class="user">
                        <div class="text">{{list.userName}} <span>•</span> {{timeComputed[index]}}</div>
                    </div>
                    <div class="main">
                        <div class="write" :class="[status[index] ? 'width' : 'allWidth']">
                            <div class="te_">{{list.topicContent}}</div>
                            <div class="lag">
                                <div class="tag">#{{list.moduleName}}#</div>
                                <div class="see">
                                    <span class="read_"><i></i>{{list.topicViewsNumber}}</span>
                                    <span class="talk"><i></i>{{list.topicCommentsNumber}}</span>
                                </div>
                            </div>
                        </div>
                        <div v-show="status[index]" class="imgSee">
                            <img :src="list.topicThumbnail" alt="">
                        </div>
                    </div>
                </div>
            </div>
        <!-- </mt-loadmore> -->
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
// import { Loadmore } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
export default {
    // components : {
    //     Loadmore
    // },
    data () {
        return {
            showTag: false,
            status: [],
            // imgArr: [{src: 'huodong.png', text: '官方活动'}, {src: 'jiaoliu.png', text: '交流天地'}, {src: 'daikuan.png', text: '贷款技巧'}, {src: 'gengduo.png', text: '更多模块'}],
            timeComputed: [],
            tagClass: 'btn',
            // 论坛首页数据
            num: 1,
            pageSize: 10,
            loading: true,
            allLoaded: false,
            listBox: [],
            //
            lists: [],
            moduleList: [],
            userId: localStorage.getItem('xmd_id')
        }
    },
    mounted () {
        let _this = this
        // window.addEventListener('scroll',  _this.handleScroll, true)
        this.$nextTick(() => {
            this.getData()
        })
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
            this.lists.forEach(item=>{
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
                console.log(res.data.data,this.num)
                // this.listBox
                let arr = []
                res.data.data.forEach((element, index) => {
                    arr1[index] = element
                    if (element.topicThumbnail !== null) {
                        arr[index] = true
                    } else {
                        arr[index] = false
                    }
                })
                this.loading  = false
                if (this.num !== 1) {
                    this.lists = [...this.lists].concat(arr1)
                } else {
                    this.lists = res.data.data
                }
                // this.lists = arr1.concat(arr1)
                // console.log(arr1)
                this.status = arr
                this.initTime()
                console.log(this.lists)
            })
        },
        // 获取头部模块
        moreModule () {
            axios.post('/tribune/module/list', {
                userId: '',
                pageNumber: this.num,
                pageSize: 10
            }).then(res => {
                this.moduleList = res.data.data
            })
        },
        //
        //
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                this.num++
                // alert(123)
                this.getData()
            }, 2000)
        },
        // loadBottom () {
        //     this.num++
        //     this.getData()
        //     this.$refs.loadmore.onBottomLoaded()
        // },
        handleScroll () {
            // var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            // if (document.documentElement.scrollTop >= 745*this.num) {
            //     this.num++
            //     this.getData()
            // }
            console.log(this.$refs.loadmore.scrollTop,'可视窗口：',document.documentElement.clientHeight,document.documentElement.scrollHeight,'文档高度：',document.documentElement.scrollTop)
        }
    }
}
</script>
<style lang="less" scoped>
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
    box-shadow: 0 0 1px #F5F5F5;
}
header{
    font-size:.17rem;
}
.nav{
    height: .9rem;
    margin-top:.01rem;
    padding: 0 .2rem;
    padding-top:.2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .bgColor();
    .nav_list{
        width:.68rem;
        height:.58rem;
        img{
            display: block;
            width:.32rem;
            height:.32rem;
            margin:0 auto;
            border-radius: 50%;
        }
        .text_{
            margin-top:.08rem;
        }
    }
}
.contain{
    .bgColor();
    font-size:.13rem;
    margin-top:.05rem;
    .list{
        padding:0 .18rem 0 .16rem;
        .main{
            margin-top:.07rem;
            text-align: left;
            // display: flex;
            // align-items: center;
            border-bottom: .01rem solid #F4F4F4;
             .write{
                color:#666666;
                text-align: left;
                display: inline-block;
                .te_{
                    text-overflow:ellipsis; 
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    min-height: .34rem;
                }
                .lag{
                    height: .28rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: .12rem;
                    .tag{
                        color:#F5AB18;
                    }
                    .read_,.talk{
                        display: inline-flex;
                        align-items: center;
                        color:#B1B1B1;
                        font-size:.12rem;
                        i{
                            display: inline-block;
                            width:.13rem;
                            height:.08rem;
                            margin-right:.04rem;
                            margin-left:.1rem;
                            background:url('../../assets/liulan.png') no-repeat center;
                            background-size: .13rem .08rem;
                        }

                    }
                    .talk{
                        i{
                            width:.1rem;
                            height:.08rem;
                            background:url('../../assets/pinglun.png') no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .imgSee{
                display: inline-block;
                float:right;
                img{
                    display: block;
                    width:1.02rem;
                    height: .57rem;
                }
            }
        }
    }
    .title{
        height: .4rem;
        display: flex;
        align-items: center;
        .tag_{
            color:#5BA0FF;
            padding:0 .02rem;
            border: .01rem solid #5BA0FF;
            border-radius: .02rem;
        }
        .text{
            font-size:.16rem;
            margin-left:.08rem;
            color:#333333;
        }
    }
    .userInfo{
        display: flex;
        align-items: center;
        height:.23rem;
        color:#B1B1B1;
        img{
            display: block;
            height:.23rem;
            width: .23rem;
            border-radius: 50%;
            border: 1px solid #FFB951;
            margin-right:.08rem;
        }
        span{
            font-size:.12rem;
        }
    }
}
.width{
    width:2.31rem
}
.allWidth{
    width:100%;
}
.plus{
    position: fixed;
    bottom: .3rem;
    right:.2rem;
    .normal{
        width:.48rem;
        height:.48rem;
        margin-bottom:.08rem;
    }
}
.btn{
    background: url('../../assets/showMore.png') no-repeat center;
    background-size:60% 60%;
}
.btn,.normal,.closed{
    // position: fixed;
    text-align: center;
    position: relative;
    background-color:#F5AB18;
    width:.48rem;
    height:.48rem;
    line-height: .48rem;
    border-radius: 50%;
    z-index:100;
    color:#ffffff;
}
.closed{
    background: url('../../assets/showMore.png') no-repeat center;
    background-size:60% 60%; 
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

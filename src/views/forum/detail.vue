<template>
    <div class="page">
        <mt-header fixed :title="dataList.moduleName">
            <router-link to="" tag='li' @click.native='goBack' slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="main">
            <div class="iconTag"></div>
            <div class="title">{{dataList.topicTitle}}</div>
            <div class="userInfo">
                <div class="userBox">
                    <img :src="dataList.userIcon" alt="" class="user">
                    <div class="text">{{dataList.userName}}</div>
                </div>
                <span>{{createTime}}</span>
            </div>
            <div class="text_">
                <div class="text_in"></div>
                <img v-for="list in topicPic" :key="list.id" :src="list" alt="">
            </div>
        </div>
        <div class="comment" ref="msgBox"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="30">
            <div class="totalNum">{{dataList.topicCommentsNumber}}条评论</div>
            <div v-for="(list, index) in commentsList" :key="list.id" class="list_">
                <div @click="reply(index)" class="father">
                    <div class="user">
                        <div class="info_">
                            <img :src="list.userIcon" alt="">
                            <div class="name_">{{list.userName}}</div>
                        </div>
                        <div class="time">{{timeComputed[index]}}</div>
                    </div>
                    <div class="comment_text">{{list.commentsContent}}</div>
                </div>
                <!-- 子评论 -->
                <div v-for="item in list.childModelList" :key="item.id" v-if="list.childModelList" class="child_">
                    <div class="user">
                        <div class="info_">
                            <img :src="item.userIcon" alt="">
                            <div class="name_">{{item.userName}}</div>
                        </div>
                        <div class="time">{{getInit(item)}}</div>
                    </div>
                     <div class="comment_text">{{item.commentsContent}}</div>
                </div>
            </div>
            <div class="bottom_"></div>
        </div>
        <div class="fixed">
            <div class="input_">
                <!-- <input
                ref="content"
                type="text"
                :placeholder="demoText"
                v-model="commentsContent"> -->
                 <textarea @input="getStyle" :placeholder="demoText" v-model="commentsContent" ref="content" name="" id="textList"></textarea>
            </div>
             <span @click="addNote" :class="commentsContent?'actived':'btn'">发送</span>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
import { Toast } from 'mint-ui'
export default {
    data () {
        return {
            topicId: '',
            userId: localStorage.getItem('xmd_id'),
            dataList: [],
            topicPic: '',
            createTime: '',
            tag: null,
            // 评论
            commentsList: [],
            timeComputed: [],
            status: false,
            num: 1,
            pageSize: 10,
            loading: true,
            // 评论内容
            commentsContent: '',
            commentsId: null,
            demoText: '点击这里说两句…',
            textLength: ''
        }
    },
    mounted () {
        this.topicId = this.$route.query.topicId
        let _this = this
        document.querySelector('#textList').style.height = 0
        // this.$refs.msgBox.addEventListener('scroll',  _this.handleScroll, true)
        this.getData()
    },
    computed: {
        getInit () {
            return function(item) {
                let nowTime = new Date().getTime()
                let Difference,time = ''
                //计算时间
                Difference = ((nowTime - new Date(item.createTime).getTime())/1000)/60
                if(0<Difference&&Difference<=60){
                    time = Math.floor(Difference)+'分钟前'
                }else if(1<(Difference/60)&&Difference/60<=24){
                    time = Math.floor(Difference/60)+'小时前'
                }
                else if(Difference/24>1){
                    time = Math.floor((Difference/60)/24)+'天前'
                }
                return time
            }
        }
    },
    methods: {
        goBack () {
            if (this.tag === '1') {
                this.$router.push({path: '/message'})
            } else if (this.tag === '2') {
                this.$router.push({path: '/showMore'})
            } else {
                this.$router.push({path: '/forum'})
            }
        },
        // 获取页面数据
        getData () {
            let URLParams = []
            let params = location.href.split('?')[1].split('&')
            for (let i = 0; i < params.length; i++) {
                let aParam = params[i].split('=')
                URLParams[aParam[0]] = aParam[1]
            }
            this.tag = URLParams['tag']
            axios.post('/tribune/topic/topicDetail', {
                userId: '',
                topicId: this.topicId,
                pageNumber: this.num,
                pageSize: this.pageSize
            }).then(res => {
                this.dataList = res.data.data
                let str = document.querySelector('.text_in')
                str.innerHTML = this.dataList.topicContent
                this.createTime = new Date(this.dataList.createTime)
                this.createTime = this.createTime.getFullYear()+'.'+(this.createTime.getMonth()+1)+'.'+this.createTime.getDate()
                // console.log(this.createTime)
                if (this.dataList.topicPic === null) {
                    this.topicPic = 0
                } else {
                    this.topicPic = this.dataList.topicPic.split(',')
                }
                // console.log(this.topicPic)
                this.commentsList = this.dataList.commentsList
                this.timeComputed = this.getTimeInit(this.commentsList)
                console.log(this.timeComputed)
            })
        },
        // 回复别人改变placeholder
        reply (index) {
            this.status = !this.status
            if (this.status === true) {
                this.demoText = '回复 '+this.commentsList[index].userName+':'
                this.$refs.content.focus()
                this.commentsId = this.commentsList[index].commentsId
            } else {
                this.$refs.content.blur()
                this.demoText = '点击这里说两句…'
                this.commentsId = null
            }
            console.log('click',this.commentsId)
        },
        getStyle () {
            this.textHeight = Math.ceil(this.commentsContent.replace(/[^\x00-\xff]/g,"aa").length/36)*0.16
            if (this.textHeight>=0.8) {
                this.textHeight = '0.8rem'
            }
            document.querySelector('#textList').style.height = this.textHeight+'rem'
            // this.$refs.content.height = this.$refs.content.scrollHeight
            console.log(this.$refs.content.offsetHeight,document.querySelector('#textList').style.height,this.commentsContent.replace(/[^\x00-\xff]/g,"aa").length,this.textHeight)
        },
        // 评论
        addNote () {
            // 没登录跳转登陆
            if (localStorage.getItem('xmd_id') === null) {
                this.$router.push({path: '/xmd_login'})
            } else {
                this.userId = localStorage.getItem('xmd_id')
                let shtml = ''
                console.log(this.commentsId)
                axios.post('/tribune/comments/addComments', {
                    userId: this.userId,
                    topicId: this.topicId,
                    commentsContent: this.commentsContent,
                    commentsId: this.commentsId
                }).then(res => {
                    let score = res.data.data
                    if (res.data.data.flag) {
                        Toast({
                            message: res.data.msg+'，获得'+score.integralNumber+'积分',
                            position: 'center',
                            duration: 2500
                        })
                    } else {
                        Toast({
                            message: res.data.msg,
                            position: 'center',
                            duration: 2500
                        })
                    }
                    this.commentsContent = ''
                    this.getData()
                })
            }
        },
        // 显示时间处理
        getTimeInit (lists) {
            // console.log(lists)
            let nowTime = new Date().getTime()
            let Difference,time = '' ,arr = []
            lists.forEach((item, index)=>{
                //计算时间
                Difference = ((nowTime - new Date(item.createTime).getTime())/1000)/60;
                if(0<Difference&&Difference<=60){
                    if (0<Difference&&Difference<1) {
                        time = '刚刚'
                    } else {
                        time = Math.floor(Difference)+'分钟前'
                    }
                }else if(1<(Difference/60)&&Difference/60<=24){
                    time = Math.floor(Difference/60)+'小时前'
                }
                else if(Difference/24>1){
                    time = Math.floor((Difference/60)/24)+'天前'
                }
                arr[index] = time
            })
            // console.log(arr)
            return arr
        },
        loadMore() {
            this.loading = true
            let timer = setTimeout(() => {
                this.num++
                // alert(123)
                this.getData()
                clearTimeout(timer)
            }, 500)
        }
    }
}
</script>
<style lang="less" scoped>
.bgColor{
    background: #ffffff;
}
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 .01rem .02rem 0 rgba(189,189,189,0.25);
}
header{
    font-size:.17rem;
}
.page{
    font-size:.13rem;
    .main{
        padding: 0 .1rem;
        text-align: left;
        .bgColor();
       .title{
           text-align: left;
           font-size: .2rem;
           font-weight: 500;
           color:#333333;
           padding-top:.1rem;
       }
       .userInfo{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height:.23rem;
        font-size:.12rem;
        color:#333333;
        margin: .1rem 0 .25rem;
        .userBox{
            display: flex;
            align-items: center;
        }
        span{
            display: inline-block;
            color:#B1B1B1;
        }
        img{
            display: block;
            height:.21rem;
            width: .21rem;
            border-radius: 50%;
            border: 1px solid #FFB951;
            margin-right:.08rem;
        }
        }
        .text_{
            font-size:.13rem;
            color:#333333;
            .text_in{
                margin-bottom:.16rem;
                line-height: .2rem;
                padding-bottom:.16rem;
                font-size:.14rem;
            }
            img{
                display: block;
                width:100%;
                margin: .1rem auto;
            }
        }
    }
    .comment{
        .bgColor();
        padding: 0 .16rem;
        margin-top:.1rem;
        text-align: left;
        .totalNum{
            height:.38rem;
            font-size: .14rem;
            line-height: .38rem;
        }
        .list_{
            border-top: .01rem solid #f4f4f4;
            padding-top:.1rem;
            .user{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .info_{
                    display: flex;
                    align-items: center;
                    .name_{
                        font-size:.15rem;
                        color:#333333;
                    }
                }
                .time{
                    color:#b1b1b1;
                }
                img{
                    display: inline-block;
                    width:.26rem;
                    height:.26rem;
                    // border: .01rem solid yellow;
                    border-radius: 50%;
                    margin-right: .08rem;
                }
            }
            .comment_text{
                line-height: .18rem;
                margin-top:.07rem;
                padding-bottom:.1rem;
                color:#666666;
                margin-left:.34rem;
            }
        }
        .bottom_{
            width:100%;
            height:.46rem;
        }
    }
}
#app .child_/deep/.user{
    margin-left:.34rem;
    justify-content: flex-start;
    .time{
        margin-left:.12rem;
    }
}
#app .child_/deep/.comment_text{
    margin-left:.68rem;
}
.fixed{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    height:.5rem;
    border-top: .01rem solid #f4f4f4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bgColor();
    .input_{
        width:3rem;
        display: flex;
        align-items: center;
        // input{
        //     width:100%;
        //     height:.35rem;
        //     font-size:.15rem;
        //     padding-left:.1rem;
        //     border-radius: .07rem;
        //     background: #F6F6F6;
        //     margin-left:.16rem;
        // }
        textarea{
            width:100%;
            min-height:.15rem;
            font-size:.15rem;
            padding: .1rem 0;
            padding-left:.1rem;
            margin:.1rem 0;
            resize:none;
            border-radius: .07rem;
            background: #F6F6F6;
            margin-left:.16rem;
            &::-webkit-input-placeholder{
                line-height: .15rem;
            }
            &::-webkit-scrollbar {  
                display: none!important;
                width: 0;  
                height: 0;  
            }
        }
    }
    span{
        display: inline-block;
        font-size:.15rem;
    }
    .btn,.actived{
        color:#B1B1B1;
        margin-right: .19rem;
    }
    .actived{
        color:#F5AB18;
    }
}
</style>

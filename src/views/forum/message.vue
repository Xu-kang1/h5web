<template>
    <div class="myMsg">
        <div class="topBox">
            <mt-header fixed title="我的消息">
                <router-link to="" tag='li' @click.native='goBack' slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div class="fixedTab">
                <div
                v-for="(list, index) in tabText"
                :key="list.id"
                @click="tab(index)"
                :class="{msgTab: index == msgTab}"
                >{{list}}</div>
                <span :class="actived"></span>
            </div>
        </div>
        <div class="lips"></div>
        <div v-if="hasMsg" ref="scrollBox" class="msgBox">
            <!-- 我的消息 -->
            <div
            v-show="showMsg"
            v-for="(list, index) in myMsg"
            :key="list.id"
            @click="goMsg(list)"
            class="list_">
                <div class="userInfo">
                    <div class="info msg_icon">
                        <img :src="list.userIcon" alt="" class="user">
                        <div class="text name_">{{list.userName}}</div>
                    </div>
                    <div class="time">{{timeComputed[index]}}</div>
                </div>
                <div class="talk">{{list.commentsContent}}</div>
                <div class="oldRe">
                    <span class="tag"><span :class="[list.messageType < 1?'color_a': 'color_b']">{{list.messageType < 1 ? '原贴：' : '回帖：'}}</span>{{list.topicTitle}}</span>
                </div>
            </div>
            <!-- 我的帖子 -->
            <div @click="goMsg(list)" v-show="!showMsg" v-for="(list, index) in post" :key="list.id" class="list_ msg_">
                <div class="titleName">{{list.topicTitle}}</div>
                <div class="userInfo">
                    <div class="info">
                        <img :src="list.userIcon" alt="" class="user">
                        <div class="text">{{list.userName}}&nbsp;</div>
                        <div class="time">• {{timeComputed[index]}}</div>
                    </div>
                     <div class="see">
                        <span class="read_"><i></i>{{list.topicViewsNumber}}</span>
                        <span class="talk_"><i></i>{{list.topicCommentsNumber}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else  class="noMsg">
            <img :src="require('../../assets/'+imgSrc)" alt="">
            <p>{{text}}</p>
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            tabText: ['我的消息', '我的帖子'],
            actived: 'actived',
            msgTab: 0,
            hasMsg: true,
            imgRsc: [{src: 'meixiaoxi.png', text: '还没有消息哦，快去评论吧'}, {src: 'meitiezi.png', text: '目前还没有帖子，快去发一个吧'}],
            index_: 0,
            text: '还没有消息哦，快去评论吧',
            imgSrc: 'meixiaoxi.png',
            // 我的帖子
            post: '',
            timeComputed: [],
            showMsg: true,
            userId: localStorage.getItem('xmd_id'),
            // 我的消息
            myMsg: ''
        }
    },
    beforeMount () {
        // 请求数据，没有数据
    },
    mounted () {
        this.getMsg()
        // this.getPost()
        let _this = this
        // window.addEventListener('scroll',  _this.handleScroll, true)
    },
    methods: {
        // 返回论坛
        goBack () {
            this.$router.push({path: '/forum'})
        },
        // 切换tab
        tab (index) {
            console.log(index)
            index ? this.actived = 'line' : this.actived = 'actived'
            index === 0 ? this.getMsg() : this.getPost()
            this.msgTab = index
            this.text = this.imgRsc[index].text
            this.imgSrc = this.imgRsc[index].src
            this.showMsg = !index
        },
        // 滚动
        // handleScroll () {
        //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //     console.log(this.$refs.scrollBox.scrollTop,document.documentElement.scrollTop)
        // },
        // 获取请求数据
        // getMsg (type) {
        //     axios.post('', {

        //     }).then(res => {

        //     })
        // },
        // 我的帖子
        getPost () {
            this.timeComputed = []
            axios.post('/app/user/myTopic', {
                userId: this.userId,
                pageNumber: 1,
                pageSize: 20
            }).then(res => {
                this.post = res.data.data
                if (this.post.length === 0) {
                    this.hasMsg = false
                }
                this.initTime(this.post)
            })
        },
        // 我的消息
        getMsg () {
            axios.post('/app/user/myMessage', {
                userId: this.userId
            }).then(res => {
                this.myMsg = res.data.data
                if (this.myMsg === 0) {
                    this.hasMsg = false
                }
                this.initTime(this.myMsg)
            })
        },
        // 消息跳转帖子详情
        goMsg (msg) {
            this.$router.push({path: '/mainNote', query: {topicId: msg.topicId, tag: 1}})
        },
        // 显示时间处理
        initTime (post) {
            let nowTime = new Date().getTime()
            let Difference,time = ''
            post.forEach(item=>{
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
    }
}
</script>
<style lang="less" scoped>
.myMsg{
    font-size:.15rem;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: #ffffff;
    overflow-y: auto;
}
.topBox{
    position:fixed;
    top:0;
    width:100%;
    height:.6rem;
    background:#f5f5f5;
}
.noMsg{
    // display: flex;
    // flex-direction: row-reverse;
    // justify-content: center;
    width:3.4rem;
    height:2rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    img{
        display: block;
        margin:0 auto;
        width:1.2rem;
        height:.87rem;
    }
    p{
        display: inline-block;
        color:#b1b1b1;
        font-size:.14rem;
        margin-top:.2rem;
    }
}
.mint-header{
    background:#ffffff;
    color:#000;
    box-shadow: 0 .01rem .02rem 0 rgba(189,189,189,0.25);
}
header{
    font-size:.17rem;
}
.fixedTab{
    position: fixed;
    top:.41rem;
    z-index:5;
    width:100%;
    height:.5rem;
    background:#ffffff;
    div{
        display: inline-block;
        width:50%;
        height:.5rem;
        line-height: .5rem;
        text-align: center;
        color:#B1B1B1;
    }
    .line,.actived{
        display: inline-block;
        position: absolute;
        bottom:.08rem;
        right:.78rem;
        width:.34rem;
        height:.02rem;
        border-radius: .02rem;
        background:#F5AB18;
    }
    .actived{
       left:.78rem;
    }
    .msgTab{
        color:#333333;
    }
}
.lips{
    height:.04rem;
    margin-top:.94rem;
    background:#f5f5f5;
}
.msgBox{
    padding: 0 0.18rem 0 0.16rem;
    .list_{
        border-bottom:.01rem solid #f4f4f4;
    }
    .userInfo{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height:.26rem;
        margin: .12rem auto;
        color:#333333;
        font-size:.12rem;
        .info,.msg_icon{
            display: inline-flex;
            align-items: center;
            img{
                display: block;
                height:.2rem;
                width: .2rem;
                border-radius: 50%;
                // border: 1px solid #FFB951;
                margin-right:.08rem;
            }
        }
        .msg_icon{
            img{
                display: block;
                height:.23rem;
                width: .23rem;
                border-radius: 50%;
                // border: 1px solid #FFB951;
                margin-right:.08rem;
            }
        }
        .name_{
            font-size:.15rem;
        }
        .time{
            font-size:.12rem;
            color:#B1B1B1;
        }
    }
    .msg_{
        .titleName{
            color:#333333;
            font-size:.16rem;
            text-align: left;
            margin: .08rem auto;
        }
        .userInfo{
            margin: 0 auto;
            color:#b1b1b1;
            height:.23rem;
            margin-bottom:.11rem;
            font-size:.12rem;
            img{
                display: block;
                height:.2rem;
                width: .2rem;
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
    .talk{
        font-size:.13rem;
        text-align: left;
        color:#666666;
        line-height: .18rem;
        margin-bottom:.1rem;
        text-overflow:ellipsis; 
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .oldRe{
        text-align: left;
        line-height: .24rem;
        font-size:.13rem;
        color:#151515;
        background:#F6F6F6 ;
        margin-bottom:.12rem;
    }
    .tag{
        display: inline-block;
        line-height: .24rem;
        margin-left:.06rem;
        .color_a{
            color:#5BA0FF;
        }
        .color_b{
            color:#F59218;
        }

    }
}
.read_,.talk_{
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
.talk_{
    i{
        width:.1rem;
        height:.08rem;
        background:url('../../assets/pinglun.png') no-repeat;
        background-size: 100% 100%;
    }
}
</style>

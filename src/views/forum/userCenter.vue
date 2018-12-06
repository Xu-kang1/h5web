<template>
    <div>
        <mt-header fixed title="个人中心">
            <router-link to="" tag='li' @click.native='goBack' slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="lists">
            <div class="list">
                <span>头像</span>
                <div class="icon">
                    <img class="user" :src="src" alt="">
                    <span class="left_"></span>
                    <input @change="getFiles" type="file" name="" id="camera" accept=".jpg, .jpeg, .png">
                </div>
            </div>
            <div class="list">
                <span>昵称</span>
                <div @click="changeNickname" class="num">
                    <span class="tel">{{phone}}</span>
                    <span class="left_"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            src: require('../../assets/user_icon.png'),
            phone: localStorage.getItem('phone')
        }
    },
    mounted () {
        this.phone = `${this.phone.substring(0, 4)}****${this.phone.substring(8, 11)}`
    },
    methods: {
        goBack () {
            this.$router.push({path: '/perCenter_'})
        },
        // 修改昵称
        changeNickname () {
            this.$router.push({path: '/nickName'})
        },
        getFiles () {
            let files = document.querySelector('#camera').files
            if (files[0]) {
            this.src = window.URL.createObjectURL(files[0])
            }

            console.log(files)
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
.lists{
    margin-top:.45rem;
    background:#ffffff;
    padding:0 .16rem;
    color:#333333;
    .list{
        height:.49rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .15rem;
        .icon{
            height:100%;
            display: flex;
            align-items: center;
            position: relative;
        }
        .num{
            height:100%;
            display: flex;
            align-items: center;
        }
        .user{
            display: inline-block;
            width:.27rem;
            height:.27rem;
            // background: url('../../assets/user_icon.png') no-repeat;
            // background-size: 100% 100%;
        }
        .left_{
            display: inline-block;
            width: .08rem;
            height: .15rem;
            background: url('../../assets/right_score.png') no-repeat;
            background-size: 100% 100%;
            margin-left:.05rem;
        }
    }
}
#camera{
    position: absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    opacity: 0;
    filter: alpha(opacity=0);
    z-index:10;
}
</style>

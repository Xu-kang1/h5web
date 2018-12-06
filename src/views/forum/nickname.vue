<template>
    <div>
        <mt-header fixed title="我的昵称">
            <router-link to="" tag='li' @click.native='goBack' slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="box">
            <span>昵称</span>
            <input @blur="changeUserNickName" class="input" type="text" v-model="userName">
        </div>
    </div>
</template>
<script>
import axios from '../../../config/http'
export default {
    data () {
        return {
            userName: ''
        }
    },
    methods: {
        goBack () {
            this.$router.push({path: '/userCenter'})
        },
        // 修改用户昵称
        changeUserNickName () {
            axios.post('/app/user/updateUserName', {
                userId: localStorage.getItem('userId'),
                userName: this.userName
            }).then(res => {
                console.log(res.data.msg)
            })
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
    margin-top:.45rem;
    background:#ffffff;
    height:.5rem;
    display: flex;
    align-items: center;
    padding: 0 .16rem;
    span{
        display: inline-block;
        font-size:.15rem;
        margin-right:.12rem;
    }
    .input{
        border:0;
        height:100%;
    }
}
</style>

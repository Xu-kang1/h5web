<template>
    <div class="page">
        <!-- <mt-header fixed title="发帖">
            <router-link to="" tag='li' @click.native='goBack' slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <div class="main">
            <div class="title" @click="showAsheet">
                <div class="left">
                    <span class="t_name">模块</span>
                    <span :class="{select:selected}">{{adress}}</span>
                </div>
                <div class="left_icon"></div>
            </div>
            <div class="title" style="text-align:left;">
                <span class="t_name ipt">标题</span>
                <input v-model="title_" type="text" maxlength="25" class="select input" placeholder="请输入标题，最多25个字">
            </div>
            <textarea v-model="mainText" class="textarea" maxlength="250" cols="30" rows="10" placeholder="写下你的内容吧"></textarea>
            <div class="imgContainer">
                <div
                class="imgBox"
                v-if="fileArr.length>0"
                v-for="(list, index) in fileArr"
                :key="list.id">
                    <img :src="list" alt="">
                    <span @click="delateImg(index)" class="closed"></span>
                </div>
                <div v-show="getNum" class="imgBox" id="imgIpt">
                    <input @change="imgSelect" type="file" id="addImg" accept=".jpg, .jpeg, .png" multiple>
                    <!-- <span class="closed"></span> -->
                </div>
            </div>
        </div>
        <div @click="submit($event)" class="submit">发表</div>
        <div v-if="show" class="mask">
            <div class="alert">
                <div class="notice">所编辑内容即将丢失，确定退出吗？</div>
                <div class="btn_box">
                    <div @click="confirm" class="confirm">确认</div>
                    <div @click="cannel" class="cannel">取消</div>
                </div>
            </div>
        </div>
        <awesome-picker
        ref="picker"
        :textTitle="picker.textTitle"
        :data="picker.data"
        :colorConfirm="picker.colorConfirm"
        @confirm="handlePickerConfirm">
        </awesome-picker>
    </div>
</template>
<script>
import axios from '../../../config/http'
import { Toast } from 'mint-ui'
export default {
    data () {
        return {
            //
            moduleList: [],
            index: null,
            title_: '',
            mainText: '',
            select: '',
            userId: sessionStorage.getItem('userId'),
            //
            stop: true,
            //
            show: false,
            selected: false,
            arr: [],
            strArr: [],
            fileArr: [],
            arrNum: null,
            canIpt: true,
            adress: '请选择模块（必选）',
            picker: {
                textTitle: '',
                colorConfirm: '#F59218',
                data: []
            }
        }
    },
    computed: {
        getNum () {
            if (this.arrNum >= 5) {
                // this.canIpt = false
                return false
            } else {
                return true
            }
        }
    },
    beforeCreate () {
        document.querySelector('#app').style.cssText = 'margin-top:0;'
        document.title = ''
    },
    beforeMount () {
        document.title = '发帖'
    },
    mounted () {

    },
    methods: {
        // 返回出现弹窗
        goBack () {
            this.show = true
        },
        submit (event) {
            // 发帖
            // 上传图片
            event.preventDefault()
            let formData = new FormData()
            console.log(this.arr.length, this.arrNum)
            if (this.arr.length === 0) {
                this.postMsg()
            } else if (this.arr.length>5) {
                Toast({
                    message: '图片最多上传5张',
                    position: 'center',
                    duration: 2500
                })
                return false
            } else {
                for (let i = 0; i < this.arr.length; i++) {
                    formData.append('file',this.arr[i])
                    // console.log(i,this.arr[i].name)
                }
                axios.post('/file/uploadToOSS',formData,{headers: {'Content-Type': 'multipart/form-data'}
                }).then(res => {
                    if (res.data.success) {
                        this.select = res.data.data
                        this.postMsg()
                    } else {
                        Toast({
                            message: '图片上传失败，请重试',
                            position: 'center',
                            duration: 2000
                        })
                        return false
                    }
                    // console.log(this.select)
                })
            }
            // for (let i = 0; i < this.arr.length; i++) {
            //         formData.append('file',this.arr[i])
            //         // console.log(i,this.arr[i].name)
            // }
            // axios.post('/file/uploadToOSS',formData,{headers: {'Content-Type': 'multipart/form-data'}
            // }).then(res => {
            //     this.select = res.data.data
            //     this.postMsg()
            //     // console.log(this.select)
            // })
        },
        // 发帖
        postMsg () {
            if (this.userId == '') {
                window.xingMeiDai.appLogin()
            } else if (this.index === '') {
                Toast({
                    message: '请选择对应模块',
                    position: 'center',
                    duration: 2500
                })
            } else if (this.title_ === '') {
                Toast({
                    message: '请输入标题',
                    position: 'center',
                    duration: 2500
                })
            } else if (this.mainText === '') {
                Toast({
                    message: '请填写主体内容',
                    position: 'center',
                    duration: 2500
                })
            } else {
                console.log(this.index,this.mainText,this.title_,this.select)
                if (this.stop) {
                    this.stop = false
                    axios.post('/tribune/topic/addTopic', {
                        userId: this.userId,
                        moduleId: this.moduleList[this.index].moduleId,
                        topicContent: this.mainText,
                        topicTitle: this.title_,
                        topicPic: this.select
                    }).then(res => {
                        console.log(res.data.msg)
                        this.stop = false
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
                        setTimeout(() => {
                            this.$router.go(-1)
                            // this.$router.push({path: '/forum_'})
                        }, 1500)
                    })
                } else {
                    return false
                }
            }
        },
        // 删除图片
        delateImg (index) {
            this.fileArr.splice(index, 1)
            this.arr.splice(index,1)
            this.arrNum = this.arr.length
            // console.log(this.fileArr)
        },
        // 编辑取消
        cannel () {
            this.show = false
        },
        confirm () {
            this.show = false
            // this.$router.push({path: '/forum_'})
            this.$router.go(-1)
        },
        // 显示底部弹窗
        showAsheet () {
            this.$refs.picker.show()
             axios.post('/tribune/module/moduleName', {
                pageNumber:1,
                pageSize:20
            }).then(res => {
                this.moduleList = res.data.data
                let arr = []
                for (let key in this.moduleList) {
                    arr[key] = this.moduleList[key].moduleName
                }
                this.picker.data = [arr]
            })
        },
        // 选择模块
        handlePickerConfirm (v) {
            this.picker.anchor = v
            console.log(v)
            let adress = ''
            if (v) {
                this.index = v[0].index
                adress = v[0].value
                this.selected = true
                this.adress = adress
            }
             console.log(adress)
        },
        imgSelect () {
            let imgContainer = document.querySelector('.imgContainer')
            let addImg = document.querySelector('#addImg')
            let imgIpt = document.querySelector('#imgIpt')
            // addImg.addEventListener('change', this.updateImg)
            this.$nextTick(() => {
                this.updateImg(addImg, imgContainer, imgIpt)
            })
        },
        updateImg (addImg, imgContainer, imgIpt) {
            let curFiles = addImg.files
            if (curFiles.length > 5) {
                // 提示没有图片
                Toast({
                    message: '图片最多上传5张',
                    position: 'center',
                    duration: 2500
                })
                console.log('图片超过5张限制')
                return false
            } else {
                // console.log(this.arr)
                if (this.arrNum >= 5) {
                    // this.canIpt = false
                    // this.arr.
                    Toast({
                        message: '图片最多上传5张',
                        position: 'center',
                        duration: 2500
                    })
                    console.log('图片超过5张限制')
                    return false
                } else {
                    this.arrNum += curFiles.length
                    for (let i=0; i<curFiles.length; i++) {
                        this.arr.push(curFiles[i])
                    }
                    // this.arr.push(curFiles)
                    console.log(this.arr)
                    this.arr.forEach((element, index) => {
                        if (this.arrNum >= 5) {
                            // element[this.arr.length-1].
                        }
                    })
                    for (let i = 0; i < curFiles.length; i++) {
                        // var listItem = document.createElement('div')
                        // listItem.className = 'imgBox'
                        // imgContainer.appendChild(listItem)
                        // let closedBtn = document.createElement('span')
                        // closedBtn.className = 'closed'
                        // let image = document.createElement('img')
                        this.strArr.push(window.URL.createObjectURL(curFiles[i]))
                        // image.src = window.URL.createObjectURL(curFiles[i])
                        // listItem.appendChild(image)
                        // listItem.appendChild(closedBtn)
                        // imgContainer.appendChild(listItem)
                        // imgContainer.insertBefore(listItem, imgIpt)
                    }
                    this.fileArr = this.strArr
                    // this.fileArr = this.$set(this.fileArr,1 ,this.str.split(',').splice(0,this.str.split(',').length-1))
                    // console.log(this.fileArr)
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
input::-webkit-input-placeholder{
    color:#cccccc;
}
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    .bgColor();
    .main{
        margin-top:.4rem;
        padding-left:.16rem;
    }
    .title{
        height:.48rem;
        font-size:.13rem;
        color:#cccccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: .01rem solid #f4f4f4;
        .t_name{
            font-size:.15rem;
            color:#333333;
            margin-right:.15rem;
        }
        .select{
            color:#333333;
        }
        .left_icon{
            width:.08rem;
            height:.15rem;
            background: url('../../assets/right_score.png') no-repeat;
            background-size:100% 100%;
            margin-right:.16rem;
        }
        .ipt{
            flex:0 1 .3rem;
        }
        .input{
            flex:1 1 auto;
            height:100%;
            font-size:.13rem;
        }
    }
    .textarea{
        width:100%;
        margin-top:.2rem;
        font-size:.13rem;
        border-bottom: .01rem solid #f4f4f4;
        &::-webkit-input-placeholder{
            color:#cccccc;
        }
    }
    .imgContainer{
        text-align: left;
        margin-top:-.2rem;
        line-height:.78rem;
        .imgBox{
            display: inline-block;
            position: relative;
            float: left;
            width:.78rem;
            height:.78rem;
            margin: .1rem .1rem 0 0;
            position: relative;
            background: url('../../assets/addPic.png') no-repeat center;
            background-size:100% 100%;
            #addImg{
                position: absolute;
                top:0;
                left:0;
                width:.78rem;
                height:.78rem;
                opacity: 0;
                -ms-filter: 'alpha(opacity=0)';
            }
        }
    }
}
.imgContainer/deep/.closed{
    display: inline-block;
    position: absolute;
    right:0;
    // border:1px solid red;
    // border-radius: 50%;
    width:.16rem;
    height:.16rem;
    background: url('../../assets/closed_.png') no-repeat;
    background-size:100% 100%;

}
.imgContainer/deep/.imgBox{
    display: inline-block;
    float:left;
    width:.78rem;
    height:.78rem;
    margin: .1rem .1rem 0 0;
    position: relative;
    background: url('../../assets/addPic.png') no-repeat center;
    background-size:100% 100%;
}
.imgContainer/deep/img{
        display: block;
        position: absolute;
        top:0;
        left:0;
        width:.78rem;
        height:.78rem;
}
.submit{
    position: fixed;
    bottom:0;
    width:100%;
    height:.49rem;
    font-size:.16rem;
    color: #ffffff;
    background:#F5AB18;
    line-height: .49rem;
    letter-spacing:.12rem;
}
.mask{
    position: fixed;
    top:0;
    width:100%;
    height:100%;
    z-index:9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    .alert{
        position: relative;
        width:2.9rem;
        height:1.7rem;
        background:#ffffff;
        border-radius: .08rem;
        font-size:.15rem;
        .notice{
            text-align: center;
            margin-top:.53rem;
            line-height:.21rem;
        }
        .btn_box{
            position: absolute;
            width:100%;
            height:.34rem;
            bottom:.21rem;
            display: flex;
            align-items: center;
            justify-content:center;
            div{
                width:1.15rem;
                height:.34rem;
                line-height: .34rem;
                border: .01rem solid #F5AB18;
                border-radius: .18rem;
                box-sizing: border-box;
                color:#F59218;
                margin:0 .1rem;
            }
            .confirm{
                color:#ffffff;
                background:#F59218;
            }
        }
    }
}
</style>

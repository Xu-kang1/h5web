<template>
    <div class="fixed">
        <mt-header fixed title="添加收货地址">
            <router-link to="" @click.native="cancel" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="list">
            <mt-field label="收货人" placeholder="请输入姓名" v-model="username"></mt-field>
            <!-- <div class="input">
                <input v-model="phonenumber" type="number" oninput="if(value.length>11)value=value.slice(0,11)" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" placeholder="收货人电话，方便联系" >
            </div> -->
            <mt-field label="手机号" placeholder="收货人电话，方便联系" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" :attr="{ maxlength: 11 }" type="text" v-model="phone"></mt-field>
            <div @click="show">
                <mt-cell
                class="class_"
                title="地址"
                is-link
                :value="adress">
                </mt-cell>
            </div>
            <mt-field label="详细地址" placeholder="请输入街道、门牌等详细地址信息" type="text" v-model="adressDetail"></mt-field>
        </div>
        <awesome-picker
        ref="picker"
        :textTitle="picker.textTitle"
        :data="picker.data"
        :anchor="picker.anchor"
        @confirm="handlePickerConfirm">
        </awesome-picker>
        <div class="btn_box">
            <div @click="cancel" class="cancel">取消</div>
            <div @click="addAdress" class="confirm">保存地址</div>
        </div>
    </div>
</template>
<script>
import areaData from '../../area'
import axios from '../../../config/http'
import { Toast } from 'mint-ui'
export default {
    data () {
        return {
            goodsId: '',
            username: '',
            phonenumber: null,
            phone: '',
            area: [],
           picker: {
                anchor: [],
                textTitle: '',
                data: areaData
            },
            adress: '请选择',
            adressDetail: ''
        }
    },
    created () {
        this.goodsId = this.$route.query.goodsId
    },
    methods: {
        getArea () {
            console.log(111)
            //  this.$refs.picker.show()
        },
        show () {
            this.$refs.picker.show()
        },
        handlePickerConfirm (v) {
            this.picker.anchor = v
            console.log(v)
            let adress = ''
            v.forEach((element, index) => {
                adress += element.value
            })
            this.adress = adress
             console.log(adress)
            this.area = v ? adress : null
        },
        // 新增地址
        addAdress () {
            if (this.username === '') {
                Toast({
                    message: '请填写收货人',
                    duration: 2000
                })
            } else if (this.phone === null || this.phone === '') {
                Toast({
                    message: '请填写收货人电话',
                    duration: 2000
                })
            } else if (this.adress === '请选择') {
                Toast({
                    message: '请选择收货地址',
                    duration: 2000
                })
            } else if (this.adressDetail === '') {
                Toast({
                    message: '请填写详细地址',
                    duration: 2000
                })
            } else {
                console.log(localStorage.getItem('userId'))
                //   this.$router.push({path: '/details', query: {goodsId: this.goodsId}})
                 axios.post('/address/add', {
                    userId: localStorage.getItem('userId'),
                    receiveName: this.username,
                    receivePhone: this.phone,
                    receiveAddress: this.adress,
                    receiveAddressDetail: this.adressDetail
                }).then(res => {
                    // 需要添加是否添加成功的状态提示。
                    if (res.data.success) {
                        // 添加地址成功，跳转详情页。
                        this.$router.push({path: '/details', query: {goodsId: this.goodsId}})
                    }
                })
            }
        },
        // 取消，返回
        cancel () {
            this.$router.push({path: '/details', query: {goodsId: this.goodsId}})
        }
    }
}
</script>
<style lang="less" scoped>
    @border: 1px solid #eeeeee;
    .fixed{
        position: fixed;
        height:100%;
        width:100%;
        top:.45rem;
        background:#ffffff;
    }
    .mint-header{
		background:#fff;
        color:#000;
        box-shadow: 0 0 1px #eeeeee;
    }
    .list{
        // padding-top:.05rem;
        font-size:.15rem;
        .mint-cell-wrapper{
            border-bottom: @border;
        }
        /deep/.mint-cell-title{
            width:105px;
            flex:none;
        }
        .mint-cell{
            text-align: left;
        }
    }
    // .input{
    //     height:.4rem;
    //     background:#ffffff;
    //     border-bottom: @border;
    // }
    .btn_box{
        margin-top:.78rem;
        display: flex;
        font-size:.15rem;
        justify-content: center;
        div{
            width:1.42rem;
            height:.4rem;
            color:#ffffff;
            margin: 0 .09rem;
            border-radius: .2rem;
            line-height: .4rem;
            background: #d9d9d9;
        }
        .confirm{
            background:#F59218;
        }
    }
    // input::-webkit-input-placeholder{
    //     font-size:.12rem;
    // }
</style>

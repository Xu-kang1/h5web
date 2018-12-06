<template>
	<div class="shop" v-cloak>
		<div class="banner">
            <img src="../../static/banner.png" alt="">
        </div>
		<mt-header fixed title="商城"></mt-header>
        <!-- 积分商品 -->
		<div class="point">
			<div class="headerTitle">
				<div class="titleText"><span class="left_icon"></span><span>积分兑换</span></div>
				<div @click="goList" class="right"><span>更多&nbsp;</span><span class="right_icon"></span></div>
			</div>
			<div class="imgList">
                <div class="imgBox" 
                @click="goDetail(key)"
                :class="{borderRight: (key+1)%2}" 
                v-for="(list,key) in dataList" :key="list.key"
                v-if="key<4">
                    <div class="img_box">
                        <img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+list.goodsPic" alt="">
                    </div>
                    <div class="text">
                        <p class="text_style">{{list.goodsName}}</p>
                        <p class="priceNum"><span></span>{{list.goodsNeedIntegral}}</p>
                    </div>
                </div>
			</div>
		</div>
        <!-- 低价优选 -->
        <div class="chose">
            <div class="headerTitle border_">
				<div class="titleText"><span class="left_icon"></span>低价精选</div>
			</div>
            <div 
            v-for="(item, index) in other"
            :key="item.id"
            @click="goOther(index)"
            class="list_">
                <div class="imgContainer">
                    <img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+item.url" alt="">
                </div>
                <div class="rightDetail">
                    <p>{{item.name}}</p>
                    <div class="tag_">
                        <div v-for="list in label[index]" :key="list.id" class="color_1">{{list}}</div>
                        <div></div>
                    </div>
                    <div class="num_">
                        <div>
                            <span style="font-size:.14rem; color:#ED4B41;">￥</span>
                            <span class="price_">{{item.currentPrice}}</span>
                            <span class="oldPrice">￥{{item.originalPrice}}</span>
                        </div>
                        <span class="sole">已售:{{item.soldoutNum}}件</span>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
import axios from '../../config/http'
export default {
    data () {
        return {
            // imgList: [
            //     {'name': '001', 'price': 800},
            //     {'name': '002', 'price': 800},
            //     {'name': '003', 'price': 800},
            //     {'name': '004', 'price': 800},
            //     {'name': '005', 'price': 800}
            // ],
            dataList: '',
            other: '',
            label: []
        }
    },
    mounted () {
        this.getgoods()
        this.getData()
    },
    methods: {
        // 查看更多积分商品
        goList () {
            this.$router.push({path: '/list', query: {lists: this.dataList}})
        },
        // 积分商品详情
        goDetail (key) {
            // console.log(key, this.dataList[key])
            // window.xingMeiDai.startShopDetail(`http://116.62.69.124:81/details?goodsId=${this.dataList[key].goodsId}`)
            this.$router.push({path: '/details', query: {goodsId: this.dataList[key].goodsId}})
        },
        goOther (index) {
            window.location.href = `${this.other[index].target}`
        },
        // 获取积分兑换商品
        getData () {
            axios.post('/integralGoods/list', {
                pageSize: 10,
                pageNumber: 1
            }).then(res => {
                // console.log(res.data)
                this.dataList = res.data.data.goodsList
            })
        },
        getgoods () {
            let arr = []
            axios.get('/shop/list/1').then(res => {
                this.other = res.data.data.content
                this.other.forEach((element, index) => {
                    console.log(element.label)
                    arr[index] = element.label.split('/')
                    this.label.push(arr[index])
                })
                console.log(this.other)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.borderRight{
    border-right: @border;
}
@border: 1px solid #eeeeee;
.border_{
    border-bottom: @border;
}
.text_style{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.shop{
	font-size: .16rem;
	.banner{
		width: 100%;
		height:1.6rem;
		font-size:.16rem;
        // background:#eeaabb;
        img{
            display: block;
            width:100%;
        }
	}
	.mint-header{
		background:#fff;
        color:#000;
        box-shadow: 0 0 1px #eeeeee;
	}
	.point{
		background: #fff;
	}
	.headerTitle{
        height:.38rem;
        padding: 0 .15rem;
        margin-top: .08rem;
        font-size:.15rem;
        color:#333333;
		display: flex;
		align-items: center;
        justify-content: space-between;
        .titleText{
            font-weight: bold;
            display: inline-flex;
            align-items: center;
            .left_icon{
                display: inline-block;
                width:.04rem;
                height:.14rem;
                margin-right: .04rem;
                background:#F35F57;
                border-radius: .08rem;
            }
        }
        .right{
            color:#343434;
            line-height: .38rem;
            display: flex;
            align-items: center;
        }
        .right_icon{
            display: inline-block;
            width:.08rem;
            height:.12rem;
            background: url('../assets/right_icon.png') no-repeat;
            background-size:100% 100%;
        }
    }
    .imgList{
        width:100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        .imgBox{
            display: block;
            width: 50%;
            height:1.35rem;
            text-align: center;
            border-top: @border;
            box-sizing: border-box;
            .img_box{
                height: .94rem;
                display: flex;
                align-items: center;
            }
            img{
                display: block;
                width:.5rem;
                margin:0 auto;
                // border:1px solid #00c3f5;
            }
            .text{
                font-size:.13rem;
                line-height: .18rem;
                .priceNum{
                    font-size:.12rem;
                    color:#E33B32;
                    line-height: .17rem;
                    display: inline-flex;
                    align-items: center;
                    span{
                        display: inline-block;
                        width:.11rem;
                        height:.11rem;
                        margin-right:.05rem;
                        background: url('../assets/price.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
    .list_{
        display: flex;
        // height:1.08rem;
        padding: .08rem .05rem .04rem;
        font-size:.13rem;
        color: #191919;
        border-bottom:@border;
        .imgContainer{
            width:.9rem;
            height:.9rem;
            // border:@border;
            margin-left:.1rem;
            >img{
                width:.9rem;
                display: block;
            }
        }
        .rightDetail{
            width:2.44rem;
            margin-left: .23rem;
            text-align: left;
            font-size: .14rem;
            .num_{
                width:100%;
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                .price_{
                    display: inline-block;
                    font-size:.22rem;
                    line-height: .32rem;
                    color:#ED4B41;
                }
                .oldPrice{
                    color:#B3B3B3;
                    text-decoration: line-through;
                }
                .sole{
                    color:#B3B3B3;
                    margin-right: .07rem;
                }
            }
            p{
                line-height:.2rem;
            }
            .tag_{
                margin: .05rem 0;
                // height: .14rem;
                // margin-top:.1rem;
                // margin-bottom:.1rem;
                div{
                    display: inline-block;
                    font-size:.10rem;
                    // height:.12rem;
                    border-radius: .08rem;
                    // -moz-box-sizing: border-box;  
                    // -webkit-box-sizing: border-box; 
                    // -o-box-sizing: border-box; 
                    // -ms-box-sizing: border-box; 
                    // box-sizing: border-box;
                    padding: 0 .03rem;
                    // line-height: 100%;
                    transform: scale(0.92)
                }
                .color_1{
                    color:#F35F57;
                    border: 0.01rem solid #F35F57;
                }
                .color_2{
                   color:#FF7E21;
                   border: 1px solid #FF7E21; 
                }
            }
        }
    }
    .chose{
        background:#ffffff;
    }
}

</style>

<template>
	<div class="container">
		<!--<div class="header">
			<div class="back" @click="goBack()">
				<img src="../../../static/image/icon_left_1.png" />
			</div>
			<div class="header_title">意见反馈</div>
		</div>-->
		
		<div class="feed-container">
			<textarea class="feed-box" placeholder="感谢您的留言！" v-model="feedText" maxlength="200"></textarea>
			<span class="limit">{{feedText.length}}/200</span>
		</div>
		
		<div class="feed-btn gray" v-if="feedText.length == 0">提交</div>
		<div class="feed-btn" v-if="feedText.length > 0" @click="feedBack()">提交</div>
		
		<span class="dialog" v-html="dialog" v-show="showDialog"></span>
	</div>
</template>

<script>
	import axios from '../../../config/http'
	export default {
	    data () {
	        return {
	        	feedText: '',
	        	userId: '',
	        	mobile: '',
	        	dialog: '反馈成功<br>感谢您的留言！',
	        	showDialog: false
	        }
	    },
	    watch: {
	    	
	    },
	    beforeCreate () {
	        document.querySelector('#app').style.cssText = 'margin-top:0;position:absolute;top:0;width:100%;height:100%;';
//	        document.title = '意见反馈'
	    },
	    created(){
//	    	document.title = '意见反馈'
	    },
	    mounted(){
	    	if(localStorage.getItem('userId') && localStorage.getItem('userId') != ''){
	    		this.userId = localStorage.getItem('userId')
	    	}
	    	if(this.$route.query.userId && this.$route.query.userId != ''){
	    		this.userId = this.$route.query.userId
	    	}
	    	if(this.$route.query.mobile && this.$route.query.mobile != ''){
	    		this.mobile = this.$route.query.mobile
	    	}
	    	this.getMobile()
	    },
	    methods: {
	    	//获取手机号
	    	getMobile(){
	    		if (JsBridge) {
					window.JsBridge.h5ToNative_GetUserInfo((data) =>{
						var userData = JSON.parse(data)
						if (userData.isLogin == 1) { //判断登录状态    0-未登录    1-已登录
							this.userId = userData.userId
							this.mobile = userData.mobile
						} else {
							window.JsBridge.h5ToNative_login()
						}
					})
				}
	    	},
	    	//反馈提交
	    	feedBack(){
	    		axios.post('/app/user/feedback',{
	        		'mobile': this.mobile,
                	'feedBackContent': this.feedText
	        	}).then(res => {
	        		if(res.data.success == true){
	        			this.dialog = '反馈成功<br>感谢您的留言！'
	        			this.showDialog = true
	        			setTimeout(() => {
	        				this.showDialog = false
	        			},1500)
	        			this.feedText = ''		//清空输入
//	        			setTimeout(() => {
//	        				this.$router.go(-1)
//	        			},500)
	        		}else{
	        			this.toast('提交失败！')
	        		}
	        		console.log(res.data)
	            }).catch((error) => {
	            	console.log(error)
	            })
	    	},
	    	//返回按钮
	    	goBack(){
	    		this.$router.go(-1)
	    	},
	    	//公共提示
	    	toast(data) {
		      	this.$toast({
	          		message: data,
	          		position: 'middle',
	          		duration: 1500,
	          		className:'newToast'
	        	});
		    },
	    }
	}
</script>

<style lang="less" scoped="scoped">
	.container{
		width: auto;
		min-height: 100vh;
		/*margin-top: -40px;*/
		background: #fff;
		font-size: 0.12rem;
	}
	.header{
		width: 100%;
		height: 0.18rem;
		padding: 0.15rem 0 0.11rem;
		background: url(../../../static/image/feedback/bg_header.png) no-repeat;
		.header_title{
			line-height: 0.18rem;
			height: 0.18rem;
			font-size: 0.18rem;
			color: #fff;
		}
		.back{
			width: 0.40rem;
			height: 0.14rem;
			padding: 0.15rem 0;
			/*background: url(../../../static/image/icon_left_1.png) 0.02rem 0.17rem no-repeat;
			background-size: auto 0.14rem;*/
			position: absolute;
			left: 0.12rem;
			top: 0;
			img{
				width: auto;
				height: 0.14rem;
				display: block;
			}
		}
	}
	.feed-container{
		width: 100%;
		height: 1.82rem;
		padding: 0.2rem 0.12rem 0;
		position: relative;
		.limit{
			height: 0.2rem;
			line-height: 0.2rem;
			font-size: 0.14rem;
			color: #666666;
			position: absolute;
			right: 0.48rem;
			bottom: 0.12rem;
		}
	}
	.feed-box{
		display: block;
		width: calc(100% - 0.44rem);
		height: 1.62rem;
		/*margin: 0.2rem 0.12rem 0;*/
		padding: 0.1rem;
		border-radius: 0.08rem;
		background: #f7f7f7;
		resize: vertical;
		font-size: 0.14rem;
		line-height: 0.2rem;
	}
	.feed-btn{
		width: 3.05rem;
		height: 0.18rem;
		line-height: 0.18rem;
		font-size: 0.16rem;
		padding: 0.16rem 0;
		border-radius: 0.25rem;
		background: #5297ED;
		margin: 0.5rem auto;
		color: #fff;
	}
	.gray{
		background: #dfdfdf;
	}
	.dialog{
		display: block;
		width: 1.3rem;
		height: 0.6rem;
		padding: 0.1rem;
		color: #fff;
		line-height: 0.3rem;
		font-size: 0.14rem;
		background: rgba(0,0,0,0.7);
		border-radius: 0.05rem;
		position: absolute;
		top: calc(50% - 0.4rem);
		left: calc(50% - 0.7rem);
	}
</style>
<template>
	<div class="container">
		<div class="content">
			<div class="from_box">
				<div class="label">
					<input type="tel" placeholder="请输入手机号" maxlength="11" v-model="phone" />
				</div>
				<div class="label">
					<input type="tel" placeholder="请输入短信验证码" maxlength="6" v-model="vercode" />
					<span class="cut_line"></span>
					<span class="getcode_btn" v-if="showCodeBtn" @click="getVerCode()">获取验证码</span>
					<span class="getcode_btn" v-if="!showCodeBtn">{{times}}秒后获取</span>
				</div>
				<div class="sub_btn" @click="register()"></div>
			</div>
			<!--领取成功弹窗-->
			<div class="lqcg" v-show="showDownLoad">
				<div class="downLoad" @click="downLoadApp()"></div>
				<div class="tc_close" @click="showDownLoad = false"></div>
			</div>
			<!--遮罩层-->
			<div class="mask" v-show="showDownLoad"></div>
			<!--微信提示打开浏览器下载-->
			<div class="wxTip" v-show="showWxTip"></div>
			<div class="mask mask1" v-show="showWxTip" @click="showWxTip = false"></div>
		</div>
	</div>
</template>

<script>
	import axios from '../../../config/http'
	export default {
	    data () {
	        return {
	        	phone: '',				//手机号
	        	vercode: '',			//短信验证码
	        	showCodeBtn: true,		//获取验证码切换
	        	times: 60,				//倒计时
	        	showDownLoad: false,	//下载弹窗
	        	showWxTip: false		//微信提示打开浏览器下载
	        }
	    },
	    watch: {
	    	
	    },
	    beforeCreate () {
	        document.querySelector('#app').style.cssText = 'margin-top:0;position:absolute;top:0;width:100%;height:100%;';
	    },
	    created(){
			
	    },
	    mounted(){
	    	
	    },
	    methods: {
	    	//获取验证码
	    	getVerCode(){
	    		if(this.validatePhone()){
	    			this.showCodeBtn = false
		    		var that = this
				    let interval = window.setInterval(function() {
				    	that.times--
				     	if ((that.times) <= 0) {
				      		that.times = 60
				      		that.showCodeBtn = true
				      		window.clearInterval(interval)
				    	}	
				    }, 1000);
	    		}
	    		
	    	},
	    	//手机号校验
	    	validatePhone(){
	    		var verPhone = /^1[3456789]\d{9}$/
	    		if(this.phone == ''){
	    			this.toast('请输入手机号')
	    			return false
	    		}else if(!verPhone.test(this.phone)){
	    			this.toast('请输入正确的手机号')
	    			return false
	    		}else {
	    			return true
	    		}
	    	},
	    	//验证码校验
	    	validateCode(){
	    		var verCode = /^[0-9]{6}$/
	    		if(this.vercode == ''){
	    			this.toast('请输入短信验证码')
	    			return false
	    		}else if(!verCode.test(this.vercode)){
	    			this.toast('请输入6位数字验证码')
	    			return false
	    		}else{
	    			return true
	    		}
	    	},
	    	//立即领取
	    	register(){
	    		if(this.validatePhone() && this.validateCode()){
	    			this.showDownLoad = true
	    		}
	    	},
	    	downLoadApp(){
	    		let u = navigator.userAgent
	            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1// android终端
	            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)// ios终端
	            let isWeixin = u.toLowerCase().indexOf('micromessenger') != -1
	            if (isWeixin) {
	                this.showWxTip = true
	            }else{
	                // 非微信打开
	                if (isAndroid) {
	                    
	                }
	            }
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
		background: url(../../../static/image/inviteFriends/bg_all.png) repeat;
		background-size: 100% auto;
	}
	.content{
		width: auto;
		height: 100vh;
		background: url(../../../static/image/inviteFriends/bg_lhb.png) no-repeat;
		background-size: 100% auto;
		position: relative;
	}
	.from_box{
		width: 2.6rem;
		height: 1.84rem;
		position: absolute;
		top: 3.12rem;
		left: calc(50% - 1.3rem);
		.label{
			width: 100%;
			height: 0.45rem;
			margin-bottom: 0.15rem;
			input{
				width: calc(100% - 0.2rem);
				height: 0.15rem;
				line-height: 0.15rem;
				padding: 0.15rem 0.1rem;
				border-radius: 0.05rem;
				font-size: 0.15rem;
				color: #999999;
			}
			input[placeholder]{
				color: #999999;
			}
			.cut_line{
				width: 1px;
				height: 0.25rem;
				background: #999999;
				position: absolute;
				top: 0.7rem;
				left: 1.7rem;
			}
			.getcode_btn{
				width: auto;
				height: 0.15rem;
				line-height: 0.15rem;
				padding: 0.15rem 0;
				font-size: 0.15rem;
				color: #f35439;
				position: absolute;
				top: 0.6rem;
				left: 1.78rem;
			}
		}
		.sub_btn{
			width: 100%;
			height: 0.45rem;
			background: url(../../../static/image/inviteFriends/icon_ljlq.png) no-repeat;
			background-size: 100% auto;
			position: absolute;
			bottom: 0;
		}
	}
	.lqcg{
		width: 3.68rem;
		height: 4.12rem;
		background: url(../../../static/image/inviteFriends/bg_lqcg.png) no-repeat;
		background-size: 100% auto;
		z-index: 3;
		position: absolute;
		top: 0.7rem;
		left: calc(50% - 1.84rem);
		.downLoad{
			width: 2.60rem;
			height: 0.45rem;
			background: url(../../../static/image/inviteFriends/icon_msxz.png) no-repeat;
			background-size: 100% auto;
			position: absolute;
			top: 3.2rem;
			left: calc(50% - 1.3rem);
		}
		.tc_close{
			width: 0.34rem;
			height: 0.34rem;
			background: url(../../../static/image/inviteFriends/icon_close.png) no-repeat;
			background-size: 100% auto;
			position: absolute;
			top: 4.56rem;
			left: calc(50% - 0.17rem);
		}
	}
	.mask{
		width: 100%;
		height: 100%;
		z-index: 2;
		background: rgba(0,0,0,0.5);
		position: absolute;
		top: 0;
	}
	.mask1{
		background: rgba(0,0,0,0.8);
		z-index: 4;
	}
	.wxTip{
		width: 2.57rem;
		height: 1.20rem;
		background: url(../../../static/image/inviteFriends/icon_wxTip.png) no-repeat;
		background-size: 100% auto;
		z-index: 5;
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;
	}
</style>
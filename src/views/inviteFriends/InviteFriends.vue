<template>
	<div class="container">
		<div class="content">
			<div class="invite_rules" @click="showDesc = true">活动说明</div>
			<div class="invite_desc" v-show="showDesc">
				<div class="desc_title">活动说明</div>
				<div class="desc_cont">
					1. 每成功邀请一位新用户（以下或称“好友”）首次下载并使用本APP，您（以下或称为“邀请者”）有机会获得相应奖励。您可将活动页面通过微信、QQ等方式分享给好友且好友通过分享链接首次注册下载星美贷app则视为您邀请好友成功；<br /><br />
					2. 当被邀请成功的好友首次登录app后你可获得1元奖励；好友每天至少申请一款产品，您将获得2元现金奖励，累计3天您可获得6元；每个发出邀请的用户仅限一次。（邀请好友奖励根将据好友的申请产品情况分多天发放）;<br /><br />
					3. 累计奖励：被成功邀请的好友每申请一款产品，您可获得50积分奖励，最高可获得15000积分（价值15元）；<br /><br />
					4. 好友完成任意一款推荐产品的贷款流程，你即可获得3元奖励；<br /><br />
					5. 每个新用户只能被邀请一次，同一个登录账号、手机号、同一个设备，视为同一个用户；<br /><br />
					6. 赚取积分在提现时按照1000:1比例兑换成现金；<br /><br />
					7. 累计一定现金且达到提现额度20后，可申请提现，提现一般1-3天到支付宝账户，如遇双休日、节假日或提现高峰期，提现到账时间可能会出现延迟，请耐心等待，如有疑问，请添加我们的微信客服（luckydoggy007），我们将会尽快回复。
				</div>
				<div class="desc_close" @click="showDesc = false">知道了</div>
			</div>
			<!--遮罩层-->
			<div class="mask" v-show="showDesc" @touchmove.prevent></div>
			<div class="invite_now">
				<img src="../../../static/image/inviteFriends/icon_ljyq.png" alt="" />
			</div>
			<div class="invite_tab">
				<span class="tab_1 color1" @click="tabCut(0)">唤醒好友</span>
				<span class="tab_2 color2" @click="tabCut(1)">好友列表</span>
			</div>
			<div class="invite_list_box">
				<!--唤醒好友-->
				<div class="invite_list" v-show="showList">
					<div class="item_list" v-for="(item,index) in inviteList" :key="index">
						<img :src="item.pic" alt="" />
						<span class="friend_name">{{item.name}}</span>
						<span class="friend_urge">催一下</span>
					</div>
				</div>
				<!--好友列表-->
				<div class="invite_list" v-show="!showList">
					<div class="item_list" v-for="(item,index) in inviteList" :key="index">
						<img :src="item.pic" alt="" />
						<span class="friend_name">{{item.name}}</span>
						<span class="friend_profiit">贡献金额{{item.money}}元</span>
					</div>
				</div>
				<!--无好友-->
				<div class="no_friends" v-show="inviteList.length == 0">
					<img src="../../../static/image/inviteFriends/icon_nolist.png" alt="" />
					<p>当前还没有好友，快去邀请吧</p>
				</div>
				<div class="invite_note" v-show="showList">{{inviteNote1}}</div>
				<div class="invite_note" v-show="!showList">{{inviteNote2}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../../config/http'
	export default {
	    data () {
	        return {
	        	showDesc: false,	//活动说明控制
	        	showList: true,		//好友列表显示
	        	inviteNote1: '好友已经很久没产生奖励了，快去催一下！',
	        	inviteNote2: '邀请越多，赚的越多！',
//	        	inviteList: [],
	        	inviteList: [
		        	{
		        		'pic': '../../../static/image/inviteFriends/icon_tx.png',
		        		'name': '186****1234',
		        		'money': 0.01
		        	},
		        	{
		        		'pic': '../../../static/image/inviteFriends/icon_tx.png',
		        		'name': '大哥喝可乐',
		        		'money': 0.01
		        	},
		        	{
		        		'pic': '../../../static/image/inviteFriends/icon_tx.png',
		        		'name': '186****1234',
		        		'money': 0.01
		        	},
		        	{
		        		'pic': '../../../static/image/inviteFriends/icon_tx.png',
		        		'name': '186****1234',
		        		'money': 0.01
		        	},
		        	{
		        		'pic': '../../../static/image/inviteFriends/icon_tx.png',
		        		'name': '186****1234',
		        		'money': 0.01
		        	},
		        	{
		        		'pic': '../../../static/image/inviteFriends/icon_tx.png',
		        		'name': '186****1234',
		        		'money': 0.01
		        	}
	        	],
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
	    	//tab切换
	    	tabCut(index){
	    		switch (index){
	    			case 0:
	    				this.showList = true
	    				document.getElementsByClassName('tab_1')[0].className = 'tab_1 color1'
	    				document.getElementsByClassName('tab_2')[0].className = 'tab_2 color2'
	    				break;
	    			case 1:
	    				this.showList = false
	    				document.getElementsByClassName('tab_1')[0].className = 'tab_1 color2'
	    				document.getElementsByClassName('tab_2')[0].className = 'tab_2 color1'
	    				break;
	    			default:
	    				break;
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
	}
	.content{
		width: 100%;
		height: 11.02rem;
		background: url(../../../static/image/inviteFriends/bg_invite.png) no-repeat;
		background-size: 100% auto;
		position: relative;
		.invite_rules{
			width: auto;
			height: 0.12rem;
			line-height: 0.12rem;
			padding: 0.06rem 0.15rem;
			border-radius: 0.12rem;
			color: #fff;
			font-size: 0.12rem;
			background: #4444DB;
			box-shadow: inset 0.02rem 0.02rem 0.09rem #6866E2;
			z-index: 2;
			position: fixed;
			top: 1.35rem;
			right: -0.15rem;
			text-align: right;
		}
		.invite_now{
			width: 2.50rem;
			height: 0.5rem;
			position: absolute;
			top: 2.28rem;
			left: calc(50% - 1.25rem);
			img{
				width: auto;
				height: 100%;
			}
		}
		.invite_tab{
			width: 3.44rem;
			height: 0.48rem;
			position: absolute;
			top: 3.25rem;
			left: calc(50% - 1.72rem);
			.tab_1,.tab_2{
				display: block;
				float: left;
				width: 1.72rem;
				height: 0.15rem;
				padding: 0.09rem 0 0.24rem;
				line-height: 0.15rem;
				border-radius: 0.1rem;
				font-size: 0.15rem;
				color: #fff;
			}
			.color1{
				background: #F4C050;
			}
			.color2{
				background: rgba(34,34,34,0.34);
			}
		}
		.invite_list_box{
			width: 3.44rem;
			height: 2.34rem;
			background: #F4C050;
			border-radius: 0.1rem;
			position: absolute;
			top: 3.55rem;
			left: calc(50% - 1.72rem);
			.invite_note{
				width: 100%;
				height: 0.12rem;
				line-height: 0.12rem;
				font-size: 0.12rem;
				color: #fff;
				text-align: center;
				position: absolute;
				bottom: 0.05rem;
			}
		}
		.invite_list{
			width: 3.24rem;
			height: 2rem;
			background: #fff;
			border-radius: 0.03rem;
			box-shadow: inset 0 0.03rem 2px #E3E3E3;
			overflow-x: hidden;
			overflow-y: scroll;
			&::-webkit-scrollbar{
				width: 0;
			}
			position: absolute;
			top: 0.1rem;
			left: calc(50% - 1.62rem);
		}
		.item_list{
			width: auto;
			height: 0.39rem;
			border-bottom: 1px #F3F3F3 solid;
			img{
				width: 0.21rem;
				height: 0.21rem;
				float: left;
				margin: 0.1rem 0 0 0.1rem;
			}
			.friend_name{
				float: left;
				width: auto;
				height: 0.12rem;
				line-height: 0.12rem;
				font-size: 0.12rem;
				margin: 0.15rem 0 0 0.1rem;
				color: #333333;
			}
			.friend_urge{
				width: auto;
				height: 0.12rem;
				line-height: 0.12rem;
				padding: 0.03rem 0.12rem;
				border: 1px #756BF2 solid;
				border-radius: 0.1rem;
				color: #756BF2;
				float: right;
				margin: 0.1rem 0.33rem 0 0;
			}
			.friend_profiit{
				float: right;
				width: auto;
				height: 0.12rem;
				line-height: 0.12rem;
				font-size: 0.12rem;
				margin: 0.15rem 0.33rem 0 0;
				color: #333333;
			}
		}
		.no_friends{
			width: 3.2rem;
			height: 1.3rem;
			position: absolute;
			top: 0.5rem;
			left: calc(50% - 1.6rem);
			img{
				width: 0.86rem;
				height: auto;
			}
			p{
				height: 0.14rem;
				line-height: 0.14rem;
				font-size: 0.14rem;
				color: #ABABAB;
				margin-top: 0.18rem;
			}
		}
	}
	.invite_desc{
		width: 2.24rem;
		height: 3.13rem;
		padding: 0.22rem 0.33rem 0;
		background: #fff;
		border-radius: 0.08rem;
		z-index: 3;
		overflow-x: hidden;
		overflow-y: scroll;
		&::-webkit-scrollbar{
			width: 0;
		}
		position: fixed;
		top: 1.67rem;
		left: calc(50% - 1.45rem);
		.desc_title{
			height: 0.18rem;
			line-height: 0.18rem;
			font-size: 0.16rem;
			font-weight: bold;
			color: #333333;
			margin-bottom: 0.25rem;
		}
		.desc_cont{
			height: auto;
			line-height: 0.22rem;
			font-size: 0.12rem;
			text-align: left;
			color: #333333;
		}
		.desc_close{
			width: auto;
			height: 0.15rem;
			padding: 0.15rem 0;
			margin: 0.42rem auto 0.15rem;
			font-size: 0.15rem;
			color: #fff;
			border-radius: 0.225rem;
			background: #467BED;
		}
	}
	.mask{
		width: 100%;
		height: 100%;
		z-index: 2;
		background: rgba(0,0,0,0.6);
		position: fixed;
		top: 0;
	}
</style>
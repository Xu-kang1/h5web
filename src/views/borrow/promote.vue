<template>
	<div class="container">
		<div class="header" v-if="showHeader">
			<div class="back" @click="goBack()"></div>
			<div class="header_title">精准推荐</div>
		</div>
		<div class="promote_text" v-show="promoteList.length==0">您的借款通过率为30%，完善以下信息，可提升至<span>96.8%</span></div>
		<div class="promote_text promote_re" v-show="promoteList.length>0">
			申请以下产品，预计通过率在96.8%，如果3家以上被拒，关注公众账号【星美贷】，可申请5元红包补偿
			<span class="reChose" @click="reInfo()">修改信息&ensp;></span>
		</div>
		<!--选择框-->
		<div class="select_box" v-show="promoteList.length==0">
			<div class="select_title">个人信息</div>
			<div class="select_item">
				<p class="s_left">信用情况</p>
				<p class="s_right" @click="credit.show = true">{{credit.text}}
					<img src="../../../static/image/icon_right.png" alt="" v-show="credit.text == '请选择'" />
				</p>
			</div>
			<div class="select_item">
				<p class="s_left">芝麻信用分</p>
				<p class="s_right" @click="zmCreditScore.show = true">{{zmCreditScore.text}}
					<img src="../../../static/image/icon_right.png" alt="" v-show="zmCreditScore.text == '请选择'" />
				</p>
			</div>
			<div class="select_item">
				<p class="s_left">社保缴纳</p>
				<p class="s_right" @click="socialSecurity.show = true">{{socialSecurity.text}}
					<img src="../../../static/image/icon_right.png" alt="" v-show="socialSecurity.text == '请选择'" />
				</p>
			</div>
			<div class="select_item">
				<p class="s_left">公积金缴纳</p>
				<p class="s_right" @click="accumulationFund.show = true">{{accumulationFund.text}}
					<img src="../../../static/image/icon_right.png" alt="" v-show="accumulationFund.text == '请选择'" />
				</p>
			</div>
		</div>
		<!--精准推荐button-->
		<div class="promote_btn" @click="getPromoteData()"  v-show="promoteList.length==0">精准推荐</div>
		<!--底部选择栏-->
		<div class="select_condition" v-show="credit.show">
			<div class="condition_title">信用情况<span @click="credit.show = false">取消</span></div>
			<div class="condition_item" v-for="(item,index) in condition1" :key="index" @click="conditionChose(0,index)">
				{{item}}
			</div>
		</div>
		
		<div class="select_condition" v-show="zmCreditScore.show">
			<div class="condition_title">芝麻信用分<span @click="zmCreditScore.show = false">取消</span></div>
			<div class="condition_item" v-for="(item,index) in condition2" :key="index" @click="conditionChose(1,index)">
				{{item}}
			</div>
		</div>
		
		<div class="select_condition" v-show="socialSecurity.show">
			<div class="condition_title">社保缴纳<span @click="socialSecurity.show = false">取消</span></div>
			<div class="condition_item" v-for="(item,index) in condition3" :key="index" @click="conditionChose(2,index)">
				{{item}}
			</div>
		</div>
		
		<div class="select_condition" v-show="accumulationFund.show">
			<div class="condition_title">公积金缴纳<span @click="accumulationFund.show = false">取消</span></div>
			<div class="condition_item" v-for="(item,index) in condition4" :key="index" @click="conditionChose(3,index)">
				{{item}}
			</div>
		</div>
		<!--遮罩层-->
		<div class="mask" v-show="credit.show || zmCreditScore.show || socialSecurity.show || accumulationFund.show"></div>
		
		<div class="promote_list" v-show="promoteList.length>0">
			<div class="promote_list_item" v-for="(item,index) in promoteList" :key="index" @click="productLink(item.id,item.target,item.productConfigureType,item.defaultTarget)">
				<img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+item.url" alt="" />
				<div class="item_cont_1">
					<p>{{item.name}}</p>
					<p>期限{{item.termMin}}~{{item.termMax}}天</p>
				</div>
				<div class="item_cont_2">
					<p class="cont_ed">{{item.min}}-{{item.max}}</p>
					<p class="cont_ed_t">可借额度(元)</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../../config/http'
	export default {
	    data () {
	        return {
	        	showHeader: true,		//是否显示头部
	        	userId: '',				//用户id
	        	channelCode: '',		//渠道号
	        	credit: {				//信用
	        		'level': '',
	        		'text': '请选择',
	        		'show': false
	        	},
	        	zmCreditScore: {		//芝麻信用分
	        		'level': '',
	        		'text': '请选择',
	        		'show': false
	        	},
	        	socialSecurity: {		//社保
	        		'level': '',
	        		'text': '请选择',
	        		'show': false
	        	},
	        	accumulationFund: {		//公积金
	        		'level': '',
	        		'text': '请选择',
	        		'show': false
	        	},
	        	condition1: ['无信用卡或贷款记录','无逾期记录','1年内逾期少于3次且少于90天','1年内逾期超过3次且超90天'],
	        	condition2: ['无','350-600','600-700','700以上'],
	        	condition3: ['无','近6个月有社保','近6个月社保无断续','近12个月及以上无断续'],
	        	condition4: ['无','近6个月有公积金','近6个月公积金无断续','近12个月及以上无断续'],
	        	promoteList: []			//精准推荐数据
	        }
	    },
	    watch: {
	    	
	    },
	    beforeCreate () {
	        document.querySelector('#app').style.cssText = 'margin-top:0;position:absolute;top:0;width:100%;height:100%;';
	    },
	    created(){
	    	document.title = '精准推荐'
	    },
	    mounted(){
	    	this.isAndroidApp()
//	    	if(localStorage.getItem('userId') && localStorage.getItem('userId') != ''){
//	    		this.userId = localStorage.getItem('userId')
//	    	}
	    	if(this.$route.query.userId && this.$route.query.userId != ''){
	    		this.userId = this.$route.query.userId
	    	}
	    	if(this.$route.query.channelCode && this.$route.query.channelCode != ''){
	    		this.channelCode = this.$route.query.channelCode
	    	}
	    	if(localStorage.getItem('dataVal') && localStorage.getItem('dataVal') != ''){
	    		var aa = localStorage.getItem('dataVal').split(',')
	    		console.log(aa)
	    		this.credit.level = aa[0]
	    		this.credit.text = this.condition1[aa[0]]
	    		this.socialSecurity.level = aa[1]
	    		this.socialSecurity.text = this.condition3[aa[1]]
	    		this.zmCreditScore.level = aa[2]
	    		this.zmCreditScore.text = this.condition2[aa[2]]
	    		this.accumulationFund.level = aa[3]
	    		this.accumulationFund.text = this.condition4[aa[3]]
	    		this.getPromoteData()
	    	}
	    },
	    methods: {
	    	//判断是否APP打开
	    	isAndroidApp(){
	    		var u = navigator.userAgent;
			    var isAndroidApp = u.indexOf('app/android') > -1; //android终端
//			    console.log(u)
	    		if(isAndroidApp){
	    			this.showHeader = false
	    		}else{
	    			this.showHeader = true
	    		}
 	    	},
	    	//条件选择
	    	conditionChose(type,index){
	    		switch (type){
	    			case 0:
	    				this.credit.level = index
	    				this.credit.text = this.condition1[index]
	    				this.credit.show = false
	    				break;
	    			case 1:
	    				this.zmCreditScore.level = index
	    				this.zmCreditScore.text = this.condition2[index]
	    				this.zmCreditScore.show = false
	    				break;
	    			case 2:
	    				this.socialSecurity.level = index
	    				this.socialSecurity.text = this.condition3[index]
	    				this.socialSecurity.show = false
	    				break;
	    			case 3:
	    				this.accumulationFund.level = index
	    				this.accumulationFund.text = this.condition4[index]
	    				this.accumulationFund.show = false
	    				break;
	    			default:
	    				break;
	    		}
	    	},
	    	//判断数据选择完整
	    	isComplete(){
	    		if(this.credit.text=='请选择' || this.socialSecurity.text=='请选择' || this.zmCreditScore.text=='请选择' || this.accumulationFund.text=='请选择'){
	    			this.toast('请先完善您的信息！')
	    			return false
	    		}else{
	    			return true
	    		}
	    	},
	    	//精准点击获取数据
	    	getPromoteData(){
	    		if(this.isComplete()){
	    			axios.post('/eventRecord/clickEvent?source=CLICK_RECOMMENDED').then(res => {
		                console.log(res.data)
		            }).catch((error) => {
		            	console.log(error)
		            })
	    			axios.post('/h5/index/conditionList',{
		    			'credit': this.credit.level,
		    			'socialSecurity': this.socialSecurity.level,
		    			'providentFund': this.accumulationFund.level,
		    			'creditScore': this.zmCreditScore.level,
		    			'userId': this.userId,
		    			'channelCode': this.channelCode
		    		}).then(res => {
		                this.promoteList = res.data.data
		                var dataVal = this.credit.level+','+this.socialSecurity.level+','+this.accumulationFund.level+','+this.zmCreditScore.level
		                localStorage.setItem('dataVal',dataVal)
		                console.log(res.data)
		            }).catch((error) => {
		            	console.log(error)
		            })
	    		}
	    	},
	        //产品链接跳转
	        productLink(productId,url,productConfigureType,url1){
	        	//产品点击事件统计
	        	axios.post('/app/index/history/record',{
	        		'userId': this.userId,
                	'productId': productId,
                	'channelCode': this.channelCode?this.channelCode:''
	        	}).then(res => {
	        		if(res.data.success == true){
	        			
	        		}
	        		console.log(res.data)
	            }).catch((error) => {
	            	console.log(error)
	            })
	            if(productConfigureType == 1){	//是否联合登录产品
	            	if(this.userId != ''){	//有用户，调联合登录
		        		axios.post('/union/login',{
			        		'userId': this.userId,
		                	'productId': productId
			        	}).then(res => {
			        		if(res.data.success == true){	//调用联合登录成功
			        			location.href = res.data.data.url
			        		}else{	//调用联合登录失败，直接跳转默认的url
			        			location.href = url
			        		}
			        		console.log(res.data)
			            }).catch((error) => {
			            	console.log(error)
			            })
		        	}else{	//无用户，直接跳转
		        		location.href = url
		        	}
	            }else{	//非联合登录产品
	            	location.href = url
	            }
	        },
	        //修改信息
	        reInfo(){
	        	this.promoteList = []
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
		background: #F5F5F5;
	}
	.header{
		width: 100%;
		height: 0.16rem;
		padding: 0.12rem 0;
		background: #fff;
		.header_title{
			line-height: 0.16rem;
			font-size: 16px;
			font-weight: bold;
		}
		.back{
			width: 0.4rem;
			height: 0.4rem;
			background: url(../../../static/image/icon_back.png) 0.02rem 0.12rem no-repeat;
			background-size: auto 0.16rem;
			position: absolute;
			left: 0.1rem;
			top: 0;
		}
	}
	.promote_text{
		width: 100%;
		height: 0.12rem;
		padding: 0.12rem 0;
		line-height: 0.12rem;
		font-size: 0.12rem;
		background: #fffbef;
		span{
			color: #f7a640;
		}
	}
	.promote_re{
		width: 100%;
		height: 0.32rem;
		padding: 0.1rem 0;
		line-height: 0.16rem;
		font-size: 0.12rem;
		background: #fffbef;
		.reChose{
			color: #f7a640;
			padding: 0 0.1rem;
		}
	}
	.select_box{
		width: calc(100% - 0.2rem);
		height: auto;
		font-size: 0.14rem;
		background: #fff;
		padding: 0.13rem 0.1rem 0;
		.select_title{
			width: calc(100% - 0.14rem);
			height: 0.14rem;
			line-height: 0.14rem;
			margin: 0 auto 0.13rem;
			padding-left: 0.1rem;
			border-left: 0.04rem #f59218 solid;
			text-align: left;
			font-weight: bold;
		}
		.select_item{
			width: 100%;
			height: 0.14rem;
			padding: 0.18rem 0;
			border-bottom: 1px #EEEEEE solid;
			.s_left{
				width: 0.7rem;
				line-height: 0.14rem;
				float: left;
				text-align: left;
				padding-left: 0.1rem;
			}
			.s_right{
				width: auto;
				height: 0.14rem;
				line-height: 0.14rem;
				float: right;
				padding-right: 0.1rem;
				color: #999999;
				img{
					width: auto;
					height: 0.14rem;
				}
			}
		}
	}
	.promote_btn{
		width: 2.4rem;
		height: 0.18rem;
		line-height: 0.18rem;
		padding: 0.14rem 0;
		font-size: 0.18rem;
		margin: 1rem auto 0;
		color: #fff;
		background: #f59218;
		border-radius: 0.23rem;
	}
	.select_condition{
		width: 100%;
		height: auto;
		font-size: 0.12rem;
		z-index: 3;
		background: #F5F5F5;
		position: fixed;
		bottom: 0;
		.condition_title{
			line-height: 0.16rem;
			font-size: 0.16rem;
			padding: 0.14rem 0;
			background: #fff;
			position: relative;
			span{
				color: #999;
				position: absolute;
				right: 0.1rem;
			}
		}
		.condition_item{
			width: auto;
			height: 0.12rem;
			line-height: 0.12rem;
			padding: 0.12rem 0;
			border-bottom: 1px #EEEEEE solid;
		}
	}
	.mask{
		width: 100%;
		height: 100vh;
		z-index: 2;
		background: rgba(0,0,0,0.4);
		position: fixed;
		top: 0;
	}
	.promote_list{
		width: 100%;
		height: auto;
		background: #fff;
		.promote_list_item{
			width: calc(100% - 0.2rem);
			height: 0.5rem;
			padding: 0.1rem 0.1rem;
			border-bottom: 1px #EEEEEE solid;
			font-size: 0.12rem;
			img{
				width: 0.5rem;
				height: 0.5rem;
				float: left;
				
			}
			.item_cont_1{
				width: auto;
				height: 0.5rem;
				float: left;
				margin-left: 0.1rem;
				font-size: 0.14rem;
				p{
					line-height: 0.25rem;
					color: #666666;
				}
				p:first-child{
					color: #000000;
					font-weight: bold;
				}
			}
			.item_cont_2{
				width: auto;
				height: 0.5rem;
				float: right;
				font-size: 0.14rem;
				p{
					line-height: 0.25rem;
					color: #666666;
				}
				p:first-child{
					color: #e5311f;
					font-weight: bold;
				}
			}
		}
	}
</style>
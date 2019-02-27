<template>
	<div class="container">
		<!--banner图-->
		<swiper v-if="bannerList.length>=1" class="banner" :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in bannerList" :key="item.id" >
            	<img class="img" :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+item.url" @click="bannerLink(item.productId)">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        
        <!--滚动栏-->
        <div class='index-gg' ref='contt'>
	        <div class="gg-content-box" v-if='platList.length > 0'>
	          	<div class="gg-content">
	            	<p v-for='(item,index) in platList' :key='index' @click="noticeLink(item.target)">
	            		<img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+item.url" />
	            		<span>{{item.name}}</span>
	            		<span>&ensp;成功下款{{item.attr1}}元</span>
	            		<span>&ensp;{{item.attr2}}</span>
	            	</p>
	          	</div>
	          	<div class='gg-content'></div>
	        </div>
	        <div class="gg-content-box" v-else>
	          	<p>暂无记录</p>
	        </div>
	        <!--<div class="jjy-more">
	          	<router-link to="">更多</router-link>
	        </div>-->
	    </div>
        
        <!--导航栏-->
        <div class="nav">
        	<div class="nav_item">
        		<router-link :to="{path: '/speed',query: {'channelCode': channelCode, 'userId': userId}}">
        			<img src="../../../static/image/borrow/icon_jsxd.png" alt="" />
        			<div class="nav_text">极速小额</div>
        		</router-link>
        	</div>
        	<div class="nav_item">
        		<router-link :to="{path: '/nocheck',query: {'channelCode': channelCode, 'userId': userId}}">
	        		<img src="../../../static/image/borrow/icon_bczx.png" alt="" />
	        		<div class="nav_text">不查征信</div>
        		</router-link>
        	</div>
        	<div class="nav_item">
        		<router-link :to="{path: '/products',query: {'channelCode': channelCode, 'userId': userId}}">
	        		<img src="../../../static/image/borrow/icon_xpsd.png" alt="" />
	        		<div class="nav_text">当日新品</div>
        		</router-link>
        	</div>
        	<div class="nav_item">
        		<router-link :to="{path: '/promote',query: {'channelCode': channelCode, 'userId': userId}}">
        			<img src="../../../static/image/borrow/icon_tstgl.png" alt="" />
        			<div class="nav_text">提升通过率</div>
        		</router-link>
        	</div>
        </div>
        
        <!--提升下款率-->
        <div class="promote_notice">申请5家以上，下款率100%</div>
        
        <!--搜索栏-->
        <div class="search_box" :class="fixedSearch?'isFixed':''">
        	<div class="search_bar">
	        	<div class="search_item" @click="scrollTop()">
	        		<p @click="searchItemCut(0)" :class="searchText.text1=='综合排序'?'':'red'">{{searchText.text1}} 
	        			<img src="../../../static/image/borrow/icon_triangle.png" />
	        		</p>
	        	</div>
	        	<div class="search_item" :class="(searchText.text2=='不限' || searchText.text2=='额度')?'':'red'" @click="scrollTop()">
	        		<p @click="searchItemCut(1)">{{searchText.text2}}
	        			<img src="../../../static/image/borrow/icon_triangle.png" />
	        		</p>
	        	</div>
	        	<div class="search_item" :class="(searchText.text3=='不限' || searchText.text3=='期限')?'':'red'" @click="scrollTop()">
	        		<p @click="searchItemCut(2)">{{searchText.text3}}
	        			<img src="../../../static/image/borrow/icon_triangle.png" />
	        		</p>
	        	</div>
	        	<div class="search_item" :class="filterCondition==''?'':'red'" @click="scrollTop()">
	        		<p @click="searchItemCut(3)">{{searchText.text4}}
	        			<img src="../../../static/image/borrow/icon_triangle.png" />
	        		</p>
	        	</div>
	        </div>
	        
	        <div class="search_cont" v-show="showSearch == 0">
	        	<p @click="setSearch(0,0)">综合排序</p>
	        	<p @click="setSearch(0,1)" :class="searchText.text1=='额度高'?'red':''">额度高</p>
	        	<p @click="setSearch(0,2)" :class="searchText.text1=='利率低'?'red':''">利率低</p>
	        	<p @click="setSearch(0,3)" :class="searchText.text1=='下款快'?'red':''">下款快</p>
	        </div>
	        
	        <div class="search_cont" v-show="showSearch == 1">
	        	<p @click="setSearch(1,0)">不限</p>
	        	<p @click="setSearch(1,1)" :class="searchText.text2=='500~3000元'?'red':''">500~3000元</p>
	        	<p @click="setSearch(1,2)" :class="searchText.text2=='3000~5000元'?'red':''">3000~5000元</p>
	        	<p @click="setSearch(1,3)" :class="searchText.text2=='5000~10000元'?'red':''">5000~10000元</p>
	        	<p @click="setSearch(1,4)" :class="searchText.text2=='10000元以上'?'red':''">10000元以上</p>
	        </div>
	        
	        <div class="search_cont" v-show="showSearch == 2">
	        	<p @click="setSearch(2,0)">不限</p>
	        	<p @click="setSearch(2,1)" :class="searchText.text3=='30天以内'?'red':''">30天以内</p>
	        	<p @click="setSearch(2,2)" :class="searchText.text3=='12个月'?'red':''">1~12个月</p>
	        	<p @click="setSearch(2,3)" :class="searchText.text3=='1年以上'?'red':''">1年以上</p>
	        </div>
	        
	        <div class="filter" v-show="showSearch == 3">
	        	<div class="filter_num">
	        		<p>我有</p>
	        		<p>符合产品：<span>{{filterNum}}家</span></p>
	        	</div>
	        	<div class="filter_box">
	        		<div class="filter_item" @click="setFilter('ONE',$event)">实名手机号</div>
	        		<div class="filter_item" @click="setFilter('TWO',$event)">公积金</div>
	        		<div class="filter_item" @click="setFilter('THREE',$event)">信用卡</div>
	        		<div class="filter_item" @click="setFilter('FOUR',$event)">淘宝</div>
	        		<div class="filter_item" @click="setFilter('FIVE',$event)">京东</div>
	        		<div class="filter_item" @click="setFilter('SIX',$event)">人行征信</div>
	        		<div class="filter_item" @click="setFilter('SEVEN',$event)">学信网</div>
	        		<div class="filter_item" @click="setFilter('Eight',$event)">芝麻分</div>
	        	</div>
	        	<div class="filter_reset">
	        		<div class="clear" @click="filterReset()">重置</div>
	        		<div class="sure" @click="finishFilter()">完成</div>
	        	</div>
	        </div>
        </div>
        <!--产品列表-->
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">
			<div class="product_item" v-for="(item,index) in productList" :key="index" >
				<div class="product_title" @click="productLink(item.id,item.target,item.productConfigureType,item.defaultTarget)">
					<img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n='+item.url" />
					<span class="item_name">{{item.name}}</span>
					<span class="item_label" v-show="item.label != ''">{{item.label}}</span>
					<span class="edit_product" v-show="removeEdit(item.id)" @click.stop="clickShowEdit(index)"></span>
				</div>
				<div class="product_cont" @click="productLink(item.id,item.target,item.productConfigureType,item.defaultTarget)">
					<div class="cont_1">
						<p class="cont_ed" :class="grayProduct(item.id)?'gray':''">{{numToWan(item.min)}}-{{numToWan(item.max)}}</p>
						<p class="cont_ed_t" :class="grayProduct(item.id)?'gray':''">可借额度(元)</p>
					</div>
					<div class="cont_2">
						<p class="cont_qx" :class="grayProduct(item.id)?'gray':''">{{item.term}}</p>
						<p class="cont_fk" :class="grayProduct(item.id)?'gray':''">{{item.paymentDate}}放款</p>
					</div>
					<div class="cont_3">
						<p class="yjsq" :class="grayProduct(item.id)?'gray1':''">一键申请</p>
					</div>
				</div>
				<div class="product_edit_box" v-show="showEdit[index].show">
					<img src="../../../static/image/borrow/icon_yxk.png" alt="" @click="clickEdit(0,item.id)" />
					<img src="../../../static/image/borrow/icon_ybj.png" alt="" @click="clickEdit(1,item.id)" />
				</div>
			</div>
			<div class="w_spinner">
				<mt-spinner type="fading-circle" :size="40" v-show="loadinging"></mt-spinner>
				<span v-show="nomore && (productList.length > 0)">没有更多了</span>
			</div>
		</div>
        
        <!--搜索遮罩层-->
        <div class="mask" v-show="showSearch == 0 || showSearch == 1 || showSearch == 2 || showSearch == 3" @click="showSearch = 5"></div>
        <!--弹窗遮罩层-->
        <div class="mask" v-show="showQqTc || showHomeTc" style="z-index: 7;"></div>
        <!--产品编辑遮罩层-->
        <div class="mask" v-show="showEditMask()" style="z-index: 5;background: rgba(0,0,0,0);" @click="closeEdit()"></div>
        <!--下载栏-->
        <div class="downLoad" v-show="showDownLoad">
        	<div class="close_d" @click="closeDownLoad()"></div>
        	<img src="../../../static/image/logo.png" />
        	<div class="download_text">
        		<!--<p>星美贷</p>-->
        		<p>下载星美贷 领取888元红包</p>
        	</div>
        	<div class="download_now" @click="downLoadApp()">立即下载</div>
        </div>
        
        <!--加群弹窗-->
        <!--<div class="qq_btn">
        	<img src="../../../static/image/borrow/icon_jq_btn.png" alt="" @click="showQqTc?showQqTc=false:showQqTc=true" />
        </div>-->
        
        <div class="qq_dialog" v-show="showQqTc">
        	<img src="../../../static/image/borrow/bg_jq_tc.png" alt="" @click="qqShare()" />
        	<div class="close_qq" @click="showQqTc = false"></div>
        </div>
        
        <!--首页弹窗-->
        <div class="home_dialog" v-show="showHomeTc">
        	<img :src="'http://www.xingmeidai.com/portal/file/downloadImage?n=' + homeTc.url" @click="tcLink(homeTc.target)" />
        	<div class="close_qq" @click="closeHomeTc()"></div>
        </div>
	</div>
</template>

<script>
	import axios from '../../../config/http'
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
	    data () {
	        return {
	        	userName: '',		//用户名
	        	userId: '',			//用户id
	        	channelCode: '',	//渠道号
	        	clintModel: '',		//设备机型    1-ios  0-安卓
	        	mobile: '',			//链接后传的mobile
	        	type: '',			//链接后传的type
	        	id: '',				//链接后传的id
	            bannerList: [],		//banner
	            platList: [],		//滚动公告
	            searchText: {		//搜索nav文字
	            	"text1": "综合排序",
	            	"text2": "额度",
	            	"text3": "期限",
	            	"text4": "筛选"
	            },
	            orderBy: '',		//排序
	            productLimit: 0,	//额度
	            termCondition: 0,	//期限
	            showSearch: 5,		//搜索栏显示
	            fixedSearch: false,	//搜索栏是否固定顶部
	            offsetTop: 0,		//搜索栏离顶部距离
	            filterNum: 0,		//筛选符合产品数
	            filterCondition: '',	//筛选条件字符串
	            num: 0,
		        loading: false,
		        loadinging: false,
		        nomore: false,
		        productList: [],		//产品列表
	            
	            swiperOption: {
	                loop: true,
	                autoplay: {
	                    delay:3500,
	                    disableOnInteraction: false
	                },
	                setWrapperSize :true,
	                mousewheelControl : true,
	                observeParents:true,
	            },
	            showDownLoad: true,			//下载栏显示隐藏
	            showQqTc: false,			//qq加群弹窗
	            homeTc: {},					//首页弹窗
	            showHomeTc: false,			//首页弹窗是否显示
	            flagHomeTc: false,			//接口返回的弹窗显示状态
	            showEdit: [],				//产品编辑显示、隐藏
	        }
	    },
	    components: {
	        swiper,
	        swiperSlide
	    },
	    watch: {
	    	'filterCondition': function(){
	    		if(this.filterCondition != ''){
	    			this.getFilterNum()
	    		}else{
	    			this.filterNum = 0
	    		}
	    	},
	    	'orderBy': function(){
	    		this.num = 0
	    		this.loading = false
		        this.loadinging = false
		        this.nomore = false
	    		this.productList = []
	    		this.loadMore()
	    	},
	    	'productLimit': function(){
	    		this.num = 0
	    		this.loading = false
		        this.loadinging = false
		        this.nomore = false
	    		this.productList = []
	    		this.loadMore()
	    	},
	    	'termCondition': function(){
	    		this.num = 0
	    		this.loading = false
		        this.loadinging = false
		        this.nomore = false
	    		this.productList = []
	    		this.loadMore()
	    	},
	    	'productList':{
                handler:function(newValue,oldValue){
                    this.showProductEdit()
                    
                },
                deep:true,
           	},
           	'productList.length': function(){
           		this.setToBottom()
           	},
           	'bannerList.length': function(){
           		this.changeLoop()
           	}
	    },
	    beforeCreate () {
	        document.querySelector('#app').style.cssText = 'margin-top:0;position:absolute;top:0;width:100%;height:100%;';
	        this.fixedSearch = false
	    },
	    created(){
	    	document.title = '星美贷'
	    },
	    mounted(){
	    	console.log(this.fixedSearch)
//	    	if(localStorage.getItem('userId') && localStorage.getItem('userId')!=''){
//	    		this.userId = localStorage.getItem('userId')
//	    	}
	    	if(this.$route.query.userId && this.$route.query.userId!=''){
	    		this.userId = this.$route.query.userId
	    		localStorage.setItem('userId',this.userId)
	    	}
	    	if(this.$route.query.channelCode && this.$route.query.channelCode != ''){
	    		this.channelCode = this.$route.query.channelCode
	    	}
	    	if(this.$route.query.mobile && this.$route.query.mobile != ''){
	    		if(/^1[3456789]\d{9}$/.test(this.$route.query.mobile)){
	    			this.mobile = this.$route.query.mobile
	    		}
	    	}
	    	if(this.$route.query.type && this.$route.query.type != ''){
	    		this.type = this.$route.query.type
	    	}
	    	if(this.$route.query.id && this.$route.query.id != ''){
	    		this.id = this.$route.query.id
	    	}
	    	if(this.$route.query.userName && this.$route.query.userName != ''){
	    		this.userName = this.$route.query.userName
	    	}
	    	this.initIndex()
	    	this.clintType()
	    	this.getBanner()
	    	this.getPlatFrom()
	    	
	    	this.$nextTick( () => {
	    		this.loadMore()
	    		this.homePop()
	    		setTimeout( () => {
	    			this.offsetTop = document.getElementsByClassName('search_box')[0].offsetTop
	    			window.scrollTo(0,0)
	    			window.addEventListener('scroll', this.fixedScroll)
	    		},100)
	    	})
	    	if(this.showDownLoad){
	    		window.addEventListener('scroll', this.scrollHide)
	    	}
//	    	if (window.history && window.history.pushState) {
//			    history.pushState(null, null, document.URL);
//			    window.addEventListener('popstate', this.clearEvents, false);
//			}
	    },
	    methods: {
	    	//h5首页初始化处理渠道号和用户注册登录
	    	initIndex(){
	    		axios.post('/h5/index/init',{
	    			'channelCode': this.channelCode,
	    			'mobile': this.mobile,
	    			'type': this.type,
	    			'id': this.id,
	    			'userName': this.userName
	    		}).then(res => {
	                if(res.data.success){
	                	if(this.mobile == ''){
	                		
	                	}else{
	                		this.userId = res.data.data.id
	                		localStorage.setItem('userId',res.data.data.id)
	                	}
	                }
	                console.log(res.data)
	            }).catch((error) => {
	            	console.log(error)
	            })
	    	},
	    	// 获取banner
	        getBanner () {
	            axios.get('/index/banner').then(res => {
	                this.bannerList = res.data.data
	                console.log(res.data)
	                
	                this.scoll()
	            }).catch((error) => {
	            	console.log(error)
	            })
	        },
	        //轮播只有一张时取消loop
	        changeLoop(){
	        	if(this.bannerList.length <= 1){
	        		this.swiperOption.loop = false
	        	}else{
	        		this.swiperOption.loop = true
	        	}
	        },
	        //获取公共列表
	        getPlatFrom(){
	        	axios.get('/notice/list/1').then(res => {
	                this.platList = res.data.data.content
	                console.log(res.data)
	            }).catch((error) => {
	            	console.log(error)
	            })
	        },
	        //banner链接跳转，后台记录请求
	        bannerLink(productId){
	        	axios.post('/app/index/banner/click',{
	        		'userId': this.userId,
                	'productId': productId,
	        	}).then(res => {
	        		if(res.data.success == true){
	        			location.href = res.data.data
	        		}
	        		console.log(res.data)
	            }).catch((error) => {
	            	console.log(error)
	            })
	        	
	        },
	        //公告链接跳转
	        noticeLink(url){
	        	location.href = url
	        },
	        //产品链接跳转
	        productLink(productId,url,productConfigureType,url1){
	        	this.saveProductId(productId)	//存productId到本地
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
	        //存产品id到 localStorage
	        saveProductId(productId){
	        	var aa = localStorage.getItem('productIds')
	        	if(aa && aa!=''){
	        		var bb = aa.split(',')
	        		var cc = true		//id未存localstorage
	        		for(var i=0; i<bb.length; i++){
	        			if(bb[i] == productId){
	        				cc = false
	        				break
	        			}
	        		}
	        		if(cc){
	        			aa=aa + ',' + productId
	        		}
	        	}else{
	        		aa = productId
	        	}
	        	localStorage.setItem('productIds',aa)
	        },
	        //产品点击后置灰
	        grayProduct(productId){
	        	var qq = localStorage.getItem('productIds')
//	        	var ss = localStorage.getItem('setBottom')
	        	var isExist = false
	        	if(qq && qq != ''){
	        		var ww = qq.split(',')
	        		for(var j=0,len=ww.length; j<len; j++){
	        			if(ww[j] == productId){
	        				isExist = true
	        				break
	        			}
	        		}
	        	}
//	        	if(ss && ss != ''){
//	        		var gg = ss.split(',')
//	        		for(var k=0,len2=gg.length; k<len2; k++){
//	        			if(gg[k] == productId){
//	        				isExist = true
//	        				break
//	        			}
//	        		}
//	        	}
	        	return isExist
	        },
	        //搜索条件栏切换
	        searchItemCut(index){
	        	switch (index){
	        		case 0:
	        			this.showSearch = 0
	        			break;
	        		case 1:
	        			this.showSearch = 1
	        			break;
	        		case 2:
	        			this.showSearch = 2
	        			break;
	        		case 3:
	        			this.showSearch = 3
	        			break;
	        		default:
	        			break;
	        	}
	        },
	        //搜索栏滑动到顶部固定
	        fixedScroll(){
	        	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//	        	var off = document.getElementsByClassName('search_box')[0].offsetTop
//	        	console.log(scrollTop,this.offsetTop)
	  			if(scrollTop >= this.offsetTop){
	  				this.fixedSearch = true
	  			}else{
	  				this.fixedSearch = false
	  			}
	        },
	        //点击搜索条件滑动到顶部
	        scrollTop(){
	        	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
	  			window.scrollTo(0,this.offsetTop)
	        },
	        //筛选条件点击
	        setFilter(filter,event){
	        	if(this.filterCondition == ''){
	        		this.filterCondition = filter
	        		event.target.className = 'filter_item isActive'
	        	}else{
	        		var a=this.filterCondition.split(',')
	        		var b=true	//没有选中
	        		for(var i=0,len=a.length; i<len; i++){
	        			if(a[i] == filter){
	        				b=false
	        				a.splice(i,1)
	        				break
	        			}
	        		}
	        		if(b){
	        			this.filterCondition = this.filterCondition + ',' + filter
	        			event.target.className = 'filter_item isActive'
	        		}else{
	        			this.filterCondition = ''
	        			event.target.className = 'filter_item'
	        			for(var j=0; j<a.length; j++){
	        				if(j==0){
	        					this.filterCondition = a[j]
	        				}else{
	        					this.filterCondition = this.filterCondition + ',' + a[j] 
	        				}
	        			}
	        		}
	        	}
	        },
	        //重置筛选条件
	        filterReset(){
	        	this.filterCondition = ''
	        	var oFilter = document.getElementsByClassName('filter_item')
	        	for(var i=0; i<oFilter.length; i++){
	        		oFilter[i].className = 'filter_item'
	        	}
 	        },
	        //筛选符合产品数
	        getFilterNum(){
	        	axios.get('/product/count?conditions=' + this.filterCondition).then(res => {
	                if(res.data.success == true){
//	                	console.log(res.data)
	                	this.filterNum = res.data.data
	                }else{
	                	this.filterNum = 0
	                }
	            }).catch((error) => {
	            	console.log(error)
	            })
	        },
	        //完成筛选
	        finishFilter(){
	        	this.num = 0
	        	this.loading = false
		        this.loadinging = false
		        this.nomore = false
	    		this.productList = []
	    		this.loadMore()
	    		this.showSearch = 5
	        },
	        //选择搜索条件
	        setSearch(index,inIndex){
	        	switch (index){
	        		case 0:
	        			switch (inIndex){
	        				case 0:
	        					this.orderBy = ''
	        					this.searchText.text1 = '综合排序'
	        					
	        					break;
	        				case 1:
	        					this.orderBy = 'max'
	        					this.searchText.text1 = '额度高'
	        					break;
	        				case 2:
	        					this.orderBy = 'rate'
	        					this.searchText.text1 = '利率低'
	        					break;
	        				case 3:
	        					this.orderBy = 'payment_orders'
	        					this.searchText.text1 = '下款快'
	        					break;
	        				default:
	        					break;
	        			}
	        			this.showSearch = 5
	        			break;
	        		case 1:
	        			switch (inIndex){
	        				case 0:
	        					this.productLimit = 0
	        					this.searchText.text2 = '不限'
	        					break;
	        				case 1:
	        					this.productLimit = 1
	        					this.searchText.text2 = '500~3000元'
	        					break;
	        				case 2:
	        					this.productLimit = 2
	        					this.searchText.text2 = '3000~5000元'
	        					break;
	        				case 3:
	        					this.productLimit = 3
	        					this.searchText.text2 = '5000~10000元'
	        					break;
	        				case 4:
	        					this.productLimit = 4
	        					this.searchText.text2 = '10000元以上'
	        					break;
	        				default:
	        					break;
	        			}
	        			this.showSearch = 5
	        			break;
	        		case 2:
	        			switch (inIndex){
	        				case 0:
	        					this.termCondition = 0
	        					this.searchText.text3 = '不限'
	        					break;
	        				case 1:
	        					this.termCondition = 1
	        					this.searchText.text3 = '30天以内'
	        					break;
	        				case 2:
	        					this.termCondition = 2
	        					this.searchText.text3 = '1~12个月'
	        					break;
	        				case 3:
	        					this.termCondition = 3
	        					this.searchText.text3 = '1年以上'
	        					break;
	        				default:
	        					break;
	        			}
	        			this.showSearch = 5
	        			break;
	        		default:
	        			break;
	        	}
	        },
	        //搜索产品
	        loadMore() {
	      		this.loadinging = true
	      		var str = '?orderBy=' + this.orderBy + '&productLimit=' + this.productLimit + '&termCondition=' + this.termCondition
	      		+ '&conditions=' + this.filterCondition + '&mobileEqui=' + this.clintModel + '&channelCode=' + this.channelCode + '&position=3'
			  	setTimeout(() => {
			    	this.num++
			    	axios.get('/product/list/h5/' + this.num + str).then(res => {
			    		console.log(res.data)
		                if(res.data.success == true){
		                	this.productList = this.productList.concat(res.data.data.content)
		                	if(res.data.data.content.length < 10){
		                		this.loading = true;
						        this.loadinging = false;
						        this.nomore = true;
		                	}
		                }else{
		                	this.loading = true;
					        this.loadinging = false;
					        this.nomore = true;
		                }
		            }).catch((error) => {
		            	console.log(error)
		            })
			  	}, 500);
			},
	        
	        scoll() {//滚动公告
		        var self = this;
		        this.$nextTick(() => {
		        	setTimeout(function() {
				        var speed= 80;
				        var demo = self.$refs.contt.children[0];
				        var demo2 = self.$refs.contt.children[0].children[1];
				        var demo1 = self.$refs.contt.children[0].children[0];
				        demo2.innerHTML = demo1.innerHTML;
			          	function Marquee(){
				            if(demo.scrollTop >= demo1.offsetHeight){
				              demo.scrollTop = 0;
				            } else{
				              demo.scrollTop=demo.scrollTop + 1;
				            }
			          	}
			          	var MyMar=setInterval(Marquee,speed);
			          	demo.onmouseover=function(){clearInterval(MyMar)}
			          	demo.onmouseout=function(){MyMar=setInterval(Marquee,speed)}
			        },2000)
		        })
		        
		    },
		    //判断安卓、ios
		    clintType(){
		    	var u = navigator.userAgent;
			    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	            if(isAndroid){
	            	this.showDownLoad = true
	            	this.clintModel = 0		//1-ios  0-安卓
	            }else if(isiOS){
	            	this.showDownLoad = false
	            	this.clintModel = 1
	            }
		    },
		    //下载app
		    downLoadApp(){
		    	var u = navigator.userAgent;
			    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	            if(isAndroid){
	            	window.location.href = 'com.xingmeidai.xingmeidai://com.xingmeidai.xingmeidai'
                    setTimeout(() => {
                        window.location.href = 'http://xingmeidai.com/download/app-release-xmd-h5.apk'
                    },2000)
	            }
		    },
		    //下载APP滑动隐藏
	        scrollHide(){
	        	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
	  			if(scrollTop > 0){
	  				this.showDownLoad = false
	  			}else{
	  				this.showDownLoad = true
	  			}
	        },
	        closeDownLoad(){
	        	this.showDownLoad = false
	        	window.removeEventListener('scroll', this.scrollHide)
	        },
		    //qq分享
		    qqShare(){
		    	axios.post('/app/index/qqShare').then(res => {
//	        		console.log(res.data)
	        		location.href = res.data.data.systemData
	            }).catch((error) => {
	            	console.log(error)
	            })
		    },
		    //首页弹窗
		    homePop(){
		    	axios.post('/app/index/popup',{
		    		'position': 1
		    	}).then(res => {
	        		console.log(res.data)
	        		this.homeTc = res.data.data
	        		this.flagHomeTc = res.data.data.flag
	        		if(res.data.data.flag){
	        			if(res.data.data.popNode == 0){	//未登录显示
	        				if(this.userId == ''){
	        					this.showHomeTc = true
	        				}else{
	        					this.showHomeTc = false
	        				}
	        			}else if(res.data.data.popNode == 1){	//不限制是否登录
	        				this.showHomeTc = true
	        			}
	        		}else{
	        			this.showHomeTc = false
	        		}
	        		this.showTcTime()
	            }).catch((error) => {
	            	console.log(error)
	            })
		    },
		    //进入页面存当前时间，控制弹窗是否显示，1小时内不显示
		    showTcTime(){
		    	var times=localStorage.getItem('entryTime')
		    	var nowTime = new Date()
		    	if(this.flagHomeTc){
		    		if(times && times!=''){
			    		var timeDiff = (nowTime.getTime() - new Date(times).getTime())/(1000*60)
	//		    		console.log(timeDiff)
			    		if(timeDiff <= 60){		//每小时显示一次
			    			this.showHomeTc = false
			    		}else{
			    			this.showHomeTc = true
			    			localStorage.setItem('entryTime',nowTime)
			    		}
			    	}else{
			    		localStorage.setItem('entryTime',nowTime)
			    	}
		    	}else{
		    		this.showHomeTc = false
		    	}
		    },
		    //首页弹窗链接跳转，统计点击事件
		    tcLink(url){
		    	axios.post('/eventRecord/clickEvent?source=CLICK_POPUP').then(res => {
	        		console.log(res.data)
	        		location.href = url
	            }).catch((error) => {
	            	console.log(error)
	            })
		    },
		    //数字大于1W处理
		    numToWan(num){
		    	var newNum = num
		    	if(num>=10000){
		    		if(String(num/10000).indexOf('.') > -1){
		    			newNum = (num/10000).toFixed(2) + '万'
		    		}else{
		    			newNum = (num/10000) + '万'
		    		}
		    	}
		    	return newNum
		    },
		    //route跳转
		    routeGo(index){
		    	this.$router.push({path: '/speed',query: {'channelCode': this.channelCode}})
//		    	this.$router.push('/speed')
		    	switch (index){
		    		case 0:
		    			break;
		    		default:
		    			break;
		    	}
		    },
		    //清除事件
		    clearEvents(){
		    	window.removeEventListener('scroll', this.fixedScroll);		//清除监听页面滚动事件
		    	window.removeEventListener('popstate', this.clearEvents);		//清除监听浏览器返回事件
		    },
		    //控制产品编辑弹层显示隐藏
		    showProductEdit(){
		    	this.showEdit = []
		    	for(var i=0,len=this.productList.length; i<len; i++){
		    		this.showEdit.push({'show': false})
		    	}
		    	console.log(this.showEdit)
		    },
		    //点击显示编辑
		    clickShowEdit(index){
		    	this.showEdit[index].show = true
		    	console.log(this.showEdit)
		    },
		    //产品遮罩显示
		    showEditMask(){
		    	var aa = false
		    	for(var i=0,len=this.showEdit.length; i<len; i++){
		    		if(this.showEdit[i].show){
		    			aa = true 
		    			break
		    		}
		    	}
		    	return aa
		    },
		    //关闭产品编辑
		    closeEdit(){
		    	for(var i=0,len=this.showEdit.length; i<len; i++){
		    		this.showEdit[i].show = false
		    	}
		    },
		    //已下款、已被拒点击事件
		    clickEdit(type,productId){
		    	this.setBottomProductId(productId)
		    	this.toast('已将产品置于最后')
		    	//后台记录点击事件
		    	axios.post('h5/index/product/action',{
		    		'mobile': this.mobile,
		    		'channelCode': this.channelCode,
		    		'type': type,
		    		'productId': productId
		    	}).then(res => {
	        		console.log(res.data)
	            }).catch((error) => {
	            	console.log(error)
	            })
	            
	            this.setToBottom()
		    },
		    //存下款、被拒productId
		    setBottomProductId(productId){
		    	var aa = localStorage.getItem('setBottom')
	        	if(aa && aa!=''){
	        		var bb = aa.split(',')
	        		var cc = true		//id未存localstorage
	        		for(var i=0; i<bb.length; i++){
	        			if(bb[i] == productId){
	        				cc = false
	        				break
	        			}
	        		}
	        		if(cc){
	        			aa=aa + ',' + productId
	        		}
	        	}else{
	        		aa = productId
	        	}
	        	localStorage.setItem('setBottom',aa)
		    },
		    //下款、被拒 置底
		    setToBottom(){
		    	var dd = localStorage.getItem('setBottom')
		    	var zz = []
		    	var ff = []
		    	if(dd && dd != ''){
		    		for(var j=0,len1=this.productList.length; j<len1; j++){
		    			//如果存在产品id
		    			if(dd.indexOf(this.productList[j].id) > -1){
		    				zz.push(this.productList[j])
		    			}else{
		    				ff.push(this.productList[j])
		    			}
		    		}
		    		//处理置底的排序
		    		var tt = dd.split(',')
		    		var kks = []
		    		for(var n=0,leng=tt.length; n<leng; n++){
		    			for(var m=0,leng1=zz.length; m<leng1; m++){
		    				if(tt[n] == zz[m].id){
		    					kks.push(zz[m])
		    					break
		    				}
		    			}
		    		}
		    		this.productList = ff.concat(kks)
		    	}
		    },
		    //置底后去除按钮
		    removeEdit(productId){
		    	var hh = localStorage.getItem('setBottom')
		    	var isToB = true
		    	if(hh && hh != ''){
		    		if(hh.indexOf(productId) > -1){
		    			isToB = false
		    		}else{
		    			isToB = true
		    		}
		    	}
		    	return isToB
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
		    //首页弹窗关闭时间统计
		    closeHomeTc(){
		    	this.showHomeTc = false
		    	axios.post('/eventRecord/clickEvent?source=CLOSE_POPUP').then(res => {
	        		console.log(res.data)
	            }).catch((error) => {
	            	console.log(error)
	            })
		    }
	    },
	    destroyed(){
            window.removeEventListener('scroll', this.fixedScroll);		//清除监听页面滚动事件
            window.removeEventListener('scroll', this.scrollHide)
        },
   	}
</script>

<style lang="less" scoped="scoped">
	.container{
		width: auto;
		min-height: 100vh;
		/*margin-top: -40px;*/
		background: #F5F5F5;
		padding-bottom: 0.5rem;
	}
	.banner{
		width: 100%;
		height: 1.4rem;
		img{
			width: 100%;
		}
	}
	.index-gg{
		width: 100%;
		height: 0.24rem;
		z-index: 2;
		margin-top: -0.24rem;
		position: relative;
		.gg-content-box{
			width: auto;
			height: 0.24rem;
			overflow: hidden;
			background: rgba(0,0,0,0.4);
		}
		.gg-content{
			position: relative;
	        transition: top 2s;
		}
		p{
			overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            color: #fff;
            line-height: 0.24rem;
            font-size: 0.11rem;
            text-align: left;
            padding-left: 0.18rem;
            img{
            	width: 0.16rem;
            	height: 0.16rem;
            	margin: 0.04rem 0.07rem 0 0;
            }
		}
	}
	.nav{
		width: 100%;
		height: 0.7rem;
		background: #fff;
		margin-bottom: 0.05rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		.nav_item{
			width: 25%;
			height: 0.7rem;
			display: block;
			a{
				height: 0.7rem;
				display: block;
			}
			img{
				width: 0.24rem;
				height: 0.24rem;
				margin: 0.16rem auto 0.06rem;
				display: block;
			}
			.nav_text{
				/*width: 100%;*/
				height: 0.16rem;
				line-height: 0.16rem;
				font-size: 0.11rem;
				/*margin-top: -0.64rem;*/
				/*position: relative;
				top: -0.65rem;*/
			}
		}
	}
	.isFixed{
		position: fixed;
		top: 0;
	}
	.search_box{
		width: 100%;
		height: auto;
		min-height: 0.41rem;
		z-index: 4;
		.search_bar{
			width: 100%;
			height: 0.4rem;
			background: #fff;
			border-bottom: 1px #EEEEEE solid;
			z-index: 4;
			position: absolute;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.search_item{
				width: 25%;
				height: 0.4rem;
				p{
					height: 0.4rem;
					line-height: 0.4rem;
					font-size: 0.12rem;
					img{
						width: auto;
						height: 0.04rem;
						margin: 0.18rem 0 0.18rem 0.02rem;
					}
				}
			}
		}
		.search_cont{
			width: calc(100% - 0.28rem);
			height: auto;
			background: #fff;
			padding: 0.09rem 0.14rem;
			z-index: 4;
			position: absolute;
			margin-top: 0.4rem;
			p{
				height: 0.32rem;
				line-height: 0.32rem;
				font-size: 0.14rem;
				text-align: left;
			}
		}
		.red{
			color: #ff6648;	
		}
		.filter{
			width: calc(100% - 0.28rem);
			height: auto;
			background: #fff;
			padding: 0.09rem 0.14rem 0;
			z-index: 4;
			margin-top: 0.4rem;
			position: absolute;
			.filter_num{
				width: auto;
				height: 0.36rem;
				p{
					width: 50%;
					line-height: 0.36rem;
					font-size: 0.12rem;
					text-align: left;
					float: left;
					color: #bbbbbb;
				}
				p:last-child{
					float: right;
					text-align: right;
					span{
						color: #333333;
					}
				}
			}
			.filter_box{
				width: 100%;
				height: auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				.filter_item{
					width: 23%;
					height: 0.28rem;
					line-height: 0.3rem;
					font-size: 0.12rem;
					border: 1px #E5E5E5 solid;
					margin-bottom: 0.08rem;
					color: #444444;
				}
				.isActive{
					background: #ff6648;
					border: 1px #ff6648 solid;
					color: #fff;
				}
			}
			.filter_reset{
				width: calc(100% - 1px);
				height: 0.4rem;
				margin-top: 0.2rem;
				border-top: 1px #e5e5e5 solid;
				.clear,.sure{
					width: calc(50% - 0.5px);
					height: 0.4rem;
					line-height: 0.4rem;
					font-size: 0.16rem;
					float: left;
					color: #656565;
				}
				.clear{
					border-right: 1px #e5e5e5 solid;
				}
				.sure{
					float: right;
				}
			}
		}
	}
	.product_item{
		width: calc(100% - 0.32rem);
		height: auto;
		min-height: 0.4rem;
		padding: 0.12rem 0.16rem 0;
		background: #FFF;
		position: relative;
		p,span{font-size: 0.12rem;}
		.product_title{
			width: 100%;
			height: 0.24rem;
			margin-bottom: 0.1rem;
			img{
				display: inline-block;
				width: 0.24rem;
				height: 0.24rem;
				float: left;
				margin-right: 0.08rem;
			}
			span{
				float: left;
				margin-right: 0.12rem;
			}
			.item_name{
				font-size: 0.16rem;
				line-height: 0.16rem;
				height: 0.16rem;
				margin-top: 0.04rem;
			}
			.item_label{
				height: 0.1rem;
				line-height: 0.1rem;
				margin-top: 0.03rem;
				font-size: 0.1rem;
				background: #EAF2FF;
				padding: 0.04rem 0.03rem 0.02rem;
				color: #4E83EE;
				border-radius: 0.02rem;  
			}
			.edit_product{
				width: 0.24rem;
				height: 0.24rem;
				float: right;
				margin-right: 0;
				background: url(../../../static/image/borrow/icon_edit.png) 0.15rem 0.05rem no-repeat;
				background-size: auto 0.14rem;
			}
		}
		.product_cont{
			width: 100%;
			height: 0.44rem;
			padding-bottom: 0.06rem;
			border-bottom: 1px #E5E5E5 solid;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.cont_1,.cont_2,.cont_3{
				width: 33%;
				height: 0.44rem;
			}
			.cont_1{
				text-align: left;
				.cont_ed{
					line-height: 0.28rem;
					color: #FF4A49;
					font-size: 0.2rem;
				}
				.cont_ed_t{
					font-size: 0.12rem;
					line-height: 0.16rem;
					margin-top: 0.02rem;
					color: #bcbcbc;
				}
			}
			.cont_2{
				p{
					width: 70%;
					line-height: 0.18rem;
					color: #656565;
					font-size: 0.13rem;
					text-align: left;
					padding-left: 15%;
				}
				.cont_qx{
					margin-top: 0.07rem;
					margin-bottom: 0.04rem;
				}
			}
			.cont_3 .yjsq{
				width: 0.7rem;
				height: 0.24rem;
				line-height: 0.24rem;
				font-size: 0.12rem;
				color: #fff;
				background: #467BED;
				border-radius: 0.125rem;
				box-shadow: 0 1px 4px 0 #8DC7FF;
				float: right;
				margin-top: 0.095rem;
			}
		}
		.product_edit_box{
			width: 70%;
			height: 0.97rem;
			padding: 0 15%;
			z-index: 6;
			background: rgba(0,0,0,0.6);
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			img{
				width: 0.56rem;
				height: 0.56rem;
			}
		}
	}
	.w_spinner{
		/*margin-bottom: 0.4rem;*/
		height: 0.4rem;
		text-align: center;
		font-size: 0.12rem;
		span:first-child{
			position: absolute;
			left: calc(50% - 20px);
		}
		span:last-child{
			width: 100%;
			font-size: 0.12rem;
			line-height: 0.4rem;
			display: inline-block;
		}
	}
	.mask{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.4);
		z-index: 3;
		position: fixed;
		top: 0;
	}
	.downLoad{
		width: 100%;
		height: 0.53rem;
		background: rgba(0,0,0,0.75);
		position: fixed;
		bottom: 0;
		.close_d{
			width: 0.12rem;
			height: 0.12rem;
			background: url(../../assets/btn_closed.png) no-repeat;
			background-size: 0.12rem 0.12rem;
			position: absolute;
			top: 0.06rem;
			right: 0.06rem;
		}
		img{
			width: 0.4rem;
			height: 0.4rem;
			float: left;
			margin: 0.065rem 0 0.065rem 0.14rem;
		}
		.download_text{
			width: 1.8rem;
			height: 0.4rem;
			float: left;
			margin: 0.065rem 0 0.065rem 0.14rem;
			font-size: 0.1rem;
			color: #fff;
			text-align: left;
			p:first-child{
				font-size: 0.15rem;
				line-height: 0.15rem;
				margin-top: 0.13rem;
			}
		}
		.download_now{
			width: 0.7rem;
			height: 0.28rem;
			line-height: 0.28rem;
			background: #4f93f8;
			font-size: 0.12rem;
			text-align: center;
			color: #fff;
			float: right;
			margin: 0.125rem 0.33rem 0.125rem 0;
			border-radius: 0.03rem;
		}
	}
	.gray{
		color: #BCBCBC !important;
	}
	.gray1{
		background: #dbdbdb !important;
		box-shadow: none !important;
	}
	.qq_btn{
		width: 0.5rem;
		height: 0.4rem;
		position: fixed;
		bottom: 1.4rem;
		right: 0.1rem;
		img{
			width: 0.5rem;
			height: auto;
		}
	}
	.qq_dialog,.home_dialog{
		width: 2.4rem;
		height: 2.98rem;
		/*background: url(../../../static/image/borrow/bg_jq_tc.png) no-repeat;
		background-size: 100% auto;*/
		z-index: 8;
		position: fixed;
		top: 1.6rem;
		left: calc(50% - 1.2rem);
		.close_qq{
			width: 0.21rem;
			height: 0.21rem;
			background: url(../../../static/image/borrow/closed.png) no-repeat;
			background-size: 0.21rem 0.21rem;
			position: absolute;
			bottom: -0.45rem;
			left: calc(50% - 0.115rem);
		}
		img{
			width: 100%;
			height: auto;
		}
	}
	
	.promote_notice{
		width: calc(100% - 0.7rem);
		height: 0.12rem;
		padding: 0.07rem 0.4rem 0.07rem 0.3rem;
		font-size: 0.12rem;
		line-height: 0.12rem;
		text-align: left;
		color: #F73522;
		background: url(../../../static/image/borrow/icon_promote_notice.png) 0.12rem 0.07rem no-repeat;
		background-size: auto 0.12rem;
		background-color: #FFF9F0;
	}
</style>
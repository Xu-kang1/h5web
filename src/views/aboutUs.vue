<template>
<div>
  <div class="headerTitle">
    <div class="titleText"><span class="left_icon"></span><span>{{text_}}</span></div>
  </div>
  <div class="mask">
    <!-- <mt-header fixed title="关于我们">
      <router-link to="" @click.native="goBack" slot="left">
          <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <div v-html="textArea" class="text">{{textArea}}</div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      tag: '',
      text_: '星美贷',
      textArea: '<p>星美贷作为一站式智能借款平台，旨在为用户提供多维度，高通过率的借款产品。平台甄选百余家优质低息平台进行合作，为用户打造安全的借款环境，用户可以结合自身的需求选择合适的借款产品。使用中如有疑问，欢迎添加客服微信或拨打。</p><p style="text-indent:0;">客服微信：luckydoggy007 ,客服电话：13157175281。</p>'
    }
  },
  beforeMount () {
    document.querySelector('#app').style.cssText = 'margin-top:0;'
    document.title = '关于我们'
  },
  mounted () {
    this.tag = location.href.search('tag=1')
    if (this.tag === -1) {
      this.text_ = '防爆专家'
      this.textArea = '<p>防爆专家是一款通讯录隐私保护工具，用户可以通过“一键包装”功能，实现快速伪装本地通讯录联系人，避免用户在使用一些app时，被动进行真实通讯录的授权。包装前会对通讯录进行本地备份，并支持根据备份记录进行一键还原。做到即用即改，时时还原。使用中如有疑问，欢迎添加客服微信或拨打。</p><p style="text-indent:0;">客服微信：moneyonmyway ,客服电话：13157175281。</p>'
    }
  },
  methods: {
    goBack () {
      if (this.tag !== -1) {
//      this.$router.push({path: '/perCenter_'})
        this.$router.go(-1)
      } else {
        this.text_ = '防爆专家'
        this.textArea = '<p>防爆专家是一款通讯录隐私保护工具，用户可以通过“一键包装”功能，实现快速伪装本地通讯录联系人，避免用户在使用一些app时，被动进行真实通讯录的授权。包装前会对通讯录进行本地备份，并支持根据备份记录进行一键还原。做到即用即改，时时还原。使用中如有疑问，欢迎添加客服微信或拨打。</p><p style="text-indent:0;">客服微信：moneyonmyway ,客服电话：13157175281。</p>'
//        this.$router.push({path: '/perCenter'})
          this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mask{
  position: relative;
  height:100%;
  background:#fff;
  top:.06rem;
  padding:.1rem;
}
.mint-header{
  background:#fff;
  color:#000;
  box-shadow: 0 0 1px #eeeeee;
}
.text {
  font-size: .12rem;
  text-indent: .24rem;
  text-align: left;
  // margin: 0 .1rem;
}
.headerTitle{
  background:#fff;
  height:.38rem;
  padding: 0 .15rem;
  margin-top: .08rem;
  font-size:.14rem;
  color:#333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .titleText{
      // font-weight: bold;
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
}
</style>

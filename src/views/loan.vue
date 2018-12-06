<template>
    <div>test
      <div class="font">字体测试</div>
      <div class="list" v-for="i in 5" :key="i">
        测试边框
      </div>
      <div class="img" @click="goAbout">
        <div class="text">描述文字</div>
        <img src="../assets/logo.png" alt="">
      </div>
    </div>
</template>
<script>
import axios from '../../config/http'
export default {
  data () {
    return {}
  },
  mounted () {

  },
  methods: {
    getData () {
      axios.post({}).then(res => {})
    },
    goAbout () {
      console.log(1)
      this.$router.push({path: '/aboutus'})
    }
  }
}
</script>
<style lang="less" scoped>
  @border: 1px solid #eef0f1;
  div {
      font-size:20px;
    .font {
      font-size:.3rem;
    }
    .img{
      display: flex;
      align-items: center;
      height:.5rem;
      justify-content:space-between;
      background: #eef0f1;
      padding:0 .1rem;
      img{
        display: inline-block;
        width: .4rem;
        height: .4rem;
      }
    }
  }
  .list{
    border-bottom: @border;
  }
</style>

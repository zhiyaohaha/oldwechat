<template>
  <scroll>
    <div class="creditInvestigation">
      <header class="creditInvestigationHeader">
        <img src="./img/zhengxinbanner.png">
      </header>
      <div class="creditInvestigationContent">
        <nav class="header">
          <a href="javascript:;" @click="tabIsShow(false)">
            <img src="./img/tab_19gray.png" v-show="tabShow">
            <img src="./img/tab_19white.png" v-show="!tabShow">
          </a>
          <a href="javascript:;" @click="tabIsShow(true)">
            <img src="./img/tab_59gray.png" v-show="!tabShow">
            <img src="./img/tab_59white.png" v-show="tabShow">
          </a>
        </nav>
        <p class="describe">
          主要的客群是小额现金贷用户，关注有无风险信息的群体
        </p>
        <div class="report">
          <img src="./img/bg_gerenbaogao.png">
        </div>
        <div class="message">
          <img src="./img/bg_xinxichaxun.png">
        </div>
        <div>
          <img src="./img/bg_baogaoliucheng.png">
        </div>
        <div>
          <img src="./img/bg_anquanbaozhang.png">
        </div>
      </div>
      <footer class="creditInvestigationFooter">
        <button class="creditFooter" @click="inquire">
          立即查询
        </button>
      </footer>
    </div>
  </scroll>
</template>

<script>
  export default {
    name: "credit-investigation-page",
    data() {
      return {
        tabShow:false
      }
    },

    components: {},

    computed: {},

    mounted() {
    },

    methods: {
      //切换Tab
      tabIsShow(flag){
        this.tabShow = flag
      },
      //查询征询
      inquire(){
        const product = this.tabShow ? "ThirdProduct.TianxiaXinyong59":"ThirdProduct.TianxiaXinyong19"
        this.$store.commit("AWAITTRUE")
        this.$store.dispatch("getClickRecord",{
          product
        }).then((res)=>{
          this.$store.commit("AWAITFALSE")
          if(res.success){
            if(this.tabShow){
              window.location.href ="https://m.tianxiaxinyong.com/cooperation/crp-op/index.html?channel=RVdjMVM4N2ZkT2prTEZIcUxGd0xQQT09"
            }else {
              window.location.href = "https://m.tianxiaxinyong.com/cooperation/crp-op/index.html?channel=S2hpZTBqcmx1aW5FNGdLdk95a2tQQT09"
            }
          }else {
            this.MessageBox.alert(res.message,"错误提示")
          }
        })
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .creditInvestigation
    .creditInvestigationHeader
      img
        display inline-block
        width 100%
        vertical-align top
    .creditInvestigationContent
      height (2577/$rem)
      .header
        height (120/$rem)
        a
          height 100%
          float left
          text-align center
          line-height (120/$rem)
          font-size (42/$rem)
          color #333
          img
            display inline-block
            height 100%
            vertical-align top
        a:last-child
          margin-left (-40/$rem)
      .describe
        margin (60/$rem) 0
        box-sizing border-box
        padding 0 (30/$rem)
        font-size (40/$rem)
        color #333
      div
        img
          display inline-block
          width 100%
          vertical-align top

    .creditInvestigationFooter
      height (146/$rem)
      width 100%
      button
        width 100%
        height 100%
        background-color #EFCA7D
        color #ffffff
        font-size (46/$rem)
        border 0
</style>

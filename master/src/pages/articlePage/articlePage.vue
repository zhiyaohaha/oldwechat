<template>
  <div ref="articlePageWrap">
    <div class="articlePage" v-if="detailForApp">
      <header class="articlePageHeader">
        <p class="headerTitle">
          {{detailForApp.title}}
        </p>
        <div class="articleDescribe">
          <div class="timeAddress">
            <span class="source">peter来源:{{detailForApp.source}}</span>
            <span class="time">{{detailForApp.createdDate}}</span>
          </div>
          <div class="humanCount">
            <img src="./img/yuedu.png">
            <span>{{detailForApp.browseCount}}阅读</span>
          </div>
        </div>
      </header>
      <div class="detailForAppContent" v-html="detailForApp.content"></div>
      <!--<headline :headlineData="{line:true,title:'相关资讯'}"/>
      <strategyList :strategyListDatas="detailForApp.news"/>-->
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import strategyList from "../../components/strategyList/strategyList.vue"

  export default {
    name: "articlePage",
    data() {
      return {
      }
    },

    components: {
      strategyList,
    },

    computed: {
      ...mapState(["detailForApp"]),
    },
    watch:{
    },
    created() {
      this.$store.dispatch("getDetailForApp", {
        id: this.$route.query.id
      }).then(() => {
        this.__boxheight(this.$refs.articlePageWrap); //执行函数
        window.onresize = this.__boxheight(this.$refs.articlePageWrap); //窗口或框架被调整大小时执行
        this.$nextTick(() => {
          this.articlePageWrap = new this.BScroll(this.$refs.articlePageWrap, {
            click: true,
            bounce:false
          })
          this.articlePageWrap.refresh()
        })
      })
    },
    mounted() {

    },
    updated() {
    },
    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .articlePage
    box-sizing border-box
    padding 0 (30 /$rem)
    .articlePageHeader
      .headerTitle
        box-sizing border-box
        padding (60 /$rem) 0
        font-size (71 /$rem)
        color #333
        line-height (100 /$rem)
        word-wrap: break-word
    .articleDescribe
      font-size (36 /$rem)
      height (40 /$rem)
      color #bbbbbb
      .timeAddress
        float left
        width (615 /$rem)
        .source
          text-align left
          float left
        .time
          float right
      .humanCount
        float right
        width (208 /$rem)
        img
          float left
          width (52 /$rem)
        span
          float left
          margin-left (16 /$rem)

    .detailForAppContent
      padding (50/$rem) (25/$rem) (60/$rem)
      p
        font-size (50 /$rem) !important
        color #666 !important
        line-height (80/$rem) !important
      img
        width 100%
      span
        font-size (50/$rem) !important
</style>

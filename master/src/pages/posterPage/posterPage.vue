<template>
  <div class="posterPage" ref="posterWrap">
    <scroll>
      <div class="posterContent">
        <img :src="imgUrl[num]" class="bGI">
        <div class="switchoverImg" @click="switchoverImg">
          <span>换一种海报</span>
          <img src="./img/sanjiao.png">
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        imgUrl:[],
        num:0
      }
    },

    components: {},
    watch: {

    },
    computed: {

    },
    beforeCreate() {

    },
    created() {
      this.$store.dispatch("getPosters").then((res)=>{
        this.imgUrl = res.data.posterUrls
      })
    },
    mounted() {
      this.__boxheight(this.$refs.posterWrap)
    },

    methods: {
      switchoverImg() {
        this.num ++
        if(this.num > 1){
          this.num = 0
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">

  .posterPage
    height 100%
    .posterContent
      width 100%
      .bGI
        display inline-block
        width 100%
      .switchoverImg
        position absolute
        top 40px
        right 30px
        line-height (36 /$rem)
        span
          font-size (36 /$rem)
          color #fff
          text-decoration underline
        img
          width (18 /$rem)
          display inline-block
          vertical-align bottom
      .QRcode
        position absolute
        top (1310 /$rem)
        left 50%
        margin-left (-150 /$rem)
        width (300 /$rem)
        height (300 /$rem)
        img
          width 100%
          height 100%
</style>

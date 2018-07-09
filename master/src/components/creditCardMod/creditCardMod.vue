<template>
  <div v-if="creditCardModDatas">
    <ul class="creditCardModList">
      <li v-for="(creditCardModData, index) in creditCardModDatas" :key="index">
        <router-link to="/homePage/creditCardPage/cardDetailsPage">
          <img :src="creditCardModData._logo">
          <div class="creditCardDescribe">
            <span class="firstLine">{{creditCardModData.name}}</span>
            <span class="secondLine">预估额度：<span class="price">{{creditCardModData.limit}}</span></span>
            <a href="javascript:;" class="applyFor" @click.stop="$router.push(creditCardModData.applyForUrl)"></a>
          </div>
          <img class="fanyonglog" src="../../../static/img/homeImg/content_fanyong.png">
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["creditCardModDatas"],

    data () {
      return {}
    },

    components: {},

    computed: {},

    mounted(){},

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .creditCardModList
    li
      position relative
      box-sizing border-box
      border 1px solid #f4f4f4
      height (342 /$rem)
      a
        position relative
        width 100%
        height 100%
        .fanyonglog
          width (70/$rem)
          height (34/$rem)
          position absolute
          left (295/$rem)
          bottom (200/$rem)
        img
          margin (60 /$rem) (50 /$rem) (60 /$rem) (30 /$rem)
          float left
          width (352 /$rem)
        .creditCardDescribe
          position absolute
          top (66 /$rem)
          left (432 /$rem)
          right (30/$rem)
          bottom (40/$rem)
          .firstLine
            font-size (40 /$rem)
            color #333
          .secondLine
            display block
            margin-top (30 /$rem)
            font-size (36 /$rem)
            color #bbb
            .price
              color #efca7d
          .applyFor
            display block
            position absolute
            right 0
            bottom 0
            width (250 /$rem)
            height (90 /$rem)
            background-image url("./img/content_butten_lijishenqing_normal.png")
            background-repeat no-repeat
            background-size 100%
</style>

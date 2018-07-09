<template>
  <div v-if="recommendModDatas">
    <ul class="recommendMod">
      <li v-for="(recommend, index) in recommendModDatas" :key="index" :class="{recommendModTop: index != 0 }">
        <router-link :to="{name:'productDetailsPage',query: {id: recommend.id,applyCount:recommend.applyCount}}">
          <div class="recommendModLogo">
            <img :src="recommend.basic._logo">
          </div>
          <img class="fanyonglog" src="../../../static/img/homeImg/content_fanyong.png">
          <div class="recommendModDescribe">
            <span class="title">{{recommend.basic.name}}</span>
            <div class="rate">
              <span class="interest">月利率 ：{{
                toPercent(recommend.basic.monthlyRate_min)===toPercent(recommend.basic.monthlyRate_max)?
                toPercent(recommend.basic.monthlyRate_max):
                toPercent(recommend.basic.monthlyRate_min)+"-"+toPercent(recommend.basic.monthlyRate_max)
                }}</span>
            </div>
            <div class="describe">
              <span class="limit">额度 ：<span class="price">{{recommend.filter.amount_min + '-'+ recommend.filter.amount_max}}</span></span>
            </div>
            <span class="asSecondLine">{{recommend.summary}}</span>
          </div>
          <div class="recommendModRight">
            <span>已申请: {{recommend.applyCount}}人</span>
            <star :score="recommend.hot"/>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import star from "../../components/star/star.vue"
  export default {
    props: ['recommendModDatas'],

    data() {
      return {}
    },

    components: {
      star
    },

    computed: {},
    beforeCreate() {

    },
    mounted() {
    },

    methods: {

    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .recommendMod
    box-sizing border-box
    li
      position relative
      box-sizing border-box
      padding (50/$rem) (30/$rem) (40/$rem)
      border-bottom 1px solid #f2f2f2
      width (1080 /$rem)
      height (340/$rem)
      a
        width 100%
        height 100%
        .recommendModLogo
          float left
          width (150/$rem)
          height (150/$rem)
          img
            height 100%
            width 100%
        .fanyonglog
          position absolute
          left (124 /$rem)
          top (35 /$rem)
        .recommendModDescribe
          margin-top (10/$rem)
          margin-left (30/$rem)
          float left
          .title
            display block
            font-size (42 /$rem)
            color #333
            line-height (42 /$rem)
          .rate
            color #bbb
            font-size (36/$rem)
            margin-top (30/$rem)
            height (36/$rem)
            line-height (36/$rem)
          .describe
            display block
            margin-top (30 /$rem)
            font-size (34 /$rem)
            .limit
              font-size (36/$rem)
              color #333
              .price
                font-size (42 /$rem)
                color #efca7d
          .asSecondLine
            display block
            margin-top (30 /$rem)
            font-size (36 /$rem)
            color #bbb

        .recommendModRight
          float right
          &>span
            margin-top (150/$rem)
            display block
            font-size (36/$rem)
          .star
            margin-top (30/$rem)
</style>

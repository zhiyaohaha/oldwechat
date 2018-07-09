<template>
  <div v-if="strategyListDatas">
    <ul class="strategyList">
      <li v-for="(strategyListData, index) in strategyListDatas" :key="index">
        <router-link :to="{path:'/homePage/articlePage',query:{id:strategyListData.id}}">
          <div class="character">
            <span class="title">{{strategyListData.title}}</span>
            <span class="time">{{strategyListData.createdDate}}</span>
          </div>
          <img :src="strategyListData.banner">
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ["strategyListDatas"],
    data() {
      return {}
    },

    components: {},
    watch: {

    },
    computed: {},
    mounted() {

    },

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .strategyList
    width (1080 /$rem)
    li
      height (286 /$rem)
      box-sizing border-box
      padding (50 /$rem) (30 /$rem)
      border-bottom 1px solid #dddddd
      a
        height 100%
      .character
        position relative
        float left
        width (610 /$rem)
        height (182 /$rem)
        margin-top (2 /$rem)
        span
          display block
          &.title
            line-height (60/$rem)
            font-size (45 /$rem)
            color #515151
          &.time
            position absolute
            bottom 0
            left 0
            margin-top (28 /$rem)
            font-size (36 /$rem)
            color #bfbfbf
      img
        float right
        width (300 /$rem)
        height (186 /$rem)
</style>

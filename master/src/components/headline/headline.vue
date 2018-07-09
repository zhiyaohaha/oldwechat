<template>
  <div class="headline" :class="{line:headlineData.line}">
    <span>{{headlineData.title}}</span>
    <span class="more" v-if="headlineData.more" @click="$router.push(headlineData.url)">{{headlineData.more}} ></span>
    <span class="arrow fr" v-if="headlineData.arrow">
      箭头
    </span>
  </div>
</template>

<script>
  export default {
    props: ['headlineData'],
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
  .headline
    width (1080/$rem)
    box-sizing border-box
    height (126 /$rem)
    &.line
      border-bottom 1px solid #f2f2f2
    .arrow
      display block
      margin-right (30/$rem)
    span
      float left
      font-family "Microsoft YaHei"
      line-height (120 /$rem)
      font-size (46 /$rem)
      color #333
      margin-left (30 /$rem)
      &.more
        float right
        margin-right (30/$rem)
        font-size (36/$rem)
        color #bbb
</style>

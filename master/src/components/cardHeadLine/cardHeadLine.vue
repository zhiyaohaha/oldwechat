<template>
  <div class="cardHeadline">
    <span>{{cardHeadLineData.title}}</span>
    <a href="javascript:;">{{cardHeadLineData.aFont}}</a>
  </div>
</template>

<script>
  export default {
    props:["cardHeadLineData"],
    data () {
      return {

      }
    },

    components: {},

    computed: {},

    mounted(){},

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .cardHeadline
    box-sizing border-box
    width 100%
    height (131 /$rem)
    border-bottom 1px solid #f4f4f4
    span
      float left
      font-family "Microsoft YaHei"
      line-height (130 /$rem)
      font-size (45 /$rem)
      color #333
      margin-left (30 /$rem)
    a
      float right
      font-size (45/$rem)
      color: #8a8a8a;
      margin-right (45/$rem)
      margin-top (44/$rem)
</style>

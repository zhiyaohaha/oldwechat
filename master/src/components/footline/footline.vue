<template>
  <div class="footline">
    <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    props: ["title"],
    data() {
      return {}
    },

    components: {},

    computed: {},

    mounted() {
    },

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .footline
    width (1080 /$rem)
    height (120 /$rem)
    text-align center
    line-height (120 /$rem)
    span
      font-family "Microsoft YaHei"
      font-size (42 /$rem)
      color #bbb
</style>

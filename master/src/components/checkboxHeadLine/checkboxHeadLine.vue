<template>
  <div class="wrap">
    <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    props:["title"],
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
  .wrap
    width (1080/$rem)
    height (40/$rem)
    font-size (40/$rem)
    color #333
</style>

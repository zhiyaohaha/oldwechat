<template>
  <div class="awaitMod">
    <div class="await">
    </div>
  </div>
</template>

<script>
  export default {
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
  .awaitMod
    width 100%
    height 100%
    top 0
    left 0
    background-color rgba(0,0,0,0.3)
    position fixed
    z-index 4000
    .await
      position absolute
      width (173/$rem)
      height (173/$rem)
      left 50%
      top 50%
      margin-left -(86/$rem)
      margin-top -(86/$rem)
      background-image: url("./img/await.png")
      background-repeat no-repeat
      background-size 100%
      animation spin 1000ms infinite linear
  @keyframes spin
    0%
      transform rotate(0deg)
    100%
      transform rotate(360deg)
</style>

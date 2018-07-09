<template>
  <div class="stars clear">
    <span class="star" v-for="c in starClasses" :class="c"></span>
  </div>
</template>

<script>
  const CLASS_ON = 'on'
  const CLASS_OFF = 'off'

  export default {
    props: {
      score: Number,
    },

    // 3.5: 3 + 1 + 1
    // 3.4: 3 + 0 + 2
    computed: {
      starClasses () {
        const scs = []

        const score = this.score
        const integerScore = Math.floor(score/20)

        // 向数组中添加CLASS_ON
        for (let i = 0; i < integerScore; i++) {
          scs.unshift(CLASS_ON)
        }
        // 向数组中添加CLASS_OFF
        while(scs.length<5) {
          scs.unshift(CLASS_OFF)
        }

        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .stars
    display inline-block
    position relative
    top -1
    .star
      float right
      background-repeat no-repeat
      background-size 100% 100%
      width (38/$rem)
      height (38/$rem)
      margin-right (6/$rem)
      &.on
        background-image url("./img/huangse.png")
      &.off
        background-image url("./img/huise.png")
</style>

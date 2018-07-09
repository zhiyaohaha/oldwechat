<template>
  <div class="split" :class="{splitHeight:splitHeight}"></div>
</template>

<script>
  export default {
    props:["splitHeight"]
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .split
    width: 100%
    height: (30/$rem)
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background: #f4f4f4
    &.splitHeight
      height (50/$rem)
</style>

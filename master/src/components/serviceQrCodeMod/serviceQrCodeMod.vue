<template>
  <div class="serviceQrCodeMod" @click.self="isShow">
    <div class="box" @click.stop>
      <div class="boxTitle">请扫码添加客服进行提现</div>
      <img src="./img/kefuerweima.jpg" class="boxImg">
      <span class="footer">自动提现即将上线，敬请期待</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "service-qr-code-mod",
    props:["isShow"],
    data() {
      return {}
    },

    components: {},

    computed: {},

    mounted() {
    },

    methods: {
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .serviceQrCodeMod
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 3000
    background-color rgba(0, 0, 0, 0.3)
    .box
      width (1020 /$rem)
      height (894 /$rem)
      background-color #ffffff
      position absolute
      top (350 /$rem)
      left (30 /$rem)
      border-radius (20 /$rem)
      .boxTitle
        margin-top (84 /$rem)
        font-size (42 /$rem)
        color #333
        text-align center
      .boxImg
        width (600 /$rem)
        height (600 /$rem)
        margin (72 /$rem) auto 0
        box-sizing border-box
        border (1/$rem) solid #f2f2f2
      .footer
        display block
        margin-top (5/$rem)
        width 100%
        text-align center
        color #bbbbbb
        font-size (36/$rem)
</style>

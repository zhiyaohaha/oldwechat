<template>
  <div class="customerService">
    <!--<header class="customerServiceHeader">
      &lt;!&ndash;<img src="../../../static/img/myImg/kefu_yuantouxiang.png">
      <span>掌金超客服多多</span>&ndash;&gt;
    </header>-->
    <div class="customerServiceContent">
      <h1 class="title">如需咨询请扫码联系客服</h1>
      <img src="./img/kefuerweima.jpg" class="erweima">
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: "customer-service-page",
    data() {
      return {}
    },

    components: {

    },

    computed: {
      ...mapState(["userName"])
    },

    mounted() {
    },

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .customerService
    position fixed
    width 100%
    height 100%
    .customerServiceContent
      h1
        position absolute
        /*top (354/$rem)*/
        top 10%
        width 100%
        text-align center
        font-size (50/$rem)
      .erweima
        width (880/$rem)
        height (880/$rem)
        position absolute
        left 50%
        top 50%
        margin (-440/$rem) 0 0 (-440/$rem)
</style>

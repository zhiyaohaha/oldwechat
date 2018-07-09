<template>
  <div class="redEnvelopeMod" @click.self="redEnvelopeModIsShow(false)">
    <div class="redEnvelopeModCentre">
      <button class="receive" @click="receive">立即领取</button>
      <p class="activityRule" @click="redEnvelopeModIsShow(true)">活动规则</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: "red-envelope-mod",
    props: {
      redEnvelopeModIsShow: {
        type: Function,
        default: null
      }
    },
    data() {
      return {}
    },

    components: {},

    computed: {
      ...mapState(["hasPayPassword"])
    },

    mounted() {
    },

    methods: {
      receive() {
        this.redEnvelopeModIsShow(false)
        let whether = this.getCookie("whether") * 1
        if (whether < 3 || !this.hasPayPassword) {
          this.$store.commit("OPENREDPACKETMODSHOW",true)
          this.$router.push({name: "tieOnCardPage"})
        } else {
          this.$store.commit("AWAITTRUE")
          this.$store.dispatch("getRedPack").then((res)=>{
            this.$store.commit("AWAITFALSE")
            if(res.success){

              this.$router.push({name:"WithdrawalPage"})
            }else {
              this.MessageBox.alert(res.message,"提示")
            }
          })
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .redEnvelopeMod
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background-color rgba(0, 0, 0, .3)
    z-index 100
    .redEnvelopeModCentre
      position absolute
      top (380 /$rem)
      left 50%
      width (840 /$rem)
      height (1035 /$rem)
      margin-left (-420 /$rem)
      background-image url("./img/hongbao_close.png")
      background-repeat no-repeat
      background-size 100%
      .receive
        width (490 /$rem)
        height (120 /$rem)
        position absolute
        top (785 /$rem)
        left 50%
        margin-left (-245 /$rem)
        background-color #efca7d
        font-size (48 /$rem)
        color #fff
        border-radius (120 /$rem)
      .activityRule
        position absolute
        bottom (30 /$rem)
        color #ccc
        width 100%
        text-align center
        font-size (36 /$rem)
</style>

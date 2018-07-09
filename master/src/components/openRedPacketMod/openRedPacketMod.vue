<!--红包打开-->
<template>
  <div class="openRedPacketMod" @click = "close">
    <div class="openRedPacketContent">
      <h2 class="title">掌金超专享现金红包</h2>
      <div class="imgWrap">
        <p class="money">
          {{awardMoney}}<span class="unit">元</span>
        </p>
      </div>
      <button class="commission" @click="$router.push({name:'generalizePage'})">赚佣金</button>
      <p class="hint">仅限掌金超新用户</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: "openRedPacketMod",
    props:["close"],
    data(){
      return{
      }
    },
    comments:{},
    computed:{
      ...mapState(["awardMoney"])
    },
    mounted(){

    },
    methods:{
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .openRedPacketMod
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0,0,0,0.3)
    z-index 1000
    .openRedPacketContent
      position absolute
      width (920/$rem)
      height (1090/$rem)
      top (258/$rem)
      left 50%
      margin-left (-460/$rem)
      background-color #fff
      border-radius (20/$rem)
      .title
        width 100%
        font-size (48/$rem)
        margin (70/$rem) 0 (50/$rem)
        text-align center
      .imgWrap
        position relative
        width (640/$rem)
        height (621/$rem)
        background-image url("img/hongbao_open.png")
        background-repeat no-repeat
        background-size 100%
        margin 0 auto
        .money
          position absolute
          width 100%
          text-align center
          top (284/$rem)
          font-size (90/$rem)
          color #f14d44
          .unit
            font-size (40/$rem)
      .commission
        display block
        width (490/$rem)
        height (120/$rem)
        background-color #efca7d
        font-size (48/$rem)
        color #fff
        margin (50/$rem) auto (72/$rem)
        border-radius (120/$rem)
      .hint
        font-size (30/$rem)
        color #bbb
        text-align center
</style>

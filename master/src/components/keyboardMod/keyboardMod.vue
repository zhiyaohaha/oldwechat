<template>
  <div class="keyboard" @click.self = "press({content:'a'})">
    <div class="keyboardContent">
      <ul class="keyboardList">
        <li v-for="(it,index) in numArr" @touchstart.stop="press(it)" @touchend.stop= "letGo(it)">
          {{it}}
        </li>
      </ul>
      <ul class="affirmList">
        <li v-for="(it,index) in affirmList" :key="index"  @touchstart.stop="press(it)" @touchend.stop= "letGo(it)" :class="{active:it.active}">
          <img :src="it.content" v-if="it.content.length > 2">
          <span v-if="it.content.length === 2">{{it.content}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: "keyboard-mod",
    props:{
      press: {
        type: Function,
        default: null
      },
      letGo: {
        type: Function,
        default: null
      },
    },
    data() {
      return {
        numArr: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "x",
          "0",
          ".",
        ],
        affirmList: [
          {
            content:"../../../static/img/keybpardImg/shezhitixianmima_icon_delete1.png",
            active:false
          },
          {
            content:"完成",
            active:false
          },
        ]
      }
    },

    components: {},

    computed: {},

    mounted() {

    },

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .keyboard
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    z-index 10
    background rgba(0,0,0,.3)
    .keyboardContent
      position absolute
      background-color #ffffff
      width 100%
      height (680 /$rem)
      bottom 0
      left 0
      .keyboardList
        float left
        width (810 /$rem)
        height 100%
        li
          box-sizing border-box
          border (1 /$rem) solid #f2f2f2
          text-align center
          line-height (170 /$rem)
          width (270 /$rem)
          height (170 /$rem)
          float left
      .affirmList
        float left
        li:first-child
          background-color #e2e2e2
          img
            display inline-block
            width (96/$rem)
        li
          text-align center
          line-height (340/$rem)
          width (270 /$rem)
          height (340 /$rem)
          span
            font-size (48/$rem)
            color #333
          &.active
            background-color  #cccccc
</style>

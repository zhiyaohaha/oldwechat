<template>
  <div class="pickerMod">
    <div class="shadeIsShowHeader">
      <span @click="choose(false)" class="cancel">
        取消
      </span>
      <span @click="choose(true)" class="ascertain">
        确定
      </span>
    </div>
    <div class="pickerWrap" ref="pickerWrap" v-if="pickerModDatas">
      <ul class="pickerModList">
        <li v-for="(pickerModData, index) in pickerModDatas" :key="index"
            :class="{select:index===select}" ref="pickerSingle">
          {{pickerModData.name||pickerModData.text||pickerModData}}
        </li>
      </ul>
    </div>
    <div class="pickerModListStamp"></div>
  </div>
</template>

<script>
  export default {
    props: ['pickerModDatas', 'shadeIsShow', "onValuesChange", 'closeShow'],
    data() {
      return {
        select: 0,
      }
    },

    components: {},

    computed: {

    },
    watch: {
      shadeIsShow(val) {
        if (val === 3) {
          this.pickerWrap = new this.BScroll(this.$refs.pickerWrap, {
            momentum: false,
            stopPropagation: true,
            probeType: 1
          })
          this.pickerWrap.refresh()
          if(this.select){
            let a = this.$refs.pickerSingle[0].clientHeight
            this.pickerWrap.scrollTo(0, a * -this.select, 100)
          }

          this.pickerWrap.on("touchEnd", (pos) => {
            let a = this.$refs.pickerSingle[0].clientHeight
            let b = Math.round(pos.y / a)   //当前选中元素的索引下标
            this.pickerWrap.scrollTo(0, a * b, 100)
            if (-b > this.pickerModDatas.length - 1) {
              this.select = this.pickerModDatas.length - 1
            } else if (-b < 0) {
              this.select = 0
            } else {
              this.select = -b
            }
          })
        } else {
          this.pickerWrap && this.pickerWrap.destroy()
        }
      },
      pickerModDatas(val,newVal){
        this.select = 0
        this.pickerWrap&&this.pickerWrap.scrollTo(0, 0, 100)
      }
    },
    mounted() {
    },
    updated() {
    },
    methods: {
      //确定取消
      choose(flag) {
        if (flag) {
          this.onValuesChange(this.select)
          this.closeShow()
        } else {
          this.closeShow()
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .pickerMod
    position relative
    width (1080 /$rem)
    .shadeIsShowHeader
      font-size (42 /$rem)
      height (120 /$rem)
      line-height (120 /$rem)
      .cancel
        margin-left (59 /$rem)
        float left
        color #bbb
      .ascertain
        margin-right (50 /$rem)
        float right
        color #efca7d
    .pickerWrap
      overflow hidden
      height (554 /$rem)
      .pickerModList
        padding-top (184 /$rem)
        padding-bottom (276 /$rem)
        li
          font-size (42 /$rem)
          width (1080 /$rem)
          height (92 /$rem)
          text-align center
          line-height (92 /$rem)
          color #ddd
          transition color 0.2s
          &.select
            color #333
    .pickerModListStamp
      position absolute
      top (305 /$rem)
      left (0)
      z-index -1
      width (1080 /$rem)
      height (92 /$rem)
      text-align center
      border-top (1 /$rem) solid #dddd
      border-bottom (1 /$rem) solid #ddd

</style>

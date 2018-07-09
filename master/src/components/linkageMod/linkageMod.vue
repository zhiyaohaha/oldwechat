<template>
  <div class="linkageModDatas" v-if="linkageModDatas.length">
    <div class="shadeIsShowHeader">
      <span @click="choose(false)" class="cancel">
        取消
      </span>
      <span @click="choose(true)" class="ascertain">
        确定
      </span>
    </div>
    <div class="linkageWrap" ref="linkageWrap">
      <ul class="linkageModDatas">
        <li v-for="(province, ind) in linkageModDatas" :key="ind" class="province"
            ref="pickerSingle" :class="{select1:select1 === ind}">
          {{province.text||province.b}}
        </li>
      </ul>
    </div>
    <div class="citiesWrap" ref="citiesWrap">
      <ul class="citiesList">
        <li v-for="(city, index) in cities" :key="index" class="city" :class="{pitchOn:pitchOn === index}">
          {{city.text||city.b}}
        </li>
      </ul>
    </div>

    <div class="selectLine"></div>
  </div>
</template>

<script>
  export default {
    props: ['linkageModDatas', 'mformDatasInd', 'onValuesChange', 'closeShow'],
    data() {
      return {
        select1: 0,
        pitchOn: 0
      }
    },

    components: {},

    computed: {
      cities() {
        let c = []
        if (this.linkageModDatas[this.select1]) {
          c = this.linkageModDatas[this.select1].childrens||this.linkageModDatas[this.select1].c
        } else {
          c = []
        }
        return c
      }
    },
    watch: {
      mformDatasInd(val) {
        console.log(val);
        if (val === 4) {
          let a = this.$refs.pickerSingle[0].clientHeight
          /*this.select1 = 0
          this.pitchOn = 0*/
          this.linkageWrap = new this.BScroll(this.$refs.linkageWrap, {
            momentum: false,
            probeType: 1
          })
          this.linkageWrap.refresh()
          this.citiesWrap = new this.BScroll(this.$refs.citiesWrap, {
            momentum: false,
            probeType: 1
          })
          if(this.select1){
            this.linkageWrap.scrollTo(0, a * -this.select1, 100)
          }
          if(this.pitchOn){
            this.citiesWrap.scrollTo(0, a * -this.pitchOn, 100)
          }
          this.citiesWrap.on("touchEnd", (pos) => {
            let b = Math.round(pos.y / a)
            this.citiesWrap.scrollTo(0, a * b, 100)
            if (-b > this.cities.length - 1) {
              this.pitchOn = this.cities.length - 1
            } else if (-b < 0) {
              this.pitchOn = 0
            } else {
              this.pitchOn = -b
            }
          })
          this.linkageWrap.on("touchEnd", (pos) => {
            let b = Math.round(pos.y / a)
            this.linkageWrap.scrollTo(0, a * b, 100)
            if (-b > this.linkageModDatas.length - 1) {
              this.select1 = this.linkageModDatas.length - 1
            } else if (-b < 0) {
              this.select1 = 0
            } else {
              this.select1 = -b
            }
            let obj=this.linkageModDatas[this.select1].childrens||this.linkageModDatas[this.select1].c;
            this.pitchOn > obj.length - 1 ? this.pitchOn = 0 : null
            this.pitchOn > obj.length-1? this.pitchOn=0:null
           // this.onValuesChange(this.select1, this.pitchOn)
          })
        } else {
          this.linkageWrap && this.linkageWrap.destroy()
        }
      },
      cities(val) {
        if (this.mformDatasInd === 4) {
          let a = this.$refs.pickerSingle[0].clientHeight
          let b = 0
          this.citiesWrap.destroy()
          this.citiesWrap = new this.BScroll(this.$refs.citiesWrap, {
            momentum: false,
            probeType: 1
          })
          this.citiesWrap.refresh()
          this.citiesWrap.on("touchEnd", (pos) => {
            b = Math.round(pos.y / a) || 0
            this.citiesWrap.scrollTo(0, a * b, 100)
            if (-b > this.cities.length - 1) {
              this.pitchOn = this.cities.length - 1
            } else if (-b < 0) {
              this.pitchOn = 0
            } else {
              this.pitchOn = -b
            }
          })
        } else {
          this.citiesWrap && this.citiesWrap.destroy()
          this.pitchOn = 0
        }
      },
      select1(val) {
        this.pitchOn = 0
        this.citiesWrap.refresh()
      },

    },
    created() {

    },
    mounted() {
    },
    updated() {
    },
    methods: {
      choose(flag) {
        if (flag) {
          this.onValuesChange(this.select1, this.pitchOn)
          this.closeShow()
        } else {
          this.closeShow()
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .linkageModDatas
    width (1080 /$rem)
    font-size (42 /$rem)
    overflow hidden
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
    .linkageWrap
      float left
      overflow hidden
      height (554 /$rem)
      width 50%
      .linkageModDatas
        width 100%
        padding-top (184 /$rem)
        padding-bottom (276 /$rem)
        li
          color #bbb
          height (92 /$rem)
          text-align center
          line-height (92 /$rem)
          &.select1
            color #333
    .citiesWrap
      overflow hidden
      height (554 /$rem)
      width 50%
      float right
      .citiesList
        width 100%
        padding-top (184 /$rem)
        padding-bottom (276 /$rem)
        li
          height (92 /$rem)
          text-align center
          line-height (92 /$rem)
          color #bbbb
          &.pitchOn
            color #333
    .selectLine
      position absolute
      z-index -1
      width 100%
      top (300 /$rem)
      left 0
      height (92 /$rem)
      border-top (1 /$rem) solid #ddd
      border-bottom (1 /$rem) solid #ddd
</style>

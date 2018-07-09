<template>
  <div class="arrowContentMod">
    <div class="headline" :class="{line:headData.line}">
      <span>{{headData.title}}</span>
      <span class="arrow fr" v-if="headData.arrow" @touchstart="changeShow(headData)">
        <img src="../../../static/img/basics/arrow_03.png" alt="箭头" class="transition" :class="{rotate180:!isShow}">
      </span>
    </div>
    <div ref="applyForConditionParent"   class="applyForCondition transition" :class="{height0:!isShow}">
      <ul class="applyForList" ref="applyForCondition" >
        <li v-for="(data, index) in datas"
            :key="index">
          <span>{{data}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex"
  export default {
    name: "arrowContentMod",
    props: ["datas", "headData"],
    data() {
      return {
        isShow: true,
        html:"aaa"
      }
    },

    components: {},
    computed: {
      ...mapState([]),
    },
    watch: {},
    created() {
    },
    mounted() {

    }
    ,
    updated() {

    }
    ,
    methods: {
      changeShow(obj) {
        if(this.$refs.applyForConditionParent.offsetHeight !=0){
          let applyForCondition = this.$refs.applyForCondition;
          this.$refs.applyForConditionParent.style.height= applyForCondition.offsetHeight + "px"
        }
        this.isShow = !this.isShow
        this.$store.commit("UPDATEPAGE")
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .applyForCondition
    box-sizing border-box
    border-bottom 1px solid #f2f2f2
    overflow hidden

  .applyForList
    padding (30 /$rem)  (30 /$rem)
    font-size (36 /$rem)
    color #bbbbbb
    li span
      display inline-block
      line-height (56 /$rem)

  .headline
    box-sizing border-box
    height (126 /$rem)
    &.line
      border-bottom 1px solid #f2f2f2
    .arrow
      display block
      width (60/$rem)
      text-align center
      margin-right (30 /$rem)
      img
        width (30/$rem)
        height (30/$rem)
        line-height (126 /$rem)
        display inline-block
        vertical-align center
    span
      float left
      font-family "Microsoft YaHei"
      line-height (120 /$rem)
      font-size (46 /$rem)
      color #333
      margin-left (30 /$rem)
      &.more
        float right
        margin-right (30 /$rem)
        font-size (36 /$rem)
        color #bbb
</style>

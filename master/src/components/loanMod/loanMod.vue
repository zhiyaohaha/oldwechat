<template>
  <div class="loanMod">
    <header class="loanModHeader">
      贷款
    </header>
    <ul class="loanModList">
      <li v-for="(loanMod,index) in loanModDatas" :key="index">
        <router-link :to="loanMod.aUrl">
          <img :src="loanMod.imgUrl">
          <span>{{loanMod.title}}</span>
        </router-link>
      </li>
    </ul>
    <img class="fanyonglog" src="../../../static/img/homeImg/content_fanyong.png">
  </div>
</template>

<script>
  export default {
    props: ["loanModDatas"],
    data() {
      return {}
    },

    components: {},

    computed: {},

    mounted() {
    },

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .loanMod
    position absolute
    top (-84 /$rem)
    left (144 /$rem)
    width (792 /$rem)
    height (340 /$rem)
    background-color #fff
    border-radius (20 /$rem)
    box-shadow 0 0 (64/$rem) rgba(0 , 0, 0, 0.19)
    transform translateZ(0)
    .loanModHeader
      box-sizing border-box
      height (96 /$rem)
      width 100%
      font-size (46 /$rem)
      padding (40 /$rem) 0 (10/$rem) (40 /$rem)
    .loanModList
      width 100%
      height (254/$rem)
      box-sizing border-box
      padding 0 (156/$rem)
      li:last-child
        float right
      li
        float left
        box-sizing border-box
        a
          height 100%
          width 100%
          img
            width (136/$rem)
            height (136/$rem)
            margin-left (12/$rem)
          span
            display block
            color #333
            margin-top (20/$rem)
            font-size (40/$rem)
    .fanyonglog
      position absolute
      left (150/$rem)
      bottom (102/$rem)
</style>

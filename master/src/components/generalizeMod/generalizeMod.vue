<template>
  <div class="generalizeMod">
    <headline :headlineData="generalizeModData.name" class="headline"/>
    <ul class="generalizeModList">
      <li v-for="(generalizeModData, index) in generalizeModData.datas" :key="index" :class="{'icon':index === 0}">
        <router-link :to="generalizeModData.url">
          <img :src="generalizeModData.imgUrl">
          <span>{{generalizeModData.title}}</span>
        </router-link>
      </li>
    </ul>
    <img class="fanyonglog" src="../../../static/img/homeImg/content_fanyong.png">
  </div>
</template>

<script>
  export default {
    props: ["generalizeModData"],
    data () {
      return {}
    },

    components: {
    },

    computed: {},

    mounted(){},

    methods: {
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .generalizeMod
    position relative
    height (304/$rem)
  .generalizeModList
    box-sizing border-box
    width 100%
    border-bottom 1px #f2f2f2
    display flex
    padding 0 (90/$rem)
    justify-content: space-between
    li
      position relative
      box-sizing border-box
      width (174/$rem)
      height (148 /$rem)
      a
        text-align center
        position absolute
        top 0
        left 0
        height 100%
        width 100%
        img
          display inline-block
          width (96/$rem)
          height (96/$rem)
        span
          display block
          margin-top (20/$rem)
          font-size (32/$rem)
  .fanyonglog
    position absolute
    left (182/$rem)
    bottom (160/$rem)
</style>

<template>
  <div class="checkboxMod" v-if="checkboxListDatas">
    <ul class="checkboxList">
      <li v-for="(item, index) in checkboxListDatas" :key="index" @click="imgIsShow(index)">
        <div>
          <img src="./img/xaunze.png" v-show="item.imgShow">
          <img src="./img/weixuan.png" v-show="!item.imgShow">
          <span :class="{checkboxFont:item.imgShow}">{{item.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:["checkboxListDatas"],
    data () {
      return {

      }
    },

    components: {},

    computed: {},

    mounted () {},

    methods: {
      imgIsShow(index){
        this.checkboxListDatas[index].imgShow = !this.checkboxListDatas[index].imgShow
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .checkboxMod
    .checkboxList
      box-sizing border-box
      display flex
      justify-content space-between
      flex-wrap: wrap
      padding 0 (32 /$rem)
      li
        flex: 1
        box-sizing border-box
        padding-top (44 /$rem)
        width 33.33%
        min-width: 33.33%
        max-width: 33.33%
        height (130 /$rem)
        font-size (42 /$rem)
        div
          overflow hidden
          img
            float left
            width (40 /$rem)
            height (40 /$rem)
          span
            float left
            margin-left (20 /$rem)
            color #333
            &.checkboxFont
              margin-left (20 /$rem)
              color #efca7d
</style>

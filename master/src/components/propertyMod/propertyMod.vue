<template>
  <div class="propertyMod">
    <ul class="propertyModList">
      <li v-for="(propertyModData, index) in propertyModDatas" :key="index" @touchstart="pitchOn(index)">
        <div>
          <img src="./img/xaunze.png" v-show="propertyModData.imgUrlIsShow">
          <img src="./img/weixuan.png" v-show="!propertyModData.imgUrlIsShow">
          <span :class="{pitchOnFont:propertyModData.imgUrlIsShow}">{{propertyModData.character}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:["propertyModDatas"],
    data () {
      return {
      }
    },

    components: {},

    computed: {},

    mounted(){
    },

    methods: {
      pitchOn(index){
        this.propertyModDatas[index].imgUrlIsShow = !this.propertyModDatas[index].imgUrlIsShow
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .propertyMod
    overflow hidden
    .propertyModList
      li
        box-sizing border-box
        position relative
        width (300/$rem)
        height (100/$rem)
        float left
        margin (20/$rem) (40/$rem) (20/$rem) 0
        border-radius (20/$rem)
        text-align center
        div
          line-height (100/$rem)
          overflow hidden
          position absolute
          left (30/$rem)
          img
            float left
            margin-top (30/$rem)
            width (41/$rem)
            height (40/$rem)
          span
            float left
            margin-left (20/$rem)
            vertical-align: middle
            color #bbb
            font-size (36/$rem)
            &.pitchOnFont
              color #efca7d
</style>

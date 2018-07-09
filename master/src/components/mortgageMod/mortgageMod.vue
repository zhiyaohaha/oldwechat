<template>
  <div class="mortgageMod">
    <ul class="mortgageModList">
      <li v-for="(item,index) in mortgageModDatas" :key="index">
        <router-link :to="item.url">
          <img :src="item.imgUrl">
          <span>{{item.name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "mortgageMod",
    props:["mortgageModDatas"],
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
  .mortgageMod
    .mortgageModList
      height (246/$rem)
      border (1/$rem) solid #f2f2f2
      li
        box-sizing border-box
        float left
        width 50%
        height 100%
        text-align center
        border (1/$rem) solid #f2f2f2
        a
          display inline-block
          margin-top (50/$rem)
          vertical-align middle
          img
            width (100/$rem)
            height (72/$rem)
            margin 0 auto
          span
            margin-top (30/$rem)
            display block
            font-size (42/$rem)
            color #333
</style>

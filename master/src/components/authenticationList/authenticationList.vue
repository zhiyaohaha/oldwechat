<template>
  <div>
    <ul :class="{authenticationList: authenticationListDatas.length > 2,authenticationListFloat:authenticationListDatas.length<3}">
      <li v-for="(authenticationListData, index) in authenticationListDatas" :key="index">
        <img :src="authenticationListData._icon">
        <span>{{authenticationListData.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["authenticationListDatas"],
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
  .authenticationList
    box-sizing border-box
    display -webkit-flex
    display flex
    padding 0 (66 /$rem)
    justify-content: space-between
    border-bottom 1px solid #f2f2f2
    width (1080 /$rem)
    height (246 /$rem)
    li
      margin-top (40 /$rem)
      font-size (36 /$rem)
      color #515151
      text-align center
      img
        display inline-block
        height (100 /$rem)
      span
        display block
        margin-top (30 /$rem)
  .authenticationListFloat
    width (1080/$rem)
    height (246/$rem)
    box-sizing border-box
    padding (40/$rem) (66/$rem)
    li
      float left
      font-size (36 /$rem)
      margin-right (160/$rem)
      text-align center
      img
        height (100/$rem)
      span
        display block
        margin-top (30/$rem)
</style>

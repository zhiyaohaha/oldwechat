<template>
  <div class="detailsMessageMod">
    <ul class="messageList">
      <li v-for="(detailsMessageData, index) in detailsMessageDatas" :key="index">
        <div class="describe">{{detailsMessageData.describe}}</div>
        <span class="price">{{detailsMessageData.price}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:["detailsMessageDatas"],
    data () {
      return {

      }
    },

    components: {},

    computed: {},

    mounted(){},

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .detailsMessageMod
    .messageList
      box-sizing border-box
      width (1080/$rem)
      height (476/$rem)
      padding-left (30/$rem)
      padding-top (10/$rem)
      li
        overflow hidden
        height (42/$rem)
        margin-top (30/$rem)
        font-size (42/$rem)
        color #333
        .describe
          float left
          text-align justify
          width (180/$rem)
        .describe:after
          content: ""
          padding-left: 100%;
          display: inline-block
        .price
          float left
          margin-left (60/$rem)
          color #bbb
</style>

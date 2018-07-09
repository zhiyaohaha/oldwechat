<template>
  <div class="headChoicePage">
    <ul class="ChoiceList">
      <li v-for="(it, index) in headChoicePageDatas" :key="index" @click="skip(it)">
        <span class="title">
          {{it.title}}
        </span>
        <img :src="it.imgUrl" v-if="it.imgUrl">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "head-choice-page",
    data() {
      return {
        headChoicePageDatas:[
          {
            title:"个人信息",
            imgUrl:"../../../static/img/generalizeImg/content_icon_more_normal.png",
            url:{name:"personalDataPage"}
          },
          {
            title:"设置密码",
            url:{name:"tieOnCardPage"}
          },
        ]
      }
    },

    components: {
    },

    computed: {},

    mounted() {
    },

    methods: {
      skip(it){
        this.$router.push(it.url)
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .headChoicePage
    .ChoiceList
      box-sizing border-box
      padding 0 (30/$rem)
      li
        height (120/$rem)
        box-sizing border-box
        border-bottom (1/$rem) solid #f2f2f2
        font-size (42/$rem)
        line-height (120/$rem)
        overflow hidden
        .title
          color #333
          float left
        .message
          color #bbb
          float right
        img
          float right
          width (25/$rem)
          height (50/$rem)
          margin-top (35/$rem)
</style>

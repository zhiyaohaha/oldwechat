<template>
  <div class="bankInquireMod">
    <ul class="allBankList">
      <li v-for="(allBankListData, index) in allBankListDatas" :key="index">
        <router-link :to="allBankListData.url">
          <img :src="allBankListData.imgUrl">
          <span>{{allBankListData.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:["allBankListDatas"],
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
  .bankInquireMod
    .allBankList
      overflow hidden
      width (1080/$rem)
      li
        box-sizing border-box
        float left
        width 25%
        text-align center
        img
          display inline-block
          width (136/$rem)
          height (136/$rem)
        span
          display block
          font-size (36/$rem)
          color #333
          margin-top (30/$rem)
</style>

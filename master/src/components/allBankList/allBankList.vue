<template>
  <div class="allBankListMod" v-if="allBankListDatas">
    <ul class="allBankList">
      <li v-for="(allBankListData, index) in allBankListDatas" :key="index" @click="redirect(allBankListData)">
        <img :src="allBankListData._icon">
        <span>{{allBankListData.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["allBankListDatas"],
    data() {
      return {}
    },

    components: {},

    computed: {},

    mounted() {
    },

    methods: {
      redirect(item) {
        this.$router.push({
          path: '/homePage/creditCardPage/zhongXinCardPage',
          query: {
            name: item.name,
            id:item.id
          }
        })
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .allBankListMod
    .allBankList
      overflow hidden
      width (1080 /$rem)
      li
        box-sizing border-box
        float left
        width 25%
        text-align center
        padding-top (50 /$rem)
        img
          display inline-block
          width (136 /$rem)
          height (136 /$rem)
        span
          display block
          font-size (36 /$rem)
          color #333
          margin-top (30 /$rem)
</style>

<template>
  <div class="drawMoney" v-if="drawMoneyDatas">
    <ul class="drawMoneyList">
      <li v-for="(drawMoneyData, index) in drawMoneyDatas" :key="index">
        <div class="state">
          <div class="up left">
            <span>{{drawMoneyData.createdDate}} </span>
            <span class="appearance"> 申请提现</span>
          </div>
          <div class="down">
            <span class="appearance">提现状态 : </span>
            <span>{{drawMoneyData._tradeState}}</span>
          </div>
        </div>
        <div class="describe">
          <div class="up right">
            <span class="appearance">提现金额 : </span>
            <span class="price">{{drawMoneyData.value}}</span>
            <span class="unit">元</span>
          </div>
          <div class="down" v-if="lowerShow">
            <span class="appearance">失败原因 : </span>
            <span>{{drawMoneyData.resultRemark}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:{
      drawMoneyDatas:{
        type:Array,
        default:null
      },
      lowerShow:{
        type:Boolean,
        default:false
      }
    },
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
  .drawMoney
    width (1080 /$rem)
    .drawMoneyList
      box-sizing border-box
      padding 0 (30 /$rem)
      li
        box-sizing border-box
        height (200 /$rem)
        border-bottom 1px solid #f2f2f2
        padding (45 /$rem) 0 (35 /$rem)
        color #bbbbbb
        .state
          float left
        .describe
          float right
          .up
            .appearance,.unit
              color #333
        .up
          font-size (34 /$rem)
        .down
          margin-top (48 /$rem)
          font-size (36 /$rem)
        .left
          color #bbb
        .right
          line-height (34 /$rem)
          text-align right
          .appearance
            float left
        .price
          font-size (42 /$rem)
          color #efca7d
</style>

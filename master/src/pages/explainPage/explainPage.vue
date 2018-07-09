<template>
  <div class="explainPage">
    <explainMod :datas="explainData"/>
  </div>
</template>
<script>
  import explainMod from "../../components/explainMod/explainMod"
  export default {
    name: "explain-page",
    data() {
      return {
        explainData:[
          "账户余额可提现到银行卡",
          "提交提现申请后1-3个工作日内到账，如有问题联系客服",
          "提现金额最少15元，最多不超过500元支持两位小数",
          "每笔提现将收取2元手续费，从提现部分直接扣除",
          "提现开放时间为每日9：00-17:00点",
          "每日提现仅限一次",
          "解释权以平台为准"
        ]
      }
    },

    components: {
      explainMod
    },

    computed: {},

    mounted() {
    },

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
</style>

<template>
  <div class="activityRulesPage">
    <explainMod :datas="data"/>
  </div>
</template>

<script>
  import explainMod from "../../components/explainMod/explainMod"
  export default {
    name: "activityRulesPage",
    data(){
      return {
        data:[
          "此活动自注册日起7日有效;",
          "新用户在'新人红包'活动页面,有机会获得随机面额红包一个,红包金额最高99元;",
          "同一微信账户、身份证、手机号、手机设备。符合以上任一条件,均视为同一用户;",
          "如果用户出现违规行为,掌金超有权对其进行相关处罚,必要时追究法律责任;",
          "如有其他疑问,请联系掌金超客服进行咨询;"
        ]
      }
    },
    components:{
      explainMod
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      this.$store.commit("MAXREDPACK",true)
      next()
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus">

</style>

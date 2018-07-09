<template>
  <div class="activityContent" @click.self="close">
    <div class="container">
      <h3 class="title">六一大额返现活动通知</h3>
      <div class="content">
        <p>亲爱的掌金超用户:</p>
        <p>掌金超六一期间返现活动继续！</p>
        <p>活动期间，掌金超被邀请的新用户注册后可获得随机面额现金红包1个，现金红包金额最高99元，红包可立即领取至微信钱包内，红包自发放日起7日内领取有效。
          每成功邀请一个新注册用户且成功领取新人红包，奖励邀请人5元现金，直接累加在您的账户余额中。
          数量有限，发完为止。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "activityInformMod",
    props:["close"],
    data(){
      return{
        active:true
      }
    },
    comments:{},
    computed:{},
    mounted(){

    },
    methods:{
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .activityContent
    position fixed
    top 0
    left 0
    z-index 4000
    background-color rgba(0, 0, 0, 0.3)
    width 100%
    height 100%
    .container
      width (920 /$rem)
      height (960 /$rem)
      background-color #ffffff
      position absolute
      top (380 /$rem)
      left (80 /$rem)
      border-radius (20 /$rem)
      color #333
      .title
        margin-top (90/$rem)
        text-align center
        font-size (46/$rem)
        margin-bottom (40/$rem)
      .content
        font-size (40/$rem)
        box-sizing border-box
        padding 0 (50/$rem)
        p
          line-height 1.8em




</style>

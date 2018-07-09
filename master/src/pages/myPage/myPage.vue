<template>
  <div class="myPage">
    <keep-alive>
      <router-view v-if="!$route.meta.cache"/>
    </keep-alive>
    <router-view v-if="$route.meta.cache"/>
    <div v-if="$route.meta.keepAlive&&userName">
      <header class="myPageHeader">
        <div class="headPortrait">
          <router-link :to="{name:'headChoicePage'}">
            <img :src="readTodos().headimgurl||'../../../static/img/myImg/touxiang.png'">
          </router-link>
        </div>
        <div class="userDescription">
          <span class="petName">{{readTodos().nickname||userName}}</span>
          <span class="individual">个人代理</span>
        </div>
        <div class="brokerage">
          <router-link to="/homePage/generalizePage">我要赚佣金</router-link>
        </div>
      </header>
        <div class="myPageContent" v-if="income">
          <router-link to="/myPage/depositPage">
            <div class="generalIncome">
              <span class="describe">累计收入</span>
              <span class="unit">￥<span class="price">{{income.totalBalance}}元</span></span>
            </div>
            <div class="withdrawDeposit">
              <span class="describe">账户余额</span>
              <span class="unit">￥<span class="price">{{income.withdrawBalance}}元</span></span>
            </div>
          </router-link>
        </div>
      <myParticulars :myParticularsDatas="myParticularsDatas"/>
    </div>
  </div>
</template>

<script>
  import myParticulars from '../../components/myParticulars/myParticulars.vue'
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        myParticularsDatas: [
          {
            imgUrl: '../../../static/img/myImg/wode_content_icon_tuiguangmingxi.png',
            title: '推广明细',
            url: '/myPage/generalizeYiPage'
          },
          /*{
            imgUrl: '../../../static/img/myImg/wode_content_icon_tixianmingxi.png',
            title: '快速贷款历史',
            url: '/myPage/quickenLoansHistoryPage'
          },*/
          {
            imgUrl: '../../../static/img/myImg/wode_content_icon_dingdanmingxi.png',
            title: '订单明细',
            url: '/myPage/orderFormPage'
          },
          {
            imgUrl: '../../../static/img/myImg/wode_content_icon_fanyongmingxi.png',
            title: '返佣明细',
            url: '/myPage/rebatePage'
          },
          {
            imgUrl: '../../../static/img/myImg/wode_content_icon_tixian.png',
            title: '提现',
            url: '/myPage/WithdrawalPage'
          },
         /* {
            imgUrl: '../../../static/img/myImg/wode_content_icon_tixianmingxi.png',
            title: '提现明细',
            url: '/myPage/depositPage'
          },*/
          {
            imgUrl: '../../../static/img/myImg/wode_content_icon_yijianfankui.png',
            title: '意见反馈',
            url: '/myPage/feedbackPage'
          },
          {
            imgUrl: '../../../static/img/myImg/wode_content_icon_customer-service.png',
            title: '客服',
            url: '/myPage/customerServicePage'
          },
          /*{
            imgUrl: '../../../static/img/myImg/wode_content_icon_collection.png',
            title: '收藏',
            url: '/myPage/customerServicePage'
          },*/
        ],
      }
    },

    components: {
      myParticulars
    },

    computed: {
      ...mapState(["userName", "serviceQrCodeShow", "income"])
    },
    watch: {
      $route(to, from) {
        if (to.name === "myPage") {
          window.history.pushState(null, "", "#/homePage")
          window.history.pushState(null, "", "#/myPage")
          this.$store.dispatch("getAccountInfo")
        }
      }
    },
    beforeCreate() {

    },
    created() {
      this.$store.dispatch("getAccountInfo")
    },
    mounted() {
      if (this.$route.name === "myPage") {
        window.history.pushState(null, "", "#/homePage")
        window.history.pushState(null, "", "#/myPage")
      }
    },
    methods: {

      //返回事件
      isShow() {
        this.$store.commit("QRCODEISSHOW", false)
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .myPage
    position relative
    .myPageHeader
      box-sizing border-box
      background-image url("../../../static/img/myImg/wodde_banner.png")
      background-repeat no-repeat
      background-size: 100%
      width (1080 /$rem)
      height (550 /$rem)
      padding (40 /$rem) (30 /$rem) 0
      .headPortrait
        float left
        width (140 /$rem)
        height (140 /$rem)
        a
          width 100%
          height 100%
          img
            width 100%
      .userDescription
        box-sizing border-box
        float left
        margin-top (10 /$rem)
        margin-left (30 /$rem)
        color #ffffff
        span
          display: block
        .petName
          font-size (42 /$rem)
        .individual
          margin-top (20 /$rem)
          font-size (40 /$rem)
      .brokerage
        float right
        width (250 /$rem)
        height (90 /$rem)
        border-radius (15 /$rem)
        background-color #EFCA7D
        margin-top (40 /$rem)
        text-align center
        line-height (90 /$rem)
        a
          font-size (43 /$rem)
          color #ffffff
    .myPageContent
      box-sizing border-box
      position absolute
      width (790 /$rem)
      height (230 /$rem)
      top (460 /$rem)
      left (145 /$rem)
      padding 0 (105 /$rem)
      background-color: #fff;
      border-radius (10 /$rem)
      box-shadow 0 0 (64 /$rem) rgba(0, 0, 0, 0.19)
      z-index 1
      div
        box-sizing border-box
        float left
        text-align center
        width (289 /$rem)
        margin-top (60 /$rem)
        span
          font-size (34 /$rem)
          &.describe
            display block
            font-size (40 /$rem)
          &.unit
            text-align bottom
          &.price
            margin-top (30 /$rem)
            font-size (42 /$rem)
            color #efca7d
</style>

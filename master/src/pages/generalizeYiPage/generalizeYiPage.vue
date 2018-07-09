<template>
  <div class="generalizeYiPage">
    <transition name="reveal">
      <router-view/>
    </transition>
    <scroll class="wrapper"
            :data="subordinateUserList||[]"
            :pullup="true"
            :windowHeight="false"
            @scrollToEnd="loadData"
            v-if="subordinateNum">
      <div v-show="$route.meta.isTop&&subordinateNum">
        <header class="generalizePageHeader">
          <div class="headPortrait">
            <img :src="readTodos().headimgurl||'../../../static/img/myImg/touxiang.png'">
          </div>
          <div class="userDescription">
            <span class="petName" v-if="readTodos().nickname||userName">{{readTodos().nickname||userName}}</span>
            <span class="individual">个人代理</span>
          </div>
          <div class="agencyNum">
            <span class="describe">代理总数:</span>
            <span class="price">{{subordinateNum.totleSubordinateNum}}</span>
            <span class="unit">人</span>
          </div>
        </header>
        <div class="generalizeYiContent">
          <a href="javascript:;" class="generalIncome">
            <span class="describe">一级代理</span>
            <span class="price">{{subordinateNum.subordinateNum}}</span>
            <span class="unit">人</span>
          </a>
          <a href="javascript:;" class="withdrawDeposit">
            <span class="describe">二级代理</span>
            <span class="price">{{subordinateNum.supersubordinateNum}}</span>
            <span class="unit">人</span>
          </a>
          <a href="javascript:;" class="withdrawDeposit">
            <span class="describe">三级代理</span>
            <span class="price">{{subordinateNum.thirdLevelNum}}</span>
            <span class="unit">人</span>
          </a>
        </div>
        <div class="embezzlement"></div>
        <div>
          <usersListMod :usersListDatas="subordinateUserList" class="usersListMod"/>
          <footline :title="footerTitle"/>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import usersListMod from "../../components/usersListMod/usersListMod.vue"
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        footerTitle: "查看更多",
        startY: 0
      }
    },

    components: {
      usersListMod
    },

    computed: {
      ...mapState(["subordinateNum", "userName"]),
      subordinateUserList: {
        get() {
          return this.$store.state.subordinateUserList
        },
        set() {

        }
      }
    },
    watch: {
      subordinateUserList(val) {
        if (val.length > 0) {
          this.footerTitle = "查看更多"
        }
      }
    },
    beforeCreate() {
    },
    created() {
      this.$store.dispatch("getSubordinateNum", {
        thirdLoginType: "ThirdPlatForm.WeChat",
        userId: ""
      })
      if (!this.subordinateUserList) {
        this.$store.dispatch("getSubordinateUserList", {
          thirdLoginType: "ThirdPlatForm.WeChat",
          userId: "",//不传则获取登录人的信息，传则获取传入人的信息
          id: "",//第一次不用传，以后传最后一条Id
          size: 10,//每页数量
        })
      }
    },
    mounted() {
      if (!this.subordinateUserList || this.subordinateUserList.length < 1) {
        this.footerTitle = "暂无数据"
      }
    },
    updated() {
    },
    methods: {
      //记录跳转
      loadData() {
        let that = this, time
        if (this.footerTitle === "加载中" || this.footerTitle === "没有更多数据啦") {
          return
        } else if (this.footerTitle === "查看更多") {
          this.footerTitle = "加载中"
          this.$store.dispatch("getSubordinateUserList", {
            thirdLoginType: "ThirdPlatForm.WeChat",
            userId: "",//不传则获取登录人的信息，传则获取传入人的信息
            id: that.subordinateUserList[that.subordinateUserList.length - 1].id,//第一次不用传，以后传最后一条Id
            size: 10,//每页数量
          }).then((result) => {
            console.log(result)
            if (result.length > 1) {
              time = setTimeout(() => {
                this.$store.commit("NEWERSUBORDINATEUSERLIST", {result})
                this.footerTitle = "查看更多"
                clearTimeout(time)
              }, 500)
            } else {
              time = setTimeout(() => {
                this.footerTitle = "没有更多数据啦"
                clearTimeout(time)
              }, 500)
            }
          })
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .generalizeYiPage
    background-color #ffffff
    position relative
    .reveal-enter-active {
      transition: all .3s;
    }
    .reveal-enter {
      transform: translate3d(100%, 0, 0)
    }
    .embezzlement
      width 100%
      height (150 /$rem)
    .generalizePageHeader
      background-image url("../../../static/img/generalizeImg/wodde_banner.png")
      background-repeat no-repeat
      background-size 100%
      position relative
      width (1080 /$rem)
      height (550 /$rem)
      color #fff
      .headPortrait
        float left
        width (140 /$rem)
        height (140 /$rem)
        margin (40 /$rem) 0 0 (30 /$rem)
        img
          width 100%
      .userDescription
        box-sizing border-box
        float left
        margin-left (30 /$rem)
        padding (50 /$rem) 0 (55 /$rem)
        span
          display: block
        .petName
          font-size (42 /$rem)
        .individual
          margin-top (20 /$rem)
          font-size (40 /$rem)
      .agencyNum
        position absolute
        right (30 /$rem)
        top (112 /$rem)
        font-size (40 /$rem)
        span
          &.price
            color #efca7d
    .generalizeYiContent
      position absolute
      background-color #ffffff
      top (460 /$rem)
      left (50%)
      width (790 /$rem)
      height (230 /$rem)
      box-sizing border-box
      padding 0 (80 /$rem)
      border-radius (10 /$rem)
      margin-left (-395 /$rem)
      display flex
      flex-wrap wrap
      justify-content space-between
      align-items: center;
      z-index 1
      box-shadow 0 0 (62 /$rem) rgba(0, 0, 0, 0.19)
      a
        text-align center
        span
          color #333
          &.describe
            display block
            font-size (40 /$rem)
            margin-bottom (15 /$rem)
          &.price
            font-size (42 /$rem)
            color #efca7d
          &.unit
            font-size (34 /$rem)
</style>

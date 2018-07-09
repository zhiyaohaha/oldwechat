<template>
  <div class="generalizeSanMod">
    <scroll class="wrapper"
            :data="sanSubordinateUserList||[]"
            :pullup="true"
            :windowHeight="false"
            @scrollToEnd="loadData" v-if="sanSubordinateUserList">
      <div>
        <header class="generalizeErPageHeader" v-if="sanSubordinateNum">
          <div class="headPortrait">
            <img :src="sanSubordinateNum.head||'../../../static/img/myImg/touxiang.gif'">
          </div>
          <div class="userDescription">
            <span class="petName">{{sanSubordinateNum.nickName||'微信昵称 ( 我的一级代理 )'}}</span>
            <span class="individual">个人代理</span>
          </div>
          <div class="agencyNum">
            <span class="describe">代理总数:</span>
            <span class="price">{{sanSubordinateNum.totleSubordinateNum}}</span>
            <span class="unit">人</span>
          </div>
        </header>
        <usersListMod :usersListDatas="sanSubordinateUserList" :icon="true" :san="true"/>
        <footline :title="footlineTitle"/>
      </div>
    </scroll>

  </div>
</template>

<script>
  import usersListMod from "../../components/usersListMod/usersListMod.vue"
  import {mapState} from "vuex"

  export default {
    name: "generalize-san-page",
    props:[
      "generalizeSanModIsShow",
      "userId"
    ],
    data() {
      return {
        footlineTitle: "查看更多",
      }
    },

    components: {
      usersListMod
    },

    computed: {
      ...mapState(["sanSubordinateNum"]),
      sanSubordinateUserList: {
        get() {
          return this.$store.state.sanSubordinateUserList
        },
        set() {

        }
      }

    },
    watch: {
      sanSubordinateUserList(val) {
        if (val.length > 0) {
          this.footlineTitle = "查看更多"
        }
      }
    },
    created() {
      let that = this
      this.$store.dispatch("getSubordinateNum", {
        thirdLoginType: "ThirdPlatForm.WeChat",
        userId: that.userId,
        san:true
      })
      this.$store.dispatch("getSubordinateUserList", {
        thirdLoginType: "ThirdPlatForm.WeChat",
        userId: that.userId,//不传则获取登录人的信息，传则获取传入人的信息
        id: "",//第一次不用传，以后传最后一条Id
        size: 10,//每页数量
        san:true
      })
    },
    mounted() {
      let that = this
      this.pushHistory()
      window.addEventListener("hashchange", that.goBack, false)
      if (!this.sanSubordinateUserList || this.sanSubordinateUserList < 1) {
        this.footlineTitle = "暂无数据"
      }
    },
    updated() {
    },
    methods: {
      //三级返回事件
      goBack(){
        let that = this
        this.generalizeSanModIsShow(false)
        window.removeEventListener("hashchange", that.goBack, false)
      },
      loadData() {
        let that = this, time
        if (this.footlineTitle === "查看更多") {
          this.footlineTitle = "加载中"
          this.$store.dispatch("getSubordinateUserList", {
            thirdLoginType: "ThirdPlatForm.WeChat",
            userId: that.userId,//不传则获取登录人的信息，传则获取传入人的信息
            id: that.sanSubordinateUserList[that.sanSubordinateUserList.length - 1].id,//第一次不用传，以后传最后一条Id
            size: 10,//每页数量
          }).then((res) => {
            if (res.length > 0) {
              time = setTimeout(() => {
                this.sanSubordinateUserList.push(...res)
                this.footlineTitle = "查看更多"
                clearTimeout(time)
              }, 500)
            } else {
              time = setTimeout(() => {
                this.footlineTitle = "没有更多数据啦"
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
  .generalizeSanMod
    position fixed
    top 0
    left 0
    z-index 1
    width 100%
    height 100%
    background #ffffff
    .generalizeErPageHeader
      box-sizing border-box
      background-image url("../../../static/img/generalizeImg/wodde_banner.png")
      background-repeat no-repeat
      background-size 100%
      position relative
      color #ffffff
      width (1080 /$rem)
      height (550 /$rem)
      border-bottom 1px solid #bbbbbb
      padding (40 /$rem) (30 /$rem) 0
      .headPortrait
        float left
        width (140 /$rem)
        height (140 /$rem)
        img
          width 100%
      .userDescription
        float left
        margin-top (10 /$rem)
        margin-left (30 /$rem)
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
        span
          font-size (40 /$rem)
          &.price
            color #efca7d
</style>


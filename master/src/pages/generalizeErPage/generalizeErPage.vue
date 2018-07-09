<template>
  <div>
    <scroll class="wrapper"
            :data="erSubordinateUserList||[]"
            :pullup="true"
            :windowHeight="false"
            @scrollToEnd="loadData" v-if="erSubordinateUserList">
      <div>
        <header class="generalizeErPageHeader" v-if="erSubordinateNum">
          <div class="headPortrait">
            <img :src="erSubordinateNum.head||'../../../static/img/myImg/touxiang.gif'">
          </div>
          <div class="userDescription">
            <span class="petName">{{erSubordinateNum.nickName||'微信昵称 ( 我的一级代理 )'}}</span>
            <span class="individual">个人代理</span>
          </div>
          <div class="agencyNum">
            <span class="describe">代理总数:</span>
            <span class="price">{{erSubordinateNum.totleSubordinateNum}}</span>
            <span class="unit">人</span>
          </div>
        </header>
        <usersListMod :usersListDatas="erSubordinateUserList" :generalizeSanModIsShow="generalizeSanModIsShow" :icon="true"/>
        <footline :title="footlineTitle"/>
      </div>
    </scroll>
    <transition name="change">
      <generalizeSanMod :generalizeSanModIsShow="generalizeSanModIsShow" :userId="userId" v-if="generalizeSanModShow"/>
    </transition>
  </div>
</template>

<script>
  import usersListMod from "../../components/usersListMod/usersListMod.vue"
  import generalizeSanMod from "../../components/generalizeSanMod/generalizeSanMod.vue"
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        footlineTitle: "查看更多",
        generalizeSanModShow: false,
        userId:null
      }
    },

    components: {
      usersListMod, generalizeSanMod
    },

    computed: {
      ...mapState(["erSubordinateNum"]),
      erSubordinateUserList: {
        get() {
          return this.$store.state.erSubordinateUserList
        },
        set() {

        }
      }

    },
    watch: {
      erSubordinateUserList(val) {
        if (val.length > 0) {
          this.footlineTitle = "查看更多"
        }
      }
    },
    created() {
      let that = this
      this.$store.dispatch("getSubordinateNum", {
        thirdLoginType: "ThirdPlatForm.WeChat",
        userId: that.$route.query.id
      })
      this.$store.dispatch("getSubordinateUserList", {
        thirdLoginType: "ThirdPlatForm.WeChat",
        userId: that.$route.query.id,//不传则获取登录人的信息，传则获取传入人的信息
        id: "",//第一次不用传，以后传最后一条Id
        size: 10,//每页数量
      })
    },
    mounted() {

      if (!this.erSubordinateUserList || this.erSubordinateUserList < 1) {
        this.footlineTitle = "暂无数据"
      }
    },
    updated() {
    },
    methods: {
      //三级列表显示
      generalizeSanModIsShow(flag,it){
       this.generalizeSanModShow = flag
        if(flag){
          this.userId = it.id
          document.title = "我的三级代理"
        }else {
          document.title = "我的二级代理"
        }
      },
      loadData() {
        let that = this, time
        if (this.footlineTitle === "查看更多") {
          this.footlineTitle = "加载中"
          this.$store.dispatch("getSubordinateUserList", {
            thirdLoginType: "ThirdPlatForm.WeChat",
            userId: that.$route.query.id,//不传则获取登录人的信息，传则获取传入人的信息
            id: that.erSubordinateUserList[that.erSubordinateUserList.length - 1].id,//第一次不用传，以后传最后一条Id
            size: 10,//每页数量
          }).then((res) => {
            if (res.length > 0) {
              time = setTimeout(() => {
                this.erSubordinateUserList.push(...res)
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
  .change-enter-active ,.change-leave-to{
    transition: all .3s;
  }
  .change-enter ,.change-leave-to{
    transform: translate3d(100%, 0, 0)
  }
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

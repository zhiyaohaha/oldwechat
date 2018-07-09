<template>
  <div class="verification" @click.stop="changeShow">
    <div class="verificationContent" @click.stop>
      <div class="verificationTitle">
        请填写图片验证码
      </div>
      <div class="verificationMessage">
        <div class="verificationImg" @click.stop="touchstartMap">
          <img :src="verification">
        </div>
        <input type="text" placeholder="输入验证码"
               v-model="validateCode"
               name="verification">
      </div>
      <div class="verificationFooter">
        <div class="verificationFooterLeft" @click.stop.self="verificationCancel(false)">取消</div>
        <div class="verificationFooterRight" @click.stop.self="verificationCancel(true,validateCode)">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    //verificationCancel 发送事件
    //changeShow 点击隐藏事件
    props: ["changeShow", "verificationCancel"],
    data() {
      return {
        validateCode: "",
      }
    },

    components: {},
    watch: {
      __newGuid(val) {
        console.log(1)
      }
    },
    computed: {
      ...mapState(["time"]),
      key: {
        get() {
          return this.$store.getters.key
        },
        set() {

        }
      },

      verification() {
        let url = this.apiPrefix + "api/OfficialAccounts/ValidateCode?key="
        let src = url + this.key + this.time
        return src
      },

    },

    mounted() {
    },

    methods: {
      touchstartMap() {
        this.$store.dispatch("changeTime")
      },
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .verification
    top 0
    left 0
    position fixed
    width (1080 /$rem)
    height 100%
    background-color rgba(159, 159, 159, 0.7)
    z-index 3000
    .verificationContent
      position absolute
      top 50%
      left 50%
      margin-top (-225 /$rem)
      margin-left (-432 /$rem)
      width (864 /$rem)
      height (450 /$rem)
      background-color #fff
      border-radius (20 /$rem)
      .verificationTitle
        text-align center
        margin-top (40 /$rem)
        font-size (46 /$rem)
        color #333
        font-weight 500
      .verificationMessage
        width (864 /$rem)
        height (228 /$rem)
        .verificationImg
          margin-top (70 /$rem)
          margin-left (184.5 /$rem)
          float left
          img
            width (250 /$rem)
        input
          margin-top (70 /$rem)
          box-sizing border-box
          float left
          outline: none
          margin-left (45 /$rem)
          border 2px solid #bbb
          font-size (36 /$rem)
          height (87.5 /$rem)
          width (200 /$rem)
      .verificationFooter
        box-sizing border-box
        width (864 /$rem)
        height (136 /$rem)
        border-top 1px solid #bbbbbb
        font-size (46 /$rem)
        background-color: #efca7d;
        div
          float left
          width 50%
          height 100%
          text-align center
          line-height (136 /$rem)
          &.verificationFooterLeft
            color #fff
          &.verificationFooterRight
            color #fff
</style>

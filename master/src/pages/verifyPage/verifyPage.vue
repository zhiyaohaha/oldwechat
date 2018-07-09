<template>
  <div>
    <header class="verifyHeader">
      <img src="../../../static/img/homeImg/xinyongkabanner.png">
    </header>
    <div class="verifyContent">
      <ul class="mform">
        <li>
          <span class="description">验证码：</span>
          <input type="number" v-model="authCode"
                 placeholder="请输入短信验证码"
                 maxlength="4"
                 name="authCode">
          <a href="javascript:;" class="sendMsg"
             @click="sendMsg">
            {{units}}
          </a>
        </li>
      </ul>
      <a href="javascript:;" class="protocol">
        <img src="./img/xaunze.png" v-show="imgIsShow" @touchstart="notarize">
        <img src="./img/weixuan.png" v-show="!imgIsShow" @touchstart="notarize">
        <span>我已阅读并同意《XXXXXX协议》</span>
      </a>
      <a href="javascript:;" class="authentication" @click="skipDeposit">
        立即认证
      </a>
    </div>
    <verification v-show="verificationShow" :changeShow="changeShow" :verificationCancel="verificationCancel"/>
  </div>
</template>

<script>
  import verification from "../../components/verification/verification.vue"
  import {MessageBox} from  "mint-ui"
  export default {
    data () {
      return {
        authCode:"",
        reg:/^\d{0,4}$/,
        verificationShow:false,
        imgIsShow:true,
        units:"获取验证码",
        time:new Date().getTime()
      }
    },

    components: {
      verification
    },

    computed: {
    },

    mounted(){

    },

    methods: {
      //跳转逻辑
      skipDeposit(){
        let that = this
        this.$store.dispatch("postFiveRealVerifyCode",{
          id:that.$route.query.id,
          verifyCode:that.authCode
        }).then((res)=>{
          if(res.success){
            this.$router.replace({name:that.$route.params.name})
          }
        })
        if(this.reg.test(this.authCode)){
          this.$store.dispatch("postFiveRealVerifyCode",{
            id:that.$route.query.id,
            verifyCode:that.authCode
          }).then((res)=>{
            if(res.success){
              this.setCookie("whether",2,7)
              this.$router.replace({name:that.$route.params.name})
            }else {
              this.MessageBox({
                title: '提交失败',
                message: res.message,
                showCancelButton: false
              })
            }
          })
        }
      },
      notarize(){
        this.imgIsShow = !this.imgIsShow
      },
//      图形验证码
      changeShow(){
        this.verificationShow = false
      },
      sendMsg(){
        this.verificationShow = true
        if(this.num && this.num > 0){
          this.verificationShow = false
          MessageBox({
            title: '提示',
            message: '请60秒后在请求验证码',
            showCancelButton: false
          })
        }
      },
      verificationCancel(flag){
        this.verificationShow = false
        this.$store.dispatch("changeTime")
        if(flag){
          this.num = 60
          let timer = setInterval(()=>{
            this.num--
            if (this.num < 1){
              this.units = "获取验证码"
              clearInterval(timer)
              this.num = null
            }else {
              if(flag){
                this.units = this.num + "s后重发"
              }
            }
          },1000)
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">


  .verifyHeader
    width (1080 /$rem)
    height (520 /$rem)
    img
      width 100%
  .verifyContent
    .mform
      margin: 0 (30 /$rem)
      li
        box-sizing border-box
        position relative
        line-height (120 /$rem)
        width (1020 /$rem)
        height (120 /$rem)
        font-size (42 /$rem)
        border-bottom 1px solid #f2f2f2
        text-align right
        span
          color #333333
        .description
          float left
        input
          font-size (42 /$rem)
          outline: none
          border: none
          text-align right
          margin-right (20 /$rem)
          width (540 /$rem)
          caret-color #000
          color #333
        input:
        :-moz-placeholder
          text-align right
          color #bbbbbb
        input:
        :-webkit-input-placeholder
          text-align right
          color #bbbbbb
        input:-ms-input-placeholder
          text-align right
          color #bbbbbb
        .sendMsg
          border-radius (15/$rem)
          float right
          margin-top (17 /$rem)
          width (290 /$rem)
          height (86 /$rem)
          background-color #bbb
          color #ffffff
          line-height (86 /$rem)
          text-align center
    .protocol
      box-sizing border-box
      height (300 /$rem)
      width (1080 /$rem)
      text-align center
      padding-top (200/$rem)
      img
        display inline-block
        width (40 /$rem)
        vertical-align middle
      span
        font-size (36 /$rem)
        color #333333
    .authentication
      width (996 /$rem)
      height (146 /$rem)
      background-color #efca7d
      color #ffffff
      font-size (56 /$rem)
      text-align center
      line-height (146 /$rem)
      margin 0 auto
      border-radius (20 /$rem)

</style>

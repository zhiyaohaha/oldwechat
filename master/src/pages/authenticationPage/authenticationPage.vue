<template>
  <div class="authentication">
    <header class="authenticationHeader">
      <p>本次操作需要短信确认，请输入</p>
      <p>{{mobilePhone}}收到的短信验证码</p>
    </header>
    <div class="authenticationContent">
      <p class="import">
        <span>验证码:</span><input name="authCode"
                                type="number"
                                v-model="authCode"
                                placeholder = "请输入验证码"
                                @input = "goodInput(authCode)"
      />
        <button class="sendMsg" :class="{color:!num}" @click="sendMsg">
          {{sendMsgText}}
        </button>
      </p>
      <button class="submit" @click="submit">下一步</button>
    </div>
    <transition name="fade">
      <verification :changeShow="changeShow" :verificationCancel="verificationCancel" v-show="verificationShow"/>
    </transition>
  </div>
</template>

<script>
  import verification from '../../components/verification/verification.vue'
  import {mapState,mapGetters} from "vuex"
  export default {
    name: "authentication-page",
    data() {
      return {
        sendMsgText:"获取验证码",
        num: 0,
        authCode: "",
        verificationShow:false
      }
    },

    components: {
      verification
    },

    computed: {
      mobilePhone(){
        let mobilePhone = ""
        if(this.$route.name === "authenticationPage"){
          mobilePhone= this.$route.query.mobile
          mobilePhone = mobilePhone.substr(0, 3)+"******"+mobilePhone.substr(9)
        }
        return mobilePhone
      },
      ...mapState(["time","fuyou"]),
      ...mapGetters(["key"])
    },

    watch:{
    },
    mounted() {
      window.history.pushState(null, "title", "#/myPage")
      window.history.pushState(null, "title", `#/authenticationPage`)
    },

    methods: {
      //定时器
      __countDown(){
        this.num = 60
        let time
        time = setInterval(()=>{
          this.num--
          if(this.num === 0){
            this.sendMsgText = "重发验证码"
            this.num = 0
            clearInterval(time)
          }else {
            this.sendMsgText = this.num + "s后重发"
          }
        },1000)
      },
      //短信
      __phoneNote(code) {
        let that = this
        this.$store.commit("AWAITTRUE")
        this.$store.dispatch('postSendMsg', {
          code: 'SMS_123669047',
          mobilePhone:that.$route.query.mobile,
          validateKey: that.key + that.time,
          validateCode: code,
          needvalidateCode: true,
          smsSign: "掌金超"
        }).then((res) => {
          this.$store.commit("AWAITFALSE")
          if(res.success){
            this.MessageBox.alert("短信验证码已发送，5分钟内有效","提示")
            this.__countDown()
          }else {
            this.MessageBox.alert(res.message,"提交失败")
          }
        })
      },
      //输入限制
      goodInput(val){
        if(val.length > 4){
          this.authCode = val.substring(0, val.length - 1)
        }
      },
      //提交
      submit() {
        let regular = new RegExp(/[0-9]/),that = this
        if(this.authCode === ""){
          this.MessageBox.alert("请输入验证码")
          return
        }
        if(!regular.test(this.authCode)){
          this.MessageBox.alert("请正确输入验证码")
          return
        }
        this.$store.commit("AWAITTRUE")
        this.$store.dispatch("getVerifyCode",{
          templateCode: "SMS_123669047",//重置密码验证码SMS_123798930，四要素验证码SMS_123669047
          mobile:that.$route.query.mobile, //手机号
          code:that.authCode  //验证码
        }).then((res)=>{
          this.$store.commit("AWAITFALSE")
          if(res.success){
            this.$store.commit("CITYCODE",true)
            if(!this.fuyou){
              this.setCookie("whether",3,7)
              this.$router.replace({name:"setPasswordPage"})
            }else{
              this.$store.commit("FUYOU",false)
              this.$router.replace({name:"WithdrawalPage",query:{addBankCard:true}})
            }
          }else {
            this.MessageBox.alert(res.message,"失败")
          }
        })
      },
      //获取验证码
      sendMsg(){
        if(this.num > 0){
          this.MessageBox.alert("60s后在重新获取验证码","提示")
          return
        }
        this.verificationShow = true
      },
      //图形验证码的按钮
      verificationCancel(flag,code){
        this.verificationShow = false
        if(flag){
          this.__phoneNote(code)
        }
        this.$store.dispatch("changeTime")
      },
    // 点击遮罩层的掩盖
      changeShow(){
        this.verificationShow = false
        this.$store.dispatch("changeTime")
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .authentication
    .authenticationHeader
      box-sizing border-box
      padding (90 /$rem) 0
      text-align center
      font-size (36 /$rem)
      color #bbb
      p:last-child
        margin-top (20 /$rem)
    .authenticationContent
      button
        outline: none
        border: none
      .import
        padding 0 (30 /$rem)
        height (120 /$rem)
        font-size (42 /$rem)
        border-bottom (1 /$rem) solid #f2f2f2
        color #333
        line-height (120 /$rem)
        input
          outline: none
          border: none
          text-align right
          margin-left (40 /$rem)
          margin-right (20 /$rem)
          width (520 /$rem)
          font-size (42 /$rem)
          color #333
        input:
        :-moz-placeholder
          font-size (42 /$rem)
          color #bbbbbb
        input:
        :-webkit-input-placeholder
          font-size (42 /$rem)
          color #bbbbbb
        input:-ms-input-placeholder
          font-size (42 /$rem)
          color #bbbbbb
        .sendMsg
          border-radius (20 /$rem)
          width (290 /$rem)
          height (86 /$rem)
          background-color #cdcdcd
          color #ffffff
          font-size (36 /$rem)
          line-height (86 /$rem)
          text-align center
          &.color
            background-color #efca7d
      .submit
        display block
        margin (60 /$rem) auto 0
        width (996 /$rem)
        height (146 /$rem)
        text-align center
        line-height (146 /$rem)
        background-color #efca7d
        border-radius (15 /$rem)
        color #fff
        font-size (48 /$rem)
        outline: none
        border: none
    .fade-enter-active, .fade-leave-active {
      transition: all .5s;
    }
    .fade-enter, .fade-leave-active {
      transform: translate3d(100%,0, 0)
    }
</style>

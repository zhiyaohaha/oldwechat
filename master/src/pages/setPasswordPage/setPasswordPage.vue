<template>
  <div class="setPassword">
    <header class="setPasswordHeader">
      <p class="account" v-if="verify">请为账号{{mobilePhone.substr(0, 3)+"******"+mobilePhone.substr(9)}}</p>
      <p class="passwordText" v-if="verify">设置六位数的提现密码</p>
      <p class="verify" v-if="!verify">请再次输入</p>
    </header>
    <ul class="setPasswordContent" @click="keyboardIsShow">
      <li v-for="(it,index) in passwordCase" :key="index">
        <div class="dot" v-show="it.show"></div>
      </li>
    </ul>
    <p class="reminder" v-if="verify">提现密码不能重复、连续数字</p>
    <footer class="setPasswordFooter" v-if="!verify">
      <button class="submit" :class="{active:submitColor}" @click="submit">下一步</button>
    </footer>
    <transition name="fade">
      <keyboardMod :press="press" :letGo="letGo" v-show="keyboardShow"/>
    </transition>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import keyboardMod from "../../components/keyboardMod/keyboardMod"

  export default {
    name: "set-password-page",
    data() {
      return {
        passwordCase: [
          {
            show: false//显示小黑点
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
        ],
        keyboardShow: false,
        password: "",//第一次的密码
        verifyPassword: "", //重复的密码
        passwordCaseIndex: 0, //递层增加
        verify: true,
        submitColor: false
      }
    },

    components: {
      keyboardMod
    },

    computed: {
      ...mapState(["mobilePhone","openRedPacketModShow"])
    },
    watch: {
      password(val) {
        console.log(val)
        if (val.length === 6) {
          let arr = val.split(""),
            flag = [],
            newArr = Array.from(new Set(arr))          //数组去重
          arr.forEach((item, index, Arr) => {
            if ((item * 1 + 1) == Arr[index + 1]) {
              flag.push(item)
            }
          })
          //数组数字不能连续
          if (newArr.length === 1 || flag.length === 5) {
            this.MessageBox.alert("密码不能为相同或连续的数字")
            this.passwordCaseIndex = 0
            this.__eliminate()
            this.password = ""
            return
          }
          let time = setTimeout(() => {
            this.verify = false
            this.__eliminate()
            this.passwordCaseIndex = 0
            clearTimeout(time)
          }, 400)
        }
      },
      verifyPassword(val) {
        if (val.length === 6) {
          if (val !== this.password) {
            this.MessageBox.alert("两次输入的密码不同，请重新设置").then(() => {
              this.verify = true
              this.password = ""
              this.__eliminate()
              this.verifyPassword = ""
              this.passwordCaseIndex = 0
            })
            return
          }
          this.submitColor = true
        } else {
          this.submitColor = false
        }

      },
      verify(val) {
        let that = this
        if (val) {
          window.removeEventListener("popstate", that.__goBack, false)
          window.history.pushState(null, "", "#/homePage")
          window.history.pushState(null, "", "#/myPage")
        } else {
          this.pushHistory()
          window.addEventListener('popstate', that.__goBack, false)
        }
      },
    },
    mounted() {
      window.history.pushState(null, "", "#/tieOnCardPage")
      window.history.pushState(null, "", "#/setPasswordPage")
    },

    methods: {
      //返回事件函数
      __goBack() {
        this.verify = true
        this.verifyPassword = ""
        this.password = ""
        this.passwordCaseIndex = 0
        this.__eliminate()
      },
      //清除小圆点
      __eliminate() {
        this.passwordCase.forEach((item, index) => {
          item.show = false
        })
      },
      //下一步
      submit() {
        let that = this
        this.$store.commit("AWAITTRUE")
        this.$store.dispatch("getSetPayPassword", {
          password: that.password,
          confimPassword: that.verifyPassword
        }).then((res) => {
          if (res.success) {
            this.$store.commit("POST_OPENID", {
              result: {
                data: {
                  hasPayPassword: true
                }
              }
            })
            if(this.openRedPacketModShow){
              this.$store.dispatch("getRedPack").then((res)=>{
                this.$store.commit("AWAITFALSE")
                if(res.success){
                  this.$router.replace({name: "WithdrawalPage"})
                }else {
                  this.MessageBox.alert(res.message,"失败")
                }
              })
            }else {
              this.$store.commit("AWAITFALSE")
              this.$router.replace({name: "WithdrawalPage"})
            }
          } else {
            this.$store.commit("AWAITFALSE")
            this.MessageBox.alert(res.message, "提示")
          }
        })
      },
      keyboardIsShow() {
        this.keyboardShow = true
      },
      //  数字键盘按下
      press(it, ev) {
        ev = ev || event
        ev.preventDefault()
        //判断是数字还是功能键
        if (typeof it === "string") { //数字
          //点击变色
          ev.target.style.backgroundColor = "#ccc"
          //判断是数字还是x
          if (it === "x") {
            //如果是x 则全部删除
            this.__eliminate()
            this.verify ? this.password = "" : this.verifyPassword = ""
            this.passwordCaseIndex = 0
          } else {
            if (this.passwordCaseIndex > 5) {
              return false
            }
            if (it === ".") {
              this.MessageBox.alert("密码中不能设置符号", "提示")
              return
            }
            this.verify ? this.password += it : this.verifyPassword += it
            this.passwordCase[this.passwordCaseIndex].show = true
            this.passwordCaseIndex++
          }
        } else {
          //判断是X还是完成
          it.active = true
          if (it.content.length > 2) {
            if (this.passwordCaseIndex === 0) return false
            this.passwordCaseIndex--
            this.passwordCase[this.passwordCaseIndex].show = false
            this.verify ?
              this.password = this.password.substring(0, this.password.length - 1)
              : this.verifyPassword = this.verifyPassword.substring(0, this.verifyPassword.length - 1)
          } else {
            this.keyboardShow = false
          }
        }
      },
      //  数字键盘松开
      letGo(it, ev) {
        ev = ev || event
        ev.preventDefault()
        if (typeof it === "string") {
          ev.target.style.backgroundColor = "#fff"
        } else {
          it.active = false
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .setPassword
    .setPasswordHeader
      box-sizing border-box
      text-align center
      height (270 /$rem)
      padding-top (90 /$rem)
      .account
        font-size (36 /$rem)
        color #bbbbbb
      .passwordText
        font-size (40 /$rem)
        color #333
        margin-top (20 /$rem)
      .verify
        font-size (40 /$rem)
        color #333333
    .setPasswordContent
      box-sizing border-box
      padding 0 (30 /$rem)
      height (162 /$rem)
      li
        float left
        width (170 /$rem)
        height (162 /$rem)
        box-sizing border-box
        border-bottom (1 /$rem) solid #bbb
        border-left (1 /$rem) solid #bbb
        border-top (1 /$rem) solid #bbb
        .dot
          background-color #000
          width (30 /$rem)
          height (30 /$rem)
          border-radius 50%
          margin-left (69 /$rem)
          margin-top (65 /$rem)
        li:last-child
          border-right (1 /$rem) solid #bbb
    .reminder
      margin-top (40 /$rem)
      text-align center
      font-size (32 /$rem)
      color #bbb
    .setPasswordFooter
      margin-top (140 /$rem)
      .submit
        position relative
        display block
        margin 0 auto
        width (996 /$rem)
        height (146 /$rem)
        text-align center
        line-height (146 /$rem)
        background-color #cccccc
        border-radius (10 /$rem)
        color #fff
        font-size (48 /$rem)
        outline: none
        border: none
        &.active
          z-index 11
          background-color #efca7d
    .fade-enter-active, .fade-leave-active {
      transition: all .3s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
    {
      transform translateY(100%)
    }
</style>

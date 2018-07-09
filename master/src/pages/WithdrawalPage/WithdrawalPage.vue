<template>
  <div class="WithdrawalPage" v-if="income&&lastOrderInfo">
    <header class="WithdrawalPageHeader"></header>
    <div class="WithdrawalPageContent">
      <p class="balance">
        <span class="describe">
          账户余额 <span class="price">{{income.withdrawBalance}}</span>元
        </span>
      </p>
      <p class="deposit">提现金额</p>
      <div class="login">
        <p class="import"><span>￥</span><input name="txtUserName"
                                               @focus="gainFoucs"
                                               :placeholder="`可提现${income.withdrawBalance}元`"
                                               type="text"
                                               v-model="money"/></p>
        <p class="info">满{{minMoney}}元可提现（额外扣除￥2.00元的手续费）</p>
        <p class="hint"><span @click="withdrawDeposit">全部提现</span></p>
        <button class="submit" @click="submit" :class="{changColor :money!== ''}">立即提现</button>
        <p class="remind">1-3个工作日到账</p>
      </div>
    </div>
    <footer class="WithdrawalPageFooter">
      <p>
        <router-link :to="{name:'customerServicePage'}">联系客服</router-link>
        <span>|</span>
        <router-link :to="{name:'explainPage'}">提现说明</router-link>
      </p>
    </footer>
    <transition name="fade">
      <keyboardMod :press="press" :letGo="letGo" v-show="keyboardShow"/>
    </transition>
    <transition name="fade">
      <passwordMod :money="money" :passwordModIsShow ="passwordModIsShow" v-if="passwordModShow"/>
    </transition>
    <transition name="fade">
      <openRedPacketMod :close="openRedPacketModIsShow" v-if="openRedPacketModShow"/>
    </transition>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import keyboardMod from "../../components/keyboardMod/keyboardMod"
  import passwordMod from "../../components/passwordMod/passwordMod"
  import openRedPacketMod from "../../components/openRedPacketMod/openRedPacketMod"

  export default {
    data() {
      return {
        minMoney:"15",
        maxMoney:"500",
        money: "",
        keyboardShow: false,
        passwordModShow: false,
      }
    },
    watch: {
      money(val) {
        if (val * 1 > this.maxMoney) {
          this.MessageBox.alert(
            `单笔金额不能超过${this.maxMoney}元`,
            '提交失败'
          )
          this.money = this.maxMoney+""
        }
      },
      lastOrderInfo(obj){
        console.dir(obj)

      }
    },
    beforeCreate() {

    },
    components: {
      keyboardMod, passwordMod,openRedPacketMod
    },

    computed: {
      ...mapState(["income","openRedPacketModShow","lastOrderInfo"])
    },
    created() {
      this.$store.dispatch("getAccountInfo")
      this.$store.dispatch("getLastOrderInfo").then(()=>{
      })
    },
    mounted() {
      window.history.pushState(null, "", "#/myPage")
      window.history.pushState(null, "", "#/myPage/WithdrawalPage")
    },
    methods: {
      openRedPacketModIsShow(){
        this.$store.commit("OPENREDPACKETMODSHOW",false)
      },
      //隐藏密码键盘
      passwordModIsShow(){
        this.passwordModShow = false
      },
      //键盘触碰
      press(it, ev) {
       // debugger
        ev = ev || event
        ev.preventDefault()
        if (typeof it === "string") { //数字
          //点击变色
          ev.target.style.backgroundColor = "#ccc"
          //判断是数字还是x
          if (it === "x") {
            //如果是x 则全部删除
            this.money = ""
          } else {
            if (it === ".") {
              if (this.money.indexOf(".") != -1) {
                return
              }
            }
            if(this.money.indexOf(".")!=-1){
              if(this.money.substring(this.money.indexOf(".")).length>2){
                return
              }
            }
            this.money += it
          }
        } else {
          //判断是X还是完成
          it.active = true
          if (it.content.length > 2) {
            this.money = this.money.substring(0, this.money.length - 1)
          } else {
            this.keyboardShow = false
          }
        }
      },
      //键盘松手
      letGo(it, ev) {
        ev = ev || event
        ev.preventDefault()
        if (typeof it === "string") {
          ev.target.style.backgroundColor = "#fff"
        } else {
          it.active = false
        }
      },
      withdrawDeposit() {
        this.money = this.income.withdrawBalance
      },
      //提交
      submit() {
        // this.passwordModShow = true
        // return
        let money = this.money * 1, withdrawBalance = this.income.withdrawBalance * 1
        if (!money) {
          this.MessageBox.alert(
            "请输入金额",
            '提交失败'
          )
          return
        }
        if(money < this.minMoney){
          this.MessageBox.alert(
            `提现金额不能小于${this.minMoney}元`,
            '提交失败'
          )
          return
        }
        if (money > withdrawBalance) {
          this.MessageBox.alert(
            "提现金额不能大于账户余额",
            '提交失败'
          )
          return
        }
        if(this.$route.query&&this.$route.query.addBankCard){
          this.passwordModShow = true
        }else{
          let message= `是否提现到尾号 ${this.lastOrderInfo.identify4AuthBank.substr(length-4)}${this.lastOrderInfo.bankName} 储蓄卡`
          this.MessageBox({
            title: '确认银行账户',
            message:message,
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: "否",
            confirmButtonText: "是",
            closeOnClickModal:false
          }).then(
            (res) => {
              console.log(res)
              if(res === "cancel"){
                this.$store.commit("FUYOU",true)
                this.$router.push({name:"tieOnCardPage"})
              }else{
                this.passwordModShow = true
              }
            }
          )
        }

      },
      gainFoucs() {
        document.activeElement.blur()
        this.keyboardShow = true
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .WithdrawalPage
    position relative
    .fade-enter-active, .fade-leave-active {
      transition: all .3s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
    {
      transform translateY(100%)
    }
    input
      outline: none
      border: none
    .WithdrawalPageHeader
      height (600 /$rem)
      background-color #efca7d
    .WithdrawalPageContent
      width (1020 /$rem)
      //height (888 /$rem)
      position absolute
      top (200 /$rem)
      left (30 /$rem)
      background-color #ffffff
      border-radius (20 /$rem)
      box-shadow 0 0 (70 /$rem) rgba(0, 0, 0, 0.19)
      box-sizing border-box
      padding 0 (60 /$rem)
      .balance
        box-sizing border-box
        padding (70 /$rem) 0 (70 /$rem)
        font-size (36 /$rem)
        width 100%
        height (230 /$rem)
        .describe
          .price
            font-size (60 /$rem)
            color #efca7d
      .deposit
        font-size (36 /$rem)
      .login
        box-sizing border-box
        .import
          padding (70 /$rem) 0 (40 /$rem)
          font-size (80 /$rem)
          border-bottom (1 /$rem) solid #f2f2f2
          input
            margin-left (40 /$rem)
            width (700 /$rem)
            font-size (90 /$rem)
            color #efca7d
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
        .info
          color: #bbbbbb
          font-size (36/$rem)
          padding-top (40 /$rem)
        .hint
          padding (20/$rem) 0 (50/$rem)
          box-sizing border-box
          color #efca7d
          font-size (32 /$rem)
          span
            position relative
            z-index 11
        .submit
          display block
          width (900 /$rem)
          height (146 /$rem)
          text-align center
          line-height (146 /$rem)
          background-color #ccc
          border-radius (15 /$rem)
          color #fff
          font-size (48 /$rem)
          outline: none
          border: none
          &.changColor
            background-color #efca7d
        .remind
          text-align center
          color #bbbbbb
          font-size (30/$rem)
          padding (40/$rem) 0 (50/$rem)
    .WithdrawalPageFooter
      position fixed
      bottom 0
      left 0
      width 100%
      padding-bottom (40/$rem)
      text-align center
      p
        overflow hidden
        a
          display inline-block
          color #efca7d
          font-size (30/$rem)
        span
          font-size (30/$rem)
</style>

<template>
  <div class="passwordMod" @click = "passwordModIsShow">
    <div class="passwordModContent">
      <header class="header">
        <img src="./img/tixiantanxchuang_icon_close.png" class="icon" @click="passwordModIsShow">
        <h2 class="title">
          输入提现密码
        </h2>
      </header>
      <ul class="centre">
        <li v-for="(it,index) in check" :key="index">
          <div class="dot" v-show="it.show"></div>
        </li>
      </ul>
      <p class="forget">
        <span @click="forget">忘记密码?</span>
      </p>
      <ul class="passwordKeyboard">
        <li v-for="(it,index) in keyboardDatas"
            @touchstart.stop="trigger(it)"
            @touchend.stop="relinquish(it)"
            :key="index"
            :class="{tint:it.text === '',color:it.changeColor}">
          {{it.text}}
          <img :src="it.imgUrl" v-if="it.imgUrl">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: "password-mod",
    props: ["money", "passwordModIsShow"],
    data() {
      return {
        check: [
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
          {
            show: false
          },
        ],
        keyboardDatas: [
          {
            text: "1",
            changeColor: false
          },
          {
            text: "2",
            changeColor: false
          },
          {
            text: "3",
            changeColor: false
          },
          {
            text: "4",
            changeColor: false
          },
          {
            text: "5",
            changeColor: false
          },
          {
            text: "6",
            changeColor: false
          },
          {
            text: "7",
            changeColor: false
          },
          {
            text: "8",
            changeColor: false
          },
          {
            text: "9",
            changeColor: false
          },
          {
            text: "",
            changeColor: false
          },
          {
            text: "0",
            changeColor: false
          },
          {
            text: "",
            imgUrl: "../../../static/img/keybpardImg/shezhitixianmima_icon_delete1.png",
            changeColor: false
          },
        ],
        checkInd: 0,
        password: ""
      }
    },

    components: {},

    computed: {...mapState(["lastOrderInfo"])},
    watch: {
      password(val) {
        let that =this
        if(val.length === 6){
          this.$store.commit("AWAITTRUE")
          this.$store.dispatch("WithDrawFuiou",{
            money: that.money,
            password: val,
            bankCard:this.lastOrderInfo.identify4AuthBank
          }).then((res) => {
            this.$store.commit("AWAITFALSE")
            if(res.success){
              this.MessageBox.alert("提现成功，3-5工作日到账","提现成功").then(()=>{
                this.$router.push({name:"myPage"})
              })
            }else {
              this.MessageBox.alert(res.message,"提现失败")
              this.checkInd = 0
              this.check.forEach((it)=>{
                it.show = false
              })
              this.password = ""
            }
          })
          /*this.$store.dispatch("getWithDraw",{
            openId:that.readTodos().openid||"oUSCj0-sMcTQ-UwIOHP6XCAzKJhs",
            money : that.money,
            password:val
          }).then((res)=>{

          })*/
        }
      }
    },
    mounted() {
    },

    methods: {
      forget(){
        this.$router.push({name:"tieOnCardPage"})
      },
      //输入密码
      trigger(it, ev) {
        ev = ev || event
        ev.preventDefault()
        it.changeColor = true
        //  判断是否是删除按钮
        if (it.imgUrl) {
          if(this.checkInd === 0){
            return
          }
          this.password = this.password.substring(0, this.password.length - 1)
          this.checkInd--
          this.check[this.checkInd].show = false
        } else {
          if (it.text === "" || this.checkInd > 5||this.password.length === 6) {
            return
          }
          this.password += it.text
          this.check[this.checkInd].show = true
          this.checkInd++
        }
      },
      relinquish(it, ev) {
        ev = ev || event
        ev.preventDefault()
        it.changeColor = false
      },
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus">
  .passwordMod
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background-color rgba(0, 0, 0, .3)
    z-index 12
    .passwordModContent
      position absolute
      width 100%
      height (1200 /$rem)
      background-color #fff
      bottom 0
      left 0
      .header
        .icon
          position absolute
          top (30 /$rem)
          left (30 /$rem)
          width (48 /$rem)
          height (48 /$rem)
        .title
          box-sizing border-box
          padding (60 /$rem) 0 (90 /$rem)
          height (196 /$rem)
          font-size (46 /$rem)
          color #333333
          text-align center

      .centre
        width (1020 /$rem)
        height (162 /$rem)
        margin 0 auto
        li:first-child
          border-left (1 /$rem) solid #bbb
        li
          float left
          box-sizing border-box
          width (170 /$rem)
          height (162 /$rem)
          border-right (1 /$rem) solid #bbb
          border-bottom (1 /$rem) solid #bbb
          border-top (1 /$rem) solid #bbb
          .dot
            background-color #000
            width (30 /$rem)
            height (30 /$rem)
            border-radius 50%
            margin-left (69 /$rem)
            margin-top (65 /$rem)
      .forget
        margin-top (30 /$rem)
        font-size (30 /$rem)
        color #efca7d
        box-sizing border-box
        padding 0 (30 /$rem)
        text-align right
        overflow hidden
        span
          float right
      .passwordKeyboard
        margin-top (100 /$rem)
        height (680 /$rem)
        li
          float left
          width (360 /$rem)
          height (170 /$rem)
          border (1 /$rem) solid #f2f2f2
          box-sizing border-box
          line-height (170 /$rem)
          text-align center
          img
            display inline-block
            width (66 /$rem)
            height (54 /$rem)
          &.tint
            background-color: #e2e2e2
          &.color
            background-color #ccc
</style>

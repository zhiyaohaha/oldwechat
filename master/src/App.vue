<template>
  <div>
    <div v-if="allIsShow">
      <keep-alive>
        <router-view v-if="!$route.meta.cache"/>
      </keep-alive>
      <router-view v-if="$route.meta.cache"/>
      <footer class="footerTap" v-if="$route.meta.keepAlive">
        <router-link to="/homePage">
          <img src="../static/img/homeImg/tab_icon_home_selected.png" v-show="$route.meta.footerShow">
          <img src="../static/img/homeImg/tab_icon_home_normal.png" v-show="!$route.meta.footerShow">
        </router-link>
        <router-link to="/myPage">
          <img src="../static/img/homeImg/tab_icon_mine_normal.png" v-show="$route.meta.footerShow">
          <img src="../static/img/homeImg/tab_icon_mine_selected.png" v-show="!$route.meta.footerShow">
        </router-link>
      </footer>
      <transition name="shrink">
        <redEnvelopeMod :redEnvelopeModIsShow="redEnvelopeModIsShow" v-show="maxRed"/>
        <!--<redEnvelopeMod :redEnvelopeModIsShow="redEnvelopeModIsShow" v-if="true"/>-->
      </transition>
      <!--<transition name="disappear">
        <activityInformMod :close="close" v-if="active"/>
      </transition>-->
      <transition name="floatRed">
        <floatRedEnvelopeMod :changeShow="floatRedEnvelopeModIsShow" :touchEnd="touchEnd" :touchMove="touchMove"
                             v-show="floatRedEnvelopeModShow" :flag="changeMove" :style="slideEffect"/>
      </transition>
    </div>
    <div>
      <awaitMod v-if="awaitShow"/>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import awaitMod from "./components/awaitMod/awaitMod"
  import redEnvelopeMod from "./components/redEnvelopeMod/redEnvelopeMod"
  import activityInformMod from "./components/activityInformMod/activityInformMod.vue"
  import floatRedEnvelopeMod from "./components/floatRedEnvelopeMod/floatRedEnvelopeMod.vue"

  export default {
    data() {
      return {
        footerShow: true,
        allIsShow: false,
        // active: true, // 活动公告
        startX: 0,    //开始触摸的位置
        startY: 0,
        moveX: 0,    //滑动时的位置
        moveY: 0,
        endX: 0,    //结束触摸的位置
        endY: 0,
        disX: 0,   //移动距离
        disY: 0,
        x: 0,
        y: 0,
        winHeight: 0,//window的高
        numY:0,//位置
        slideEffect: '',//滑动时的效果,使用v-bind:style="deleteSlider"
        changeMove: false
      }
    },
    components: {
      awaitMod, redEnvelopeMod, activityInformMod, floatRedEnvelopeMod
    },
    computed: {
      ...mapState(['openID', 'userinfo', 'awaitShow', 'canRedPack', 'maxRed']),
      floatRedEnvelopeModShow: {
        get() {
          return this.$store.state.canRedPack && this.$route.name == "homePage" && !this.$store.state.maxRed
        },
        set() {

        }
      },
    },
    watch: {},
    beforeCreate() {
    },
    created() {
      //如果用户有openid再去调用微信登录接口
      /*  if (userinfo.openid) {
          console.log("这里是浏览器有");
          this.$store.dispatch('postOpenid', {
            data: {
              //openId: userinfo.openid,
              // openId: "oUSCj0-sMcTQ-UwIOHP6XCAzKJhs",//假帐号
              thirdLoginType: 'ThirdPlatForm.WeChat',
              nickName: userinfo.nickname,
              head: userinfo.headimgurl,
            },
            cb: (va1, whether) => {
              this.setCookie('token', va1, 7)
              //存入cookie 判断是否实名
              this.setCookie('whether', whether, 7)
              this.setCookie('id', obj.id, 7)
            }
          }).then(() => {
            this.allIsShow = true
            this.$store.commit("AWAITFALSE")
          })
       } else {
         this.$store.dispatch('getUserinfo', {
            obj,
            cb: (userinfo, id) => {
              this.saveTodos(userinfo)
              this.setCookie('id', id, 7)
            }
          }).then(() => {
            userinfo = this.readTodos()
            console.log(JSON.stringify(userinfo))

            this.$store.dispatch('postOpenid',{
              data: {
                // openId:userinfo.openid||"",
                //openId: "16573",
                // openId: "oUSCj0xd_6ONno8QyarJQc59vGjY",
                thirdLoginType: 'ThirdPlatForm.WeChat',
                nickName: userinfo.nickname || "",
                head: userinfo.headimgurl || "",
                firstLevelId: that.getCookie("id") === "undefined" ? "" : that.getCookie("id")
              },
              cb: (va1, whether) => {
                this.setCookie('token', va1, 7)
                //存入cookie 判断是否实名
                this.setCookie('whether', whether, 7)
              }
            }).then(() => {
              this.allIsShow = true
              this.$store.commit("AWAITFALSE")
            })
          })
        }*/
      //调用手机站注册接口
      let obj = this.__GetRequest()
      this.setCookie('id', obj.id, 7)
      this.$store.commit("AWAITTRUE")
      this.$store.dispatch('postLogin', {
        /*data: {
          // openId:userinfo.openid||"",
          //openId: "16573",
          // openId: "oUSCj0xd_6ONno8QyarJQc59vGjY",
          thirdLoginType: 'ThirdPlatForm.WeChat',
          nickName: userinfo.nickname || "",
          head: userinfo.headimgurl || "",
          firstLevelId: that.getCookie("id") === "undefined" ? "" : that.getCookie("id")
        },*/
        cb: (va1, whether) => {
          this.setCookie('token', va1, 7)
          //存入cookie 判断是否实名
          this.setCookie('whether', whether, 7)
        }
      }).then((res) => {
        this.allIsShow = true
        this.$store.commit("AWAITFALSE")
      })

    },
    mounted() {
    },
    updated() {
    },
    methods: {
      longPress() {

        this.changeMove = true
        console.log(this.changeMove)
      },
      //小红包显示 手指按下
      floatRedEnvelopeModIsShow(ev) {
        let that = this
        ev = ev || event
        if (window.innerHeight) {
          this.winHeight = window.innerHeight
        } else if ((document.body) && (document.body.clientHeight)) {
          this.winHeight = document.body.clientHeight
        }
        this.winHeight -= ev.touches[0].target.clientHeight
        ev.preventDefault()
        this.time = setTimeout(that.longPress, 400)
        // if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startX = ev.touches[0].clientX; // 记录开始位置
        this.startY = ev.touches[0].clientY;
        //}
      },
      //手指移动红包
      touchMove(ev) {
        ev = ev || event
        ev.preventDefault()
        if (this.changeMove) {
          clearTimeout(this.time)
          if (ev.touches.length == 1) {
            //滑动时距离浏览器左侧的距离
            this.moveX = ev.touches[0].clientX;
            this.moveY = ev.touches[0].clientY;
            //实时移动的位置=实时的滑动的距离-起始位置
            this.disX = this.moveX - this.startX;
            this.disY = this.moveY - this.startY;
            this.numY = this.disY + this.y
            if (this.numY > 0) {
              this.numY = 0
            } else if (Math.abs(this.numY) > this.winHeight) {
              this.numY = -this.winHeight
            }
            this.slideEffect = `transform:translate3d(${this.disX + this.x}px,${this.numY}px,0)`;
          }
        }
      },

      //手指放开红开
      touchEnd(ev) {
        let winWidth
        ev = ev || event
        ev.preventDefault()
        this.x += this.disX;
        this.y += this.disY;
        if (window.innerHeight) {
          winWidth = window.innerWidth
        } else if ((document.body) && (document.body.clientHeight)) {
          winWidth = document.body.clientWidth
        }
        clearTimeout(this.time)
        if (!this.changeMove) {
          this.$store.commit("MAXREDPACK", true)
        } else {
          let elWidth = ev.target.clientWidth
          winWidth -= elWidth
          if (winWidth + this.x < winWidth / 2) { //位于屏幕左侧
            this.x = -winWidth
            this.slideEffect = `transform:translate3d(${-winWidth}px,${this.numY}px,0)`;
          } else {
            this.x = 0
            this.slideEffect = `transform:translate3d(0px,${this.numY}px,0)`;
          }
          /*if(winHeight+this.y<0){
            this.y = 0
            this.slideEffect = `transform:translate3d(0px,${-winHeight}px,0)`;
          }*/
        }
        this.changeMove = false
      },
      redEnvelopeModIsShow(flag) {
        this.$store.commit("MAXREDPACK", false)
        if (flag) {
          this.$router.push({name: "activityRulesPage"})
        }
      },
      //  关闭通知遮罩层
     /* close() {
        this.active = false
      }*/
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus">
  .footerTap
    position fixed
    bottom 0
    left 0
    z-index 10
    a:last-child
      padding-right (310 /$rem)
      text-align right
    a:first-child
      padding-left (310 /$rem)
    a
      float left
      box-sizing border-box
      border-top 1px solid #f2f2f2
      background-color #fff
      width (540 /$rem)
      height (146 /$rem)
      img
        display inline-block
        width (66 /$rem)
        height (108 /$rem)
        margin (21 /$rem) 0 0 0

  .mint-msgbox
    width (864 /$rem)
    height (450 /$rem)
    font-size (46 /$rem)
    border-radius (20 /$rem) !important
    .mint-msgbox-header
      box-sizing border-box
      height (86 /$rem)
      padding: (40 /$rem) 0 0
      .mint-msgbox-title
        color #333
        font-size (46 /$rem)
    .mint-msgbox-content
      height (234 /$rem)
      text-align center
      line-height (234 /$rem)
      padding 0 (30 /$rem)
      .mint-msgbox-message
        display inline-block
        vertical-align: middle
        text-align left
        line-height (60 /$rem)
        font-size (42 /$rem)
        color #333
    .mint-msgbox-btns
      height (130 /$rem)
      line-height (130 /$rem)
      .mint-msgbox-confirm
        font-size (46 /$rem)
        background-color #efca7d
        color #ffffff
      .mint-msgbox-cancel
        font-size (46 /$rem)
        color #fff
        background-color #efca7d

  .disappear-enter-active, .disappear-leave-active {
    transition: all .5s;
  }

  .disappear-enter, .disappear-leave-active {
    transform: translate3d(0, -100%, 0)
  }

  .shrink-enter-active, .shrink-leave-active {
    transition: all .5s;
  }

  .shrink-enter, .shrink-leave-active {
    transform: scale(0)
  }

  .floatRed-enter-active, .floatRed-leave-active {
    transition: all .5s;
  }

  .floatRed-enter, .floatRed-leave-active {
    opacity 0
  }
</style>

<template>
  <div class="phoneApprove" v-if="show">
    <div class="myContent">
      <img src="./img/banner.png">
      <ul class="mform">
        <li v-for="(mformData, index) in mformDatas" :key="index">
          <span class="description">{{mformData.description}}</span>
          <input type="text" v-model="mformData.model"
                 @blur="loseFocus"
                 @input="goodInput(mformData.reg,mformData.model,index)"
                 :placeholder="mformData.placeholder"
                 :maxlength="mformData.maxlength"
                 :name="mformData.name">
          <a href="javascript:;" :class="{sendMsg:mformData.sendMsg,color:!num}" @click="sendMsg(index)">
            {{mformData.units}}
          </a>
        </li>
      </ul>
      <a href="javascript:;" class="protocol">
        <img src="./img/xuanze.png" v-show="imgIsShow" @touchstart="notarize">
        <img src="./img/huisekuang.png" v-show="!imgIsShow" @touchstart="notarize">
        <span @click="openModal">我已阅读并同意 <span class="changeColor">《掌金超平台服务协议》</span>的所有条款</span>
      </a>
      <a href="javascript:;" class="approve" @click="approve"></a>
    </div>
    <transition name="fade">
      <verification :changeShow="changeShow" :verificationCancel="verificationCancel" v-show="verificationShow"/>
    </transition>
    <transition name="fade">
      <agreementMod :closeModal="closeModal" v-if="!imgIsShow"/>
    </transition>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import verification from '../../components/verification/verification.vue'
  import agreementMod from '../../components/agreementMod/agreementMod.vue'

  export default {
    data() {
      return {
        mformDatas: [
          {
            message: '请正确输入您的真实姓名',
            description: '姓名：',
            placeholder: '请输入您的真实姓名',
            name: 'userName',
            model: '',
            purposeList: false,
            sendMsg: false,
            units: '',
            reg: /^[\u4e00-\u9fa5]{1,}$/,
            regular: /^[\u4e00-\u9fa5]{1,}$/,
            errorColor: false,
            maxlength: "15"
          },
          {
            message: "请正确输入您的身份证号",
            description: '身份证号：',
            placeholder: '请输入您的身份证号',
            name: 'IDnumber',
            model: '',
            purposeList: false,
            sendMsg: false,
            units: '',
            reg: /^[0-9xX]{1,}$/,
            regular: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            errorColor: false,
            maxlength: '18'
          },
          {
            message: '请正确输入您的手机号',
            description: '手机号：',
            placeholder: '请输入您的手机号',
            name: 'cellPhoneNum',
            model: '',
            purposeList: false,
            sendMsg: false,
            units: '',
            reg: /^[0-9]{1,11}$/,
            regular: /^(13[0-9]|14[5|7]|15[0-9]|18[0-9]|17[0-9])\d{8}$/,
            errorColor: false,
            maxlength: '11'
          },
          {
            message: '请正确输入您的验证码',
            description: '验证码：',
            placeholder: '请输入验证码',
            name: 'authCode',
            model: '',
            purposeList: false,
            sendMsg: true,
            units: '获取验证码',
            reg: /^\d{1,4}$/,
            regular: /^\d{4}$/,
            errorColor: false,
            maxlength: '4'
          },
        ],
        imgIsShow: true,
        forbid: 0,
        num: 0,
        show: 0,
        verificationShow: false //图形验证码显示
      }
    },
    components: {
      verification, agreementMod
    },
    computed: {
      ...mapState(["time"]),
      ...mapGetters(["key"])
    },
    beforeMount() {

    },
    mounted() {

    },
    watch: {},
    created() {
      let that = this, userinfo = this.readTodos()
      this.$store.dispatch('postLogin', {
        /*data: {
          //openId: userinfo.openid,
          // openId: "16573",
           thirdLoginType: 'ThirdPlatForm.WeChat',
         nickName: userinfo.nickname,
          head: userinfo.headimgurl,
          // firstLevelId: that.getCookie("id") === "undefined" ? "" : that.getCookie("id")
        },*/
        cb: (va1, whether,cityCode) => {
          this.setCookie('cityCode', cityCode, 7)
          this.setCookie('token', va1, 7)
          //存入cookie 判断是否实名
          this.setCookie('whether', whether, 7)
        }
      }).then(() => {
        this.show = 1
      })
    },
    mounted() {

    },
    updated() {
    },
    methods: {
      //查找
      __findModel(value) {
        let mformDatas = this.mformDatas
        return mformDatas.find(val => val.name == value)
      },
      //      发送短信验证码请求
      __phoneNote(res) {
        if (res.success) {
          this.MessageBox({
            title: '提示',
            message: "短信验证码已发送，5分钟内有效",
            showCancelButton: false
          })
          this.num = 60
          let timer = setInterval(() => {
            this.num--
            if (this.num == 0) {
              this.__findModel('authCode').units = '获取验证码'
              clearInterval(timer)
              this.num = 0
            } else {
              this.__findModel('authCode').units = this.num + 's后重发'
            }
          }, 1000)
        } else {
          this.MessageBox({
            title: '提交失败',
            message: res.message,
            showCancelButton: false
          })
        }
      },
//      图形验证码
      changeShow() {
        this.verificationShow = false
        this.$store.dispatch("changeTime")
      },
      verificationCancel(flag, code) {
        this.verificationShow = false
        let that = this
        if (flag) {
          //点击确定按钮
          this.$store.commit("AWAITTRUE")
          this.$store.dispatch('postSendMsgAffirm', {
            code: 'SMS_123738830',
            mobilePhone: that.__findModel("cellPhoneNum").model,
            validateKey: that.key + that.time,
            validateCode: code,
            needvalidateCode: true,
            smsSign: "掌金超",
            purpose:"Register"
          }).then((res) => {
            this.$store.commit("AWAITFALSE")
            this.__phoneNote(res)
          })
        }
        this.$store.dispatch("changeTime")
      },
//    申请逻辑
      approve() {
        // let userinfo = this.readTodos()
        let that = this
       /* if (userinfo.openid === undefined) {
          this.MessageBox.alert("请从公众号或者扫二维码进入", "失败").then(() => {
            WeixinJSBridge.call('closeWindow')
          })
          return
        }*/
        for (let i = 0; i < this.mformDatas.length; i++) {
          let item = this.mformDatas[i]
          if (item.model === "") {
            this.MessageBox({
              title: '提交失败',
              message: item.placeholder,
              showCancelButton: false
            })
            return
          } else if (!item.regular.test(item.model)) {
            this.MessageBox({
              title: '提交失败',
              message: item.message,
              showCancelButton: false
            })
            return
          }
        }
        if (!this.imgIsShow) {
          this.MessageBox({
            title: '提示',
            message: "请阅读并同意注册协议",
            showCancelButton: false
          })
          return
        }
        if (this.forbid > 0) {
          return
        }
        this.forbid++
        this.$store.commit("AWAITTRUE")
        let data = {
          idCard: that.__findModel("IDnumber").model,
          phone: that.__findModel("cellPhoneNum").model,
          verifyCode: that.__findModel("authCode").model,
          name: that.__findModel("userName").model,
          firstLevelId: that.getCookie('id')==="undefined"?"":that.getCookie('id'),
          // firstLevelId: '5ad303df78a09c671496ad7f',
          // thirdPlatFormBind: true,//第三方绑定接口
          // openId: userinfo.openid, //第三方OpenId
          // openId: "16574", //第三方OpenId
          // thirdLoginType: 'ThirdPlatForm.WeChat',  //第三方登录代号
          // head: userinfo.headimgurl,//第三方登录头像
          // nickName: userinfo.nickname,//第三方登录昵称
          // source: 'OfficialAccounts',
        }
        // alert(JSON.stringify(data))
        this.$store.dispatch("getIdentify2Auth", {
          realName: that.__findModel("userName").model,
          idCard: that.__findModel("IDnumber").model
        }).then((res) => {
          if(!res.success){
            this.$store.commit("AWAITFALSE")
            this.MessageBox.alert(res.message,"失败")
            return
          }
          if (res.data.isSame) {
            this.$store.dispatch('postPhone', {
              data,
              cb: (flag, whether) => {
                this.setCookie('token', flag, 7)
                this.setCookie('whether', whether, 7)
              }
            }).then((res) => {
              this.$store.commit("AWAITFALSE")
              this.forbid = 0
              if (res.success) {
                this.$router.replace({
                  name: that.$route.params.name1 || "homePage",
                  query: {id: that.$route.query.id},
                  params: {name: that.$route.params.name2}
                })
                that = null
              } else {
                this.MessageBox.alert(
                  res.message,
                  '提交失败',
                  {
                    closeOnClickModal: true
                  }
                )
              }
            })
          } else {
            this.forbid = 0
            this.$store.commit("AWAITFALSE")
            this.MessageBox.alert(
              res.message,
              '提交失败',
              {
                closeOnClickModal: true
              }
            )
          }
        })
      },
//    选中切换
      notarize() {
        this.imgIsShow = !this.imgIsShow
      },
//    错误变红
      loseFocus() {
      },
      isFooter() {
      },
//    正确变色
      goodInput(reg, flag, index) {
        if (!reg.test(flag)) {
          this.mformDatas[index].model = flag.substring(0, flag.length - 1)
        }
      },
//    验证码逻辑
      sendMsg(index) {
        let mformData = this.mformDatas[index - 1]
        if (this.num > 0) {
          this.MessageBox({
            title: '提示',
            message: '60s后在重新获取验证码',
            showCancelButton: false
          })
          return
        }
        if (mformData.model !== '' && mformData.regular.test(mformData.model)) {
          this.verificationShow = true
        } else {
          this.MessageBox({
            title: '提示',
            message: '请正确输入手机号',
            showCancelButton: false
          })
        }
      },
      openModal() {
        this.imgIsShow = false
      },
      closeModal() {
        this.imgIsShow = true
      }
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus">
  .phoneApprove
    position relative
    .fade-enter-active, .fade-leave-active {
      transition: all .5s;
    }
    .fade-enter, .fade-leave-active {
      transform: translate3d(0, -150%, 0)
    }
    /*内容区*/
    .myContent
      img
        display inline-block
        width (1080 /$rem)
      .mform
        margin: 0 (30 /$rem)
        li
          box-sizing border-box
          position relative
          line-height (116 /$rem)
          width (1020 /$rem)
          height (121 /$rem)
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
            border-radius (20 /$rem)
            float right
            margin-top (17 /$rem)
            width (290 /$rem)
            height (86 /$rem)
            background-color #cdcdcd
            color #ffffff
            line-height (86 /$rem)
            text-align center
            &.color
              background-color #efca7d
      .protocol
        box-sizing border-box
        height (155 /$rem)
        text-align center
        line-height (155 /$rem)
        img
          display inline-block
          width (36 /$rem)
          height (35 /$rem)
          vertical-align middle
        span
          font-size (36 /$rem)
          color #333333
          &.changeColor
            color #efca7d
      .approve
        width (996 /$rem)
        height (146 /$rem)
        background-image url("./img/lijirenzheng.png")
        background-repeat no-repeat
        background-size 100%
        margin 0 auto
</style>

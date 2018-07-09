<template>
  <div class="loginPage">
    <div class="myContent">
      <img src="../phoneApprove/img/banner.png">
      <ul class="mform">
        <li><span class="description">国家/地区：</span><input type="text" value="中国(+86)"/></li>
        <li v-for="(mformData, index) in mformDatas" :key="index">
          <span class="description">{{mformData.description}}</span>
          <input type="number" v-model="mformData.model" :placeholder="mformData.placeholder"
                 :maxlength="mformData.maxlength" :name="mformData.name"
                 @input="limitDigits(mformData.reg,mformData.model,index)"/>
          <a href="javascript:;" :class="{sendMsg:mformData.sendMsg,color:!num}" @click="sendMsg(index)">
            {{mformData.units}}
          </a>
        </li>
      </ul>
      <a href="javascript:;" class="loginBtn" @click="loginBtn" :class="{color:active}">登录</a>
      <a href="javascript:;" class="registerNow" @click="$router.push({name:'phoneApprove',params:{name:$route.params.name1}})">立即注册</a>
    </div>
    <!--<transition name="fade">
      <verification :changeShow="changeShow" :verificationCancel="verificationCancel" v-show="verificationShow"/>
    </transition>-->
  </div>
</template>

<script>
 /* import {mapState, mapGetters} from 'vuex'
  import verification from '../../components/verification/verification.vue'*/

  export default {
    name: "loginPage",
    data() {
      return {
        mformDatas: [
          {
            message: '请输入正确的手机号',
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
        num: 0,//倒计时
        //verificationShow: false, //验证码显示

      }
    },
    components: {
      //verification
    },
    computed: {
      active() {
        let flag = false
        this.mformDatas.forEach((it, index) => {
          flag = it.regular.test(it.model)
        })
        return flag

      }
    },
    mounted() {

    },
    watch: {},
    created() {

    },
    updated() {
    },
    methods: {
      //倒计时
      countDown() {
        let times
        this.num = 60
        times = setInterval(() => {
          this.num--
          if (this.num <= 0) {
            this.num = 0
            this.__findModel("authCode").units = '获取验证码'
            clearInterval(times)
          } else {
            this.__findModel("authCode").units = this.num + 's后重发'
          }
        }, 1000)
      },
      //查找
      __findModel(value) {
        let mformDatas = this.mformDatas
        return mformDatas.find(val => val.name == value)
      },
      //显示状态
     /* changeShow() {
        this.verificationShow = false
        this.$store.dispatch("changeTime")
      },*/
      //点击验证码按钮  验证是否注册

      /*verificationCancel(flag, code) {
        let that = this
       // this.verificationShow = false
        if (flag) {
          this.$store.commit("AWAITTRUE")
          this.$store.dispatch('postSendMsgAffirm', {
            code: 'SMS_123738830',
            mobilePhone: that.__findModel("cellPhoneNum").model,
            validateKey: that.key + that.time,
            validateCode: code,
            //needvalidateCode: true,
            needvalidateCode: false,
            smsSign: "掌金超",
            purpose:"Login"
          }).then((res) => {
            console.log(res);
             this.$store.commit("AWAITFALSE")
             if (res.success) {
               this.MessageBox({
                 title: '提示',
                 message: "短信验证码已发送，5分钟内有效",
                 showCancelButton: false
               })
               this.countDown()
             } else {
               this.MessageBox.alert(res.message, "提交失败")
             }
          })
        }
        //this.$store.dispatch("changeTime")
      },*/
      //输入限制
      limitDigits(reg, val, index) {
        if (!reg.test(val)) {
          this.mformDatas[index].model = val.substring(0, val.length - 1)
        }
      },
      //验证码逻辑
      sendMsg(index) {
        let mformData = this.mformDatas[index - 1],that = this
        if (this.num > 0) {
          this.MessageBox({
            title: '提示',
            message: '60s后在重新获取验证码',
            showCancelButton: false
          })
          return
        }

        if (mformData.model !== '' && mformData.regular.test(mformData.model)) {
          //this.verificationShow = true
          this.$store.commit("AWAITTRUE")
          this.$store.dispatch('postSendMsgAffirm', {
            code: 'SMS_123738830',
            mobilePhone: that.__findModel("cellPhoneNum").model,
            // validateKey: that.key + that.time,
            // validateCode: code,
            //needvalidateCode: true,
            needvalidateCode: false,
            smsSign: "掌金超",
            purpose:"Login"
          }).then((res) => {
            console.log(res);
            this.$store.commit("AWAITFALSE")
            if (res.success) {
              this.MessageBox({
                title: '提示',
                message: "短信验证码已发送，5分钟内有效",
                showCancelButton: false
              })
              this.countDown()
            } else {
              this.MessageBox.alert(res.message, "提交失败")
            }
          })
        } else {
          this.MessageBox({
            title: '提示',
            message: '请正确输入手机号',
            showCancelButton: false
          })
        }
      },
      //登录
      loginBtn() {
        let that = this
        for (let i = 0; i < this.mformDatas.length; i++) {
          let it = this.mformDatas[i]
          if(!it.model){
            this.MessageBox.alert(it.placeholder, "失败")
            return
          }
          if (!it.regular.test(it.model)) {
            this.MessageBox.alert(it.message, "失败")
            return
          }
        }

        this.$store.commit("AWAITTRUE")
        this.$store.dispatch("postLogin", {
          data:{
            phone: that.__findModel('cellPhoneNum').model,//手机号
            verifyCode: that.__findModel('authCode').model,//验证码
          },
          cb: (va1, whether) => {
            this.setCookie('token', va1, 7)
            //存入cookie 判断是否实名
            this.setCookie('whether', whether, 7)
          }
          //weChatUserIdHanLi: this.getCookie('id')     //保存的userId（7天有效）
        }).then((res) => {
          console.log(res);
          this.$store.commit("AWAITFALSE")
          if (res.success) {
            this.$router.replace({
              name: that.$route.params.name1 || "homePage",
              query: {id: that.$route.query.id},
              params: {name: that.$route.params.name2}
            })
          } else {
            this.MessageBox.alert(res.message, "登录失败")
          }
        })
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
  .loginPage
    .myContent
      img
        display inline-block
        width 100%
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
            width (540 /$rem)
            margin-right (20 /$rem)
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
      .loginBtn
        width (996 /$rem)
        height (146 /$rem)
        border 1px solid #ccc
        background #ccc
        font-size (42 /$rem)
        text-align center
        line-height (146 /$rem)
        border-radius (20 /$rem)
        margin (20 /$rem) auto
        color #fff
        &.color
          background #efca7d
          color #fff
      .registerNow
        font-size (42 /$rem)
        text-align right
        margin-right (40 /$rem)
        color #efca7d
</style>

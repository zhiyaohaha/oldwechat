<template>
  <div class="froms" v-if="mformDatas">
    <ul class="mform">
      <li v-for="(mformData, index) in mformDatas" :key="index">
        <span class="description">{{mformData.description}}</span>
        <input type="text" v-model="mformData.model"
               @blur="loseFocus" :readonly="mformData.readonly"
               @input="goodInput(mformData.reg,mformData.model,index)"
               @focus="pullDown(true,index)"
               :placeholder="mformData.placeholder"
               :maxlength="mformData.maxlength"
               :name="mformData.name">
        <span :class="{purposeList:mformData.purposeList}" v-if="!mformData.sendMsg && !mformData.units"
              @touchstart="pullDown(true,index)">
                {{mformData.units}}
              </span>
        <a href="javascript:;" :class="{sendMsg:mformData.sendMsg,color:!num}"
           v-if="mformData.sendMsg && mformData.units"
           @click="sendMsg()">
          {{mformData.units}}
        </a>
      </li>
    </ul>
    <verification v-if="verificationShow" v-show="verificationShow" :changeShow="changeShow" :verificationCancel="verificationCancel"/>
    <mt-popup v-if="pickerModDatas" v-model="shadeShow" position="bottom" @change="onValuesChange" class="maskLayer"
              showToolbar="true">
      <div class="shadeIsShowHeader">
          <span @touchstart="pullDown(false,mformDatasInd,false)" class="cancel">
            取消
          </span>
        <span @touchstart="pullDown(false,mformDatasInd,true)" class="ascertain">
            确定
          </span>
      </div>
      <pickerMod :pickerModDatas="pickerModDatas" :shadeIsShow="shadeIsShowInd" :onValuesChange="onValuesChange"/>
    </mt-popup>
  </div>
</template>
<script>
  import verification from '../../components/verification/verification.vue'
  import {mapState} from 'vuex'

  export default {
    name: "forms",
    props: {
      //输入框数组
      mformDatas: {
        type: Array,
        default: null
      },
      // 底部显示
      footerShow: {
        type: Boolean,
        default: true
      },
      //底部弹窗
      pickerModDatas: {
        type: Array,
        default: null
      },
      //是否开启图形验证码
      verificationShow:{
        type:Boolean,
        default:false
      },

    },
    data() {
      return {
        num: 0,//倒计时
        verificationShow: false,//图形二维码
        mformDatasInd: 0,//选中的index
        shadeShow: false,//弹窗的显示
        reveal: false//弹窗点击确定和去消
      }
    },

    components: {
      verification,
    },

    computed: {
      ...mapState(["time", "lastOrderInfo"]),
      ...mapGetters(["key"]),
      shadeIsShowInd() {
        return this.shadeShow ? 3 : 0
      }
    },
    created(){
      this.mformDatas&&this.$store.dispatch("getLastOrderInfo").then(() => {
        if (this.lastOrderInfo) {
          this.__findModel("username").model = this.lastOrderInfo.name
          this.__findModel("IDnumber").model = this.lastOrderInfo.idCard
          this.__findModel("phoneNum").model = this.lastOrderInfo.mobilePhone
        }
      })
    },
    mounted() {

    },

    methods: {
      //发送短信验证
      __SendVerifyCode(validateCode) {
        this.$store.commit("AWAITTRUE")
        let that = this
        this.$store.dispatch('postSendMsg', {
          code: 'SMS_127153204',
          validateKey: that.key + that.time,
          mobilePhone: that.__findModel("phoneNum").model,
          validateCode: validateCode,
          smsSign: "掌金超",
          needvalidateCode: true
        }).then((res) => {
          this.$store.commit("AWAITFALSE")
          if (res.success) {
            this.MessageBox.alert(
              '短信验证码已发送，有效时间5分钟',
              '提示',
              {
                closeOnClickModal: true
              }
            )
            this.setTime()
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
      },
      //查找数组
      __findModel(value) {
        let mformDatas = this.mformDatas
        return mformDatas.find(val => val.name == value)
      },
      //定时器
      setTime() {
        this.num = 60
        let time = setInterval(() => {
          this.num--
          if (this.num === 0) {
            this.__findModel("authCode").units = "获取验证码"
            clearInterval(time)
          } else {
            this.__findModel("authCode").units = this.num + 's后重发'
          }
        }, 1000)
      },
      //输入市判断输入的是正确
      goodInput(reg, flag, index) {
        if (this.mformDatas[index].purposeList) {
          this.mformDatas[index].model = ''
        }
        if (!reg.test(flag)) {
          this.mformDatas[index].model = flag.substring(0, flag.length - 1)
        }
      },
      //下拉滑动弹窗谈起||获取焦点
      pullDown(flag, index, inputValue) {
        this.mformDatasInd = index
        if (this.mformDatas[index].purposeList) {
          this.reveal = inputValue
          this.shadeIsShow = flag
          !inputValue ? this.mformDatas[index].model = '' : null
        } else {
          this.footerShow = false
        }
      },
      //  苹果手机底部出现
      loseFocus() {
        this.footerShow = true
      },
      changeShow() {
        this.verificationShow = false
      },
      //图片按扭
      verificationCancel(flag, validateCode) {
        this.verificationShow = false
        if (flag) {
          this.__SendVerifyCode(validateCode)
          this.$store.dispatch("changeTime")
        } else {
          this.$store.dispatch("changeTime")
        }
      },
      //发送短信验证||调出图形验证码
      sendMsg() {
        this.verificationShow = true
      },
      //  pik组件的选中值
      onValuesChange(index) {
        this.mformDatas[this.mformDatasInd].model = this.pickerModDatas[index].name
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .froms
    .mform
      margin: 0 (30 /$rem)
      li:first-child
        border-top 1px solid #f2f2f2
      li
        box-sizing border-box
        position relative
        line-height (119 /$rem)
        width (1020 /$rem)
        height (121 /$rem)
        font-size (42 /$rem)
        border-bottom 1px solid #f2f2f2
        text-align right
        span
          color #333333
        .description
          margin-left 0
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
        .purposeList
          width (40 /$rem)
          background: url("./img/fanhuiicon.png") no-repeat right center
          background-size 100%
          padding-right: (40 /$rem)
        .sendMsg
          border-radius (20 /$rem)
          float right
          margin-top (17 /$rem)
          width (290 /$rem)
          height (86 /$rem)
          background-color #bbb
          color #ffffff
          line-height (86 /$rem)
          text-align center
          &.color
            background-color #efca7d

</style>

<template>
  <div class="personalDataPage">
    <header class="personalDataPageHeader">
      <div class="head">
        <img :src="readTodos().headimgurl||'../../../static/img/personalDataImg/gerenxinxi_touxiang.png'" alt="">
      </div>
      <span class="userName">{{readTodos().nickname||userName}}</span>
    </header>
    <headline :headlineData="{title:'填写个人信息',line:true}" v-if="approveShow"/>
    <headline :headlineData="{title:'个人信息',line:true}" v-if="!approveShow"/>
    <ul class="mform">
      <li v-for="(mformData, index) in mformDatas" :key="index" v-if="!mformData.show">
        <span class="description">{{mformData.description}}</span>
        <input type="text" v-model="mformData.model"
               :readonly="mformData.readonly"
               :placeholder="mformData.placeholder"
               :maxlength="mformData.maxlength"
               :name="mformData.name">
      </li>
    </ul>
    <a href="javascript:;" class="protocol" v-if="approveShow">
      <img src="./img/xuanze.png" v-show="imgIsShow" @touchstart="notarize">
      <img src="./img/huisekuang.png" v-show="!imgIsShow" @touchstart="notarize">
      <span @click="openModal">我已阅读并同意 <span class="changeColor">《掌金超平台服务协议》</span>的所有条款</span>
    </a>
    <a href="javascript:;" class="approve" @click="approve" v-if="approveShow">提交</a>
    <transition name="fade">
      <agreementMod :closeModal="closeModal" v-if="!imgIsShow"/>
    </transition>
  </div>
</template>
<script>
  import   {mapState} from "vuex"
  import agreementMod from '../../components/agreementMod/agreementMod.vue'
  import {postSpeedOrder} from "../../api"

  export default {
    name: "personalDataPage",
    data() {
      return {
        mformDatas: [
          {
            message: "请正确输入姓名",
            description: "姓名：",
            placeholder: "请输入姓名",
            name: "userName",
            model: "",
            reg: /^[\u4e00-\u9fa5]{1,}$/,
            regular: /^[\u4e00-\u9fa5]{1,}$/,
            maxlength: "15"
          },
          {
            message: "请正确输入身份证号",
            description: "身份证号：",
            placeholder: "请输入身份证号",
            name: "IDnumber",
            model: "",
            reg: /^[0-9xX]{0,18}$/,
            regular: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            maxlength: "18",
          },
          {
            message: "请正确输入手机号",
            description: "手机号：",
            placeholder: "请输入手机号",
            name: "phoneNum",
            model: "",
            reg: /^[0-9]{0,11}$/,
            regular: /^(13[0-9]|14[5|7]|15[0-9]|18[0-9]|17[0-9])\d{8}$/,
            maxlength: "11",
            readonly: true,
          },
          {
            message: "请正确输入手机号",
            description: "银行卡号：",
            placeholder: "请输入手机号",
            name: "bankCard",
            model: "",
            maxlength: "11",
            readonly: true,
            show: true
          },
        ],
        imgIsShow: true
      }
    },

    components: {
      agreementMod
    },

    computed: {
      ...mapState(["userName", "lastOrderInfo"]),
      approveShow() {
        return this.getCookie('whether') * 1 < 2
      }
    },
    watch: {},
    created() {
      this.$store.dispatch("getLastOrderInfo").then(() => {
        if (this.lastOrderInfo) {
          let idCard = this.lastOrderInfo.idCard, identify4AuthBank = this.lastOrderInfo.identify4AuthBank
          //
          console.log(idCard);
          idCard =idCard? idCard.substring(0, 1) +"****************"+idCard.substring(idCard.length-1, idCard.length):""
          identify4AuthBank =identify4AuthBank ? identify4AuthBank.substring(0, 1) + "******************"+identify4AuthBank.substring(identify4AuthBank.length-1, identify4AuthBank.length):""
          this.__findModel("userName").model = this.lastOrderInfo.name
          this.__findModel("IDnumber").model = idCard
          this.__findModel("phoneNum").model = this.lastOrderInfo.mobilePhone
          if (this.lastOrderInfo.identify4AuthBank) {
            this.__findModel("bankCard").model = identify4AuthBank
            this.__findModel("bankCard").show = false
          }
        }
      })
    },
    mounted() {
      if (!this.approveShow) {
        this.mformDatas.forEach((item, index) => {
          item.readonly = true
        })
      }
    },

    methods: {
      //查找数组
      __findModel(value) {
        let mformDatas = this.mformDatas
        return mformDatas.find(val => val.name == value)
      },
      //石否选总
      notarize() {
        this.imgIsShow = !this.imgIsShow
      },
      //出现协议
      openModal() {
        this.imgIsShow = false
      },
      //  提交
      approve() {
        let that = this, url = this.apiPrefix + "api/LoanOrder/SpeedOrderRecordForApp"
        for (let i = 0; i < this.mformDatas.length; i++) {
          let item = this.mformDatas[i]
          if (item.model === "") {
            this.MessageBox.alert(item.placeholder, "提交失败")
            return
          } else if (!item.regular.test(item.model)) {
            this.MessageBox.alert(item.message, "提交失败")
            return
          }
        }
        this.$store.commit("AWAITTRUE")
        this.$store.dispatch("getIdentify2Auth", {//二要素认证
          realName: that.__findModel("userName").model,
          idCard: that.__findModel("IDnumber").model
        }).then((result) => {
          if (result.data.isSame) {
            this.$store.dispatch("postFillUserInfo", {//个人信息补充
              data: {
                name: that.__findModel("userName").model,
                idCard: that.__findModel("IDnumber").model,
                phone: that.__findModel("phoneNum").model
              },
            }).then((res) => {
              if (res.success) {
                if (that.$route.params.urlIsSkip) {
                  postSpeedOrder(url, {
                    name: that.__findModel("userName").model,
                    idCard: that.__findModel("IDnumber").model,
                    mobilePhone: that.__findModel("phoneNum").model,
                    product: that.$route.query.id,  //产品Id
                    source: 'OfficialAccounts'  //来源
                  },).then((res) => {
                    this.$store.commit("AWAITFALSE")
                    if (res.success) {
                      this.setCookie('whether', 2, 7)
                      window.location.replace(res.data.url)
                    } else {
                      this.MessageBox({
                        title: '提交失败',
                        message: res.message,
                        showCancelButton: false
                      })
                    }
                  })
                } else if (that.$route.params.name) {
                  this.$store.commit("AWAITFALSE")
                  this.setCookie('whether', 2, 7)
                  this.$router.replace({
                    name: that.$route.params.name,
                    query: {id: that.$route.query.id},
                  })
                } else {
                  this.$store.commit("AWAITFALSE")
                  window.location.reload()
                }
              } else {
                this.$store.commit("AWAITFALSE")
                this.MessageBox.alert(res.message, "提交失败")
              }
            })
          } else {
            this.$store.commit("AWAITFALSE")
            this.MessageBox.alert(result.message, "提交失败")
          }
        })

      },
      //看完协议的按钮事件
      closeModal() {
        this.imgIsShow = true
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    transform: translate3d(0, -150%, 0)
  }

  .personalDataPage
    .personalDataPageHeader
      background-image url("./img/wodde_banner.png")
      background-repeat no-repeat
      background-size 100%
      position relative
      height (550 /$rem)
      text-align center
      box-sizing border-box
      padding-top (120 /$rem)
      .head
        margin-left (460 /$rem)
        margin-bottom (20 /$rem)
        img
          border-radius 50%
          width (160 /$rem)
          height (160 /$rem)
      .userName
        color #ffffff
        font-size (40 /$rem)
    .mform
      margin: 0 (30 /$rem)
      li
        box-sizing border-box
        position relative
        line-height (116 /$rem)
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
      background-color #efca7d
      border-radius (15 /$rem)
      margin 0 auto
      color #ffffff
      font-size (48 /$rem)
      text-align center
      line-height (146 /$rem)
</style>

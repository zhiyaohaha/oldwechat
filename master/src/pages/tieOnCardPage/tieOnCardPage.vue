<template>
  <div>
    <scroll>
      <div>
        <header class="tieOnCardHeader">
          <img src="../../../static/img/homeImg/xinyongkabanner.png">
        </header>
        <div class="tieOnCardContent">
          <ul class="mform">
            <li v-for="(mformData, index) in mformDatas" :key="index">
              <span class="description">{{mformData.description}}</span>
              <input :type="mformData.type" v-model="mformData.model" :popval="mformData.popval" :ref="'input'+index"
                     @blur="loseFocus"
                     @input="goodInput(mformData.reg,mformData.model,index)"
                     @focus="pullDown"
                     :readonly="mformData.readonly"
                     :placeholder="mformData.placeholder"
                     :maxlength="mformData.maxlength"
                     :name="mformData.name">
              <span :class="{purposeList:mformData.purposeList}" v-if="!mformData.sendMsg && !mformData.units"
                    @click="pullDown()">
                {{mformData.units}}
              </span>
            </li>
          </ul>
          <a href="javascript:;" class="authentication" @click="approve">
            立即认证
          </a>
          <div class="voidDiv"></div>
        </div>
      </div>
    </scroll>
    <footer class="tieOnCardFooter" v-show="tieOnFooterIsShow">
      实名认证仅用来确保您提交的需求真实有效，绝不泄露
    </footer>
    <mt-popup v-model="shadeShow" position="bottom" class="maskLayer">
      <pickerMod :pickerModDatas="BanksList" :shadeIsShow="shadeIsShowInd" :closeShow="()=>{
      this.shadeShow = false
      }" :onValuesChange="onValuesChange"/>
    </mt-popup>
    <mt-popup v-model="cityFlag" position="bottom" class="maskLayer">
    <linkageMod :linkageModDatas="cityData" :mformDatasInd="changeCityFlag" :closeShow="()=>{this.cityFlag = false}"  :onValuesChange="changeCityData"></linkageMod>
    </mt-popup>
  </div>
</template>
<script>
import  {mapState} from  "vuex"
import linkageMod from "../../components/linkageMod/linkageMod"
  export default {
    data() {
      return {
        BanksList:null,//储存富有支持的银行列表
        changeBanksCode:"",//银行对应的编码
        changeBanksName:null,//银行的名称
        cityFlag:false,
        shadeShow:false,
        cityData:[],//储存富有的城市name与code
        changeCityName:"",
        changeCityCode:"",
        mformDatas: [
          {
            description: "姓名：",
            placeholder: "请输入姓名",
            message: "请正确输入姓名",
            readonly:false,
            name: "userName",
            model: "",
            purposeList: false,
            sendMsg: false,
            units: "",
            reg: /^[\u4e00-\u9fa5]{1,}$/,
            regular: /^[\u4e00-\u9fa5]{1,}$/,
            type:"text"
          },
          {
            description: "身份证号：",
            placeholder: "请输入身份证号",
            message: "请正确输入身份证号",
            readonly:false,
            name: "IDnumber",
            model: "",
            purposeList: false,
            sendMsg: false,
            units: "",
            reg: /^[0-9_xX]{1,18}$/,
            regular: /^\d{17}[\d|xX]|\d{15}$/,
            maxlength: "18",
            type:"text"
          },
          {
            description: "开户银行：",
            placeholder: "请选择开户银行",
            message: "请选择正确的开户银行",
            readonly:false,
            name: "CardType",
            model: "",
            purposeList: [1,2,3,4,5,6,7,8,9],
            popval:"卡类型",
            sendMsg: false,
            units: "",
            reg:/^[\u4e00-\u9fa5]{1,}$/,
            regular: /^[\u4e00-\u9fa5]{1,}$/,
            maxlength: "",
            type:"select"
          },
          {
            description: "开户城市：",
            placeholder: "请选择开户行所在城市",
            message: "请选择正确开户行所在城市",
            readonly:false,
            name: "CityName",
            model: "",
            purposeList: "",
            popval:"城市",
            sendMsg: false,
            units: "",
            reg:/^[\u4e00-\u9fa5]{1,}$/,
            regular: /^[\u4e00-\u9fa5]{1,}$/,
            maxlength: "",
            type:"select"
          },
          {
            description: "银行卡号：",
            placeholder: "请输入银行卡号",
            message: "请正确输入银行卡号",
            readonly:false,
            name: "bankCard",
            model: "",
            purposeList: false,
            sendMsg: false,
            units: "",
            reg: /^[0-9]{1,19}$/,
            regular: /^([1-9]{1})(\d{14}|\d{18})$/,
            maxlength: "19",
            type:"number"
          },
          {
            description: "手机号码：",
            placeholder: "请填写您在银行预留的手机号码",
            message: "请正确填写手机号码",
            readonly:false,
            name: "phoneNum",
            model: "",
            purposeList: false,
            sendMsg: false,
            units: "",
            reg: /^[0-9]{1,11}$/,
            regular: /^(13[0-9]|14[5|7]|15[0-9]|18[0-9]|17[0-9])\d{8}$/,
            maxlength: 11,
            type:"number"
          },
        ],
        mformDatasInd: 0,
        tieOnFooterIsShow: true
      }
    },

    components: {linkageMod},

    computed: {
      ...mapState(["lastOrderInfo","fuyou"]),
      shadeIsShowInd() {
        return this.shadeShow ? 3 : 0
      },
      changeCityFlag(){
        return this.cityFlag ? 4 : 0
      }
    },
    watch:{
      $route(to,from){
        console.log(arguments)
        if(to.name === "tieOnCardPage"){
          window.history.pushState(null, "", "#/myPage")
          window.history.pushState(null, "", "#/tieOnCardPage")
        }
      }
    },
    created() {
      this.$store.dispatch("GetAdCodes").then((res) => {
        if(res.success){
          this.cityData=res.data
        }
      }),
        this.$store.dispatch("GetBanks").then((res)=>{
          if(res.success){
            this.BanksList=res.data
          }
        })
      this.$store.dispatch("getLastOrderInfo").then(() => {
        if (this.lastOrderInfo) {
          if(this.lastOrderInfo.name !== ""){
            this.__findModel("userName").readonly = true
            this.__findModel("userName").model = this.lastOrderInfo.name
          }
          if(this.lastOrderInfo.idCard !== ""){
            this.__findModel("IDnumber").readonly = true
            this.__findModel("IDnumber").model = this.lastOrderInfo.idCard
          }else {
            this.__findModel("IDnumber").readonly = false
          }
          if(this.lastOrderInfo.identify4AuthBank !== ""){
            if(!!(this.$route.query&&this.$route.query.fou)){

            }else{
              this.__findModel("bankCard").model = this.lastOrderInfo.identify4AuthBank
            }
          }
        }
      })
    },
    mounted() {
      window.history.pushState(null, "", "#/myPage")
      window.history.pushState(null, "", "#/tieOnCardPage")

    },

    methods: {
      changeCityData(i,ic){
       this.__findModel("CityName").model=this.cityData[i].b+this.cityData[i].c[ic].b;
        console.log(this.cityData[i].b+this.cityData[i].c[ic].b)
        this.changeCityName=this.cityData[i].c[ic].b
        this.changeCityCode=this.cityData[i].c[ic].a
      },
      onValuesChange(index){
        this.changeBanksName= this.BanksList[index].text
        this.changeBanksCode= this.BanksList[index].value
        this.__findModel("CardType").model=this.changeBanksName
      },

      //用户输入
      __findModel(val) {
        let mformDatas = this.mformDatas
        return mformDatas.find((n) => n.name === val)
      },
      //底部显示逻辑失去焦点事件
      loseFocus() {
        this.tieOnFooterIsShow = true
      },
      goodInput(reg, flag, index) {
        let model = this.mformDatas[index].model
        if (!reg.test(flag)) {
          model = flag.substring(0, flag.length - 1)
        }
      },
      //弹窗挑起事件
      pullDown(e) {
        console.log(e.target.attributes.type.nodeValue);
        if(e.target.attributes.type.nodeValue=="select"){
          document.activeElement.blur()
          e.preventDefault();
          if(e.target.attributes.popval.nodeValue == "卡类型"){
            this.shadeShow = !this.shadeShow
          }else if(e.target.attributes.popval.nodeValue == "城市"){
            this.cityFlag = !this.cityFlag
          }
        }
        this.tieOnFooterIsShow = false
      },
      //提交
      approve() {
        let that = this
        for (let i = 0; i < this.mformDatas.length; i++) {
          let mformDatas = this.mformDatas[i]
          // debugger;
          if (mformDatas.model === "") {
            this.MessageBox.alert(mformDatas.placeholder, "提示")
            return
          }
          if (!mformDatas.regular.test(mformDatas.model)) {
            this.MessageBox.alert(mformDatas.message, "提示")
            return
          }
        }
        this.$store.commit("AWAITTRUE")
        if (!this.fuyou) {
          this.$store.dispatch("postIdentify4Auth", {
            realName: that.__findModel("userName").model,//真实姓名
            idCard: that.__findModel("IDnumber").model,//身份证
            bankCard: that.__findModel("bankCard").model,//银行卡号
            mobile: that.__findModel("phoneNum").model,//银行预留手机号
            bankName: that.changeBanksName,
            bankCode: that.changeBanksCode,
            cityName: that.changeCityName,
            cityCode: that.changeCityCode,
          }).then((res) => {
            this.$store.commit("AWAITFALSE")
            if (!res.success) {
              this.MessageBox.alert(res.message, "认证失败")
              return
            }
            if (res.data.isSame) {
              this.$router.replace({
                name: "authenticationPage", query: {
                  mobile: that.__findModel("phoneNum").model,
                  bankCard: that.__findModel("bankCard").model,//银行卡号
                  bankName: that.changeBanksName,
                  bankCode: that.changeBanksCode,
                  cityName: that.changeCityName,
                  cityCode: that.changeCityCode,
                }
              })
            } else {
              this.MessageBox.alert(res.message, "认证失败")
            }
          })
        }else{
          this.$store.dispatch("AddBankCard",{
            realName:that.__findModel("userName").model,//真实姓名
            idCard:that.__findModel("IDnumber").model,//身份证
            bankCard:that.__findModel("bankCard").model,//银行卡号
            mobile:that.__findModel("phoneNum").model,//银行预留手机号
            bankName:that.changeBanksName,
            bankCode:that.changeBanksCode,
            cityName:that.changeCityName,
            cityCode:that.changeCityCode,
          }).then((res)=>{
            this.$store.commit("AWAITFALSE")
            if(res.success){
              this.$router.replace({
                name: "authenticationPage", query: {
                  mobile: that.__findModel("phoneNum").model
                }
              })
            }else {
              this.MessageBox.alert(res.message,"失败")
            }
          })
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .tieOnCardHeader
    width (1080 /$rem)
    height (520 /$rem)
    img
      width 100%

  .tieOnCardContent
    width (1080 /$rem)
    .voidDiv
      height (150/$rem)
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
        input,.selectd
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
          background: url("../../../static/img/creditCardImg/dropdown.png") no-repeat right center
          background-size 100%
          padding-right: (40 /$rem)

    .authentication
      width (996 /$rem)
      height (146 /$rem)
      background-color #efca7d
      color #ffffff
      font-size (48 /$rem)
      text-align center
      line-height (146 /$rem)
      margin (100 /$rem) auto
      border-radius (20 /$rem)

  .maskLayer
    font-family "Microsoft YaHei UI"
    box-sizing border-box
    width (1080 /$rem)
    height (650 /$rem)
    .shadeIsShowHeader
      font-size (42 /$rem)
      height (120 /$rem)
      line-height (120 /$rem)
      .cancel
        margin-left (50 /$rem)
        float left
        color #bbb
      .ascertain
        margin-right (50 /$rem)
        float right
        color #efca7d

  .tieOnCardFooter
    width 100%
    height (150 /$rem)
    background-color #fff
    position fixed
    bottom 0
    left 0
    line-height (150 /$rem)
    text-align center
    font-size (36 /$rem)
    color #bbbbbb

</style>

<template>
  <div v-if="modelShow">
    <scroll>
      <div>
        <div class="loanContent">
          <img src="./img/banner.png">
          <keep-alive>
            <ul class="mform">
              <li v-for="(mformData, index) in mformDatas" :key="index">
                <span class="description">{{mformData.description}}</span>
                <input type="text" v-model="mformData.model"
                       :readonly="mformData.readonly"
                       @focus="pullDown(true,index)"
                       :placeholder="mformData.placeholder"
                       :maxlength="mformData.maxlength"
                       :name="mformData.name">
                <span :class="{purposeList:mformData.purposeList}" v-if="!mformData.sendMsg && !mformData.units"
                      @touchstart="pullDown(true,index)">
                {{mformData.units}}
              </span>
              </li>
            </ul>
          </keep-alive>
          <div class="propertyCase">
            <span>资产情况</span>
            <propertyMod :propertyModDatas="propertyModDatas"/>
          </div>
        </div>
        <div class="footerOccupied">
        </div>
      </div>
    </scroll>
    <mt-popup v-model="shadeIsShow" position="bottom" class="maskLayer">
      <pickerMod :pickerModDatas="pickerModDatas" :shadeIsShow="shadeIsShowInd" :closeShow="closeShow" :onValuesChange="onValuesChange"
                 v-show="mformDatasInd < 3"/>
      <linkageMod :linkageModDatas="provinceAndCity" :mformDatasInd="shadeIsShowInd" :closeShow="closeShow" :onValuesChange="ValuesChange"
                  v-show="mformDatasInd === 3"/>
    </mt-popup>
    <footer class="simulationSubmit" @click="submit">
      <a href="javascript:"></a>
    </footer>
  </div>
</template>

<script>
  import propertyMod from '../../components/propertyMod/propertyMod.vue'
  import linkageMod from '../../components/linkageMod/linkageMod.vue'
  import {getLoanAmount, postLoanDemand} from '../../api'
  import {mapState, mapGetters} from "vuex"
  import provinceAndCity from "../../common/js/city"
  export default {
    data() {
      return {
        propertyModDatas: [
          {
            character: '我有房',
            imgUrlIsShow: false,
          },
          {
            character: '我有车',
            imgUrlIsShow: false,
          },
          {
            character: '我有信用卡',
            imgUrlIsShow: false,
          },
          {
            character: '我有公积金',
            imgUrlIsShow: false,
          },
          {
            character: '我有社保',
            imgUrlIsShow: false,
          }
        ],
        mformDatas: [
          {
            description: '贷款金额：',
            readonly: true,
            placeholder: '请选择贷款金额',
            name: 'money',
            model: '',
            purposeList: true,
            sendMsg: false,
            units: '',
            reg: /[\s\S]/,
            regular: /[\s\S]/,
            errorColor: false,
          },
          {
            description: '贷款期限：',
            placeholder: '请选择贷款期限',
            name: 'timeLimit',
            model: '',
            purposeList: true,
            sendMsg: false,
            units: '',
            reg: /[\s\S]*/,
            regular: /[\s\S]/,
            errorColor: false,
            readonly: true,
          },
          {
            description: '贷款用途：',
            placeholder: '请选择贷款用途',
            name: 'purpose',
            model: '',
            purposeList: true,
            sendMsg: false,
            units: '',
            reg: /[\s\S]*/,
            regular: /[\s\S]/,
            errorColor: false,
            readonly: true,
          },
          {
            description: '所在城市：',
            placeholder: '请选择所在城市',
            name: 'city',
            model: '',
            purposeList: true,
            sendMsg: false,
            units: '',
            reg: /[\s\S]*/,
            regular: /[\s\S]/,
            errorColor: false,
            readonly: true,
          },
          {
            message: "请正确输入您的姓名",
            description: '姓名：',
            placeholder: '请输入您的姓名',
            name: 'userName',
            model: '',
            purposeList: false,
            sendMsg: false,
            units: '',
            reg: /^[\u4e00-\u9fa5]{1,15}$/,
            regular: /^[\u4e00-\u9fa5]{1,15}$/,
            errorColor: false,
            maxlength: '15',
            readonly: true,
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
            maxlength: '18',
            readonly: true,
          },
          {
            message: "请正确输入您的手机号",
            description: '手机号：',
            placeholder: '请输入您的手机号',
            name: 'phoneNum',
            model: '',
            purposeList: false,
            sendMsg: false,
            units: '',
            reg: /^[0-9]{1,}$/,
            regular: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0-9])\d{8}$/,
            errorColor: false,
            maxlength: '11',
            readonly: true,
          },
        ],
        shadeIsShow: false,
        mformDatasInd: 0,
        pickerModDatas: [],
        cityValue:null,
        modelShow:false
      }
    },
    components: {
      propertyMod, linkageMod
    },
    watch: {
    },
    computed: {
      ...mapState(["time", "lastOrderInfo"]),
      ...mapGetters(["key"]),
      shadeIsShowInd() {
        return this.shadeIsShow ?
          this.mformDatasInd < 3 ?
            3
            : 4
          : null
      },
      provinceAndCity(){
        return provinceAndCity
      }
    },
    beforeCreate() {

    },
    created() {
      let num=this.getCookie("whether") * 1
      if (num > 1) {
        this.getLoanAmount("LoanAmount").then((res) => {
          this.moneyArr = res
        })
        this.getLoanAmount("LoanTerm").then((res) => {
          this.deadlineArr = res
        })
        this.getLoanAmount("LoanUse").then((res) => {
          this.consumeArr = res
        }).then(()=>{
          this.modelShow = true
        })
        this.$store.dispatch("getLastOrderInfo").then(() => {
          if (this.lastOrderInfo) {
            this.__findModel("userName").model = this.lastOrderInfo.name
            this.__findModel("IDnumber").model = this.lastOrderInfo.idCard
            this.__findModel("phoneNum").model = this.lastOrderInfo.mobilePhone
          }
        })
      }

    },
    mounted() {
    }
    ,
    updated() {

    }
    ,
    methods: {
      //选择组件显示
      closeShow(){
        this.shadeIsShow = false
      },
      //ValuesChange 二级联动
      ValuesChange(select, pitchOn) {
        let city = this.provinceAndCity[select]
        this.mformDatas[this.mformDatasInd].model = city.text + " " + city.childrens[pitchOn].text
        this.cityValue = city.childrens[pitchOn].value
      },
//      输入框值
      onValuesChange(index) {
//        debugger
        this.mformDatas[this.mformDatasInd].model = this.pickerModDatas[index].name
        switch (this.mformDatasInd) {
          case 0:
            this.applyAmount = this.moneyArr[index].code
            break
          case 1:
            this.consume = this.consumeArr[index].code
            break
          case 2:
            this.applyTerm = this.deadlineArr[index].code
            break
          default:
            break
        }
      },
      //获取用户输入的内容
      __findModel(value) {
        let mformDatas = this.mformDatas
        return mformDatas.find(val => val.name == value)
      },
      //下拉列表数据
      async getLoanAmount(codes) {
        let url = this.apiPrefix + '/api/Values/GetSelectDataSourceLogin'
        this.Arr = await getLoanAmount(url, {codes: codes})
        let Arr = []
        Arr = this.Arr.data.map((item) => {
          return item.childrens
        })
        Arr.forEach((item) => {
          Arr = item
        })
        return Arr
      },
      //提交
      submit() {
        let propertyModDatas = this.propertyModDatas
        for (let i = 0; i < this.mformDatas.length; i++) {
          let item = this.mformDatas[i]
          if (item.model === "") {
            this.MessageBox.alert(
              item.placeholder,
              '提交失败',
              {
                closeOnClickModal: true
              }
            )
            return
          } else if (!item.regular.test(item.model)) {
            this.MessageBox.alert(
              item.message,
              '提交失败',
              {
                closeOnClickModal: true
              }
            )
            return
          }
        }
        this.$store.commit("AWAITTRUE")
        let that = this
        let url = this.apiPrefix + "api/OfficialAccounts/InsertLoanDemand"
        this.$store.dispatch("getIdentify2Auth", {
          realName: that.__findModel("userName").model,
          idCard: that.__findModel("IDnumber").model
        }).then((res) => {
          if (res.data.isSame) {
            postLoanDemand(url, {
              loanDemand: {
                applyAmount: that.applyAmount, //贷款金额编码
                purpose: that.consume,//贷款用途编码
                applyTerm: that.applyTerm, //贷款期限编码
                name: that.__findModel("userName").model,  //贷款人
                idCard: that.__findModel("IDnumber").model,  //身份证
                telphone: that.__findModel("phoneNum").model,  //手机
                city:that.cityValue,//城市
                house: propertyModDatas[0].imgUrlIsShow, //有房
                car: propertyModDatas[1].imgUrlIsShow,  //有车
                creditCard: propertyModDatas[2].imgUrlIsShow,//有信用卡
                providentFund: propertyModDatas[3].imgUrlIsShow, //有公积金
                socialSecurity: propertyModDatas[4].imgUrlIsShow //有社保
              },
              phone: that.__findModel("phoneNum").model,  //手机
              verifyCode: "0000", //验证码
              source: "OfficialAccounts"
            }).then(res => {
              this.$store.commit("AWAITFALSE")
              if (res.success) {
                this.MessageBox.alert(
                  "您的贷款需求已提交，请等待业务经理跟您联系。",
                  '申请成功',
                  {
                    closeOnClickModal: true
                  }
                ).then(()=>{
                  this.$router.push({name:"homePage"})
                })
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

//      三角点击
      pullDown(flag, index, inputValue) {
        this.mformDatasInd = index
        if (this.mformDatas[index].purposeList) {
          switch (index) {
            case 0:
              this.pickerModDatas = this.moneyArr
              break
            case 1:
              this.pickerModDatas = this.deadlineArr
              break
            case 2:
              this.pickerModDatas = this.consumeArr
              break
            default:
              this.pickerModDatas = []
              break
          }
          this.shadeIsShow = flag
        }

      },
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .footerOccupied
    width (1080 /$rem)
    height (146 /$rem)

  .loanContent
    img
      width (1080 /$rem)
      height (520 /$rem)
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

    .propertyCase
      width (1030 /$rem)
      margin (40 /$rem) (30 /$rem) (40 /$rem)
      span
        font-size (42 /$rem)
        color #333333

  .simulationSubmit
    position fixed
    bottom 0
    left 0
    z-index 11
    a
      width (1080 /$rem)
      height (146 /$rem)
      background-image url("./img/shenqing.png")
      background-repeat no-repeat
      background-size 100%

  .maskLayer
    font-family "Microsoft YaHei UI"
    box-sizing border-box
    width (1080 /$rem)
    height (674 /$rem)


</style>

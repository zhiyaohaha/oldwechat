<template>
  <div v-if="productDetailsPageData">
    <scroll>
      <div v-if="productDetailsPageData">
        <header class="productDetailsHeader clear">
          <div class="imgWrap">
            <img :src="productDetailsPageData.basic._logo">
          </div>
          <div class="describe">
            <div class="productTitle">{{productDetailsPageData.basic.name}}</div>
            <div class="interest">
              月利率: <span class="price">{{toPercent(productDetailsPageData.basic.monthlyRate_min)+'-'+toPercent(productDetailsPageData.basic.monthlyRate_max)}}</span>
              <!--<div class="limit">-->
              <!--额度范围:{{productDetailsPageData.filter.amount_min+'-'+productDetailsPageData.filter.amount_max}}-->
              <!--</div>-->
              <div class="lightspot">{{productDetailsPageData.summary}}</div>
              <div class="clear">
                <star :score="productDetailsPageData.hot"></star>
                <div class="applyNum fr">已申请：{{$route.query.applyCount}}人</div>
              </div>
            </div>
          </div>
        </header>
        <!--用户测试还款额-->

        <div class="productDetailContent">
          <!--带款计算器-->
          <div class="payAmount">
            <div class="clear limitDuration">
              <div class="first clear">
                <p class="fl">额度<input @change="moneyChange" @focus="moneyFocus" v-model="money" type="number"
                                       :min="productDetailsPageData.filter.amount_min"
                                       :max="productDetailsPageData.filter.amount_max">元</p>
                <p @click="shadeIsShow" class="fr">期限 <b>{{term}}</b>{{productDetailsPageData.filter._termType=="月"?"个月":productDetailsPageData.filter._termType}} <i><img
                  src="../../../static/img/basics/arrow_03.png" alt=""></i></p>
              </div>
              <div class="second clear">
                <div class="fl">
                  额度范围：{{productDetailsPageData.filter.amount_min}}-{{productDetailsPageData.filter.amount_max}} 元
                </div>
                <div class="fr">
                  期限范围：{{productDetailsPageData.filter.term_min}}-{{productDetailsPageData.filter.term_max}}{{productDetailsPageData.filter._termType}}
                </div>
              </div>
              <div class="third clear">
                <div class="fl">{{productDetailsPageData.filter._termType=="天"?"日":productDetailsPageData.filter._termType}}还款：<span>{{payment}}元</span></div>
                <div class="fr">{{productDetailsPageData.filter._termType=="天"?"日":productDetailsPageData.filter._termType}}利率：<span>{{toPercent(productDetailsPageData.basic.monthlyRate_min)}}</span></div>
              </div>
            </div>
          </div>
          <arrowContentMod :datas="productDetailsPageData.filter.applicationConditions.replace(/(^\s*|^\n*)|(\s*$|\n*$)/g, '').split('\n')"
                           :headData="{title:'申请条件',line:true ,arrow:true}"
                           v-if="productDetailsPageData.filter.applicationConditions"></arrowContentMod>
          <arrowContentMod :datas="productDetailsPageData.needMaterialDescription.replace(/(^\s*|^\n*)|(\s*$|\n*$)/g, '').split('\n')"
                           :headData="{title:'所需材料',line:true,arrow:true}"
                           v-if="productDetailsPageData.needMaterialDescription"></arrowContentMod>
          <headline :headlineData="{title:'认证材料',line:true,arrow:false}"/>
          <authenticationList :authenticationListDatas="productDetailsPageData.attachment"/>
          <arrowContentMod :datas="productDetailsPageData.description.replace(/(^\s*|^\n*)|(\s*$|\n*$)/g, '').split('\n')"
                           :headData="{title:'详细说明',line:true}"
                           v-if="productDetailsPageData.description"></arrowContentMod>
        </div>
        <footer class="occupiedFooter"></footer>
      </div>
    </scroll>
    <footer class="productDetailsFooter" @click="applyFor">
      <a href="javascript:">
        立即申请
      </a>
    </footer>
    <mt-popup v-model="shadeShow" position="bottom" class="maskLayer">
      <pickerMod :pickerModDatas="Arr" :shadeIsShow="shadeIsShowInd" :closeShow="()=>{shadeShow = !shadeShow}" :onValuesChange="onValuesChange"/>
    </mt-popup>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import {postSpeedOrder} from "../../api"
  import authenticationList from "../../components/authenticationList/authenticationList.vue"
  import arrowContentMod from "../../components/arrowContentMod/arrowContentMod"
  import star from "../../components/star/star"

  export default {
    data() {
      return {

        num: 0,
        data: null,
        money: 0,  //计算额度
        payment: 0,//还款额,
        shadeShow: false, //弹窗显示
        Arr: [],
        term: 0
      }
    },
    components: {
      authenticationList, star, arrowContentMod
    },

    computed: {
      ...mapState(['productDetailsPageData', 'lastOrderInfo']),
      shadeIsShowInd() {
        return this.shadeShow ? 3 : 0
      }
    },
    watch: {
      term(val){
        this.computeRepayment()
      }
    },
    created() {
      let that = this
      //请求产品详情
      this.$store.dispatch("getDetailedFor", {id: this.$route.query.id}).then(() => {
        this.money = this.productDetailsPageData.filter.amount_max;
        let terms = this.productDetailsPageData.filter.terms, unit = this.productDetailsPageData.filter._termType
        terms = terms.length == 0 ? [3, 6, 9, 12] : terms
        this.term = terms[terms.length - 1]
        unit = unit=="月"?"个月":unit
        terms.forEach((it, ind) => {
          this.Arr.push(it + unit)
        })
      })
      //获取用户信息
      this.$store.dispatch("getLastOrderInfo").then(() => {
        if (this.lastOrderInfo) {
          this.data = {
            mobilePhone: that.lastOrderInfo.mobilePhone,  //手机
            idCard: that.lastOrderInfo.idCard,  //身份证
            name: that.lastOrderInfo.name,   //姓名
            product: that.$route.query.id,  //产品Id
            source: 'OfficialAccounts'  //来源
          }
        }
      })
    },
    mounted() {
    },
    updated() {
      this.computeRepayment()
    },
    methods: {
      //关闭model层
      closeShow(){
        this.shadeShow = false
      },
      shadeIsShow() {
        this.shadeShow = true
      },
      onValuesChange(index) {
        this.term = parseInt(this.Arr[index]);
        this.computeRepayment()
      },
      //input获得焦点清除value事件
      moneyFocus() {
        this.money = ""
      },
      moneyChange() {
        if (this.money < this.productDetailsPageData.filter.amount_min) {
          this.money = this.productDetailsPageData.filter.amount_min
        } else if (this.money > this.productDetailsPageData.filter.amount_max) {
          this.money = this.productDetailsPageData.filter.amount_max
        }
      },
      //计算贷款月还款
      computeRepayment() {
      if(this.productDetailsPageData.filter._termType =="天" ){
          this.payment = Math.ceil(Math.round((this.productDetailsPageData.basic.monthlyRate_min * this.money/30 + this.money / this.term) * 100)) / 100
        }else{
          this.payment = Math.ceil(Math.round((this.productDetailsPageData.basic.monthlyRate_min * this.money + this.money / this.term) * 100)) / 100
        }

      },
      //申请
      applyFor() {
        let data = this.data,
          url = this.apiPrefix + "api/LoanOrder/SpeedOrderRecordForApp",
          that = this,
          num = this.getCookie('whether') * 1
        if (num === 1) {
          this.MessageBox.confirm('请确认个人信息后继续办理业务', "提示").then(() => {
            this.$router.push({name: 'personalDataPage', query: {id: that.$route.query.id}, params: {urlIsSkip: true}})
          })
        } else {
          postSpeedOrder(url, data).then((res) => {
            this.$store.commit("AWAITFALSE")
            if (res.success) {
              window.location.href = res.data.url
            } else {
              this.MessageBox({
                title: '提交失败',
                message: res.message,
                showCancelButton: false
              })
            }
          })
        }
      },
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .productDetailsHeader
    box-sizing border-box
    height (342 /$rem)
    padding (50 /$rem) 0 (50 /$rem) (30 /$rem)
    border-bottom 1px solid #f2f2f2
    & > div
      float left
      &.imgWrap
        font-size (40 /$rem)
        width (180 /$rem)
        height (180 /$rem)
        img
          width 100%
          height 100%
      &.describe
        color #333
        box-sizing border-box
        width (810 /$rem)
        font-size (36 /$rem)
        margin-top (6 /$rem)
        margin-left (30 /$rem)
        .productTitle
          font-size (42 /$rem)
        .interest
          margin-top (30 /$rem)
          color #bbbbbb
        .limit
          color #bbbbbb
          margin-top (30 /$rem)
        .lightspot
          color #bbbbbb
          margin (30 /$rem) 0
          .applyNum
            color #333
            font-size (36 /$rem)


  .productDetailContent
    .payAmount
      /* padding (50 / $rem) (60 / $rem)*/
      padding (50 / $rem) 0
      .limitDuration
        .first,.second,.third
          padding 0 (60 / $rem)
        .fl, .fr
          width (400 /$rem)
          text-align center
        p
          height (100 /$rem)
          line-height (100 /$rem)
          font-size (42 /$rem)
          color #333
          border-radius 15px
          border 1px solid #efca7d
          margin-bottom (30 /$rem)
          vertical-align center
          i
            display inline-block
            width (30/$rem)
            height (30/$rem)
            img
              width 100%
              height 100%
              transform rotate(180deg)
          input
            display inline-block
            width (170 /$rem)
            text-align center
            color #efca7d
            border 0
            outline none
          b
            color #efca7d
        .second
          font-size (30 /$rem)
          color #bbb
          display block
          margin-bottom (50 /$rem)
        .third
          height (100/$rem)
          border 1px solid #f2f2f2
          font-size (36 /$rem)
          &>div
            line-height (100/$rem)
          span
            color #efca7d
  .setting
    height (600 /$rem)
    background-color: #f6f6f6

  .occupiedFooter
    width (1080 /$rem)
    height (146 /$rem)

  .productDetailsFooter
    width (1080 /$rem)
    height (146 /$rem)
    position fixed
    bottom 0
    left 0
    a
      height 100%
      background-color: #efca7d
      font-size (48 /$rem)
      color #ffffff
      text-align center
      line-height (146 /$rem)

  .maskLayer
    font-family "Microsoft YaHei UI"
    box-sizing border-box
    width (1080 /$rem)
    height (674 /$rem)
</style>

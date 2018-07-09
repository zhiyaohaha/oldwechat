<template>
  <div class="depositPage" v-if="data">
    <div class="myPageContents" v-if="income">
      <a href="javascript:;" class="generalIncome">
        <span class="describe">累计收入</span>
        <span class="unit">￥<span class="price">{{income.totalBalance}}元</span></span>
      </a>
      <a href="javascript:;" class="withdrawDeposit">
        <span class="describe">账户余额</span>
        <span class="unit">￥<span class="price">{{income.withdrawBalance}}元</span></span>
      </a>
    </div>

    <header class="depositPageHeader">
      <div :class="{active:headerDatasIndex === index}"
           v-for="(headerData, index) in headerDatas" :key="index" @click="changeColor(index,headerData)">
        {{headerData.title}}
      </div>
    </header>
    <scroll :scrollReset="headerDatasIndex"
            :data="data"
            :pullup="true"
            @scrollToEnd="loadData(headerDatasIndex)" style="overflow: hidden">
      <div>
        <div class="drawMoneyWrap">
          <transition name="inProgress">
            <drawMoney :drawMoneyDatas="inProgressWithDrawRecord" v-show="headerDatasIndex === 0" class="drawMoney"/>
          </transition>
          <transition name="succeed">
            <drawMoney :drawMoneyDatas="succeedWithDrawRecord" v-show="headerDatasIndex === 1" class="drawMoney"/>
          </transition>
          <transition name="fold">
            <drawMoney :drawMoneyDatas="defeatedWithDrawRecord" v-show="headerDatasIndex === 2" :lowerShow="true" class="drawMoney"/>
          </transition>
        </div>
        <footline :title="footlineTitle"/>
      </div>
    </scroll>
  </div>
</template>

<script>
  import drawMoney from "../../components/drawMoney/drawMoney.vue"
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        headerDatas: [
          {
            title: "提现中",
            status:"Processing",
            name:"inProgressWithDrawRecord"
          },
          {
            title: "提现成功",
            status:"TradeState.Success",
            name:"succeedWithDrawRecord"
          },
          {
            title: "提现失败",
            status:"TradeState.Fail",
            name:"defeatedWithDrawRecord"
          }
        ],
        headerDatasIndex: 0,
        footlineTitle: "查看更多",
        data: null,
      }
    },

    components: {
      drawMoney
    },
    computed: {
        ...mapState(["income"]),
      inProgressWithDrawRecord:{
        get(){
          return this.$store.state.inProgressWithDrawRecord
        },
        set(){

        }
      },
      succeedWithDrawRecord: {
        get() {
          return this.$store.state.succeedWithDrawRecord
        },
        set() {

        }
      },
      defeatedWithDrawRecord: {
        get() {
          return this.$store.state.defeatedWithDrawRecord
        },
        set() {
        }
      }
    },
    watch: {
      data(val){
        if(val){
          if(val.length < 1){
            this.footlineTitle = "暂无数据"
          }else {
            this.footlineTitle = "查看更多"
          }
        }
      }
    },
    created() {
      this.$store.dispatch("getWithDrawRecord", {
        id: "",
        tradeStatus: "Processing",
        size: 10
      }).then(() => {
        this.data = this.inProgressWithDrawRecord
        this.inProgressWithDrawRecord.length < 1 ? this.footlineTitle = "暂无数据" : this.footlineTitle = "查看更多"
      })
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      //tab切换
      changeColor(index,headerData) {
        this.headerDatasIndex = index
        console.log(this.data);    //this.data
        this.$store.dispatch("getWithDrawRecord", {
          id: "",
          tradeStatus: headerData.status,
          size: 10
        }).then(() => {
          this.data = this[headerData.name]
        })

        /*if (!this.conceal) {
          this.$store.dispatch("getWithDrawRecord", {
            id: "",
            tradeStatus: "TradeState.Fail",
            size: 10
          }).then(() => {
            this.data = this.defeatedWithDrawRecord
            this.defeatedWithDrawRecord.length < 1 ? this.footlineTitle = "暂无数据" : this.footlineTitle = "查看更多"
          })
        } else {
          this.data = this.succeedWithDrawRecord
        }*/
      },
      //下拉加载
      loadData(index) {
        let time, Arr, tradeStatus,that =this
        tradeStatus = this.headerDatas[index].status
        Arr = this[that.headerDatas[index].name]
        //判断是交易失败还是成功
        if (this.footlineTitle === "查看更多") {
          this.footlineTitle = "加载中"
          this.$store.dispatch("getWithDrawRecord", {
            id: Arr[Arr.length - 1].id,
            tradeStatus: tradeStatus,
            size: 10
          }).then((res) => {
            if (res.length > 0) {
              time = setTimeout(() => {
                Arr.push(...res)
                this.footlineTitle = "查看更多"
                clearTimeout(time)
              }, 500)
            } else {
              time = setTimeout(() => {
                this.footlineTitle = "没有更多数据啦"
                clearTimeout(time)
              }, 500)
            }
          })
        }
      }
    },
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .depositPage
    .myPageContents
      box-sizing border-box
      /*position absolute*/
      width (790 /$rem)
      height (230 /$rem)
      /*top (460 /$rem)
      left (145 /$rem)*/
      padding 0 (105 /$rem)
      margin (60/$rem) 0 (60/$rem) (145/$rem)
      background-color: #fff;
      border-radius (10 /$rem)
      box-shadow 0 0 (64 /$rem) rgba(0, 0, 0, 0.19)
      /*z-index 1*/
      a
        box-sizing border-box
        float left
        text-align center
        width (289 /$rem)
        margin-top (60 /$rem)
        span
          font-size (34 /$rem)
          &.describe
            display block
            font-size (40 /$rem)
          &.unit
            text-align bottom
          &.price
            margin-top (30 /$rem)
            font-size (42 /$rem)
            color #efca7d
    .drawMoneyWrap
      width (2160 /$rem)
      overflow hidden
      .drawMoney
        float left
        width (1080 /$rem)
    .depositPageHeader
      border-bottom 1px solid #f2f2f2
      width (1080 /$rem)
      height (110 /$rem)
      div
        box-sizing border-box
        float left
        //width (540 /$rem)
        width (360/$rem)
        height (110 /$rem)
        background-color #fff
        font-size (46 /$rem)
        color #333
        text-align center
        line-height (110 /$rem)
        transition all 0.5s
        &.active
          color #efca7d
    .fold-enter-active, .fold-leave-active {
      transition: all 0.3s
    }
    .fold-enter, .fold-leave-active {
      transform: translateX(100%)
    }
    .succeed-enter-active {
      transition: all .3s
    }
    .succeed-enter {
      transform: translateX(-100%)
    }
</style>

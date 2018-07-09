<template>
  <div class="creditCard">
    <transition name="action">
      <router-view/>
    </transition>
    <scroll class="wrapper"
            :data="creditListBankCard"
            :pullup="true"
            @scrollToEnd="loadData"
            v-if="creditListBankCard">
      <div>
        <div class="allBank">
          <allBankList :allBankListDatas="listBanks"/>
          <footer class="allBankFooter">
            <div class="line"></div>
            <div class="character">即将开放更多信用卡</div>
            <div class="line"></div>
          </footer>
        </div>
        <div class="recommend">
          <header class="recommendHeader">
            <span>推荐信用卡</span>
          </header>
          <div class="line"></div>
          <recommendList :recommendListDatas="creditListBankCard" class="content"/>
        </div>
        <footline :title="footlineTitle"/>
      </div>
    </scroll>
  </div>
</template>

<script>
  import headline from "../../components/headline/headline.vue"
  import allBankList from "../../components/allBankList/allBankList.vue"
  import recommendList from "../../components/recommendList/recommendList.vue"
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        CardPageHeaderListDatas: [
          {
            imgUrl: "../../../static/img/creditCardImg/repayment.png",
            character: "帮你还款"
          },
          {
            imgUrl: "../../../static/img/creditCardImg/speedofprogress.png",
            character: "进度查询"
          },
          {
            imgUrl: "../../../static/img/creditCardImg/raiders.png",
            character: "用卡攻略"
          },
          {
            imgUrl: "../../../static/img/creditCardImg/bankingservices.png",
            character: "银行服务"
          },
        ],
        footlineTitle: "下拉查看更多"
      }
    },

    components: {
      headline, allBankList, recommendList
    },

    computed: {
      ...mapState(["listBanks"]),
      creditListBankCard: {
        get: function () {
          return this.$store.state.creditListBankCard
        },
        set: function () {
        }
      }
    },
    created() {
      this.bank = ""
      let that = this
      if (!this.creditListBankCard) {
        if (this.listBanks) {
          console.log("经过首页")
          this.listBanks.forEach((item) => {
            this.bank += item.id + ","
          })
          this.$store.dispatch("getListBankCard", {
            data: {
              id: '',//最后一条Id，第一次请求不用传
              bank: that.bank,//银行id，多个则逗号分隔，不传则不进行筛选
              size: 10//每页展示数量
            },
            site: "credit"
          })
        } else {
          console.log("没有经过首页")
          this.$store.dispatch("getListBanks").then((res) => {
            res.forEach((item) => {
              this.bank += item.id + ","
            })
            this.$store.dispatch("getListBankCard", {
              data: {
                id: '',//最后一条Id，第一次请求不用传
                bank: that.bank,//银行id，多个则逗号分隔，不传则不进行筛选
                size: 10//每页展示数量
              },
              site: "credit"
            })
          })
        }
      }
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      //下拉加载逻辑
      loadData() {
        let that = this
        if (this.footlineTitle === "没有更多数据拉" || this.footlineTitle === "加载中") {
          return
        } else if (this.footlineTitle === "下拉查看更多") {
          this.footlineTitle = "加载中"
          this.$store.dispatch("getListBankCard", {
            data: {
              id: that.creditListBankCard[that.creditListBankCard.length - 1].id,//最后一条Id，第一次请求不用传
              bank: that.bank,//银行id，多个则逗号分隔，不传则不进行筛选
              size: 10//每页展示数量
            },
            site: "newCredit"
          }).then((res) => {
            if (res.length > 0) {
              let time = setTimeout(() => {
                this.creditListBankCard.push(...res)
                this.footlineTitle = "下拉查看更多"
                clearTimeout(time)
              }, 1000)
            } else {
              let time = setTimeout(() => {
                this.footlineTitle = "没有更多数据拉"
                clearTimeout(time)
              }, 1000)
            }
          })
        }

      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .creditCard
    .action-enter-active, .action-leave-active {
      transition: all .3s;
    }
    .action-enter, .action-leave-active {
      transform: translateX(100%)
    }
    .creditCardPageHeader
      width (1080 /$rem)
      height (330 /$rem)
      background-color #00aeff
      .CardPageHeaderList
        height (330 /$rem)
        display -webkit-flex
        display flex
        justify-content: space-around
        align-items: center;
        li
          text-align center
          font-size (36 /$rem)
          color #ffffff
          img
            display inline-block
            height (90 /$rem)
          span
            color #ffffff
            display block
            margin-top (60 /$rem)

    .allBank
      .allBankFooter
        height (101 /$rem)
        padding (0) (80 /$rem)
        box-sizing border-box
        border-bottom 1px solid #f2f2f2
        div
          float left
          &.line
            margin-top (50 /$rem)
            background-color #f2f2f2
            height 1px
            width (240 /$rem)
          &.character
            margin (36 /$rem) (50 /$rem)
            font-size (30 /$rem)
            color #bbbbbb

    .recommend
      .recommendHeader
        position relative
        height (126 /$rem)
        line-height (126 /$rem)
        width (1080 /$rem)
        span
          position absolute
          font-size (46 /$rem)
          color #333
          left (30 /$rem)
      .line
        width (1080 /$rem)
        height 1px
        background-color: #f2f2f2;
</style>

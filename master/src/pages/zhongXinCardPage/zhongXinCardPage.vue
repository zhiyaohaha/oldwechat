<template>
  <div>
    <scroll class="wrapper"
            :data="ALLListBankCard"
            :pullup="true"
            @scrollToEnd="loadData"
    >
      <div>
        <cardHeadLine :cardHeadLineData="cardHeadLineData"/>
        <recommendList :recommendListDatas="ALLListBankCard"/>
        <footline :title="footlineTitle"/>
      </div>
    </scroll>
  </div>
</template>

<script>
  import cardHeadLine from "../../components/cardHeadLine/cardHeadLine.vue"
  import recommendList from "../../components/recommendList/recommendList.vue"

  export default {
    data() {
      return {
        cardHeadLineData: {
          title: "全部信用卡",
          aFont: ""
        },
        footlineTitle: "查看更多"
      }
    },

    components: {
      cardHeadLine, recommendList
    },

    computed: {
      ALLListBankCard: {
        get: function () {
          return this.$store.state.ALLListBankCard
        },
        set: function () {
        }
      }
    },
    created() {
      let that = this
      this.$store.dispatch("getListBankCard", {
        data: {
          id: "",//最后一条Id，第一次请求不用传
          bank: that.$route.query.id,//银行id，多个则逗号分隔，不传则不进行筛选
          size: 10//每页展示数量
        },
        site: "all"
      })
    },
    mounted() {
    },
    updated() {
      this.loadData()
    },
    methods: {
      //下拉加载逻辑
      loadData() {
        let that = this
        if (this.ALLListBankCard.length > 1) {
          if (this.footlineTitle !== "没有更多数据拉") {
            this.footlineTitle = "加载中"
            this.$store.dispatch("getListBankCard", {
              data: {
                id: that.ALLListBankCard[that.ALLListBankCard.length - 1].id,//最后一条Id，第一次请求不用传
                bank: that.$route.query.id,//银行id，多个则逗号分隔，不传则不进行筛选
                size: 10//每页展示数量
              },
              site: "newCredit"
            }).then((res) => {
              if (res.length > 0) {
                let time = setTimeout(() => {
                  this.ALLListBankCard = this.ALLListBankCard.push(...res)
                  clearTimeout(time)
                }, 500)
              } else {
                let time = setTimeout(() => {
                  this.footlineTitle = "没有更多数据拉"
                  clearTimeout(time)
                }, 1000)
              }
            })
          }
        }else {
          this.footlineTitle = "暂无内容"
        }

      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
</style>

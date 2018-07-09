<template>
  <div>
    <router-view/>
    <scroll class="wrapper"
            :data="recommendDatas"
            :pullup="true"
            @scrollToEnd="loadData"
            ref="wrapper"
    >
      <div v-show="$route.meta.isTop">
        <header class="productPageHeader">
          <img src="./img/banner.png">
        </header>
        <headline :headlineData="{title:'抵押贷款',line:true}"/>
        <mortgageMod :mortgageModDatas="mortgageModDatas"/>
        <headline :headlineData="{title:'贷款产品',line:true}"/>
        <recommendMod :recommendModDatas="recommendDatas"/>
        <footline :title="footlineTitle"/>
      </div>
    </scroll>
  </div>
</template>

<script>
  import recommendMod from "../../components/recommendMod/recommendMod.vue"
  import mortgageMod from "../../components/mortgageMod/mortgageMod.vue"
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        mortgageModDatas: [
          {
            url:{name:"loanPage"},
            imgUrl: "../../../static/img/productImg/fangdidai.png",
            name: "房抵贷"
          },
          {
            url:{name:"loanPage"},
            imgUrl: "../../../static/img/productImg/chedidai.png",
            name: "车抵贷"
          },
        ],
        footlineTitle: "查看更多"
      }
    },

    components: {
      recommendMod, mortgageMod
    },

    computed: {
      recommendDatas: {
        get() {
          return this.$store.state.recommendDatas
        },
        set() {

        }
      }
    },
    created() {
      if (!this.recommendDatas) {
        this.$store.dispatch("getListForApp", {
          name: 'LoanProductType.Speed',
          id: "",
          size: 10,
          hot: false
        })
      }

    },
    mounted() {
    },
    updated() {
    },
    methods: {
      //下拉刷新逻辑
      loadData() {
        if (this.footlineTitle === "没有更多数据啦" || this.footlineTitle === "加载中") {
          return
        } else if (this.footlineTitle === "查看更多") {
          this.footlineTitle = "加载中"
          this.$store.dispatch("getListForApp", {
            name: 'LoanProductType.Speed',
            id: this.recommendDatas[this.recommendDatas.length - 1].id,
            size: 10,
            hot: false
          }).then(res => {
            if (res.length > 1) {
              let time = setTimeout(() => {
                this.recommendDatas.push(...res)
                this.footlineTitle = "查看更多"
                clearTimeout(time)
              }, 1000)
            } else {
              let time = setTimeout(() => {
                this.footlineTitle = "没有更多数据啦"
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
  .productPageHeader
    img
      width 100%
      height (500 /$rem)
</style>

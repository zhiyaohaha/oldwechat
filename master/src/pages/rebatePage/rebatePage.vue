<template>
  <div>
    <header class="orderFormTap">
      <a href="javascript:;" :class="{active:orderFormInd === index}"
         v-for="(orderFormTapData, index) in orderFormTapDatas" :key="index"
         @click="changeColor(index)">
        {{orderFormTapData.title}}<span class="manNumber" v-if="orderFormTapData.manNumber >= 0 ">({{orderFormTapData.manNumber}})</span>
      </a>
    </header>
    <scroll class="wrapper"
            :data="rakeBackInfo? rakeBackInfo.result :[]"
            :pullup="true"
            @scrollToEnd="loadData">
      <div>
        <rebateList :rebateListDatas="rakeBackInfo"/>
        <footline :title="footlineTitle"/>
      </div>
    </scroll>
  </div>
</template>
<script>
  import rebateList from "../../components/rebateList/rebateList.vue"
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        orderFormTapDatas: [
          {
            title: "一级代理",
            manNumber: null
          },
          {
            title: "二级代理",
            manNumber: null
          },
          {
            title: "三级代理",
            manNumber: null
          },
        ],
        orderFormInd: 0,
        footlineTitle: "上拉加载更多"
      }
    },

    components: {
      rebateList
    },

    computed: {
      rakeBackInfo:{
        get(){
          return this.$store.state.rakeBackInfo
        },
        set(){}
      }
    },
    watch:{
    },
    created() {
      this.$store.dispatch("getRakeCount").then((res)=>{
        this.orderFormTapDatas[0].manNumber = res.level1Total
        this.orderFormTapDatas[1].manNumber = res.level2Total
        this.orderFormTapDatas[2].manNumber = res.level3Total
      })
      this.$store.dispatch("getRakeBackInfo", {
        id:"",
        size:10,
        level: this.orderFormInd + 1
      }).then(() => {
        this.orderFormTapDatas[this.orderFormInd].manNumber = this.rakeBackInfo ? this.rakeBackInfo.total : 0
      })
    },
    mounted() {
      if(this.rakeBackInfo ) {
        if(this.rakeBackInfo.result.length<1){
          this.footlineTitle = "暂无数据"
        }
      }
    },
    methods: {
//      点击变色
      changeColor(ind) {
        this.footlineTitle = '上拉加载更多'
        this.orderFormInd = ind
        this.$store.dispatch("getRakeBackInfo", {
          id:"",
          level: ind + 1,
          size:10
        }).then(() => {
          if(this.rakeBackInfo ? this.rakeBackInfo.result.length === 0 : true){
            this.footlineTitle = "暂无数据"
          }
          this.orderFormTapDatas[this.orderFormInd].manNumber = this.rakeBackInfo ? this.rakeBackInfo.total : 0
        })
      },
      //滑动加载
      loadData() {
        let that = this
        if(this.footlineTitle === '上拉加载更多') {
          this.footlineTitle = "加载中"
          this.$store.dispatch("getRakeBackInfo", {
            id: that.rakeBackInfo.result[that.rakeBackInfo.result.length - 1].id,
            level:that.orderFormInd +1,
            size: 10
          }).then((res) => {
            if (res.length > 0) {
              let time = setTimeout(() => {
                this.rakeBackInfo.result.push(...res)
                this.footlineTitle = '上拉加载更多'
                clearTimeout(time)
              }, 1000)
            } else {
              let time = setTimeout(() => {
                this.footlineTitle = "没有啦"
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
  .orderFormTap
    background-color #ffffff
    height (110 /$rem)
    width (1080 /$rem)
    border-bottom 1px solid #f2f2f2
    a
      box-sizing border-box
      height 100%
      width (360 /$rem)
      float left
      font-size (46 /$rem)
      color #333
      text-align center
      line-height (110 /$rem)
      transition all 0.5s
      .manNumber
        font-size (46 /$rem)
        color #333
      &.active
        color #efca7d
        .manNumber
          color #efca7d
  .wrapper
    overflow hidden
</style>

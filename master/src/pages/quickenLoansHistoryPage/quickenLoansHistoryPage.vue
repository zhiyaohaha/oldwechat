<template>
  <div class="quickenLoansHistoryPage" v-if="demandList">
    <router-view/>
    <scroll class="wrapper"
            :data="demandList"
            :pullup="true"
            @scrollToEnd="loadData"
            v-if="$route.meta.isTop"
    >
      <section class="quickenLoansHistoryPageContent">
        <quickenLoansHistoryList :userInfos="demandList"/>
        <footline :title="footlineData"/>
      </section>
    </scroll>
  </div>
</template>
<script>
  import quickenLoansHistoryList from "../../components/quickenLoansHistoryList/quickenLoansHistoryList"
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        footlineData: "查看更多",
      };
    },
    components: {
      quickenLoansHistoryList
    },

    computed: {
      ...mapState(["demandList"])
    },
    watch:{
      $route(to,from){
        if(from.name === "myPage"||from.name=== "loanPage"){
          this.$store.dispatch("getDemandList", {
            status: 0,
            id: "",
            size: 10
          })
        }
      },
      demandList(val){
        if(val&&val.length < 1){
          this.footlineData = "暂无数据"
        }
      }
    },
    created() {
      if (!this.demandList) {
        this.$store.dispatch("getDemandList", {
          status: 0,
          id: "",
          size: 10
        })
      }

    },
    mounted() {

    },

    updated() {
    },
    methods: {
      loadData() {
        let that = this, time
        if (this.footlineData === "查看更多") {
          this.footlineData = "加载中"
          this.$store.dispatch("getDemandList", {
            status: 0,
            id: that.demandList[that.demandList.length - 1].id||"",
            size: 10
          }).then((res) => {
            if (res.length > 0) {
              time = setTimeout(() =>{
                this.demandList.push(...res)
                this.footlineData = "查看更多"
                clearTimeout(time)
              }, 500)
            } else {
              time = setTimeout(() => {
                this.footlineData = "没有更多数据拉"
                clearTimeout(time)
              }, 500)
            }
          })
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>

<template>
  <scroll class="wrapper"
          :data="newsList"
          :pullup="true"
          @scrollToEnd="loadData" v-if="newsList">
    <div>
      <strategyList :strategyListDatas="newsList"/>
      <footline :title="footLineTitle"/>
    </div>
  </scroll>
</template>

<script>
  import strategyList from "../../components/strategyList/strategyList.vue"

  export default {
    data() {
      return {
        footLineTitle: "查看更多"
      }
    },

    components: {
      strategyList
    },

    computed: {
      newsList: {
        get() {
          return this.$store.state.newsList
        },
        set() {
        }
      }
    },
    created() {
      this.$store.dispatch("getNewsListFor", {
        scene: this.$route.query.scene,
        type: this.$route.query.code,
        id: "",
        size: 10
      })
    },
    mounted() {

    },
    updated(){
      if (this.newsList.length < 1) {
        this.footLineTitle = "暂无内容"
      }
    },
    methods: {
      loadData() {
        if (this.newsList.length < 1) {
          this.footLineTitle = "暂无内容"
          return
        }
        let that = this
        if (this.footLineTitle === "没有啦"||this.footLineTitle==="加载中") {
          return
        } else if(this.footLineTitle === "查看更多") {
          this.footLineTitle = "加载中"
          this.$store.dispatch("getNewsListFor", {
            scene: that.$route.query.scene ,
            type: that.$route.query.code,
            id: that.newsList[that.newsList.length - 1].id,
            size: 10
          }).then((res) => {
            that = null
            let time
            if (res.length < 1) {
              time = setTimeout(() => {
                this.footLineTitle = "没有啦"
                clearTimeout(time)
              }, 1000)
            }else {
              time = setTimeout(() => {
                this.newsList.push(...res)
                this.footLineTitle = "查看更多"
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
</style>

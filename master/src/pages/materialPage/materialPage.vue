<template>
  <scroll class="wrapper"
          :data="newsListFor||[]"
          :pullup="true"
          @scrollToEnd="loadData">
    <div>
      <header class="materialHeader" v-if="authenticationListDatas">
        <ul class="authenticationList">
          <li v-for="(authenticationListData, index) in authenticationListDatas" :key="index">
            <router-link
              :to="{path:'/homePage/strategyListPage',query:{name:authenticationListData.name,code:authenticationListData.code,scene}}">
              <img :src="authenticationListData.imgUrl">
              <span>{{authenticationListData.name}}</span>
            </router-link>
          </li>
        </ul>
      </header>
      <div class="materialContent">
        <strategyList :strategyListDatas="newsListFor"/>
      </div>
      <footline :title="footLineTitle"/>
    </div>
  </scroll>
</template>

<script>
  import strategyList from "../../components/strategyList/strategyList.vue"

  export default {
    data() {
      return {
        authenticationListDatas: [
          "../../../static/img/strategyImg/jiaoxue.png",
          "../../../static/img/strategyImg/tuiguang.png",
          "../../../static/img/strategyImg/kouzi.png",
          "../../../static/img/strategyImg/qita.png"
        ],
        footLineTitle: "查看更多",
        scene: 'Scene.Spead'
      }
    },

    components: {
      strategyList
    },

    computed: {
      newsListFor: {
        get() {
          return this.$store.state.newsListFor
        },
        set(){
        }
      }
    },
    created() {
      let that = this
      this.$store.dispatch("getSelectDataSource", {
        codes: "SpreadNewsCategory"
      }).then((res) => {
        if (res.success) {
          res.data.forEach((item) => {
            this.authenticationListDatas = item.childrens.map((it, index, Arr) => {
              it.imgUrl = this.authenticationListDatas[index]
              return it
            })
          })
        } else {
          this.MessageBox({
            title: '错误',
            message: res.message,
            showCancelButton: false
          })
        }
      })
      this.$store.dispatch("getNewsListFor", {
        scene: that.scene,
        type: "",
        id: "",
        size: 10
      })
    },
    mounted() {

    },
    updated() {
    },
    methods: {
      loadData() {
        let that = this
        if (that.footLineTitle === "没有啦") {
          return
        } else if (this.footLineTitle === "查看更多") {
          this.footLineTitle = "加载中"
          that.$store.dispatch("getNewsListFor", {
            scene: 'Scene.Spead',
            type: "",
            id: that.newsListFor[that.newsListFor.length - 1].id,
            size: 10
          }).then((res) => {
            if (res.length < 1) {
              this.footLineTitle = "没有啦"
            } else {
              let time = setTimeout(() => {
                this.newsListFor.push(...res)
                that.footLineTitle = "查看更多"
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
  .materialHeader
    width (1080 /$rem)
    height (266 /$rem)
    .authenticationList
      box-sizing border-box
      height 100%
      display -webkit-flex
      display flex
      justify-content: space-around
      padding (50 /$rem) 0
      border-bottom 1px solid #f2f2f2
      li
        a
          text-align center
          font-size (42 /$rem)
          color #333333
          img
            height (96 /$rem)
          span
            display block
            margin-top (28 /$rem)
</style>

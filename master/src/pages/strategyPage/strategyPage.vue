<template>
  <scroll class="wrapper"
          :data="creditCardNews"
          :pullup="true"
          @scrollToEnd="loadData" v-if="creditCardNews">
    <div>
      <header class="strategyHeader">
        <ul class="authenticationList">
          <li v-for="(authenticationListData, index) in authenticationListDatas" :key="index">
            <router-link :to="{path:'/homePage/strategyListPage',query:{name:authenticationListData.name,code:authenticationListData.code,scene}}">
              <img :src="authenticationListData.imgUrl">
              <span>{{authenticationListData.name}}</span>
            </router-link>
          </li>
        </ul>
      </header>
      <div class="strategyContent">
        <strategyList :strategyListDatas="creditCardNews"/>
        <footline :title="footLineTitle"/>
      </div>
    </div>
  </scroll>
</template>

<script>
  import strategyList from "../../components/strategyList/strategyList.vue"
  export default {
    data() {
      return {
        authenticationListDatas: [
          {
            imgUrl: "../../../static/img/strategyImg/banka.png",
          },
          {
            imgUrl: "../../../static/img/strategyImg/tie.png",
          },
          {
            imgUrl: "../../../static/img/strategyImg/fenqi.png",
          },
          {
            imgUrl: "../../../static/img/strategyImg/qita.png",
          },
        ],
        scene: 'Scene.DJQCreditCardNews',
        footLineTitle:"查看更多"
      }
    },
    components: {
      strategyList
    },

    computed: {
      creditCardNews: {
        get() {
          return this.$store.state.creditCardNews
        },
        set() {
        }
      }
    },
    created() {
      let that = this
      if(!this.creditCardNews){
        this.$store.dispatch("getSelectDataSource", {
          codes: "CreditCardNewsCategory"
        }).then((res) => {
          if (res.success){
            res.data.forEach((item) => {
              this.authenticationListDatas=item.childrens.map((it, index, Arr) => {
                it.imgUrl = this.authenticationListDatas[index].imgUrl
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
      }

    },
    mounted() {
      this.$nextTick(()=>{
        if (this.creditCardNews&&this.creditCardNews.length < 1) {
          this.footLineTitle = "暂无内容"
        }
      })
    },

    methods: {
      loadData() {
        if (this.creditCardNews.length < 1) {
          this.footLineTitle = "暂无内容"
          return
        }
        let that = this
        if (that.footLineTitle === "没有啦"||that.footLineTitle==="加载中") {
          return
        } else if(that.footLineTitle === "查看更多") {
          this.footLineTitle = "加载中"
          that.$store.dispatch("getNewsListFor", {
            scene: that.scene ,
            type:"",
            id: that.creditCardNews[that.creditCardNews.length - 1].id,
            size: 10
          }).then((res) => {
            let time
            if (res.length < 1) {
              time = setTimeout(() => {
                that.footLineTitle = "没有啦"
                clearTimeout(time)
              }, 1000)
            }else {
              time = setTimeout(() => {
                this.creditCardNews.push(...res)
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
  .strategyHeader
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

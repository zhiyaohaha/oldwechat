<template>
  <div>
    <keep-alive>
      <router-view v-if="!$route.meta.cache"/>
    </keep-alive>
    <router-view v-if="$route.meta.cache"/>
    <div class="homePageWrap" ref="homePageWrap" v-if="$route.meta.keepAlive">
      <div>
        <header class="homePageHeader">
          <mt-swipe :auto="2000" :showIndicators="false">
            <mt-swipe-item>
              <router-link :to="{name:'productPage'}">
                <img src="./img/renzhengbanner.png">
              </router-link>
            </mt-swipe-item>
            <mt-swipe-item>
              <router-link :to="{name:'generalizePage'}">
                <img src="./img/tuiguangbanner.png">
              </router-link>
            </mt-swipe-item>
            <mt-swipe-item>
              <router-link :to="{name:'creditCardPage'}">
                <img src="./img/xinyongbanner.png">
              </router-link>
            </mt-swipe-item>
            <mt-swipe-item>
              <router-link :to="{name:'productDetailsPage', query: {id: '5a9e6f2651050e32204f3b0b'}}">
                <img src="./img/baduyouqianhua.png">
              </router-link>
            </mt-swipe-item>
            <mt-swipe-item>
              <router-link :to="{name:'creditInvestigationPage'}">
                <img src="./img/zhengxinbanner.jpg">
              </router-link>
            </mt-swipe-item>
          </mt-swipe>
        </header>
        <div class="homePageContent">
          <loanMod :loanModDatas="loanModDatas"/>
          <generalizeMod :generalizeModData="visaDatas"/>
          <generalizeMod :generalizeModData="generalizeModData"/>
          <headline :headlineData="{title:'热门贷款推荐',more:'更多贷款推荐',url:'/homePage/productPage'}"/>
          <recommendMod :recommendModDatas="recommendModDatas"/>
          <headline :headlineData="{title:'热门信用卡推荐',more:'更多信用卡推荐',url:'/homePage/creditCardPage'}"/>
          <recommendList :recommendListDatas="homeListBankCard"/>
          <footline title="我是有底线的~"/>
        </div>
        <div class="footerOccupied">
        </div>
      </div>
    </div>
    <!--关注二维码公众号弹窗-->
    <!--<attentionMod :vanish="vanish" :erShow="erShow" v-if="$route.meta.keepAlive"/>-->
  </div>
</template>
<script>
  import {mapState} from "vuex"
  import loanMod from "../../components/loanMod/loanMod.vue"
  import generalizeMod from "../../components/generalizeMod/generalizeMod.vue"
  import recommendMod from "../../components/recommendMod/recommendMod.vue"
  import footline from "../../components/footline/footline.vue"
  import recommendList from "../../components/recommendList/recommendList.vue"
  // import attentionMod from "../../components/attentionMod/attentionMod.vue"
  import slider from "../../components/slider/slider.vue"
  import {getListForApp} from '../../api'

  export default {
    data() {
      return {
        loanModDatas: [
          {
            imgUrl: "../../static/img/homeImg/conten_icon_daikuanchanpin_.png",
            title: "贷款产品",
            aUrl: "/homePage/productPage"
          },
          {
            imgUrl: "../../static/img/homeImg/conten_icon_kusudaikuan.png",
            title: "快速贷款",
            aUrl: "/homePage/loanPage"
          },
        ],
        generalizeModData: {
          name: {
            title: "推广返佣",
            more: ""
          },
          datas: [
            {
              imgUrl: "../../static/img/homeImg/content_icon_woyaotuiguang.png",
              title: "我要推广",
              url: "/homePage/generalizePage"
            },
            {
              imgUrl: "../../static/img/homeImg/content_icon_tuiguanghaibao.png",
              title: "推广海报",
              url: "/homePage/posterPage"
            },
            {
              imgUrl: "../../static/img/homeImg/content_icon_tuiguangsucai.png",
              title: "推广素材",
              url: "/homePage/materialPage"
            },
            {
              imgUrl: "../../static/img/homeImg/content_icon_tuiguangjilu.png",
              title: "推广明细",
              url: "/myPage/generalizeYiPage"
            },
          ]
        },
        visaDatas: {
          name: {
            title: "信用卡",
            more: ""
          },
          datas: [
            {
              imgUrl: "../../static/img/homeImg/content_icon_banxinyongka.png",
              title: "办信用卡",
              url: "/homePage/creditCardPage"
            },
            {
              imgUrl: "../../static/img/homeImg/content_icon_bankajindu.png",
              title: "办卡进度",
              url: "/homePage/schedulePage"
            },
            {
              imgUrl: "../../static/img/homeImg/content_icon_gongluezhuanqu.png",
              title: "攻略专区",
              url: "/homePage/strategyPage"
            },
            {
              imgUrl: "../../static/img/homeImg/content_icon_xinyongkadaihuan.png",
              title: "信用卡代还",
              url: {path: '/homePage/productDetailsPage', query: {id: '5a4edc1a41ab1c25009da5a0'}}
            }
          ]
        },
        top: 0,
      }
    },

    components: {
      loanMod, generalizeMod, recommendMod, footline, recommendList, slider
    },
    computed: {
      ...mapState(["openID", "recommendModDatas", "listBanks", "homeListBankCard"]),
      //关注公众号二维码弹窗
      /*erShow: {
        get() {
          return this.$store.state.subscribe === 1 ? false : true
        },
        set() {

        }
      }*/
    },
    watch: {},
    created() {
      this.$store.dispatch("getListForApp", {
        name: 'LoanProductType.Speed',
        id: "",
        size: "3",
        hot: true
      })
      this.$store.dispatch("getListBanks").then((res) => {
        let bank = ""
        res.forEach((item) => {
          bank += item.id + ","
        })
        this.$store.dispatch("getListBankCard", {
          data: {
            id: '',//最后一条Id，第一次请求不用传
            bank: bank,//银行id，多个则逗号分隔，不传则不进行筛选
            size: 2//每页展示数量
          },
          site: "home"
        })
      })
    },
    mounted() {
      this.$nextTick(() => {
        if (this.$route.name === "homePage") {
          this.__initScroll(this.$refs.homePageWrap)
        }
      })
    }
    ,
    updated() {
      this.$nextTick(() => {
        if (this.$route.name === "homePage") {
          if (this.scroll) {
            this.scroll.destroy()
            this.__initScroll(this.$refs.homePageWrap)
            this.scroll.scrollTo(0, this.top)
            this.scroll.refresh()
          } else {
            if (this.$refs.homePageWrap) {
              this.__initScroll(this.$refs.homePageWrap)
              this.scroll.scrollTo(0, this.top, 300)
              this.scroll.refresh()
            }
          }
        } else {
          this.scroll && this.scroll.destroy()
        }
      })
    }
    ,
    methods: {
      /*changeTop() {
        this.top = this.scroll.y
      },*/
      __initScroll(ele) {
        this.__boxheight(ele) //执行函数
        this.scroll = new this.BScroll(ele, {
          click: true,
          bounce: false
        })
        this.scroll.on('scrollEnd', () => {
          this.top = this.scroll && this.scroll.y
        })
        this.scroll.refresh()
      },
      //二维码消失
      /*vanish() {
        this.$store.commit("SUBSCRIBE", {result: 1})
      }*/
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .footerOccupied
    width (1080 /$rem)
    height (146 /$rem)

  .homePageHeader
    height (520 /$rem)
    width (1080 /$rem)
    .mint-swipe-items-wrap
      transform translateZ(0)
    img
      height (520 /$rem)
      width (1080 /$rem)

  .homePageContent
    background-color #fff
    position relative
    padding-top (266 /$rem)

  .fanyonglog
    transform translateZ(0)
    width (70 /$rem)
    height (34 /$rem)

</style>

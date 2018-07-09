<template>
  <div class="generalizePage" ref="generalizePageWrap">
    <div>
      <header class="generalizeHeader">
        <img src="./img/banner.png">
      </header>
      <div class="generalizeContent">
        <headline :headlineData="{title:'三级分销规则',line:true}"/>
        <div class="rule">
          <p>
            分销返佣只限向上三级，超过三级不再获得提成。
          </p>
          <p>
            一级分销商获得总佣金70%；二级分销商获得总佣金20%；三级分销商获得总佣金10%。
          </p>
        </div>
        <headline :headlineData="{title:'客户成为分销商的规则：',line:true}"/>
        <div class="rule">
          <p>
            自然获客，认证真实姓名、手机号，系统则自动生成其推广二维码。
            分销获客，扫描上级分销商二维码，认证真实姓名、手机号，系统则自动生成其推广二维码
          </p>
        </div>
        <headline :headlineData="{title:'分销返佣举例说明',line:true}"/>
        <div class="rule">
          <p>
            总部自然获客A客户，A客户发展B客户，B客户发展C客户，C客户发展D客户，D客户发展E客户。
            D客户成单，总提成100元，C客户获取70元佣金，B客户获取20元佣金，A客户获取10元佣金。
            E 客户成单，总提成100元，D客户获取70元佣金，C客户获取20元佣金，B客户获取10元佣金，A客户不再获取提成。
          </p>
        </div>
        <div class="tableRebate">
          <img src="./img/box.png"/>
        </div>
        <headline :headlineData="{title:'三级分销流程图',line:true}"/>
        <div class="rule">
          <img src="./img/liuchengtu.png">
        </div>
        <div class="QRcodeWrap">
          <img :src="inviteurl" class="QRcode" v-if="QRcodeShow">
          <span class="title" v-if="QRcodeShow">我的专属推广二维码</span>
          <footer class="generalizeFooter" v-if="!QRcodeShow">
            <a href="javascript:;" @click="skip">
              获取我的推广二维码
            </a>

          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        QRcodeShow: false,
      }
    },

    components: {},

    computed: {
      ...mapState(["inviteurl"]),
    },
    watch: {},
    created() {
      this.$store.dispatch("getInviteUrl")
    },
    mounted() {
      // console.log(this.getCookie('whether') === '1') ? this.QRcodeShow = true : this.QRcodeShow = false
      this.QRcodeShow = (this.getCookie('whether')*1 > 0)
      this.__boxheight(this.$refs.generalizePageWrap) //执行函数
      window.onresize = this.__boxheight(this.$refs.generalizePageWrap);
      this.$nextTick(() => {
        //窗口或框架被调整大小时执行
        this.generalizePageWrap = new this.BScroll(this.$refs.generalizePageWrap, {
          click: true,
          preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/},
          bounce: false
        })
        this.generalizePageWrap.refresh()
      })
    },
    updated() {
    },

    methods: {
      skip() {
        let that = this
        if (this.getCookie('whether') * 1 < 1) {
          this.$router.replace({name: "phoneApprove", params: {name1: that.$route.name, name2: ""}})
        }
        that = null
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .generalizePage
    .generalizeHeader
      width 100 /$rem
      height (520 /$rem)
      img
        width 100%
        height 100%
    .generalizeContent
      box-sizing border-box
      padding 0 (30/$rem) 0
      .tableRebate
       img
         display inline-block
         width 100%
         margin (60/$rem) 0 (40/$rem)
      .rule
        border-bottom 1px solid #f2f2f2
        p
          padding 0 (30 /$rem)
          text-indent (126 /$rem)
          font-size (40 /$rem)
          color #bbb
          line-height (70 /$rem)
        img
          display inline-block
          width 100%
          margin (50 /$rem) 0
    .QRcodeWrap
      overflow hidden
      box-sizing border-box
      position relative
      padding (50 /$rem) 0
      .title
        display block
        margin-top (30 /$rem)
        width 100

        text-align center
      .generalizeFooter
        box-sizing border-box
        height (262 /$rem)
        width (1080 /$rem)
        padding (58 /$rem) 0
        a
          height (146 /$rem)
          width (1020 /$rem)
          background-color: #efca7d;
          color #ffffff
          text-align center
          line-height (146 /$rem)
          font-size (48 /$rem)
          border-radius (15 /$rem)
          margin 0 auto
      .QRcode
        position relative
        z-index 3000
        margin 0 auto
        width (600 /$rem)
        height (600 /$rem)

</style>

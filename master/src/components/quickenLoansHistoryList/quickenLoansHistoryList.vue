<template>
  <div class="quickenLoansHistoryList" v-if="userInfos">
    <ul>
      <li v-for="(userInfo, index) in userInfos" :key="index" @click="$router.push({name:'quickenLoansDetailPage',query:{id:userInfo.id}})">
        <div class="pic">
          <img :src="userInfo.headhead||'../../../static/img/personalDataImg/gerenxinxi_touxiang.png'">
        </div>
        <div class="contentLeft">
          <div class="up">
            <span class="fl">{{userInfo.createdDate}}申请</span>
          </div>
          <div class="middle">
            <img v-if="userInfo.house" src="./img/youfang.png">
            <img v-if="userInfo.car" src="./img/youce.png">
            <img v-if="userInfo.creditCard" src="./img/youxinyongka.png">
            <img v-if="userInfo.providentFund" src="./img/yougongjijin.png">
            <img v-if="userInfo.policy" src="./img/youbaodan.png">
            <img v-if="userInfo.socialSecurity" src="./img/youshebao.png"/>
          </div>
          <div class="down">
            {{userInfo.name}}
          </div>
        </div>
        <div class="contentRight">
          <div class="up">{{userInfo._applyTerm}}</div>
          <div class="down"><span>{{userInfo._applyAmount}}</span><span class="unit">元</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "quickenLoansHistoryList",
    props:["userInfos"],
    data() {
      return {}
    },

    components: {},

    computed: {},

    mounted() {
    },
    updated(){

    },

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .quickenLoansHistoryList
    ul
      box-sizing border-box
      padding 0 (30/$rem)
      li
        box-sizing border-box
        padding-top (35/$rem)
        height (200 /$rem)
        border-bottom 1px solid #f2f2f2
        .pic
          float left
          width (130/$rem)
          height (130/$rem)
          img
            width 100%
            height 100%
        .contentLeft
          float left
          margin-top (9/$rem)
          margin-left (20/$rem)
          .up
            font-size (34/$rem)
            color #bbbbbb
          .middle
            line-height (34/$rem)
            img
              display inline-block
              height (40/$rem)
              vertical-align middle
              margin-top (10/$rem)
          .down
            color #333
            margin-top (20/$rem)
            font-size (40/$rem)
        .contentRight
          margin-top (9/$rem)
          float right
          text-align right
          .up
            font-size (34/$rem)
            color #bbb
          .down
            font-size (42/$rem)
            margin-top (61/$rem)
            line-height (34/$rem)
            color #efca7d
            .unit
              display inline-block
              color #333
              font-size (34/$rem)
</style>

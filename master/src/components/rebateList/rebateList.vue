<template>
  <div>
    <div class="rebateListConttent" v-if="rebateListDatas">
      <ul class="rebateList">
        <li v-for="(rebateListData, index) in rebateListDatas.result" :key="index">
          <img :src="rebateListData.head|| '../../../static/img/myImg/touxiang.gif'">
          <div class="rebateListDescribe">
            <div class="up">
              <span class="userName">{{rebateListData.username.length > 3 ?rebateListData.username.slice(0,3)+"...":rebateListData.username}}</span>
              <span class="applyForTime">{{rebateListData.dealUserIdTime}}</span>
            </div>
            <div class="down">
              <span>返佣总额 ：</span>
              <span class="price"> {{rebateListData.totalValue}}</span>
              <span class="unit">元</span>
            </div>
          </div>
          <div class="state">
            <span class="form">{{rebateListData.proName}}</span>
            <div class="down">
              <span>我的返佣:</span>
              <span class="stateDescribe">{{rebateListData.value}}</span>
              <span>元</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props:["rebateListDatas"],
    data () {
      return {

      }
    },

    components: {},

    computed: {},

    mounted(){},

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .rebateListConttent
    width (1080 /$rem)
    .rebateListHeader
      height (122 /$rem)
      background-color #eee
      span
        float left
        color #bbbbbb
        margin (42 /$rem) 0 (42 /$rem) (30 /$rem)
        font-size (38 /$rem)
      a
        float right
        width (120 /$rem)
        height (68 /$rem)
        background-color #c2181f
        border-radius (10 /$rem)
        color #ffffff
        font-size (30 /$rem)
        margin-right (30 /$rem)
        margin-top (27 /$rem)
        text-align center
        line-height (68 /$rem)

    .rebateList
      box-sizing border-box
      padding 0 (30/$rem)
      li
        box-sizing border-box
        overflow hidden
        position relative
        height (200 /$rem)
        border-bottom 1px solid #f2f2f2
        padding (35/$rem) 0
        img
          float left
          width (130 /$rem)
        .rebateListDescribe
          float left
          margin-top (10/$rem)
          margin-left (20/$rem)
          span
            display block
            float left
            color #bbbbbb
          .up
            height (34/$rem)
            color #333
            line-height (36/$rem)
            font-size (34/$rem)
            .userName
              font-size (42/$rem)
              color #333
            .applyForTime
              margin-left (10/$rem)
          .down
            display block
            margin-top (52/$rem)
            font-size (36/$rem)
            color #bbbbbb
            .unit
              margin-left (5/$rem)

        .state
          position absolute
          top (45/$rem)
          right 0
          font-size (34/$rem)
          text-align right
          .form
            display block
            color #bbbbbb
          .down
            font-size (34/$rem)
            color #333
            margin-top (50/$rem)
            .stateDescribe
              font-size (42/$rem)
              color #efca7d

</style>

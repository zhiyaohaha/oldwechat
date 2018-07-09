<template>
  <div>
    <ul class="scheduleList" v-if="scheduleListDatas">
      <li v-for="(scheduleListData, index) in scheduleListDatas" :key="index">
        <div class="up">
          <span class="bankCard">{{scheduleListData.card}}</span>
          <span class="time">{{scheduleListData.createdDate}}</span>
        </div>
        <div class="down">
          <span>{{scheduleListData.name}}</span>
          <span>{{scheduleListData.idCard}}</span>
        </div>
        <a :href="scheduleListData.url" class="button">查看进度</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:["scheduleListDatas"],
    data () {
      return {

      }
    },

    components: {},

    computed: {},

    mounted(){},

    methods: {
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .scheduleList
    box-sizing border-box
    padding 0 (30/$rem)
    li
      box-sizing border-box
      height (258/$rem)
      padding-top (60/$rem)
      border-bottom 1px solid #f2f2f2
      position relative
      .up
        height (42/$rem)
        width 100%
        span
          float left
          font-size (42/$rem)
          &.time
            vertical-align:bottom
            font-size (34/$rem)
            color #bbb
            float right
      .down
        overflow hidden
        font-size (34/$rem)
        margin-top (62/$rem)
      .button
        position absolute
        bottom (60/$rem)
        right 0
        height (70/$rem)
        width (250/$rem)
        font-size (36/$rem)
        text-align center
        line-height (69/$rem)
        background-color #efca7d
        border-radius (15/$rem)
        color #ffffff
</style>

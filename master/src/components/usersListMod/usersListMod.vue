<template>
  <div>
    <div class="usersListModContent" v-if="usersListDatas">
      <ul class="usersList">
        <li v-for="(usersListData, index) in usersListDatas" :key="index" @click="jump(usersListData)">
          <img :src="usersListData.head||'../../../static/img/myImg/touxiang.gif'">
          <div class="message">
            <span class="userNum">{{(usersListData.nickName&&usersListData.nickName.length>8?usersListData.nickName.substring(0,8)+"...":usersListData.nickName)||usersListData.name}}</span>
            <div class="down">
              <span class="scheduleTime">{{usersListData.connectedTime}}</span>
              <span class="fixation" v-if="!icon">成为我的代理</span>
              <span class="fixation" v-if="icon">成为Ta的代理</span>
            </div>
          </div>
          <div class="agencyMessage">
            <span>Ta的代理</span>
            <span class="price">{{usersListData.totalSubordinateNum}}</span>
            <span>人</span>
          </div>
          <div class="triangle" v-if="!san">
            <img src="../../../static/img/generalizeImg/content_icon_more_normal.png">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["usersListDatas", "icon", "generalizeSanModIsShow","san"],
    data() {
      return {}
    },

    components: {},

    computed: {},

    mounted() {
    },

    methods: {
      jump(it) {
        if (this.icon&&!this.san) {
          this.generalizeSanModIsShow(true,it)
        } else if(!this.icon) {
          this.$router.push({name: "generalizeErPage", query: {id: it.id}})
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .usersListModContent
    .usersList
      box-sizing border-box
      padding 0 (30 /$rem)
      li
        position relative
        box-sizing border-box
        overflow hidden
        height (200 /$rem)
        border-bottom 1px solid #f2f2f2
        padding (35 /$rem) 0
        img
          float left
          height (130 /$rem)
          width (130 /$rem)
        /*用户信息*/
        .message
          float left
          margin-top (10 /$rem)
          margin-left (20 /$rem)
          .userNum
            display block
            margin-bottom (48 /$rem)
            font-size (42 /$rem)
            color #333
          .down
            font-size (34 /$rem)
            color #bbbbbb

        .agencyMessage
          position absolute
          top (15 /$rem)
          right 0
          span
            font-size (40 /$rem)
            color #bbbbbb
        .triangle
          position absolute
          right 0
          bottom (35 /$rem)
          img
            width (16 /$rem)
            height (30 /$rem)

</style>

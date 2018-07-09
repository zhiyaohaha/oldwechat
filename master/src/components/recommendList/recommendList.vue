<template>
  <div v-if="recommendListDatas">
    <ul class="recommendList">
      <li v-for="(recommendListData, index) in recommendListDatas" :key="index" >
        <router-link :to="{path:'/homePage/cardDetailsPage',query:{id:recommendListData.id}}">
          <img :src="recommendListData._logo">
          <div class="describe">
            <span class="up">{{recommendListData.name.length>=13?recommendListData.name.slice(0,13):recommendListData.name}}</span>
            <a href="javascript:;" class="button"
               @click.stop="skip(index)">
            </a>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["recommendListDatas"],
    data() {
      return {}
    },

    components: {},

    computed: {},

    mounted() {

    },

    methods: {
      skip(ind){
        let that = this
        let num = this.getCookie('whether') * 1
        console.log(num);
        if(num === 1){
          this.MessageBox.confirm('请确认个人信息后继续办理业务',"提示").then(() => {
            this.$router.push({name:'personalDataPage',query:{id:that.recommendListDatas[ind].id},params:{name:"cardApplyForPage"}})
          })
        }else {
          this.$router.push({path:'/homePage/cardApplyForPage',query:{id:that.recommendListDatas[ind].id}})
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .recommendList
    box-sizing border-box
    width (1080 /$rem)
    padding 0 (30 /$rem) 0
    li
      position relative
      box-sizing border-box
      height (308 /$rem)
      padding (50 /$rem) 0 (40 /$rem) 0
      border-bottom 1px solid #f2f2f2
      a
        height 100%
      img
        float left
        width (350 /$rem)
        margin-right (30 /$rem)
      .describe
        float left
        margin-top (10 /$rem)
        .up
          display block
          font-size (42 /$rem)
          color #333
        .button
          position absolute
          bottom (40 /$rem)
          right (30 /$rem)
          width (250 /$rem)
          height (90 /$rem)
          background-image url("./img/shenqinganniu.png")
          background-repeat no-repeat
          background-size 100%

</style>

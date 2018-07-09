<template>
  <div>
    <scroll class="wrapper"
            :data="listScheduleFor"
            :pullup="true"
            @scrollToEnd="loadData" v-if="listScheduleFor">
      <div>
        <div>
          <scheduleList :scheduleListDatas="listScheduleFor"/>
        </div>
        <footline :title="footlineTitle"/>
      </div>
    </scroll>
  </div>

</template>

<script>
  import scheduleList from '../../components/scheduleList/scheduleList.vue'

  export default {
    data() {
      return {
        scheduleTabInd: 0,
        footlineTitle: "查看更多"
      }
    },

    components: {
      scheduleList
    },
    watch: {
      listScheduleFor(val) {
        if (val.length > 0) {
          this.footlineTitle = "查看更多"
        }
      }
    },
    computed: {
      listScheduleFor: {
        get() {
          return this.$store.state.listScheduleFor
        },
        set() {

        }
      }
    },
    created() {
      this.$store.dispatch("getListScheduleForApp", {
        scene: "Scene.DJQCreditCard",
        id: "",
        size: 10
      })
    },
    mounted() {
      if (!this.listScheduleFor || this.listScheduleFor.length < 1) {
        this.footlineTitle = "暂无内容"
      }
    },

    methods: {
      changeColor(index) {
        this.scheduleTabInd = index
      },
      //下拉刷新逻辑
      loadData() {
        if (this.listScheduleFor.length < 1) {
          this.footlineTitle = "暂无内容"
          return
        }
        if (this.footlineTitle === "没有跟多数据拉" || this.footlineTitle === "加载中") {
          return
        } else if (this.footlineTitle === "查看更多") {
          this.footlineTitle = "加载中"
          this.$store.dispatch("getListScheduleForApp", {
            scene: "Scene.DJQCreditCard",
            id: this.listScheduleFor[this.listScheduleFor.length - 1].id,
            size: 10,
          }).then(res => {
            console.log(res);
            let time
            if (res.length > 0) {
              time = setTimeout(() => {
                this.listScheduleFor.push(...res)
                this.footlineTitle = "查看更多"
                clearTimeout(time)
              }, 1000)
            } else {
              time = setTimeout(() => {
                this.footlineTitle = "没有跟多数据拉"
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
  .scheduleTab
    height (110 /$rem)
    border-bottom 1px solid #f2f2f2
    a
      text-align center
      line-height (110 /$rem)
      font-size (46 /$rem)
      color #333333
      transition color 0.3s

  .bankBox
    .blankBox
      height (10 /$rem)
</style>

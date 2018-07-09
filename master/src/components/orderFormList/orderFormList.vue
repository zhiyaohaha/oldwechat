<template>
  <div v-if="orderFormListDatas">
    <div class="orderFormListConttent">
      <ul class="orderFormList">
        <li v-for="(orderFormListData, index) in orderFormListDatas.data" :key="index"
        >
          <img :src="orderFormListData.head||'../../../static/img/myImg/touxiang.gif'">
          <div class="orderFormListDescribe">
            <div class="up">
              <span class="userName">{{orderFormListData.name.length>13?orderFormListData.name.substring(0,12)+"...":orderFormListData.name}}</span>
            </div>
            <div class="down">
              <span class="applyForTime">{{orderFormListData._createdDate}}</span>
              <span class="applyFor">申请</span>
            </div>
          </div>
          <div class="state">
            <span class="form">{{orderFormListData._product.name}}</span>
            <!--<span class="stateDescribe" v-if="orderFormListData._rakeBack !== '已返佣'">({{orderFormListData._rakeBack}}){{orderFormListData._status}}</span>-->
            <span class="stateDescribe"
                  v-if="orderFormListData._rakeBack === '已返佣'">{{orderFormListData._rakeBack}}</span>
          </div>
          <!--<div class="delete"></div>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["orderFormListDatas"],
    data() {
      return {
        isShow: false,
        /*startX: 0,//开始触摸的位置
        startY: 0,//开始触摸的位置
        moveX: 0,//滑动时的位置
        moveY: 0,//滑动时的位置
        endX: 0,//结束触摸的位置
        disX: 0,//移动距离
        disY: 0,//移动距离*/
        orderFormListDatasInd: null
      }
    },

    components: {},

    computed: {},

    mounted() {
    },

    methods: {
      //手指开始
      /*touchStart(index, ev) {
        ev = ev || event;
        ev.preventDefault();
//                      console.log(ev.targetTouches);
//                      console.log(ev.changedTouches);
        if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX; // 记录开始位置
          this.startY = ev.touches[0].clientY; // 记录开始位置
        }
        console.log();
      },*/
      //手指一动
      /*scrollX(index, ev) {
        ev = ev || event;
        ev.preventDefault();
        if (ev.touches.length == 1) {
          //滑动时距离浏览器左侧的距离
          this.moveX = ev.touches[0].clientX;
          this.moveY = ev.touches[0].clientY;
          //实时的滑动的距离-起始位置=实时移动的位置
          this.disX = this.moveX - this.startX
          this.disY = this.moveY - this.startY
          let disY = Math.abs(this.disY)
          let disX = Math.abs(this.disX)
          if(disX<disY){
            console.log("看一下禁止情况")
            return
          }else {
            if (this.disX < 0 || this.disX == 0) {
              this.orderFormListDatasInd = index
            } else if (this.disX > 0) {
              this.orderFormListDatasInd = null
            }
          }

        }
      },*/
      //手指结束
      /*touchEnd(ev) {
      }*/
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .orderFormListConttent
    width (1080 /$rem)
    .orderFormList
      box-sizing border-box
      background-color #ffffff
      li
        box-sizing border-box
        position relative
        height (200 /$rem)
        border-bottom 1px solid #f2f2f2
        padding (35 /$rem) 0 (35 /$rem) (30 /$rem)
        /*transition all 0.3s
        transform translateZ(0)
        &.active
          transform: translate3d(-(180/$rem),0,0)*/
        /*.delete
          position absolute
          width (180 /$rem)
          height (130 /$rem)
          background-color #DF4343
          right (-180 /$rem)
          top (35/$rem)*/
        img
          float left
          width (130 /$rem)
        .orderFormListDescribe
          float left
          height (126 /$rem)
          margin (10 /$rem) 0 0 (20 /$rem)
          span
            display block
          .up
            .userName
              font-size (42 /$rem)
              color #333
          .down
            margin-top (42 /$rem)
            height (34 /$rem)
            color #bbbbbb
            span
              float left
            .applyForTime
              font-size (34 /$rem)
            .applyFor
              margin-left (5 /$rem)
              font-size (34 /$rem)
        .state
          position absolute
          top (45 /$rem)
          right (30 /$rem)
          font-size (34 /$rem)
          text-align right
          .form
            display block
            color #bbbbbb
          .stateDescribe
            display block
            margin-top (50 /$rem)
            color #333333
</style>

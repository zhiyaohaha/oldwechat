<template>
  <div class="slide_box">
    <div class="slide" ref="slider">
      <div class="slideGroup" ref='slideGroup'>
        <slot>
        </slot>
      </div>
      <div class="dots">
        <span class="dot" :class="{dotActive: (currentPageIndex) === index }" v-for="(item, index) in dots"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {addClass} from '../../common/js/dom'
  export default {
    props: {
      loop: {
        type: Boolean,
        default: true,
      },
      autoPlay: {
        type: Boolean,
        default: true,
      },
      interval: {
        type: Number,
        default: 1000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      this.setSliderWidth(); //设置轮播图的宽度
      this.init();
      if (this.autoPlay) {
        this.play();
      }

    },
    methods: {
      setSliderWidth() {
        this.children = this.$refs.slideGroup.children;
        addClass(this.children ,"slideItem")
        this.dots = new Array(this.children.length)
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          width += sliderWidth;
        }
        if (this.loop) {
          width += 2 * sliderWidth;
        }
        this.$refs.slideGroup.style.width = width + 'px';
      },
      init() {
        var vm = this;
        // 实例化scroll
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,   //关闭或者打开惯性运动的执行
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed:400,
            easing: {
              style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              fn: function (t) {
                return t * (2 - t)
              }
            }  //滑动的时间
          }
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          console.log(pageIndex);
          if (this.loop) {
            pageIndex -= 1;
          }
          this.currentPageIndex = pageIndex;
          if (vm.autoPlay) {
            vm.play();
          }
        })
        this.slider.on('beforeScrollStart', () => {
          if (vm.autoPlay) {
            clearTimeout(vm.timer);
          }
        })

      },
      play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider&&this.slider.goToPage(pageIndex, 0, 400);//跳转到的页数 初始化页数 滑动总时间
        }, this.interval)
      }
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus">
  .slide_box
    height 100%
    .slide
      width: 100%;
      overflow: hidden;
      height: 100%
      .slideGroup
        height 100%
        .slideItem
          float left
      .dots {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
        text-align: center;
        .dot {
          background: rgba(255, 255, 255, .5);
          display: inline-block;
          margin: 0 4px;
          height: 8px;
          width: 8px;
          border-radius: 50%;
          &.dotActive {
            width: 20px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.8);
          }
        }
      }
</style>

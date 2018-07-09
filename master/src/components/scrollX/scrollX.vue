<template>
  <div ref="scrollXWrapper" class="scrollXWrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      /*
      * */
      probeType: {
        type: Number,
        default: 1
      },
      //是否回弹
      bounce: {
        type: Boolean,
        default: false
      },
      //是否是默认窗口高

      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: true
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    computed: {},
    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.scrollXWrapper) {
          return
        }
        let obj = {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,
          bounce: this.bounce,
        }
        /*if(this.$route.name === "generalizeYiPage"){
          obj.startY = this.generalizeYiPageY
        }*/
        // better-scroll的初始化
        this.scrollX = new BScroll(this.$refs.scrollXWrapper, obj)

        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scrollX.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        this.scrollX.on('scrollEnd', (pos) => {
          console.log(pos);
        })
        // 是否派发滚动到底部事件，用于上拉加载
        /*if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }*/

        // 是否派发顶部下拉事件，用于下拉刷新
        /*if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }*/

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scrollX.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scrollX && this.scrollX.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scrollX && this.scrollX.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scrollX && this.scrollX.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scrollX && this.scrollX.scrollTo.apply(this.scrollX, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scrollX && this.scrollX.scrollToElement.apply(this.scrollX, arguments)
      }
    },
    updated() {

    },
    watch: {}
  }
</script>
<style lang='stylus' rel="stylesheet/stylus">
  .scrollXWrapper
    height 100%
    overflow hidden

</style>

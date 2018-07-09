<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      /*
      * */
      scrollReset: {
        type: Number,
        default: 0
      },
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
        default: false
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
    computed: {
      ...mapState(["generalizeYiPageY","updatePage"])
    },
    mounted() {
      this.__boxheight(this.$refs.wrapper)
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
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
        this.scroll = new BScroll(this.$refs.wrapper, obj)

        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            let result = this.scroll && this.scroll.y
            if (this.$route.name !== "generalizeErPage") {
              this.$store.commit("GENERALIZEYIPAGEY", {result})
            }
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    updated() {
      if (this.scroll) {
        if(this.$route.name !== "generalizeErPage"&&this.$route.name !== "productDetailsPage"){
          this.scrollTo(0, this.generalizeYiPageY)
        }
        this.refresh()
      } else {
        this.__boxheight(this.$refs.wrapper)
        // 保证在DOM渲染完毕后初始化better-scroll
        setTimeout(() => {
          this._initScroll()
        }, 20)
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      $route(to, form) {
        if (to.meta.keepAlive) {
          this.$store.commit("GENERALIZEYIPAGEY", {result: 0})
        }
        if (to.name === "productPage" || to.name === "creditCardPage") {
          this.refresh()
        }
      },
      scrollReset(val){
        this.$store.commit("GENERALIZEYIPAGEY", {result: 0})
      },
      updatePage(val){
        setTimeout(()=>{
          this.refresh()
        },500)

      }
    }
  }
</script>

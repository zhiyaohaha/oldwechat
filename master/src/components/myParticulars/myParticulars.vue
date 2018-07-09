<template>
  <div>
    <div class="myParticulars">
      <ul class="myParticularsList">
        <li v-for="(myParticularsData, index) in myParticularsDatas" :key="index">
          <router-link :to="myParticularsData.url" v-if="myParticularsData.url">
            <img :src="myParticularsData.imgUrl">
            <span>{{myParticularsData.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

  <script>
  export default {

    props:["myParticularsDatas"],
    data () {
      return {}
    },

    components: {},

    computed: {},

    mounted(){},

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .myParticulars
    width (1080 /$rem)
    margin-top (160/$rem)
    .myParticularsList
      display flex
      padding 0 (150/$rem)
      justify-content: space-between
      flex-wrap: wrap
      li
        position relative
        width (240/$rem)
        height (248 /$rem)
        text-align center
        a
          box-sizing border-box
          padding-top (40/$rem)
          position absolute
          top 0
          left 0
          width 100%
          img
            display inline-block
            width (136 /$rem)
            height (136/$rem)
          span
            display block
            margin-top (30/$rem)
            font-size (40 /$rem)
            color #515151
</style>

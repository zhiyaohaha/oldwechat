<template>
  <div class="floatRedEnvelope" @touchstart.stop="changeShow" @touchmove.stop="touchMove" @touchend.stop="touchEnd" >
    <img src="./img/tixianhongbao_icon_fudonghongbao.png"/>
  </div>
</template>

<script>
  export default {
    name: "floatRedEnvelopeMod",
    props:["changeShow","touchMove","touchEnd","flag"],
    data(){
      return{

      }
    },
    comments:{},
    computed:{},
    mounted(){

    },
    methods:{
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .floatRedEnvelope
    position fixed
    right 0
    bottom (146/$rem)
    /*bottom 0*/
    z-index 11
    img
      width (114/$rem)
      height (140/$rem)
      -webkit-user-select:none;
      -webkit-touch-callout:none;

</style>

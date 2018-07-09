<template>
  <div class="explainMod">
    <ul class="explainList">
      <li v-for="(it,index) in datas" :key="index">
      {{(index + 1)+"、"+it}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "explainMod",
    props:{
      datas:{
        type:Array,
        default:''
      }
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .explainMod
    .explainList
      box-sizing border-box
      padding (60/$rem) (30/$rem)
      li
        line-height (63/$rem)
        font-size (42/$rem)
        color #333
</style>

<template>
  <div class="messageListMod">
    <ul class="messageList">
      <li v-for="(it, index) in items" :key="index">
        <span class="title">
          {{it.title}}
        </span>
        <span class="message" v-if="it.message">
          {{it.message}}
        </span>
        <img :src="it.imgUrl" v-if="it.imgUrl">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "message-list",
    props:["items"],
    data() {
      return {}
    },

    components: {},

    computed: {},

    mounted() {
    },

    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .messageListMod
    .messageList
      box-sizing border-box
      padding 0 (30/$rem)
      li
        height (120/$rem)
        box-sizing border-box
        border-bottom (1/$rem) solid #f2f2f2
        font-size (42/$rem)
        line-height (120/$rem)
        overflow hidden
        .title
          color #333
          float left
        .message
          color #bbb
          float right
        img
          float right
          width (25/$rem)
          height (50/$rem)
          margin-top (35/$rem)
</style>

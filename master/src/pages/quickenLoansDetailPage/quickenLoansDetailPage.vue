<template>
  <div class="quickenLoansDetailPage" v-if="demandDetail">
    <messageList :items="demandDetail"/>
  </div>
</template>

<script>
  import messageList from "../../components/messageList/messageList"
  import {mapState} from "vuex"

  export default {
    name: "quicken-loans-detail-page",
    data() {
      return {}
    },
    components: {
      messageList
    },

    computed: {
      ...mapState(["demandDetail"])
    },
    created() {
      let that = this
      this.$store.dispatch("getDemandDetail", {
        id: that.$route.query.id
      })

    },
    mounted() {
    },
    updated() {

    },
    methods: {}
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
</style>

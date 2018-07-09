<template>
  <div class="feedbackPage">
    <headline :headlineData="{title:'意见反馈内容',line:true}"/>
    <div class="feedbackBox">
      <textarea name="feedback" rows="10" :readonly="readonly" @input="changeVal" v-model="feedback" class="feedbackContent" placeholder="您的意见是我们前进最大的动力，谢谢！"></textarea>
    </div>
    <footer class="feedbackFooter">
      <button @click="submit">提交</button>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "feedback-page",
    data() {
      return {
        feedback:"",
        readonly:false
      }
    },
    components: {},

    computed: {},

    mounted() {
    },

    methods: {
      submit(){
        let that=this
        if(this.feedback === ""){
          this.MessageBox.alert("提交意见不能为空")
          return
        }
        this.$store.dispatch("postFeedBack",{
          content:that.feedback //内容
        }).then((res)=>{
          if(res.success){
            this.MessageBox.alert("感谢您的宝贵意见")
          }else {
            this.MessageBox.alert(res.message,"提交失败")
          }
        })
      },
      changeVal(){
        const textReg = new RegExp(/["'<>%;)(&+]/)
        const feedback = this.feedback
        if(textReg.test(feedback)){
          this.readonly = true
          this.MessageBox.alert("不能输入非法字符","提示").then(()=>{
            this.readonly = false
          })
          this.feedback = feedback.replace(textReg,"")
        }
        if(feedback.length >500){
          this.readonly = true
          this.MessageBox.alert("不能超过500字","提示").then(()=>{
            this.readonly = false
          })
          this.feedback = feedback.substring(0, feedback.length - 1)
        }
      }
    }
  }

</script>
<style lang='stylus' rel="stylesheet/stylus">
  .feedbackPage
    .feedbackBox
      box-sizing border-box
      padding 0 (30/$rem)
      margin (40/$rem) 0
      .feedbackContent
        height (500/$rem)
        font-size (42/$rem)
        width 100%
        border (1/$rem) solid #f2f2f2
        border-radius (15/$rem)
        color #333
        &:active,&:hover
          border (1/$rem) solid #EFCA7D
    .feedbackFooter
      padding-top (60/$rem)
      text-align center
      button
        width (980/$rem)
        height (146/$rem)
        background-color #efca7d
        color #fff
        font-size (48/$rem)
        border-radius (15/$rem)
</style>


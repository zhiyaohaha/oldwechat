export default {
  //改变当前页面到底部
  UPDATEPAGE(state){
    state.updatePage=!state.updatePage
  },
  POST_OPENID(state, {result}) {
    console.log(result)
    //用户名
    if (result.data.name) {
      state.userName = result.data.name
    }
    //手机号
    if (result.data.mobilePhone) {
      state.mobilePhone = result.data.mobilePhone
    }
    state.hasPayPassword = result.data.hasPayPassword

    //是否显示红包
    if (result.data.canRedPack) {
      state.maxRed = true
      state.canRedPack = result.data.canRedPack
    }
    if(result.data.cityCode){
      state.cityCode = true
    }
  },
  SUBSCRIBE(state, {result}) {
    console.log(result)
    //用户基本信息
    state.subscribe = result
  },
  GET_LISTFORAPP(state, {result}) {
    console.log(result)
    //首页产品列表
    state.recommendModDatas = result.data
  },
  GET_LISTFORAPPLONG(state, {result}) {
    console.log(result)
    //产品列表
    state.recommendDatas = result.data
  },
  GET_DETAILEDFOR(state, {result}) {
    console.log(result)
    //产品详情
    state.productDetailsPageData = result.data
  },
  GET_LISTBANKS(state, {result}) {
    console.log(result)
    //11大银行列表
    state.listBanks = result.data
  },
  GET_HOMELISTBANKCARD(state, {result}) {
    console.log(result)
    //首页热门银行卡列表
    state.homeListBankCard = result.data
  },
  GET_CREDITLISTBANKCARD(state, {result}) {
    console.log(result)
    //银行卡列表
    state.creditListBankCard = result.data
  },
  GET_ALLLISTBANKCARD(state, {result}) {
    console.log(result)
    //赛选银行列表
    state.ALLListBankCard = result.data
  },
  GET_LISTBANKCARDDETAIL(state, {result}) {
    console.log(result)
    //银行卡详情
    state.bankCardDetail = result.data
  },
  GET_INVITEURL(state, {result}) {
    console.log(result)
    //二维码
    state.inviteurl = result.message
  },
  GET_NEWSLISTFOR(state, {result}) {
    console.log(result)
    //推广素材列表
    state.newsListFor = result.data
  },
  GET_NEWSLIST(state, {result}) {
    console.log(result)
    //赛选列表
    state.newsList = result.data
  },
  CREDITCARDNEWS(state, {result}) {
    console.log(result)
    //赛选列表
    state.creditCardNews = result.data
  },
  //账户余额
  GET_ACCOUNTINFO(state, {result}) {
    console.log(result)
    state.income = result.data
  },
  GET_DETAILFORAPP(state, {result}) {
    console.log(result)
    //文章详情
    state.detailForApp = result.data
  },
  GET_ORDERLISTFOR1(state, {result}) {
    console.log(result)
    //我的订单列表
    state.orderListFor1 = result
  },
  GET_USERRELATED(state, {result}) {
    console.log(result)
    //我的订单列表
    let data
    result.data.forEach((item, index, input) => {
      item.imgShow = false
      data = input
    })
    state.userrelated = data
  },
  GET_RAKEBACKINFO(state, {result}) {
    console.log(result)
    //我的分佣列表
    state.rakeBackInfo = result.data
  },
  GET_SUBORDINATENUM(state, {result}) {
    console.log(result)
    //我的推广头部列表
    state.subordinateNum = result.data
  },
  GET_ERSUBORDINATENUM(state, {result}) {
    console.log(result)
    //我的二级推广头部列表
    state.erSubordinateNum = result.data
  },
  GET_SANSUBORDINATENUM(state, {result}) {
    console.log(result)
    //我的三级推广头部列表
    state.sanSubordinateNum = result.data
  },
  GET_SUBORDINATEUSERLIST(state, {result}) {
    console.log(result)
    //我的推广列表
    state.subordinateUserList = result.data
  },
  NEWERSUBORDINATEUSERLIST(state, {result}) {
    console.log(result)
    //我的滑动推广列表
    state.subordinateUserList = state.subordinateUserList.concat(result)
  },
  GET_ERSUBORDINATEUSERLIST(state, {result}) {
    console.log(result)
    //我的二级推广列表
    state.erSubordinateUserList = result.data
  },
  GET_SANSUBORDINATEUSERLIST(state, {result}) {
    console.log(result)
    //我的三级推广列表
    state.sanSubordinateUserList = result.data
  },
  //时间戳
  CHANGETIME(state) {
    state.time = new Date().getTime()
  },
  //等待窗显示
  AWAITTRUE(state) {
    state.awaitShow = true
  },
  //等待窗消失
  AWAITFALSE(state) {
    state.awaitShow = false
  },

  GET_LISTSCHEDULEFORAPP(state, {result}) {
    //办卡进度列表
    state.listScheduleFor = result.data
  },
  GET_LASTORDERINFO(state, {result}) {
    console.log(result);
    //获取上一次报单信息
    state.lastOrderInfo = result.data
  },
  //记录从一级代理跳转的y值
  GENERALIZEYIPAGEY(state, {result}) {
    console.log(result)
    state.generalizeYiPageY = result
  },
  //需求单
  GET_DEMANDLIST(state, {result}) {
    console.log(result)
    let res = result.data.list
    state.demandList = res
  },
  //需求单详情
  GET_DEMANDDETAIL(state, {result}) {
    console.log(result)
    let res = result.data, Arr
    Arr = [
      {
        title: "申请时间：",
        message: res.createdDate + "申请"
      },
      {
        title: "借款人姓名：",
        message: res.name
      },
      {
        title: "身份证号：",
        message: res.idCard
      },
      {
        title: "手机号码：",
        message: res.telphone
      },
      {
        title: "贷款金额：",
        message: res._applyAmount
      },
      {
        title: "贷款用途：",
        message: res._purpose
      },
      {
        title: "贷款期限：",
        message: res._applyTerm
      },
      {
        title: "是否有公积金：",
        message: res.providentFund ? "有" : "没有"
      },
      {
        title: "是否有社保：",
        message: res.socialSecurity ? "有" : "没有"
      },
      {
        title: "是否有房：",
        message: res.house ? "有" : "没有"
      },
      {
        title: "是否有车：",
        message: res.car ? "有" : "没有"
      },
      {
        title: "是否有信用卡：",
        message: res.creditCard ? "有" : "没有"
      },
    ]
    state.demandDetail = Arr
  },
  //提现中列表
  GET_INPROGRESWITHDRAWRECORD(state, {result}) {
    console.log(result);
    state.inProgressWithDrawRecord = result.data
  },
  //提现成功列表
  GET_SUCCEEDWITHDRAWRECORD(state, {result}) {
    console.log(result);
    state.succeedWithDrawRecord = result.data
  },
  //提现失败列表
  GET_DEFEATEDWITHDRAWRECORD(state, {result}) {
    console.log(result);
    state.defeatedWithDrawRecord = result.data
  },
  GET_REDPACK(state, {result}) {
    //红包奖励
    console.log(result);
    state.awardMoney = result.data.money
    state.openRedPacketModShow = true
  },
//  客服二维码消失隐藏
  QRCODEISSHOW(state, flag) {
    state.serviceQrCodeShow = flag
  },
  //领取红包是否展示
  OPENREDPACKETMODSHOW(state, flag) {
    state.openRedPacketModShow = flag
  },
  //红包
  MAXREDPACK(state, flag) {
    if(state.canRedPack){
      state.maxRed = flag
    }
  },
  REDNOTSHOW(state){
    state.canRedPack = false
    state.maxRed = false
  },
  FUYOU(state,flag){
    state.fuyou = flag
  },
  CITYCODE(state,flag){
    state.cityCode = flag
  }
}

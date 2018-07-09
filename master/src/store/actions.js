import {
  postSendMsg,
  postSendMsgAffirm,
  postOpenid,
  postPhone,
  // getUserinfo,  //获取微信用户信息
  getListForApp,
  getDetailedFor,
  getListBanks,
  getListBankCard,
  getListBankCardDetail,
  postRecordForApp,
  getInviteUrl,
  getSelectDataSource,
  getNewsListFor,
  getDetailForApp,
  getOrderListFor,
  postLoginout,
  getUserRelated,
  getRakeBackInfo,
  getSubordinateNum,
  getSubordinateUserList,
  postPeopleFiveReal,
  postFiveRealVerifyCode,
  getListScheduleForApp,
  getAccountInfo,
  getPosters,
  getLastOrderInfo,
  getOrderCount,
  getIdentify2Auth,
  postFillUserInfo,
  getAllArea,
  getDemandList,
  getDemandDetail,
  getClickRecord,
  WithDrawFuiou,
  getWithDraw,
  getWithDrawRecord,
  postIdentify4Auth,
  getVerifyCode,
  getSetPayPassword,
  getRedPack,
  postLogin,
  GetAdCodes,
  GetBanks,
  AddBankCard,
  postFeedBack
} from '../api'

let apiPrefix = 'http://api2.cpf360.com/' // 正式库
// let apiPrefix = 'http://api4.cpf360.com/' //2.0的测试库
// let apiPrefix = 'http://211.94.137.70:8001/'//测试库
let apiVersion1 = 'http://api.cpf360.com/' //1.0的正式库
// let apiVersion1 = 'local.appapi.cpf360.com/'//1.0测试库
export default {
  //掌金超手机站登录
  /*async postLogin({commit}, data) {
    // debugger
    let url = apiPrefix + 'api/OfficialAccounts/Login'
    const result = await postLogin(url, data)
    if(result.success){
      commit("POST_OPENID",{result})
    }
    return result
  },*/
  /*查询富有绑卡城市接口*/
  async AddBankCard({commit}, data) {
    let url = apiPrefix + 'api/OfficialAccounts/AddBankCard'
    const result = await AddBankCard(url, data)
    return result
  },
  /*查询富有绑卡城市接口*/
  async GetAdCodes({commit}) {
    let url = apiPrefix + '/api/ThirdAPI/Fuiou/GetAdCodes'
    const result = await GetAdCodes(url)
    return result
  },
  /*获取富有支持的银行的列表*/
  async GetBanks({commit}) {
    let url = apiPrefix + 'api/ThirdAPI/Fuiou/GetBanks'
    const result = await GetBanks(url)
    return result
  },
  //手机站意见反馈接口
  async postFeedBack({commit}, data) {
    let url = apiPrefix + 'api/Opinion/Submit'
    const result = await postFeedBack(url, data)
    return result
  },
  //征信四要素
  async postIdentify4Auth({commit}, data) {
    // debugger
    let url = apiPrefix + 'api/OfficialAccounts/Identify4Auth'
    const result = await postIdentify4Auth(url, data)
    return result
  },
  //验证码
  async postSendMsg({commit}, data) {
    // debugger
    let url = apiPrefix + 'api/SMS/SendVerifyCode'
    const result = await postSendMsg(url, data)
    return result
  },
  //注册和登录时  验证用户是否注册 (验证码)
  async postSendMsgAffirm({commit}, data) {
    // debugger
    let url = apiPrefix + 'api/OfficialAccounts/SendVerifyCode'
    const result = await postSendMsgAffirm(url, data)
    return result
  },
  //验证用户石否注册
  async postLogin({commit}, {data, cb}) {
    // debugger
    // let url = apiPrefix + 'api/OfficialAccounts/FuThridPlatFormLogin'
    let url = apiPrefix + 'api/OfficialAccounts/Login'
    const result = await postLogin(url, data)
    let flag
    let whether = null
    if (result.success) {
      // commit('GET_OPENID', {result})
      flag = result.data.id
      whether = 1
      commit('POST_OPENID', {result})
      if (result.data.hasIdCard) {
        whether = 2
      }
      if (result.data.identify4Auth) {
        whether = 3
      }
    } else {
      flag = ""
      whether = 0
    }
    cb && cb(flag, whether)
    return result
  },
  //手机注册
  async postPhone({commit}, {data, cb}) {
    // debugger
    let url = apiPrefix + 'api/OfficialAccounts/Register'
    const result = await postPhone(url, data)
    let whether
    let flag
    if (result.success) {
      flag = result.data.id
      whether = 2
      commit('POST_OPENID', {result})
    } else {
      flag = ""
      whether = 0
    }
    cb && cb(flag, whether)
    return result
  },
  //信用卡申请
  async postRecordForApp({commit}, data) {
    // debugger
    let url = apiPrefix + 'api/CreditCardOrder/RecordForApp'
    const result = await postRecordForApp(url, data)
    return result
  },
  //退出
  async postLoginout({commit}, {data, cb}) {
    // debugger
    let url = apiPrefix + 'api/Auth/Loginout'
    cb && cb()
    const result = await postLoginout(url, data)
    return result
  },
  //绑卡
  async postPeopleFiveReal({commit}, data) {
    // debugger
    let url = apiPrefix + 'api/OfficialAccounts/PeopleFiveReal'
    const result = await postPeopleFiveReal(url, data)
    commit('GET_BINBANKCARD', {result})
    return result
  },
//绑卡验证码
  async postFiveRealVerifyCode({commit}, data) {
    // debugger
    let url = apiPrefix + 'api/OfficialAccounts/FiveRealVerifyCode'
    const result = await postFiveRealVerifyCode(url, data)
    if (result.success) {
      commit('GET_BINBANKCARD', {result})
    }
    return result
  },
  //补充用户信息
  async postFillUserInfo({commit}, {data, cb}) {
    // debugger
    let url = apiPrefix + '/api/OfficialAccounts/FillUserInfo'
    const result = await postFillUserInfo(url, data)
    return result
  },
  //获取用户信息
  //m站不需要获取用户信息
  /* async getUserinfo({commit}, data) {
     let url = apiPrefix + 'api/OfficialAccounts/GetWeChatInfo'
     let obj = data.obj
     const result = await getUserinfo(url, {code: obj.code})
     if (result) {
       let res = result.data ? result.data.subscribe: {},userinfo = result.data||{name:"哈哈没有"}
       data.cb && data.cb(userinfo, obj.id)
       commit('SUBSCRIBE', {result: res})
     }
   },*/
  //产品列表
  async getListForApp({commit}, data) {
    let url = apiPrefix + 'api/LoanProduct/ListForOfficialAccounts'
    const result = await getListForApp(url, data)
    if (data.hot) {
      commit('GET_LISTFORAPP', {result})
    } else {
      if (data.id) {
        return result.data
      } else {
        commit('GET_LISTFORAPPLONG', {result})
      }
    }
  },
  //产品详情
  async getDetailedFor({commit}, data) {
    let url = apiPrefix + 'api/LoanProduct/DetailedForApp'
    const result = await getDetailedFor(url, data)
    commit('GET_DETAILEDFOR', {result})
    // alert(JSON.stringify(result))
  },
  //银行列表
  async getListBanks({commit},) {
    let url = apiPrefix + "api/CreditCard/ListBanksForApp"
    let result = await getListBanks(url)
    commit('GET_LISTBANKS', {result})
    return result.data
  },
  //信用卡列表
  async getListBankCard({commit}, {data, site}) {
    let url = apiPrefix + "api/CreditCard/ListForApp"
    const result = await getListBankCard(url, data)
    if (site === "home") {
      commit('GET_HOMELISTBANKCARD', {result})
    } else if (site === "credit") {
      commit('GET_CREDITLISTBANKCARD', {result})
    } else if (site === "newCredit") {
      return result.data
    } else if (site === "all") {
      commit('GET_ALLLISTBANKCARD', {result})
    }
  },
  //信用卡详情
  async getListBankCardDetail({commit}, data) {
    let url = apiPrefix + "api/CreditCard/GetDetailForApp"
    const result = await getListBankCardDetail(url, data)
    commit('GET_LISTBANKCARDDETAIL', {result})
  },
  //二维码
  async getInviteUrl({commit},) {
    let url = apiPrefix + "api/Loginer/GetInviteUrl"
    const result = await getInviteUrl(url)
    commit('GET_INVITEURL', {result})
  },
  //获取推广素材分类 攻略专区分类
  async getSelectDataSource({commit}, data) {
    let url = apiPrefix + "api/Values/GetSelectDataSource"
    const result = await getSelectDataSource(url, data)
    return result
  },
  //获取推广素材列表 攻略专区列表
  async getNewsListFor({commit}, data) {
    let url = apiPrefix + "api/News/ListForApp"
    const result = await getNewsListFor(url, data)
    if (result.success) {
      result.data.forEach((item) => {
        if (item.title.length > 24) {
          item.title = item.title.substring(0, 24) + "..."
        }
      })
    }
    if (data.id) {
      return result.data
    } else {
      // 推广素材列表
      if (data.type) {
        commit('GET_NEWSLIST', {result})
      } else {
        if (data.scene === "Scene.DJQCreditCardNews") {
          //攻略专区列表
          commit('CREDITCARDNEWS', {result})
        } else {
          commit('GET_NEWSLISTFOR', {result})
        }
      }
    }


  },
  //获取文章详情
  async getDetailForApp({commit}, data) {
    let url = apiPrefix + "api/News/DetailForApp"
    const result = await getDetailForApp(url, data)
    commit('GET_DETAILFORAPP', {result})
  },
  //获取信用卡订单列表
  async getOrderListFor({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/SpeedOrderListForOfficial"
    const result = await getOrderListFor(url, data)
    if (data.id) {
      return result.data
    } else {
      commit('GET_ORDERLISTFOR1', {result})
    }
  },
  //信用卡赛选弹窗数据
  async getUserRelated({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/GetUserRelatedProductForOfficial"
    const result = await getUserRelated(url, data)
    commit('GET_USERRELATED', {result})
  },
  //分佣列表
  async getRakeBackInfo({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/GetRakeBackInfo"
    const result = await getRakeBackInfo(url, data)
    if (data.id) {
      return result.data.result
    } else {
      commit('GET_RAKEBACKINFO', {result})
    }
  },
  //推广列表头部
  async getSubordinateNum({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/GetSubordinateNum"
    const result = await getSubordinateNum(url, data)
    if (data.userId) {
      if (data.san) {
        commit('GET_SANSUBORDINATENUM', {result})
      } else {
        commit('GET_ERSUBORDINATENUM', {result})
      }
    } else {
      commit('GET_SUBORDINATENUM', {result})
    }
  },
  //推广列表
  async getSubordinateUserList({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/GetSubordinateUserList"
    const result = await getSubordinateUserList(url, data)
    if (data.userId) {
      if (data.san) {
        if (data.id) {
          return result.data
        } else {
          commit('GET_SANSUBORDINATEUSERLIST', {result})
        }
      } else {
        if (data.id) {
          return result.data
        } else {
          commit('GET_ERSUBORDINATEUSERLIST', {result})
        }
      }
    } else {
      if (data.id) {
        return result.data
      } else {
        commit('GET_SUBORDINATEUSERLIST', {result})
      }
    }
  },
  //银行卡列表
  /* async getBanks() {
     let url = apiPrefix + "api/ThirdAPI/Fuiou/GetBanks"
     const result = await getBanks(url,)
     return result.data
   },*/
  //城市列表
  async getAdCodes({commit}) {
    let url = apiPrefix + "api/ThirdAPI/Fuiou/GetAdCodes"
    const result = await getAdCodes(url)
    return result.data
  },
  //办卡进度
  async getListScheduleForApp({commit}, data) {
    let url = apiPrefix + "api/CreditCardOrder/ListScheduleForApp"
    const result = await getListScheduleForApp(url, data)
    if (data.id) {
      return result.data
    } else {
      commit('GET_LISTSCHEDULEFORAPP', {result})
    }
  },
  //获取账户信息
  async getAccountInfo({commit}) {
    let url = apiPrefix + "api/OfficialAccounts/GetAccountInfo"
    const result = await getAccountInfo(url)
    commit("GET_ACCOUNTINFO", {result})
  },
  //推广海报图的地址
  async getPosters({commit}) {
    let url = apiPrefix + "api/OfficialAccounts/GetPosters"
    const result = await getPosters(url)
    return result
  },
  // 获取上一次报单信息
  async getLastOrderInfo({commit}) {
    let url = apiPrefix + "api/OfficialAccounts/GetLastOrderInfo"
    const result = await getLastOrderInfo(url)
    if (result.success) {
      commit("GET_LASTORDERINFO", {result})
    }
  },
  //获取订单的总数
  async getOrderCount({commit}) {
    let url = apiPrefix + "api/OfficialAccounts/GetOrderCount"
    const result = await getOrderCount(url)
    return result.data
  },
  // 获取分佣的总数
  async getRakeCount({commit}) {
    let url = apiPrefix + "api/OfficialAccounts/GetRakeCount"
    const result = await getOrderCount(url)
    return result.data
  },
  // 二要素验证
  async getIdentify2Auth({commit}, data) {
    let url = apiVersion1 + "OfficialAccounts/Identify2Auth"
    const result = await getIdentify2Auth(url, data)
    return result
  },
  //城市
  async getAllArea({commit}) {
    let url = apiPrefix + "api/Area/GetAllArea"
    const result = await getAllArea(url)
    return result.data
  },
  //需求单
  async getDemandList({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/GeDemandList"
    const result = await getDemandList(url, data)
    if (data.id) {
      return result.data.list
    } else {
      commit("GET_DEMANDLIST", {result})
    }
  },
  //需求单详情
  async getDemandDetail({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/GeDemandDetail"
    const result = await getDemandDetail(url, data)
    commit("GET_DEMANDDETAIL", {result})
  },
  //征信查询点击记录
  async getClickRecord({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/ClickRecord"
    const result = await getClickRecord(url, data)
    return result
  },
  //富有提现接口
  async WithDrawFuiou({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/WithDrawFuiou"
    const result = await WithDrawFuiou(url, data)
    return result
  },
  //微信提现接口
  async getWithDraw({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/WithDraw"
    const result = await getWithDraw(url, data)
    return result
  },
  //提现明细
  async getWithDrawRecord({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/WithDrawRecord"
    const result = await getWithDrawRecord(url, data)
    if (data.tradeStatus === "TradeState.Success") {
      if (data.id) {
        return result.data
      } else {
        commit("GET_SUCCEEDWITHDRAWRECORD", {result})
      }
    } else if (data.tradeStatus === "TradeState.Fail") {
      if (data.id) {
        return result.data
      } else {
        commit("GET_DEFEATEDWITHDRAWRECORD", {result})
      }
    }else if(data.tradeStatus === "Processing"){
      if (data.id) {
        return result.data
      } else {
        commit("GET_INPROGRESWITHDRAWRECORD", {result})
      }
    }
  },
  //微信实名认证验证码验证接口
  async getVerifyCode({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/VerifyCode"
    const result = await getVerifyCode(url, data)
    return result
  },
  //微信设置（重置）支付密码接口
  async getSetPayPassword({commit}, data) {
    let url = apiPrefix + "api/OfficialAccounts/SetPayPassword"
    const result = await getSetPayPassword(url, data)
    return result
  },
  //领取红包接口
  async getRedPack({commit}) {
    let url = apiPrefix + "api/OfficialAccounts/GetRedPack"
    const result = await getRedPack(url)
    if(result.success){
      commit("GET_REDPACK", {result})
      commit("REDNOTSHOW")
    }
    return result
  },
  //改变时间
  changeTime({commit}) {
    commit("CHANGETIME")
  },
}


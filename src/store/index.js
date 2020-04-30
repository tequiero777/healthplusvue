import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { HIDE_TABBAR_MUTATION } from '../mutationname/index.js'
import { Indicator, InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)
Vue.use(Vuex)
const projectId = '4028873e70192bfa0170a4de16ff0002'

export default new Vuex.Store({
  /* 自定义到共享状态 */
  state: {
    isTabbarShow: true,
    userlist: null,
    hasLogin: false,
    userName: '',
    noticelist: []
  },
  getters: {

  },
  /* 所以store操作都被记录 devtool可以监控 唯一修改状态的地方 mutation中不能做异步 */
  mutations: {
    [HIDE_TABBAR_MUTATION] (state, data) {
      state.isTabbarShow = data
    },
    login (state, userName) {
      state.userName = userName || '未登录'
      state.hasLogin = true
    },
    logout (state) {
      state.userName = ''
      state.hasLogin = false
    },
    loginMutation (state, data) {
      state.userlist = data
    },
    setlogininfo (state, data) {
      state.userlist.pid = data.healthCard.pid
      state.userlist.areaId = data.healthCard.hspConfigCode
      state.userlist.areaName = data.healthCard.hspConfigName
    },
    setnoticeinfo (state, data) {
      state.noticelist = data
    }
  },
  /* 异步处理需经过action */
  actions: {
    loginAction (store, params) {
      Indicator.open('Loading...')
      axios({
        url: `/AreaApp-API/phoneUser.do?verbId=login&userName=${params.username}&password=${params.password}&deviceType=vuecli&deviceId=0000`
      }).then(res => {
        console.log(res.data.data)
        store.commit('loginMutation', res.data.data)
        store.commit('login', res.data.data.name)
        Indicator.close()
      })
    },
    isExistCardAction (store, params) {
      axios({
        url: `/AreaApp-API/familyMember.do?verbId=isExistHealthCard&idNo=${params.idNo}&deviceType=vuecli`
      }).then(res => {
        console.log(res.data.data)
        if (res.data.data.isExistHealthCard) {
          store.commit('setlogininfo', res.data.data)
        }
      })
    },
    noticeAction (store) {
      axios({
        url: `/AreaPortal-PT/healthInfoAction.do?verbId=findHealthInfomationList&projectId=${projectId}&hspId=&deviceType=vuecli&type=3&pageNo=1&pageSize=5`
      }).then(res => {
        console.log(res.data.data)
        store.commit('setnoticeinfo', res.data.data.list)
      })
    }
  },
  modules: {
  }
})

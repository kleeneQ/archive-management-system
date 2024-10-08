import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    zipbin:'zipupload初始值'
  },
  getters:{
    getzip(state){
      return state.zipbin  //返回目前zipupload的值
    }
  },
  mutations:{
    setzip(state,name){
      state.zipbin = name
    }
  },
  actions:{
    setzipname({commit,state},name){
      commit('setzip',name)
    }
  },
  modules: {
    user
  },
  getters
})

export default store

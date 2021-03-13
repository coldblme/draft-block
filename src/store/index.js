import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'liuyi',
    age: '23'
  },
  getters: {
    nickname: state =>{
      return state.name + 'aini'
    }
  },
  mutations: {
    handleName:(state, playLoad) =>{
      state.name += playLoad.name
    }
  },
  actions: {
    actionHandleName:({commit}) =>{
      commit('handleName')
    }
  },
  modules: {

  }
})
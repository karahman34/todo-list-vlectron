import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import todo from './modules/todo'
import event from './modules/event'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    todo,
    event
  },
  plugins: [
    createPersistedState({
      paths: ['todo']
    })
  ]
})

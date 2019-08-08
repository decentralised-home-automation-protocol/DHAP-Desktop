import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: 0
  },
  actions: {
    addTodo ({ commit }, text) {
      commit('addTodo', {
        text,
        done: false
      })
    }
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push(todo)
    }
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ]
})

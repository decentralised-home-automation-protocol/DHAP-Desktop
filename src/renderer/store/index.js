import Vue from 'vue'
import Vuex from 'vuex'
import { server } from '../components/NetworkManager'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* {
      id: <MAC Address>,
      remoteIP: <IP Address>,
      uiString: "..."
    } */
    devices: []
  },
  actions: {
    deviceDiscovered ({ commit }, payload) {
      commit('newDevice', payload)
    },

    sendPacket ({ commit }, payload) {
      server.send(payload)
    },

    gotUI ({ commit, state }, payload) {
      commit('newUI', payload)
    }
  },
  mutations: {
    newDevice (state, device) {
      state.devices.push(device)
    },
    newUI (state, payload) {
      const device = state.devices.find(d => {
        return d.remoteIP === payload.ip
      })
      device.uiString = payload.uiString
    }
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ]
})

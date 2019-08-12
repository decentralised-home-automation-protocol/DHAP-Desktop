import Vue from 'vue'
import Vuex from 'vuex'
import { startDiscovery, server } from '../components/NetworkManager'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* {
      id: <MAC Address>,
      remoteIP: <IP Address>,
      ui: "...",
      statusBit: Number,
      visibilityBit: Number,
      lastContactDate: String,
      active: Boolean,
      name: String,
      room: String
    } */
    devices: [],
    layout: []
  },
  actions: {
    deviceDiscovered ({ commit, state }, payload) {
      const device = state.devices.find(d => d.id === payload.id)
      if (!device) {
        commit('newDevice', payload)
      }
    },
    sendPacket ({ commit }, payload) {
      console.log(`Sending: ${payload}...`)
      server.send(payload, 8888, '192.168.1.255')
    },
    startDiscovery ({ commit }) {
      console.log(`Starting discovery...`)
      startDiscovery()
    },
    getUI ({ commit }, payload) {
      server.send(payload.data, 8888, payload.ip)
    },
    gotUI ({ commit }, payload) {
      commit('newUI', payload)
    },
    deactivateDevice ({ commit }, id) {
      commit('deactivateDevice', id)
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
      device.ui = payload.ui
      if (!device.active) {
        device.active = true
        state.layout.push({ 'x': 0, 'y': 0, 'w': 5, 'h': 22, 'i': device.id })
      }
    },
    deactivateDevice (state, id) {
      const device = state.devices.find(d => {
        return d.id === id
      })
      device.active = false
      var filtered = state.layout.filter(function (value, index, arr) {
        return value.i !== device.id
      })
      state.layout = filtered
    }
  },
  getters: {
    layoutById: (state) => (id) => {
      return state.layout.find(layout => layout.i === id)
    }
  }
})

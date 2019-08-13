import Vue from 'vue'
import Vuex from 'vuex'
import { startDiscovery, sendPacketBroadcast, sendPacketToIP } from '../components/NetworkManager'

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
    rooms: [],
    layout: []
  },
  actions: {
    deviceDiscovered ({ commit, state }, payload) {
      const device = state.devices.find(d => d.id === payload.id)
      if (!device) {
        commit('newDevice', payload)
      }
    },
    iotCommand ({ commit }, data) {
      commit('updateElementStatus', { device: data.device, elementId: data.id, status: data.status })
    },
    sendPacket ({ commit }, payload) {
      console.log(`Sending: ${payload}...`)
      sendPacketBroadcast(payload)
    },
    startDiscovery ({ commit }) {
      console.log(`Starting discovery...`)
      startDiscovery()
    },
    getUI ({ commit }, payload) {
      sendPacketToIP(payload.data, payload.ip)
    },
    gotUI ({ commit }, payload) {
      commit('newUI', payload)
    },
    deactivateDevice ({ commit }, id) {
      commit('deactivateDevice', id)
      sendPacketToIP('520', this.getters.devicesByMac(id).remoteIP)
    },
    addDeviceNameAndRoom ({ commit }, data) {
      commit('addDeviceNameAndRoom', data)
    },
    debugDiscovery ({ commit }) {
      commit('debugDiscovery')
    },
    statusUpdate ({ commit }, status) {
      const updates = status.split(',')
      const mac = updates[0]
      const device = this.getters.devicesByMac(mac)

      for (var i = 1; i < updates.length; i++) {
        const value = updates[i]
        const updateData = value.split('=')
        commit('updateElementStatus', {device, elementId: updateData[0], status: updateData[1]})
      }
    }
  },
  mutations: {
    updateElementStatus (state, update) {
      const element = update.device.ui.find(d => {
        return d.id === update.elementId
      })
      element.state = update.status
    },
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
        state.layout.push({ 'x': 0, 'y': 0, 'w': 10, 'h': (device.ui.length * 2), 'i': device.id })
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
    },
    addDeviceNameAndRoom (state, data) {
      const device = state.devices.find(device => device.id === data.mac)
      device.name = data.name
      device.room = data.room

      if (!state.rooms.includes(data.room)) {
        state.rooms.push(data.room)
      }
    },
    debugDiscovery (state) {
      const device = {
        id: '00:0a:95:9d:68:16',
        remoteIP: '192.168.1.108',
        ui: null,
        statusBit: 0,
        visibilityBit: 0,
        lastContactDate: new Date(),
        active: false,
        name: 'TV',
        room: 'Living Room'
      }

      const device2 = {
        id: '00:0a:95:9d:68:17',
        remoteIP: '192.168.1.102',
        ui: null,
        statusBit: 0,
        visibilityBit: 0,
        lastContactDate: new Date(),
        active: false,
        name: 'Xbox',
        room: 'Living Room'
      }

      const device3 = {
        id: '00:0a:95:9d:68:18',
        remoteIP: '192.168.1.103',
        ui: null,
        statusBit: 0,
        visibilityBit: 0,
        lastContactDate: new Date(),
        active: false,
        name: 'Garage Door',
        room: 'Garage'
      }

      const device4 = {
        id: '00:0a:95:9d:68:19',
        remoteIP: '192.168.1.101',
        ui: null,
        statusBit: 0,
        visibilityBit: 0,
        lastContactDate: new Date(),
        active: false,
        name: 'Lights',
        room: 'Kitchen'
      }

      state.devices.push(device)
      state.devices.push(device2)
      state.devices.push(device3)
      state.devices.push(device4)

      state.rooms.push('Living Room')
      state.rooms.push('Garage')
      state.rooms.push('Kitchen')
    }
  },
  getters: {
    layoutById: (state) => (id) => {
      return state.layout.find(layout => layout.i === id)
    },
    devicesByRoom: (state) => (room) => {
      return state.devices.filter(function (value, index, arr) {
        return room === value.room
      })
    },
    isDeviceActive: (state) => (mac) => {
      const device = state.devices.find(d => d.id === mac)
      return device.active === true
    },
    devicesByMac: (state) => (mac) => {
      return state.devices.find(d => d.id === mac)
    }
  }
})

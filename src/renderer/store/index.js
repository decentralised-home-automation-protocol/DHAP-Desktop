import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { startDiscovery, sendPacketBroadcast, sendPacketToIP, requestStatusLease } from '../network-manager'
import { joinDevice, scanWifi } from '../joining'
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
    layout: [],
    networks: [],
    joiningInProgress: false,
    discoveryInProgress: false,
    broadcastAddress: '255.255.255.255'
  },
  actions: {
    setUp ({commit, state}) {
      for (var i = 0; i < state.devices.length; i++) {
        if (state.devices[i].active) {
          requestStatusLease(state.devices[i].remoteIP)
        }
      }
    },
    resetState ({commit}) {
      commit('resetState')
    },
    joinNewDevice ({commit}, joinData) {
      commit('setBroadcastAddress', '255.255.255.255')
      commit('joiningInProgress', true)
      joinDevice(joinData)
    },
    doneJoining ({commit}) {
      commit('joiningInProgress', false)
    },
    scanNetwork ({commit}) {
      scanWifi()
    },
    sendJoiningCredentials ({commit}, credentials) {
      const packetData = '100|' + credentials.SSID + ',' + credentials.password
      sendPacketBroadcast(packetData)
    },
    updateNetworks ({commit}, networks) {
      commit('updateNetworks', networks)
    },
    deviceDiscovered ({ commit, state }, payload) {
      const device = state.devices.find(d => d.id === payload.id)
      if (!device) {
        commit('newDevice', payload)
      }
    },
    iotCommand ({ commit }, data) {
      commit('updateElementStatus', { device: data.device, elementId: data.id, status: data.status })
      sendPacketToIP('400|' + data.id + '=' + data.status, data.device.remoteIP)
    },
    sendPacket ({ commit }, payload) {
      console.log(`Sending: ${payload}...`)
      sendPacketBroadcast(payload)
    },
    setBroadcastAddress ({ commit }, broadcastAddress) {
      commit('setBroadcastAddress', broadcastAddress)
    },
    startDiscovery ({ commit }) {
      console.log(`Starting discovery...`)
      commit('discoveryInProgress', true)
      startDiscovery()
    },
    doneDiscovery ({ commit }) {
      commit('discoveryInProgress', false)
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
    toggleDeviceLock ({ commit }, id) {
      const layout = this.getters.layoutById(id)
      commit('toggleDeviceLock', layout)
    },
    addDeviceNameAndRoom ({ commit }, data) {
      commit('addDeviceNameAndRoom', data)
    },
    debugDiscovery ({ commit }) {
      commit('debugDiscovery')
    },
    statusUpdate ({ commit }, data) {
      const device = this.getters.devicesByMac(data.mac)
      for (var i = 0; i < data.updates.length; i++) {
        const value = data.updates[i]
        commit('updateElementStatus', {device, status_location: i + 1, status: value})
      }
    }
  },
  mutations: {
    joiningInProgress (state, inProgress) {
      state.joiningInProgress = inProgress
    },
    discoveryInProgress (state, inProgress) {
      state.discoveryInProgress = inProgress
    },
    resetState (state) {
      state.devices = []
      state.rooms = []
      state.layout = []
      state.networks = []
      state.joiningInProgress = false
      state.discoveryInProgress = false
      state.broadcastAddress = '255.255.255.255'
    },
    updateElementStatus (state, update) {
      if (update.device != null && update.device.ui != null) {
        const element = update.device.ui.find(d => {
          return parseInt(d.status_location) === update.status_location
        })
        if (element != null) {
          element.state = update.status
        }
      }
    },
    newDevice (state, device) {
      state.devices.push(device)
    },
    updateNetworks (state, network) {
      console.log(network)
      state.networks = network
    },
    newUI (state, payload) {
      const device = state.devices.find(d => {
        return d.remoteIP === payload.ip
      })
      device.ui = payload.ui
      if (!device.active) {
        device.active = true
        state.layout.push({ 'x': 0, 'y': 0, 'w': 10, 'h': (device.ui.length * 2 + 7), 'minH': (device.ui.length * 2), 'minW': 7, 'i': device.id, 'static': false })
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
    toggleDeviceLock (state, layout) {
      layout.static = !layout.static
    },
    addDeviceNameAndRoom (state, data) {
      const device = state.devices.find(device => device.id === data.mac)
      device.name = data.name
      device.room = data.room

      if (!state.rooms.includes(data.room)) {
        state.rooms.push(data.room)
      }
    },
    setBroadcastAddress (state, bAddress) {
      state.broadcastAddress = bAddress
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
      if (device == null) {
        return false
      }
      return device.active === true
    },
    devicesByMac: (state) => (mac) => {
      return state.devices.find(d => d.id === mac)
    },
    getNetworks: (state) => (data) => {
      return state.networks
    },
    isDeviceStatic: (state) => (id) => {
      const layout = state.layout.find(layout => layout.i === id)
      return layout.static
    },
    joiningInProgress: (state) => (id) => {
      return state.joiningInProgress
    },
    discoveryInProgress: (state) => (id) => {
      return state.discoveryInProgress
    },
    currentBroadcastAddress: (state) => {
      return state.broadcastAddress
    }
  },
  plugins: [new VuexPersistence().plugin]
})

const dgram = require('dgram')
export const server = dgram.createSocket('udp4')
const xmlParser = require('./xml-parser')
const store = require('./store')
const sameCensusListMax = 5
const noResponseMax = 3
const port = 8888

var listeningForDiscoveryStart = 0
var discoveryResponseRecieved = false
var noResponseCount = 0
var sameListBroadcastCount = 0
var censusList = ''
export var broadcastAddress = '255.255.255.255'

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (msg, rinfo) => {
  console.log(`server got: message from ${rinfo.address}:${rinfo.port}`)
  handleIncomingPacket(msg, rinfo.address)
})

server.on('listening', () => {
  const address = server.address()
  server.setBroadcast(true)
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(port)

export function startDiscovery () {
  noResponseCount = 0
  sameListBroadcastCount = 0
  discovery()
}

function discovery () {
  listeningForDiscoveryStart = (new Date()).getTime()
  discoveryResponseRecieved = false
  var payload = getPacketData()
  sendPacketBroadcast(payload)

  if (payload === censusList) {
    sameListBroadcastCount++
  }
  censusList = payload

  if (sameListBroadcastCount < sameCensusListMax) {
    setTimeout(function () {
      if (!discoveryResponseRecieved) {
        noResponseCount++
        if (noResponseCount < noResponseMax) {
          discovery()
        } else {
          console.log('Max no response count reached. Ending discovery')
          getDeviceHeaders()
        }
      } else {
        noResponseCount = 0
        discovery()
      }
    }, 1000)
  } else {
    console.log('Max same census list count reached. Ending discovery')
    getDeviceHeaders()
  }
}

async function getDeviceHeaders () {
  const devices = store.default.state.devices
  for (var loop = 0; loop < 10; loop++) {
    var devicesWithNoHeader = 0
    for (var i = 0; i < devices.length; i++) {
      if (devices[i].name == null) {
        sendPacketToIP('320', devices[i].remoteIP)
        devicesWithNoHeader++
      }
    }
    console.log(devicesWithNoHeader)
    if (devicesWithNoHeader === 0) {
      return
    }
    await sleep(1000)
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function updateBroadcastAddress (bAddress) {
  broadcastAddress = bAddress
}

export function sendPacketBroadcast (data) {
  console.log('Sending broadcast to ' + broadcastAddress + ': ' + data)
  server.send(data, port, broadcastAddress)
}

export function sendPacketToIP (data, ip) {
  server.send(data, port, ip)
}

function requestStatusLease (remoteIP) {
  console.log(remoteIP)
  sendPacketToIP('500|10000,1000,F', remoteIP)
}

function getPacketData () {
  const devices = store.default.state.devices
  var payload = '300|'
  for (var i = 0; i < devices.length; i++) {
    if (i > 0) {
      payload += '-'
    }
    payload += devices[i].id + ',' + devices[i].remoteIP + ',' + devices[i].statusBit + ',' + devices[i].visibilityBit
  }

  return payload
}

function handleIncomingPacket (packetData, remoteIP) {
  var responseType = packetData.toString().substring(0, 3)
  var data = packetData.toString().substr(4).split(',')

  switch (responseType) {
    case '110':
      // Joining: Acknowledge credentials
      console.log('Credentials Acknowledged')
      // startDiscovery()
      break
    case '120':
      // Joining: Joined network Successfully
      console.log('IoT device joined network successfully')
      break
    case '130':
      // Joining: Failed to join network
      console.log('IoT Device failed to join network')
      break
    case '210':
      // Display: UI Recieved
      console.log('UI Recieved')
      const xml = packetData.toString().substring(4)
      xmlParser.parseXML(xml, ui => {
        store.default.dispatch('gotUI', {
          ip: remoteIP,
          ui
        })
      })

      requestStatusLease(remoteIP)
      break
    case '310':
      // Discovery: Discovery Response
      if ((new Date()).getTime() - listeningForDiscoveryStart <= 1000) {
        discoveryResponseRecieved = true
        console.log('Discovery Response')
        const device = {
          id: data[0],
          remoteIP,
          ui: null,
          statusBit: data[1],
          visibilityBit: data[2],
          lastContactDate: new Date(),
          active: false,
          static: false,
          name: null,
          room: null
        }

        store.default.dispatch('deviceDiscovered', device)
      }
      break
    case '330':
      // Discovery: Discovery Header Response
      console.log('Discovery header response recieved')

      store.default.dispatch('addDeviceNameAndRoom', {mac: data[0], name: data[1], room: data[2]})
      break
    case '510':
      // Status: Request Response
      console.log('Status request response recieved')
      break
    case '530':
      // Status: Status Update
      console.log('Status update recieved')

      store.default.dispatch('statusUpdate', {mac: data[0], updates: data.slice(2)})

      // Check if this is the last update
      if (data[1].toString() === 'T') {
        if (store.default.getters.isDeviceActive(data[0])) {
          requestStatusLease(remoteIP)
        }
      }
      break
    default:
      // Unknown Packet Type
  }
}

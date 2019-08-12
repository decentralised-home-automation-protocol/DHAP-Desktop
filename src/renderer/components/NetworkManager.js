const dgram = require('dgram')
export const server = dgram.createSocket('udp4')
const xmlParser = require('./XmlParser')
const store = require('../store')
const sameCensusListMax = 5
const noResponseMax = 3

var listeningForDiscoveryStart = 0
var discoveryResponseRecieved = false
var noResponseCount = 0
var sameListBroadcastCount = 0
var censusList = ''

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
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(8888)

export function startDiscovery () {
  listeningForDiscoveryStart = (new Date()).getTime()
  discoveryResponseRecieved = false
  var payload = getPacketData()
  server.send(payload, 8888, '192.168.1.255')

  if (payload === censusList) {
    sameListBroadcastCount++
  }
  censusList = payload

  if (sameListBroadcastCount < sameCensusListMax) {
    setTimeout(function () {
      if (!discoveryResponseRecieved) {
        noResponseCount++
        if (noResponseCount < noResponseMax) {
          startDiscovery()
        }
      } else {
        noResponseCount = 0
        startDiscovery()
      }
    }, 1000)
  }
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
  switch (responseType) {
    case '110':
      // Joining: Acknowledge credentials
      break
    case '120':
      // Joining: Joined network Successfully
      break
    case '130':
      // Joining: Failed to join network
      break
    case '210':
      // Display: UI Recieved
      console.log('UI Recieved')
      const xml = packetData.toString().substr(4)
      xmlParser.parseXML(xml, ui => {
        store.default.dispatch('gotUI', {
          ip: remoteIP,
          ui
        })
      })
      break
    case '310':
      // Discovery: Discovery Response
      if ((new Date()).getTime() - listeningForDiscoveryStart <= 1000) {
        discoveryResponseRecieved = true
        console.log('Discovery Response')
        var info = packetData.toString().substr(4).split(',')
        const device = {
          id: info[0],
          remoteIP,
          ui: null,
          statusBit: info[1],
          visibilityBit: info[2],
          lastContactDate: new Date(),
          active: false
        }

        store.default.dispatch('deviceDiscovered', device)
      }
      break
    case '510':
      // Status: Request Response
      break
    case '530':
      // Status: Lease Expired
      break
    case '540':
      // Status: Status Update
      break
    default:
      // Unknown Packet Type
  }
}

const dgram = require('dgram')
export const server = dgram.createSocket('udp4')
const xmlParser = require('./XmlParser')
const store = require('../store')

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
      console.log('Discovery Response')
      const mac = packetData.toString().substr(4).split(',')[0]
      const device = {
        id: mac,
        remoteIP,
        ui: null,
        active: false
      }

      console.log(device)

      store.default.dispatch('deviceDiscovered', device)
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

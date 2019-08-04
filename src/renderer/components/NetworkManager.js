import { EventBus } from './event-bus.js'
const dgram = require('dgram')
export const server = dgram.createSocket('udp4')

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (msg, rinfo) => {
  console.log(`server got: message from ${rinfo.address}:${rinfo.port}`)
  handleIncomingPacket(msg)
})

server.on('listening', () => {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(8888)

function handleIncomingPacket (packetData) {
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
      EventBus.$emit('New-UI-XML', packetData)
      break
    case '310':
      // Discovery: Discovery Response
      console.log('Discovery Response')
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

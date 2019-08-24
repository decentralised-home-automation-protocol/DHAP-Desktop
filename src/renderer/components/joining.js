var wifi = require('node-wifi')
const store = require('../store')

wifi.init({
  iface: null
})

export function joinDevice (joinData) {
  console.log(joinData)

  wifi.connect(
    { ssid: 'TP-LINK_AE045A', password: '0358721743' },
    function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Home credentials verified')
        connectToIoTAP(joinData)
      }
    }
  )
}

function connectToIoTAP (credentials) {
  wifi.connect(
    { ssid: 'ESPsoftAP_01', password: 'passforap' },
    function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Connected to IoT device')
        var connected = false
        // while (!connected) {
          wifi.getCurrentConnections().then(function (networks) {
            console.log(networks)
            connected = true
          }).catch(function (error) {
            console.log(error)
          })
        // }
        // setTimeout(function () {
        //   const vals = wifi.getCurrentConnections()
        //   console.log(vals)
        //   store.default.dispatch('sendJoiningCredentials', {SSID: 'TP-LINK_AE045A', password: '0358721743'})
        // }, 4000)
      }
    }
  )
}

export function scanWifi () {
  wifi.scan(function (err, networks) {
    if (err) {
      console.log(err)
    } else {
      store.default.dispatch('updateNetworks', networks)
    }
  })
}

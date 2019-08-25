var wifi = require('node-wifi')
const store = require('./store')

wifi.init({
  iface: null
})

export function joinDevice (credentials) {
  wifi.connect(
    { ssid: credentials.homeSSID, password: credentials.homePassword },
    function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Home credentials verified')
        connectToIoTAP(credentials)
      }
    }
  )
}

function connectToIoTAP (credentials) {
  wifi.connect(
    { ssid: credentials.iotSSID, password: credentials.iotPassword },
    function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Connecting to IoT device...')
        sendJoiningCredentials(0, credentials)
      }
    }
  )
}

function sendJoiningCredentials (attempts, credentials) {
  setTimeout(function () {
    wifi.getCurrentConnections().then(function (networks) {
      console.log(networks)
      for (var i = 0; i < networks.length; i++) {
        if (networks[i].ssid === credentials.iotSSID) {
          console.log('Connected to IoT Device: ' + credentials.iotSSID)
          // send credentials after a little bit of time to ensure connection is finalised.
          setTimeout(function () {
            store.default.dispatch('sendJoiningCredentials', {SSID: credentials.homeSSID, password: credentials.homePassword})
          }, 5000)
          setTimeout(function () {
            store.default.dispatch('sendJoiningCredentials', {SSID: credentials.homeSSID, password: credentials.homePassword})
          }, 6000)
          setTimeout(function () {
            store.default.dispatch('sendJoiningCredentials', {SSID: credentials.homeSSID, password: credentials.homePassword})
          }, 7000)
          return true
        }
      }

      sendJoiningCredentials(attempts++, credentials)
    }).catch(function (error) {
      console.log(error)
    })
    if (attempts > 20) {
      console.log('Failed to connect to IoT Device')
      return false
    }
  }, 1000)
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

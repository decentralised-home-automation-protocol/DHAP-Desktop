import { EventBus } from './event-bus.js'

EventBus.$on('New-UI-XML', message => {
  parseXML(message.toString().substr(4))
})

function parseXML (xml) {
  var parseString = require('xml2js').parseString
  parseString(xml, function (err, result) {
    if (err) {
      console.dir(err)
    } else {
      getElementsFromXML(result)
    }
  })
}

function getElementsFromXML (xml) {
  var elements = []
  var displaySettings = []

  for (var groupNum = 1; groupNum < xml.device.group.length; groupNum++) {
    var group = xml.device.group[groupNum]
    for (var elementNum = 0; elementNum < group.gui_element.length; elementNum++) {
      var element = group.gui_element[elementNum]
      elements.push(element.type[0].toString())
      displaySettings.push(element.disp_settings[0].toString())
    }
  }
  EventBus.$emit('New-XML-Elements', elements, displaySettings)
}

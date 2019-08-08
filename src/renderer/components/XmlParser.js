const parseString = require('xml2js').parseString

exports.parseXML = (xml) => {
  parseString(xml, function (err, result) {
    if (err) {
      console.dir(err)
    } else {
      return getElementsFromXML(result)
    }
  })
}

const getElementsFromXML = (xml) => {
  var elements = []
  var displaySettings = []

  for (var groupNum = 1; groupNum < xml.device.group.length; groupNum++) {
    var group = xml.device.group[groupNum]
    for (var elementNum = 0; elementNum < group.gui_element.length; elementNum++) {
      var element = group.gui_element[elementNum]
      var elementType = element.type[0].toString()
      if (elementType === 'progress') {
        elements.push('progressElement')
      } else {
        elements.push(elementType)
      }
      displaySettings.push(element.disp_settings[0].toString())
    }
  }
  return {
    elements,
    displaySettings
  }
  // EventBus.$emit('New-XML-Elements', elements, displaySettings)
}

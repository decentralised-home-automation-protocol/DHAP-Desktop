const parseString = require('xml2js').parseString

exports.parseXML = (xml, callback) => {
  parseString(xml, function (err, result) {
    if (err) {
      console.dir(err)
    } else {
      callback(getElementsFromXML(result))
    }
  })
}

const getElementsFromXML = (xml) => {
  var elements = []
  if (xml == null) {
    console.log('UI XML is empty')
    return elements
  }

  for (var groupNum = 0; groupNum < xml.device.group.length; groupNum++) {
    var group = xml.device.group[groupNum]
    for (var elementNum = 0; elementNum < group.gui_element.length; elementNum++) {
      var element = group.gui_element[elementNum]
      var elementType = element.type[0].toString()
      if (elementType === 'progress') {
        elementType = 'progresselement'
      }

      if (element.status_location) {
        elements.push({
          id: group.$.id + '-' + element.$.id,
          status_location: element.status_location[0],
          type: elementType,
          displaySettings: element.disp_settings[0].toString(),
          state: null
        })
      } else {
        elements.push({
          id: group.$.id + '-' + element.$.id,
          type: elementType,
          displaySettings: element.disp_settings[0].toString(),
          state: null
        })
      }
    }
  }
  return elements
}

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
  for (var groupNum = 1; groupNum < xml.device.group.length; groupNum++) {
    var group = xml.device.group[groupNum]
    for (var elementNum = 0; elementNum < group.gui_element.length; elementNum++) {
      var element = group.gui_element[elementNum]
      var elementType = element.type[0].toString()
      if (elementType === 'progress') {
        elementType = 'progressElement'
      }
      elements.push({
        id: group.$.id + '-' + element.$.id,
        type: elementType,
        displaySettings: element.disp_settings[0].toString(),
        state: {}
      })
    }
  }
  return elements
}

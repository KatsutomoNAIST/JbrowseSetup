export default class MyPlugin {
  name = 'MyJbPlugin'
  version = '1.0'

  install(pluginManager) {
    pluginManager.jexl.addFunction('customBedColor', feature => {
      if (feature.get('reserve') === '0.0.0') {
        return 'green'
      } else if (feature.get('reserve') === '47,79,79') {
        return 'yellow'
      } else if (feature.get('reserve') === '169,169,169') {
          return 'grey'
      }
    })
  }

  configure(pluginManager) {}
}

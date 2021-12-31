// Inside vue.config.js
module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
      name: 'Todo List PWA',
      themeColor: '#2D3C4B',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
  
      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'dev/sw.js',
        // ...other Workbox options...
      }
    }
  }
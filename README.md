# DHAP Desktop

A multiplatform implementation of the [Decentralised Home Automation Protocol](https://decentralised-home-automation-protocol.github.io/DHAP-Documentation/) using [electron](https://electronjs.org) and [vue.js](https://vuejs.org/)

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

## Installation

Ensure you have the latest version of [yarn](https://yarnpkg.com/lang/en/) or [npm](https://www.npmjs.com/get-npm) installed.

In the root directory run the following commands in a terminal

``` bash
# install dependencies
yarn # or npm install

# serve with hot reload at localhost:9080
yarn run dev # or npm run dev
```

To build the project use

```bash
# build electron application for production
yarn run build # or npm run build
```

## Usage

This project allows for multiple IoT devices that support the DHAP protocol to be used simultaneously.
Devices can be discovered and controlled. In addition, if this project is deployed to a WiFi capable machine, IoT devices can also be joined onto a home network.

## License

This project is licensed under the [MIT License](LICENSE)

## Credits

- **Daniel Milner** - Creator / Maintainer
- **Aiden Garipoli** - Creator / Maintainer
- **Tyler Steane** - DHAP Protocol work
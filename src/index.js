import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'typeface-roboto'
import { store, persistor } from './configureStore.js'
import { PersistGate } from 'redux-persist/integration/react'
import Web3 from 'web3'

async function init () {
  window._web3 = new Web3("https://ropsten.infura.io/v3/e2011dafd4c240bd8720f84ca826a7b2")

  console.log('init ... ')
  if (!window.gapi.client) {
    let config =  {
      scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata',
      client_id: '754636752811-bj2dnmm4jo44p41ef5lt33edlbcvbdog.apps.googleusercontent.com',
    }
    window.gapi.load('client', async function () {
      await window.gapi.client.init(config)
      if (!window.gapi.client.drive) {
        await window.gapi.client.load('drive', 'v3')
      }
    })
  }

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    , document.getElementById('root'))
  registerServiceWorker()
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

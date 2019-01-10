async function saveFile (file) {
  if (!window.gapi.client.drive) {
    await window.gapi.client.load('drive', 'v3')
  }

  async function addContent (fileId) {
    return window.gapi.client.request({
      path: '/upload/drive/v3/files/' + fileId,
      method: 'PATCH',
      params: {
        uploadType: 'media'
      },
      body: file.content
    })
  }
  var metadata = {
    mimeType: 'application/json',
    name: file.name,
    fields: 'id'
  }

  if (file.parents) {
    metadata.parents = file.parents
  }

  if (file.id) {
    // just update
    await addContent(file.id).then(function (resp) {
      console.log('File just updated', resp.result)
    })
  } else {
    // create and update
    let resp = await window.gapi.client.drive.files.create({
      resource: metadata
    })
    resp = await addContent(resp.result.id)
    console.log('created and added content', resp.result)
  }
}

function onLogin (loginData) {
  return {
    type: 'LOGIN',
    payload: {
      profile: {
        ...loginData,
        isAuthenticated: true
      }
    }
  }
}

async function _createAddress (alias) {
  let { address, privateKey } = window._web3.eth.accounts.create()
  let addressData = {
    alias: alias,
    address: address,
    privateKey: privateKey,
    cryptoType: 'Ethereum',
    public: false
  }
  await saveFile({
    content: JSON.stringify(addressData),
    name: `${addressData.cryptoType}_${addressData.address}.json`,
    parents: ['appDataFolder']
  })
}

function createAddress (alias) {
  return {
    type: 'CREATE_ADDRESS',
    payload: _createAddress(alias)
  }
}

export { onLogin, createAddress }

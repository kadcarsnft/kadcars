
async function getSelectedAccount() {

}

async function connectKadena() {
  const connectResponse = await checkKadenaConnectStatus();

  //Initiate KDA connect
  const response = await window.kadena.request({ method: 'kda_connect', networkId: DEFAULT_NETWORK_ID })
    .catch((e) => {
      console.error(e.message)
      return
    });

  response.status === 'success' ? setKadenaConnected(true) : setKadenaConnected(false);
}

async function checkKadenaConnectStatus() {
  const status = await window.kadena
}

async function disconnectKadena() {
  const response = await window.kadena.request({ method: 'kda_disconnect', networkId: DEFAULT_NETWORK_ID })
  .catch((e) => {
    console.error(e.message)
      return
  })


}

async function getNftIdForWallet(walletAddress) {

}

function getImageFromNftId(nftId) {

}

export {
    getImageFromNftId,
    getNftIdForWallet,
    getSelectedAccount,
    disconnectKadena,
    connectKadena
}
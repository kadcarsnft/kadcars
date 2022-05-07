import React from "react";
import { MAINNET_NETWORK_ID, KDA_CHECK_STATUS, KDA_CONNECT } from "./Constants";

//Attempt to connect application to Kadena X-Wallet extension
async function connectKadena() {
    let apiCall = "";
    
    const connectResponse = await getKadenaConnectStatus();
    
    switch(connectResponse) {
        case 'success':
            break;
            case 'fail':
            apiCall = KDA_CONNECT;
            break;
        default:
            break;
    }

    //Initiate KDA connect
    const response = await window.kadena.request({
        method: apiCall,
        networkId: MAINNET_NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });

    // response.status === 'success' ? setKadenaConnected(true) : setKadenaConnected(false);
}

//Check the user's Kadena extenstion connection status
async function getKadenaConnectStatus() {
    const response = await window.kadena.request({
        method: KDA_CHECK_STATUS
    })
    .catch((e) => {
        console.error(e.message);
        return;
    });

    console.log(response)

    return response.status;
}

async function getSelectedAccount() {

}


//Disconnect the user's X-Wallet account from this application
async function disconnectKadena() {
    const response = await window.kadena.request({ 
        method: 'kda_disconnect',
        networkId: MAINNET_NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });
}

export {
    connectKadena,
    disconnectKadena,
    getSelectedAccount,
    getKadenaConnectStatus,
}
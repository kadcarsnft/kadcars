import React from "react";
import {
    NETWORK_ID,
    KDA_CHECK_STATUS,
    KDA_CONNECT,
    LOCAL_ACCOUNT_KEY,
    LOCAL_CHAIN_ID,
    KDA_DISCONNECT,
    KDA_GET_SELECTED_ACCOUNT,
    KDA_REQUEST_ACCOUNT,
    DEFAULT_GAS_PRICE
} from "../utils/Constants";

//Attempt to connect application to Kadena X-Wallet extension
async function connectKadena(pactContextObject) {

    //Initiate KDA connect
    const response = await window.kadena.request({
        method: KDA_CONNECT,
        networkId: NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });

    return response;
}

//Check the user's Kadena extenstion connection status
async function getKadenaConnectStatus() {
    const response = await window.kadena.request({
        method: KDA_CHECK_STATUS,
        networkId: NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message);
        return;
    });

    return response;
}

async function requestAccount() {
    const response = await window.kadena.request({ 
        method: KDA_REQUEST_ACCOUNT,
        networkId: NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });

    return response;
}

async function getSelectedAccount() {
    const response = await window.kadena.request({ 
        method: KDA_GET_SELECTED_ACCOUNT,
        networkId: NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });
    
    return response;
}

//Disconnect the user's X-Wallet account from this application
async function disconnectKadena(pactContextObject) {
    const response = await window.kadena.request({ 
        method: KDA_DISCONNECT,
        networkId: NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });
    
    return response;
}

export {
    connectKadena,
    requestAccount,
    disconnectKadena,
    getSelectedAccount,
    getKadenaConnectStatus,
}
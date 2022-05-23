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
    DEFAULT_GAS_PRICE,
    KDA_REQUEST_SIGN
} from "../utils/Constants";

//Attempt to connect application to Kadena X-Wallet extension
async function connectKadena(netId) {

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
async function getKadenaConnectStatus(netId) {
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

async function requestKadenaAccount(netId, domain) {
    const response = await window.kadena.request({ 
        method: KDA_REQUEST_ACCOUNT,
        networkId: NETWORK_ID,
        domain: domain
    })
    .catch((e) => {
        console.error(e.message);
        return;
    });

    return response;
}

async function requestSign(netId, dataToSign) {
    const response = await window.kadena.request({
        method: KDA_REQUEST_SIGN,
        networkId: netId,
        data: dataToSign
    })
    .catch((e) => {
        console.error(e.message);
        return;
    });

    return response;
}

async function getSelectedAccount(netId) {
    const response = await window.kadena.request({ 
        method: KDA_GET_SELECTED_ACCOUNT,
        networkId: NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message);
        return;
    });
    
    return response;
}

//Disconnect the user's X-Wallet account from this application
async function disconnectKadena(netId) {
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
    requestKadenaAccount,
    disconnectKadena,
    getSelectedAccount,
    getKadenaConnectStatus,
    requestSign
}
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

    console.log(response)
    if (response.status === 'success') {
        let account = response.account.account;
        let chainId = response.account.chainId;

        localStorage.setItem(LOCAL_ACCOUNT_KEY, account);
        localStorage.setItem(LOCAL_CHAIN_ID, chainId);

        if (pactContextObject) {
            pactContextObject.setAccount(account);
            pactContextObject.setNetworkSettings(NETWORK_ID, chainId, DEFAULT_GAS_PRICE); //TODO: MAKE GASPRICE AND NETID DYNAMIC BASED ON WALLET TYPE
        }
    } 
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
}

//Disconnect the user's X-Wallet account from this application
async function disconnectKadena(pactContextObject) {
    await window.kadena.request({ 
        method: KDA_DISCONNECT,
        networkId: NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });

    localStorage.setItem(LOCAL_ACCOUNT_KEY, null);
    localStorage.setItem(LOCAL_CHAIN_ID, null);

    pactContextObject.setAccount(null);
    // pactContextObject.setNetworkSettings(MAINNET_NETWORK_ID, undefined, DEFAULT_GAS_PRICE);
    pactContextObject.setNetworkSettings(NETWORK_ID, null, DEFAULT_GAS_PRICE);
}


function getUserWallet() {
    return window.kadena.userWallet;
}

export {
    connectKadena,
    getUserWallet,
    disconnectKadena,
    getSelectedAccount,
    requestAccount,
    getKadenaConnectStatus,
}
import React from "react";
import {
    MAINNET_NETWORK_ID,
    TESTNET_NETWORK_ID,
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
async function connectKadena(setNetworkSettings) {

    //Initiate KDA connect
    const response = await window.kadena.request({
        method: KDA_CONNECT,
        // networkId: MAINNET_NETWORK_ID
        networkId: TESTNET_NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });

    console.log(response)
    if (response.status === 'success') {
        let account = response.account.account;
        let chain = response.account.chainId;

        localStorage.setItem(LOCAL_ACCOUNT_KEY, account);
        localStorage.setItem(LOCAL_CHAIN_ID, chain);

        // setNetworkSettings(MAINNET_NETWORK_ID, chain, DEFAULT_GAS_PRICE);
        setNetworkSettings(TESTNET_NETWORK_ID, chain, DEFAULT_GAS_PRICE); //TODO: MAKE GASPRICE AND NETID DYNAMIC BASED ON WALLET TYPE
    }
}

//Check the user's Kadena extenstion connection status
async function getKadenaConnectStatus() {
    const response = await window.kadena.request({
        method: KDA_CHECK_STATUS,
        // networkId: MAINNET_NETWORK_ID
        networkId: TESTNET_NETWORK_ID
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
        // networkId: MAINNET_NETWORK_ID
        networkId: TESTNET_NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });
    console.log(response)
}

async function getSelectedAccount() {
    const response = await window.kadena.request({ 
        method: KDA_GET_SELECTED_ACCOUNT,
        // networkId: MAINNET_NETWORK_ID
        networkId: TESTNET_NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });
}

//Disconnect the user's X-Wallet account from this application
async function disconnectKadena() {
    const response = await window.kadena.request({ 
        method: KDA_DISCONNECT,
        // networkId: MAINNET_NETWORK_ID
        networkId: TESTNET_NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });
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
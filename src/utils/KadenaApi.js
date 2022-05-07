import React from "react";
import { MAINNET_NETWORK_ID, KDA_CHECK_STATUS, KDA_CONNECT, LOCAL_ACCOUNT_KEY, LOCAL_CHAIN_ID } from "./Constants";

//Attempt to connect application to Kadena X-Wallet extension
async function connectKadena() {

    //Initiate KDA connect
    const response = await window.kadena.request({
        method: KDA_CONNECT,
        networkId: MAINNET_NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message)
        return;
    });

    console.log(response)
    if (response.status === 'success') {
        let account = response.account.account;
        let chain = response.chainId;

        localStorage.setItem(LOCAL_ACCOUNT_KEY, account);
        localStorage.setItem(LOCAL_CHAIN_ID, chain);
    }
}

//Check the user's Kadena extenstion connection status
async function getKadenaConnectStatus() {
    const response = await window.kadena.request({
        method: KDA_CHECK_STATUS,
        networkId: MAINNET_NETWORK_ID
    })
    .catch((e) => {
        console.error(e.message);
        return;
    });

    return response.status;
}

async function getAccountSelected() {

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

function getUserWallet() {
    return window.kadena.userWallet;
}

function getSelectedAccount() {
    return window.kadena.getSelectedAccount;
}

export {
    connectKadena,
    getUserWallet,
    disconnectKadena,
    getSelectedAccount,
    getAccountSelected,
    getKadenaConnectStatus,
}
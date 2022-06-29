import React from "react";
import { toast } from "react-toastify";
import { connectKadena, getChain, getNetwork, getSelectedAccount } from "../kadenaInteraction/KadenaApi";
import { DEFAULT_CHAIN_ID, LOCAL_CHAIN_ID, TESTNET_NETWORK_ID } from "./Constants";

//Check if given variable is null or undefined
function checkIfNullOrUndefined(variable) {
    if (variable === undefined || 
        variable === null || 
        variable === 'undefined' || 
        variable === 'null' || 
        variable === "") {
        return true;
    } 
    return false;
}

//Load variable from local storage with given key
function tryLoadLocal(key) {
    let val = localStorage.getItem(key);
    if (val == null) {
        return null;
    }
    try {
        return JSON.parse(val);
    } catch (e) {
        console.log(e);
        return null;
    }
}

//Save variable in local storage with given key
function trySaveLocal(key, val) {
    try {
        localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
        console.log(e);
        return;
    }
}

//Generic method to create http requests
function makeRequest(method, headers, cmd) {
    var body;
    cmd ? body = JSON.stringify(cmd) : body = "";

    return {
        headers: headers,
        method: method,
        body: body,
    };
}

function mkReq(cmd) {
    console.log(cmd)
    console.log(JSON.stringify(cmd))
    return {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(cmd),
    };
  }

//Generic async function to parse an http response
async function parseResponse(raw) {
    const rawRes = await raw;
    const res = await rawRes;
    if (res.ok) {
        const resJSON = await rawRes.json();
        return resJSON;
    } else {
        const resTEXT = await rawRes.text();
        return resTEXT;
    }
}

//Returns the genesis date and time
function creationTime() {
    return Math.round(new Date().getTime() / 1000) - 10;
}

//Custom wait function for any timed actions
const wait = async (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

function checkIfItemExistsInDropdownList(item, list) {
    const filtered = list.filter((option) => item === option.value);
    return filtered.length > 0;
}

async function confirmTransactionWithNetwork(networkUrl, method, headers, signedCmd, callback=null) {
    let localRes = null;

    try {
        localRes = await fetch(`${networkUrl}/api/v1/local`, makeRequest(method, headers, signedCmd));
    } catch (e) {
        console.log(e);
        toast.error("Confirming transaction with network failed, check your network URL");
        callback && callback();
        return;
    }

    return localRes;
}

async function checkXwalletNetworkAndChainSettings(callback=null, command=null) {
    let networkRes = await getNetwork();
    let chainRes = await getChain();
    var res = null;

    if (networkRes.networkId !== TESTNET_NETWORK_ID) {
        toast.error("Please set your X-Wallet to Testnet");
        return res;
    }
    
    if (chainRes !== LOCAL_CHAIN_ID) {
        if (chainRes !== DEFAULT_CHAIN_ID && parseInt(chainRes) !== DEFAULT_CHAIN_ID) {
            toast.error("Please select chain ID 1");
            return res;
        } else {
            toast.info("You've changed your wallet settings, please reconnect before proceeding", { position: "top-center" });
            trySaveLocal(LOCAL_CHAIN_ID, chainRes);
            res = await connectKadena(TESTNET_NETWORK_ID);
            // callback && callback(command ? command : null);

            return res;
        }
    }
}

export {
    wait,
    mkReq,
    makeRequest,
    creationTime,
    tryLoadLocal,
    trySaveLocal,
    parseResponse,
    checkIfNullOrUndefined,
    confirmTransactionWithNetwork,
    checkIfItemExistsInDropdownList,
    checkXwalletNetworkAndChainSettings
}
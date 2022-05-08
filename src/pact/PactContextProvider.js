import React, { useState, useEffect } from "react";
import Pact from "pact-lang-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react/cjs/react.production.min";
import { DEFAULT_GAS_PRICE, LOCAL_ACCOUNT_KEY, MAINNET_NETWORK_ID, TESTNET_NETWORK_ID } from "../utils/Constants";

export const PactContext = createContext(); //Define Pact Context

const PactContextProvider = ({ children }) => {
    const [chainId, setChainId] = useState(null);
    const [gasPrice, setGasPrice] = useState(DEFAULT_GAS_PRICE);
    const [netId, setNetId] = useState(null);
    const [account, setAccount] = useState(() => tryLoadLocal(LOCAL_ACCOUNT_KEY));
    const [networkUrl, setNetworkUrl] = useState(null);

    useEffect(() => {
        setNetworkUrl(getNetworkUrl(netId, chainId));
    }, [netId, chainId]);
    
    const setNetworkSettings = (netId, chainId, gasPrice) => {
        setNetId(netId);
        setChainId(chainId);
        setGasPrice(gasPrice);
    };

    const useSetNetworkSettings = (netId, chainId, gasPrice=DEFAULT_GAS_PRICE) => {
        useEffect(() => {
            setNetworkSettings(netId, chainId, gasPrice)
        }, [netId, chainId, gasPrice]);
    }

    const defaultMeta = (gasLimit) => {
        return Pact.lang.mkMeta(
            "",
            chainId,
            gasPrice,
            gasLimit ?? 150000,
            creationTime(),
            600
        );
    };

    const readFromContract = async (cmd, returnError) => {
        try {
            let data = await Pact.fetch.local(cmd, networkUrl);
            if (data?.result?.status === "success") {
                return data.result.data;
            } else {
                console.log(data);
                if (returnError === true) {
                    return data?.result?.error?.message;
                } else {
                    return null;
                }
            }
        } catch (e) {
            toast.error("Had trouble fetching data from the blockchain");
            console.log(e);
        }
        return null;
    };
    return (
        <PactContext.Provider
            value={{
                chainId,
                setChainId,
                gasPrice,
                setGasPrice,
                netId,
                setNetId,
                account,
                setAccount,
                networkUrl,
                setNetworkUrl,
                setNetworkSettings,
                useSetNetworkSettings
            }}
        >
            {children}
        </PactContext.Provider>
    )
}

function getNetworkUrl(netId, chainId) {
    if (netId == null && chainId == null) {
        return;
    }
    if (netId === TESTNET_NETWORK_ID) {
        return `https://api.testnet.chainweb.com/chainweb/0.0/${TESTNET_NETWORK_ID}/chain/${chainId}/pact`;
    } else if (netId === MAINNET_NETWORK_ID) {
        return `https://api.chainweb.com/chainweb/0.0/${MAINNET_NETWORK_ID}/chain/${chainId}/pact`;
    }
    throw new Error("networkId must be testnet or mainnet");
}

function creationTime() {
    return Math.round(new Date().getTime() / 1000) - 10;
}

function tryLoadLocal(key) {
    let val = localStorage.getItem(key);
    if (val == null) {
        return null;
    }
    try {
        // return JSON.parse(val);
        return val;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export {
    PactContextProvider
}
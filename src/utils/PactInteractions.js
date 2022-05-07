import React, { useState } from "react";
import Pact from "pact-lang-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react/cjs/react.production.min";
import { DEFAULT_GAS_PRICE, LOCAL_ACCOUNT_KEY } from "./Constants";

export const PactContext = createContext();

const PactContextProvider = ({ children }) => {
    const [chainId, setChainId] = useState(null);
    const [gasPrice, setGasPrice] = useState(DEFAULT_GAS_PRICE);
    const [netId, setNetId] = useState(null);
    const [account, setAccount] = useState(() => tryLoadLocal(LOCAL_ACCOUNT_KEY));
    const [networkUrl, setNetworkUrl] = useState(null);
    
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
      return JSON.parse(val);
    } catch (e) {
      console.log(e);
      return null;
    }
  }


export {

}
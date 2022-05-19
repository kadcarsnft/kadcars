import { useContext, useState, useEffect } from "react";
import { PactContext } from "../pact/PactContextProvider";
import { IS_X_WALLET_KEY } from "../utils/Constants";
import { trySaveLocal } from "../utils/utils";

function useCheckForXWalletExtension() {
    const { isXwallet, setIsXwallet } = useContext(PactContext)

    useEffect(() => {
        setIsXwallet(window?.kadena?.isKadena === true);
        trySaveLocal(IS_X_WALLET_KEY, isXwallet);
    }, []);

    return isXwallet;
}

export {
    useCheckForXWalletExtension
}
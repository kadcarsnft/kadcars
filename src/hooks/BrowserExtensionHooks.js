import { useContext, useState, useEffect } from "react";
import { PactContext } from "../pact/PactContextProvider";

function useCheckForXWalletExtension() {
    const { isXwallet, setIsXwallet } = useContext(PactContext);
    const [hasExtension, setHasExtension] = useState(null);

    useEffect(() => {
        // setHasExtension(window?.kadena?.isKadena === true);
        setIsXwallet(window?.kadena?.isKadena === true);
    });

    return isXwallet;
}

export {
    useCheckForXWalletExtension
}
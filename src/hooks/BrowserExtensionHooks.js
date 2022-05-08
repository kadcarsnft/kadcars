import { useState, useEffect } from "react";

function useCheckForXWalletExtension() {
    const [hasExtension, setHasExtension] = useState(null);

    useEffect(() => {
        setHasExtension(window?.kadena?.isKadena === true);
    });

    return hasExtension;
}

export {
    useCheckForXWalletExtension
}
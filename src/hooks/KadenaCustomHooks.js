import { useState, useEffect } from "react";
import { getKadenaConnectStatus, getSelectedAccount, requestAccount } from "../utils/KadenaApi";

function useCheckKadenaAccountConnection(hasExtension) {
    const [isConnected, setIsConnected] = useState(null);

    async function checkKadenaConnection() {
        const response = await getKadenaConnectStatus();
        response.status === 'success' ? setIsConnected(true) : setIsConnected(false);
    }

    useEffect(() => {
        hasExtension && checkKadenaConnection();
    }, [hasExtension]);
    
    return isConnected;
}

export {
    useCheckKadenaAccountConnection
}
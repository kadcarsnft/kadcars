import React, { useContext, useEffect } from "react";
import { PactContext } from "../../pact/PactContextProvider";
import { LOCAL_CHAIN_ID, NETWORK_ID } from "../../utils/Constants";
import { MainHeaderScreenContainer } from "./KadcarComponents";
import { KadcarGameContextProvider } from "./KadcarGameContext";

const KadcarHub = () => {
    const { useSetNetworkSettings } = useContext(PactContext);
    
    //Ensure network settings are correct before loading the current context
    useSetNetworkSettings(NETWORK_ID, LOCAL_CHAIN_ID); 

    return (
        <KadcarGameContextProvider>
            <MainHeaderScreenContainer/>
        </KadcarGameContextProvider>
    )
}

export {
    KadcarHub
}
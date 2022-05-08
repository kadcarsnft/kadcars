import React, { useContext } from "react";
import { LOCAL_ACCOUNT_KEY } from "../utils/Constants";
import { PactContext } from "./PactContextProvider";

function useGetMyKadcars() {
    const { account, readFromContract, defaultMeta } = useContext(PactContext);

    return async () => {
        const pactCode = `(free.kakars-nft-collection.get-owner "7")`; //TODO: MAKE CONSTANTS
        const meta = defaultMeta(1000000);
        const contractOutput = await readFromContract({ pactCode, meta });
        console.log(contractOutput);
        return contractOutput;
    };
}

export {
    useGetMyKadcars
}
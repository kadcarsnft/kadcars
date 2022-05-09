import React, { useState, useContext, useEffect, useMemo } from "react";
import { LOCAL_ACCOUNT_KEY } from "../utils/Constants";
import { PactContext } from "./PactContextProvider";
import { executePactContract, getPactCommandForNftByNftId, getPactCommandForNftsByOwner } from "./PactUtils";

function useGetMyKadcarsFunction() {
    const { account, readFromContract, defaultMeta } = useContext(PactContext);

    return async () => {
        const pactCode = `(free.kakars-nft-collection.get-owner "7")`; //TODO: MAKE CONSTANTS
        const meta = defaultMeta(1000000);
        const contractOutput = await readFromContract({ pactCode, meta });
        console.log(contractOutput);
        return contractOutput;
    };
}

function useGetMyKadcars() {
    const { account, readFromContract, defaultMeta } = useContext(PactContext);
    const [currentUserKadcarNfts, setCurrentUseKadcarNfts] = useState(null);

    //Establish the parameters needed for the pact command to get the kadcar ids
    const paramsForNftPactContract = useMemo(() => {
        var parameters = {
            account: account,
            metaData: defaultMeta,
            readFromContract: readFromContract
        }
        return parameters;
    }, [account, readFromContract, defaultMeta]);

    //Retrieves Kadcar NFTs associated with the current user
    useEffect(() => {
        //Executes pact contract to retrieve this user's Kadcars
        async function getKadcarNftsForGivenId() {
            const nfts = await executePactContract(paramsForNftPactContract, getPactCommandForNftsByOwner(paramsForNftPactContract.account));
            setCurrentUseKadcarNfts(nfts);
            return nfts;
        }
        getKadcarNftsForGivenId();
    }, [paramsForNftPactContract]);

    return currentUserKadcarNfts;
}

function useGetAllKadcars() {

}

function useMintKadcarNft() {

}

export {
    useGetMyKadcars,
    useGetMyKadcarsFunction,
    useGetAllKadcars
}
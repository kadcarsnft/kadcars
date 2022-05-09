import React, { useState, useContext, useEffect, useMemo } from "react";
import { LOCAL_ACCOUNT_KEY } from "../utils/Constants";
import { PactContext } from "./PactContextProvider";
import { executePactContract, getPactCommandForNftByNftId, getPactCommandForNftIdsByOwner } from "./PactUtils";

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
    const { account, chainId, readFromContract, defaultMeta } = useContext(PactContext);
    const [kadcarIds, setKadcarIds] = useState(null);
    const [kadcarObjects, setKadcarObjects] = useState(null);

    //Establish the parameters needed for the pact command to get the kadcar ids
    const pactUtilParamsForKadcarIds = useMemo(() => {
        var parameters = {
            account: account,
            chainId: chainId,
            metaData: defaultMeta,
            readFromContract: readFromContract,
            pactCmd: getPactCommandForNftIdsByOwner(account)
        }
        return parameters;
    }, [account, readFromContract, defaultMeta]);
    
    //Establish the parameters needed for the pact command to get the kadcar NFTs
    const pactUtilParamsForNfts = useMemo(() => {
        var parameters = {
            account: account,
            kadcarIds:kadcarIds,
            metaData: defaultMeta,
            readFromContract: readFromContract,
            pactCmd: getPactCommandForNftByNftId(account)
        }
        return parameters;
    }, [account, readFromContract, defaultMeta, kadcarIds]);

    useEffect(() => {
        setKadcarIds(executePactContract(pactUtilParamsForKadcarIds));
    }, [pactUtilParamsForKadcarIds]);

    //TODO SPLIT THIS
    // useEffect(() => {
    //     if (false) {
    //         const kadcars = pactUtilParamsForNfts.kadcarIds.map((kadcarId) => {
    //             executePactContract(pactUtilParamsForNfts);
    //         });
    //     }
    // }, [pactUtilParamsForNfts]);

    return ;
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
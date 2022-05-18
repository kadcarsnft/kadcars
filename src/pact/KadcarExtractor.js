import React, { useState, useCallback, useContext, useEffect, useMemo } from "react";
import { KadcarGameContext } from "../components/kadcarcomponents/KadcarGameContextProvider";
import { ADMIN_ADDRESS, KADCAR_NFT_COLLECTION, LOCAL_ACCOUNT_KEY } from "../utils/Constants";
import { checkIfNullOrUndefined } from "../utils/utils";
import { PactContext } from "./PactContextProvider";
import Pact from "pact-lang-api";
import { executePactContract, getPactCommandForAllNfts, getPactCommandForMintingNft, getPactCommandForNftByNftId, getPactCommandForNftsByOwner, getPactCommandForTransferNft } from "./PactUtils";
import { split } from "lodash";

async function executeContractForUser(parameters, getPactCommandFunction, invocableStateSetter=null) {
    if (!checkIfNullOrUndefined(parameters.account) && 
        !checkIfNullOrUndefined(parameters.chainId) && 
        !checkIfNullOrUndefined(parameters.networkUrl)) {
        executeContract(parameters, getPactCommandFunction,invocableStateSetter);
    }
}

async function executeContract(parameters, getPactCommandFunction, invocableStateSetter = null) {
    const data = await executePactContract(parameters, getPactCommandFunction(parameters.account));
    invocableStateSetter && invocableStateSetter(data);
}

function useGetMyKadcarsFunction() {
    const { account, readFromContract, defaultMeta, fetchAccountDetails } = useContext(PactContext);

    return async () => {
        const pactCode = `(free.kakars-nft-collection.get-owner "7")`; //TODO: MAKE CONSTANTS
        const meta = defaultMeta(1000000);
        const contractOutput = await readFromContract({ pactCode, meta });
        const res = await fetchAccountDetails(account);
        console.log(account)
        console.log(res)
        return contractOutput;
    };
}

async function checkAccountAndExecuteContract() {

}

//Custom hook to retrieve all kadcars minted by user
function useGetMyKadcars(parameters) {
    const { account, chainId, networkUrl, readFromContract, defaultMeta, setNetworkSettings } = useContext(PactContext);
    const [currentUserKadcarNfts, setCurrentUseKadcarNfts] = useState(null); //TODO: MEMOIZE
    
    //Establish the parameters needed for the pact command to get the kadcar ids
    const paramsForNftPactContract = useMemo(() => {
        var parameters = {
            account: account,
            chainId: chainId,
            metaData: defaultMeta,
            networkUrl: networkUrl,
            readFromContract: readFromContract
        }
        executeContractForUser(parameters, getPactCommandForNftsByOwner, setCurrentUseKadcarNfts);
    }, [account, chainId, readFromContract, defaultMeta]);

    //Retrieves Kadcar NFTs associated with the current user
    useEffect(() => {

    }, [paramsForNftPactContract]);

    return currentUserKadcarNfts;
}

//Custom hook to retrieve all minted kadcars
function useGetAllKadcars() {
    const { chainId, networkUrl, readFromContract, defaultMeta } = useContext(PactContext);
    const [allKadcars, setAllKadcars] = useState(null);

    //Establish parameters and execute the contract to retrieve all minted kadcars
    const allKadcarsMemo = useMemo(() => {
        var parameters = {
            chainId: chainId,
            metaData: defaultMeta,
            networkUrl: networkUrl,
            readFromContract: readFromContract,
        }
        executeContractForUser(parameters, getPactCommandForAllNfts, setAllKadcars);
    }, [allKadcars, readFromContract, defaultMeta]);

    useEffect(() => {

    }, [allKadcarsMemo]);
}

function useMintKadcar() {
    const { 
        account, 
        defaultMeta, 
        networkUrl, 
        readFromContract, 
        chainId, 
        netId, 
        gasPrice, 
        sendTransaction, 
        signTransaction, 
        currTransactionState,
        fetchAccountDetails } = useContext(PactContext);
    const { pricePerKadcar } = useContext(KadcarGameContext);

    return async (amount, callback) => {
        const accountDetails = await fetchAccountDetails(account);
        const priceToPay = amount * pricePerKadcar;
        const pactCode = getPactCommandForMintingNft(accountDetails.account);
        console.log(accountDetails)
        const cmd = {
            pactCode,
            caps: [
                Pact.lang.mkCap(`Pay to manufacture`, "Pay to manufacture", `coin.TRANSFER`, [
                    accountDetails.account,
                    ADMIN_ADDRESS,
                    priceToPay,
                ]),
                Pact.lang.mkCap(
                    "Verify your account",
                    "Verify your account",
                    `free.${KADCAR_NFT_COLLECTION}.ACCOUNT_GUARD`,
                    [accountDetails.account]
                ),
                Pact.lang.mkCap("Gas capability", "Pay gas", "coin.GAS", []),
            ],
            sender: accountDetails.account,
            gasLimit: 3000 * amount,
            gasPrice,
            chainId,
            ttl: 600,
            envData: {
                "user-ks": accountDetails.account,
                account: accountDetails.account,
            },
            signingPubKey: accountDetails.guard.keys[0],
            networkId: netId,
        };
        const previewContent = (
            <p>
                You will manufacture 1 for {priceToPay} KDA
            </p>
        );
        sendTransaction(
            cmd,
            previewContent,
            `Manufacturing 1`,
            callback ?? (() => alert("Manufactured!"))
        );
        // signTransaction(currTransactionState.cmdToConfirm);
        
        console.log(cmd)
        signTransaction(cmd);
    }
}

function useTransferKadcars() {
    const { 
        account, 
        defaultMeta, 
        networkUrl, 
        readFromContract, 
        chainId, 
        netId, 
        gasPrice, 
        sendTransaction, 
        signTransaction, 
        currTransactionState,
        fetchAccountDetails } = useContext(PactContext);

    return async (nftId, sender, receiver, callback) => {
        const priceToPay = 1;
        const pactCode = getPactCommandForTransferNft(nftId, sender, receiver);
        const accountDetails = await fetchAccountDetails(account);
        const cmd = {
            pactCode,
            caps: [
                Pact.lang.mkCap(`Pay to manufacture`, "Pay to manufacture", `coin.TRANSFER`, [
                    account,
                    ADMIN_ADDRESS,
                    priceToPay,
                ]),
                Pact.lang.mkCap(
                    "Verify your account",
                    "Verify your account",
                    `free.${KADCAR_NFT_COLLECTION}.ACCOUNT_GUARD`,
                    [account]
                ),
                Pact.lang.mkCap("Gas capability", "Pay gas", "coin.GAS", []),
            ],
            sender: account,
            gasLimit: 3000 * 1,
            gasPrice,
            chainId,
            ttl: 600,
            envData: {
                "user-ks": accountDetails.guard,
                account: account,
            },
            signingPubKey: split(account, ":")[1],
            networkId: netId,
        };
        const previewContent = (
            <p>
                You will manufacture 1 for {priceToPay} KDA
            </p>
        );
        sendTransaction(
            cmd,
            previewContent,
            `Manufacturing 1`,
            callback ?? (() => alert("Manufactured!"))
        );
        // signTransaction(currTransactionState.cmdToConfirm);
        signTransaction(cmd);
    }
}

export {
    useMintKadcar,
    useGetMyKadcars,
    useGetAllKadcars,
    useTransferKadcars,
    useGetMyKadcarsFunction,
}
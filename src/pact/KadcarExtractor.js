import React, { useState, useCallback, useContext, useEffect, useMemo } from "react";
import { KadcarGameContext } from "../components/kadcarcomponents/KadcarGameContextProvider";
import { ADMIN_ADDRESS, KADCAR_NFT_COLLECTION, LOCAL_ACCOUNT_KEY } from "../utils/Constants";
import { checkIfNullOrUndefined } from "../utils/utils";
import { PactContext } from "./PactContextProvider";
import Pact from "pact-lang-api";
import { 
    executePactContract, 
    getPactCommandForAllNfts, 
    getPactCommandForMintingNft, 
    getPactCommandForNftByNftId, 
    getPactCommandForTransferNft, 
    getPactCommandForNftsByOwner, 
} from "./PactUtils";
import { split } from "lodash";

async function executeContractForUser(parameters, getPactCommandFunction, invocableStateSetter=null) {
    if (!checkIfNullOrUndefined(parameters.account) && 
        !checkIfNullOrUndefined(parameters.chainId) && 
        !checkIfNullOrUndefined(parameters.networkUrl)) {
        executeContract(parameters, getPactCommandFunction, invocableStateSetter);
    }
}

async function executeContract(parameters, getPactCommandFunction, invocableStateSetter = null) {
    if (!checkIfNullOrUndefined(parameters.chainId) &&
        !checkIfNullOrUndefined(parameters.networkUrl)) {
        const data = await executePactContract(parameters, getPactCommandFunction);
        invocableStateSetter && invocableStateSetter(data);
    }
}

function useGetKadcarByNftId() {
    const { account, chainId, networkUrl, readFromContract, defaultMeta, setNetworkSettings } = useContext(PactContext);
    const [newKadcarNft, setNewKadcarNft] = useState(null);

    return async (nftId) => {
        var parameters = {
            account: account.account,
            chainId: chainId,
            metaData: defaultMeta,
            networkUrl: networkUrl,
            readFromContract: readFromContract
        }
        console.log(parameters)
        // executeContractForUser(parameters, getPactCommandForNftByNftId(nftId), setNewKadcarNft);
        const result = await executePactContract(parameters, getPactCommandForNftByNftId(nftId));
        return result[0];
    }
}

function useGetMyKadcarsFunction() {
    const { account, chainId, networkUrl, readFromContract, defaultMeta, setNetworkSettings } = useContext(PactContext);
    const { myKadcars, setMyKadcars } = useContext(KadcarGameContext);

    return async () => {
        // const pactCode = `(free.kakars-nft-collection.get-owner "7")`; //TODO: MAKE CONSTANTS
        // const meta = defaultMeta(1000000);
        // const contractOutput = await readFromContract({ pactCode, meta });
        // return contractOutput;
        if (account) {
            var parameters = {
                account: account.account,
                chainId: chainId,
                metaData: defaultMeta,
                networkUrl: networkUrl,
                readFromContract: readFromContract
            }
            executeContractForUser(parameters, getPactCommandForNftsByOwner(account.account), setMyKadcars);
            return myKadcars;
        }
    };
}

//Custom hook to retrieve all kadcars minted by user
function useGetMyKadcars(parameters) {
    const { account, chainId, networkUrl, readFromContract, defaultMeta, setNetworkSettings } = useContext(PactContext);
    const [currentUserKadcarNfts, setCurrentUseKadcarNfts] = useState(null); //TODO: MEMOIZE
    
    //Establish the parameters needed for the pact command to get the kadcar ids
    const paramsForNftPactContract = useMemo(() => {
        if (account) {
            var parameters = {
                account: account.account,
                chainId: chainId,
                metaData: defaultMeta,
                networkUrl: networkUrl,
                readFromContract: readFromContract
            }
            // console.log(parameters)
            executeContractForUser(parameters, getPactCommandForNftsByOwner(account.account), setCurrentUseKadcarNfts);
        }
    }, [account, chainId, readFromContract, defaultMeta]);

    //Retrieves Kadcar NFTs associated with the current user
    useEffect(() => {

    }, [paramsForNftPactContract]);
    
    return currentUserKadcarNfts;
}

function useGetAllKadcarsFunction() {
    const { account, chainId, networkUrl, readFromContract, defaultMeta, setNetworkSettings } = useContext(PactContext);
    const { allKadcars, setAllKadcars } = useContext(KadcarGameContext);

    return async () => {
        // const pactCode = `(free.kakars-nft-collection.get-owner "7")`; //TODO: MAKE CONSTANTS
        // const meta = defaultMeta(1000000);
        // const contractOutput = await readFromContract({ pactCode, meta });
        // return contractOutput;
        if (account) {
            var parameters = {
                account: account.account,
                chainId: chainId,
                metaData: defaultMeta,
                networkUrl: networkUrl,
                readFromContract: readFromContract
            }
            executeContract(parameters, getPactCommandForAllNfts(), setAllKadcars);
            return allKadcars;
        }
    };
}

//Custom hook to retrieve all minted kadcars
function useGetAllKadcars() {
    const { chainId, networkUrl, readFromContract, defaultMeta } = useContext(PactContext);
    const { allKadcars, setAllKadcars } = useContext(KadcarGameContext);

    useEffect(() => {
        var parameters = {
            chainId: chainId,
            metaData: defaultMeta,
            networkUrl: networkUrl,
            readFromContract: readFromContract,
        }
        // console.log(parameters)
        executeContract(parameters, getPactCommandForAllNfts(), setAllKadcars);
    }, []);

    console.log(allKadcars)
    return allKadcars;
}

function useMintKadcarFunction() {
    const { account, chainId, netId, gasPrice, sendTransaction } = useContext(PactContext);
    const { pricePerKadcar } = useContext(KadcarGameContext);

    return (amount, callback) => {
        const priceToPay = amount * pricePerKadcar;
        const pactCode = getPactCommandForMintingNft(account.account);
        const cmd = {
            pactCode,
            caps: [
                Pact.lang.mkCap(`Pay to manufacture`, "Pay to manufacture", `coin.TRANSFER`, [
                    account.account,
                    ADMIN_ADDRESS,
                    priceToPay,
                ]),
                Pact.lang.mkCap(
                    "Verify your account",
                    "Verify your account",
                    `free.${KADCAR_NFT_COLLECTION}.ACCOUNT_GUARD`,
                    [account.account]
                ),
                Pact.lang.mkCap("Gas capability", "Pay gas", "coin.GAS", []),
            ],
            sender: account.account,
            gasLimit: 3000 * amount,
            gasPrice,
            chainId,
            ttl: 600,
            envData: {
                "user-ks": account.guard,
                account: account.account,
            },
            signingPubKey: account.guard.keys[0],
            networkId: netId,
        };
        const previewContent = (
            <p>
                You will manufacture 1 for {priceToPay} KDA
            </p>
        );
        console.log(cmd)
        sendTransaction(
            cmd,
            previewContent,
            `Manufacturing 1`,
            callback ?? (() => alert("Manufactured!"))
        );
        // signTransaction(currTransactionState.cmdToConfirm);
        // signTransaction(cmd);
    }
}

function useTransferKadcars() {
    const { account, defaultMeta, networkUrl, readFromContract, chainId, netId, gasPrice, sendTransaction, signTransaction, currTransactionState } = useContext(PactContext);
    const { pricePerKadcar } = useContext(KadcarGameContext);

    return (nftId, receiver, callback) => {
        const priceToPay = 1 * pricePerKadcar;
        const pactCode = getPactCommandForTransferNft(nftId, account.account, receiver);
        const cmd = {
            pactCode,
            caps: [
                Pact.lang.mkCap(`Pay to manufacture`, "Pay to manufacture", `coin.TRANSFER`, [
                    account.account,
                    ADMIN_ADDRESS,
                    priceToPay,
                ]),
                Pact.lang.mkCap(
                    "Verify your account",
                    "Verify your account",
                    `free.${KADCAR_NFT_COLLECTION}.ACCOUNT_GUARD`,
                    [account.account]
                ),
                Pact.lang.mkCap("Gas capability", "Pay gas", "coin.GAS", []),
            ],
            sender: account.account,
            gasLimit: 3000 * 1,
            gasPrice,
            chainId,
            ttl: 600,
            envData: {
                "user-ks": account.guard,
                account: account.account,
            },
            signingPubKey: account.guard.keys[0],
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
    useGetMyKadcars,
    useGetAllKadcars,
    useTransferKadcars,
    useGetKadcarByNftId,
    useMintKadcarFunction,
    useGetMyKadcarsFunction,
    useGetAllKadcarsFunction
}
import React, { useCallback, useState, useEffect } from "react";
import Pact from "pact-lang-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react/cjs/react.production.min";
import {
    DEFAULT_CHAIN_ID,
    DEFAULT_GAS_PRICE,
    DEFAULT_REQUEST_HEADERS,
    IS_X_WALLET_KEY,
    LOCAL_ACCOUNT_KEY,
    LOCAL_CHAIN_ID,
    MAINNET_NETWORK_ID,
    NETWORK_ID,
    POLL_INTERVAL_S,
    POST_METHOD,
    TESTNET_NETWORK_ID
} from "../utils/Constants";
import { creationTime, makeRequest, parseResponse, tryLoadLocal, trySaveLocal, wait } from "../utils/utils";
import { getNetworkUrl } from "./PactUtils";

export const PactContext = createContext(); //Define Pact Context

const PactContextProvider = ({ children }) => {
    const [chainId, setChainId] = useState(() => tryLoadLocal(LOCAL_CHAIN_ID));
    const [gasPrice, setGasPrice] = useState(DEFAULT_GAS_PRICE);
    const [netId, setNetId] = useState(NETWORK_ID);
    const [account, setAccount] = useState(() => tryLoadLocal(LOCAL_ACCOUNT_KEY));
    const [networkUrl, setNetworkUrl] = useState(null);
    const [currTransactionState, setCurrTransactionState] = useState({});
    const [isConnectWallet, setIsConnectWallet] = useState(false);
    const [isXwallet, setIsXwallet] = useState(tryLoadLocal(IS_X_WALLET_KEY));

    useEffect(() => {
        setNetworkUrl(getNetworkUrl(netId));
    }, [netId]);

    const clearTransaction = () => {
        setCurrTransactionState({});
    };

    const setNetworkSettings = (netId, chainId, gasPrice) => {
        setNetId(netId);
        setChainId(chainId);
        setGasPrice(gasPrice);
    };

    const useSetNetworkSettings = (netId, chainId, gasPrice = DEFAULT_GAS_PRICE) => {
        useEffect(() => {
            setNetworkSettings(netId, chainId, gasPrice)
        }, [netId, chainId, gasPrice]);
    }

    const fetchAccountDetails = async (accountName) => {
        return await readFromContract({
            pactCode: `(coin.details ${JSON.stringify(accountName)})`,
            meta: defaultMeta(),
        });
    };

    const updateTransactionState = (newParams) => {
        const { transactionMessage, successCallback } = { currTransactionState };
        successCallback && successCallback();
        setCurrTransactionState({
            transactionMessage,
            successCallback,
            ...newParams,
        });
    };

    const defaultMeta = (gasLimit) => {
        return Pact.lang.mkMeta(
            "",
            chainId,
            gasPrice,
            gasLimit ?? 150000,
            creationTime(),
            600
        );
    };

    const sendTransaction = async (
        cmd,
        previewComponent = null,
        transactionMessage = null,
        successCallback = () => { }
    ) => {
        setCurrTransactionState({
            transactionMessage,
            successCallback,
            cmdToConfirm: cmd,
            previewComponent,
        });
    };

    const logoutAccount = async () => {
        if (isXwallet) {
            await window.kadena.request({
                method: "kda_disconnect",
                networkId: netId,
            });
        }
        trySaveLocal(LOCAL_ACCOUNT_KEY, null);
        trySaveLocal(IS_X_WALLET_KEY, false);
        setAccount(null);
        // setIsXwallet(false);
        // setIsConnectWallet(false);
    };

    const readFromContract = async (cmd, returnError) => {
        try {
            let data = await Pact.fetch.local(cmd, networkUrl);
            if (data?.result?.status === "success") {
                return data.result.data;
            } else {
                if (returnError === true) {
                    return data?.result?.error?.message;
                } else {
                    return null;
                }
            }
        } catch (e) {
            toast.error("Had trouble fetching data from the blockchain");
            console.log(e);
        }
        return null;
    };

    const setConnectedWallet = async (account, isXwallet) => {
        console.log(isXwallet);
        if (account != null) {
            if (isXwallet) {
                try {
                    await window.kadena.request({
                        method: "kda_disconnect",
                        networkId: netId,
                    });
                    const res = await window.kadena.request({
                        method: "kda_connect",
                        networkId: netId,
                    });
                    if (res.status !== "success") {
                        toast.error(`Could not connect to X Wallet`);
                        // closeConnectWallet();
                        return;
                    }
                    if (res.account?.account !== account.account) {
                        toast.error(
                            "Tried to connect to X Wallet but not with the account entered. Make sure you have logged into the right account in X Wallet"
                        );
                        // closeConnectWallet();
                        return;
                    }
                    if (res.account?.chainId !== chainId) {
                        toast.error(`You need to select chain ${chainId} from X Wallet`);
                        // closeConnectWallet();
                        return;
                    }
                } catch (e) {
                    console.log(e);
                    toast.error("Couldn't connect to Xwallet");
                    // closeConnectWallet();

                    return;
                }
            }
            console.log(account)
            setAccount(account);
            toast.success(`Connected ${account.account.slice(0, 10)}...`, {
                hideProgressBar: true,
                autoClose: 2000,
            });
            trySaveLocal(LOCAL_ACCOUNT_KEY, account);
        } else {
            toast.error(`Couldn't connect account :(`, {
                hideProgressBar: true,
            });
            setAccount({ account: null, guard: null, balance: 0 });
        }
        // closeConnectWallet();
    };

    const pollForTransaction = async (requestKey) => {
        let time_spent_polling_s = 0;
        let pollRes = null;
        const { transactionMessage } = currTransactionState;
        let waitingText = (
            <span
                onClick={() =>
                    window.open(
                        `https://explorer.chainweb.com/mainnet/txdetail/${requestKey}`,
                        "_blank"
                    )
                }
            >
                {`Waiting ${POLL_INTERVAL_S}s for transaction ${requestKey.slice(0, 10)}
            ... (${transactionMessage})`}
            </span>
        );
        toast.info(waitingText, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            draggable: true,
            toastId: requestKey,
        });
        while (time_spent_polling_s < 240) {
            await wait(POLL_INTERVAL_S * 1000);
            try {
                pollRes = await Pact.fetch.poll(
                    { requestKeys: [requestKey] },
                    networkUrl
                );
            } catch (e) {
                console.log(e);
                toast.error("Had trouble getting transaction update, will try again");
                continue;
            }
            if (Object.keys(pollRes).length !== 0) {
                break;
            }
            time_spent_polling_s += POLL_INTERVAL_S;
            waitingText = `Waiting ${time_spent_polling_s + POLL_INTERVAL_S
                }s for transaction ${requestKey.slice(0, 10)}... (${transactionMessage})`;
            toast.update(requestKey, { render: waitingText });
        }

        if (pollRes[requestKey].result.status === "success") {
            toast.update(requestKey, {
                render: `Succesfully completed ${requestKey.slice(
                    0,
                    10
                )}... (${transactionMessage})`,
                type: "success",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
            });
            console.log(currTransactionState)
            if (currTransactionState?.successCallback != null) {
                console.log("IM HERE BITCHES")
                currTransactionState.successCallback();
            }
            console.log(pollRes);
        } else {
            console.log(pollRes);
            toast.error(
                `Failed transaction ${requestKey}... (${transactionMessage})`,
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: true,
                }
            );
        }
        clearTransaction();
    };

    const signTransaction = async (cmdToSign) => {
        updateTransactionState({ signingCmd: cmdToSign });
        let signedCmd = null;
        if (isXwallet) {
            let xwalletSignRes = null;
            try {
                const accountConnectedRes = await window.kadena.request({
                    method: "kda_requestAccount",
                    networkId: netId,
                    domain: window.location.hostname,
                });
                if (accountConnectedRes?.status !== "success") {
                    toast.error("X Wallet connection was lost, please re-connect");
                    clearTransaction();
                    logoutAccount();
                    return;
                } else if (accountConnectedRes?.wallet?.account !== account.account) {
                    toast.error(
                        `Wrong X Wallet account selected in extension, please select ${account.account}`
                    );
                    return;
                } else if (accountConnectedRes?.wallet?.chainId !== chainId) {
                    toast.error(
                        `Wrong chain selected in X Wallet, please select ${chainId}`
                    );
                    return;
                }
                xwalletSignRes = await window.kadena.request({
                    method: "kda_requestSign",
                    networkId: netId,
                    data: { networkId: netId, signingCmd: cmdToSign },
                });
            } catch (e) {
                console.log(e);
            }
            if (xwalletSignRes.status !== "success") {
                toast.error("Failed to sign the command in X-Wallet");
                clearTransaction();
                return;
            }
            signedCmd = xwalletSignRes.signedCmd;
        } else {
            try {
                signedCmd = await Pact.wallet.sign(cmdToSign);
            } catch (e) {
                console.log(e);
                toast.error("Failed to sign the command in the wallet");
                clearTransaction();
                return;
            }
        }
        
        console.log(signedCmd);
        updateTransactionState({ signedCmd });
        let localRes = null;
        try {
            localRes = await fetch(`${networkUrl}/api/v1/local`, makeRequest(POST_METHOD, DEFAULT_REQUEST_HEADERS, signedCmd));
        } catch (e) {
            console.log(e);
            toast.error("Failed to confirm transaction with the network");
            clearTransaction();
            return;
        }

        const parsedLocalRes = await parseResponse(localRes);
        console.log(parsedLocalRes);
        if (parsedLocalRes?.result?.status === "success") {
            let data = null;
            try {
                data = await Pact.wallet.sendSigned(signedCmd, networkUrl);
            } catch (e) {
                console.log(e);
                toast.error("Had issues sending the transaction to the blockchain");
                clearTransaction();
                return;
            }
            console.log(data);
            const requestKey = data.requestKeys[0];
            updateTransactionState({
                sentCmd: signedCmd,
                requestKey,
            });
            await pollForTransaction(requestKey);
        } else {
            console.log(parsedLocalRes);
            toast.error(`Couldn't sign the transaction`, {
                hideProgressBar: true,
            });
            clearTransaction();
            return;
        }
    };

    return (
        <PactContext.Provider
            value={{
                netId,
                chainId,
                account,
                gasPrice,
                isXwallet,
                networkUrl,
                currTransactionState,
                setNetId,
                setChainId,
                setAccount,
                defaultMeta,
                setGasPrice,
                setIsXwallet,
                setNetworkUrl,
                sendTransaction,
                signTransaction,
                readFromContract,
                setNetworkSettings,
                useSetNetworkSettings,
                fetchAccountDetails,
                setConnectedWallet,
                logoutAccount
            }}
        >
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {children}
        </PactContext.Provider>
    )
}

export {
    PactContextProvider
}
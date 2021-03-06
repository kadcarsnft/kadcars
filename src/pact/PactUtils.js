import React from 'react';
import Pact from "pact-lang-api";
import { toast } from 'react-toastify';
import { DEFAULT_CHAIN_ID, KADCAR_NFT_COLLECTION, MAINNET_NETWORK_ID, NETWORK_ID, TESTNET_NETWORK_ID } from '../utils/Constants';
import { creationTime } from '../utils/utils';

async function executePactContract(pactContextObject, pactCmd) {
    const pactCode = pactCmd; 
    const meta = pactContextObject.metaData(1000000);
    const contractOutput = await pactContextObject.readFromContract({ pactCode, meta });
    // console.log(contractOutput)
    return contractOutput;
}

//Retrieve the Pact command to get NFTs for given owner
function getPactCommandForNftsByOwner(account) {
    return `(free.kadcars-nft-collection.get-kadcars-for-owner "${account}")`;
}

//Retrieve the Pact command to for NFT using given ID
function getPactCommandForNftByNftId(nftId) {
    return `(free.kadcars-nft-collection.get-kadcar-for-nft-id "${nftId}")`;
}

//Retrieve the Pact command to get all minted Kadcars
function getPactCommandForAllNfts() {
    return `(free.kadcars-nft-collection.get-kadcars)`;
}

//Retrieve the Pact command to Mint new NFT ID
function getPactCommandForMintingNft(account) {
    return `(free.kadcars-nft-collection.manufacture-k1 "${account}" 1)`;
}

//Retrieve the Pact command to Mint new NFT ID
// function getPactCommandForMintingNft(account, model) {
//     return `(free.kadcars-nft-collection.manufacture-${model} "${account}" 1)`;
// }

//Retrieve the Pact command to Mint new NFT ID
function getPactCommandForTransferNft(nftId, sender, receiver) {
    return `(free.${KADCAR_NFT_COLLECTION}.transfer "${nftId}" "${sender}" "${receiver}")`;
}

//Get the URL using the provided network ID
function getNetworkUrl(netId) {
    if (netId == null) {
        return;
    }
    if (netId === TESTNET_NETWORK_ID) {
        return `https://api.testnet.chainweb.com/chainweb/0.0/${TESTNET_NETWORK_ID}/chain/${DEFAULT_CHAIN_ID}/pact`;
    } /*else if (netId === MAINNET_NETWORK_ID) {
        return `https://api.chainweb.com/chainweb/0.0/${MAINNET_NETWORK_ID}/chain/${DEFAULT_CHAIN_ID}/pact`;
    }*/
    throw new Error("networkId must be testnet, please select testnet in your x-wallet");
}

const defineMetaData = (chainId, gasPrice, gasLimit) => {
    return Pact.lang.mkMeta(
        "",
        chainId,
        gasPrice,
        gasLimit ?? 150000,
        creationTime(),
        600
    );
};

const fetchAccountDetails = async (metaData) => {
    return await readFromContract({
        pactCode: `(coin.details ${JSON.stringify(metaData.account)})`,
        meta: defineMetaData(metaData.chainId, metaData.gasPrice, metaData.gasLimit),
    }, getNetworkUrl(NETWORK_ID));
};

const readFromContract = async (cmd, networkUrl, returnError) => {
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

export {
    getNetworkUrl,
    defineMetaData,
    readFromContract,
    fetchAccountDetails,
    executePactContract,
    getPactCommandForAllNfts,
    getPactCommandForMintingNft,
    getPactCommandForNftByNftId,
    getPactCommandForNftsByOwner,
    getPactCommandForTransferNft,
}
import React from 'react';
import { DEFAULT_CHAIN_ID, MAINNET_NETWORK_ID, TESTNET_NETWORK_ID } from '../utils/Constants';

//Execute a pact contract given the command to execute and pactcontext object
async function executePactContract(pactContextObject, pactCmd) {
    const pactCode = pactCmd; 
    const meta = pactContextObject.metaData(1000000);
    const contractOutput = await pactContextObject.readFromContract({ pactCode, meta });
    console.log(contractOutput);
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

function getNetworkUrl(netId) {
    if (netId == null) {
        return;
    }
    if (netId === TESTNET_NETWORK_ID) {
        return `https://api.testnet.chainweb.com/chainweb/0.0/${TESTNET_NETWORK_ID}/chain/${DEFAULT_CHAIN_ID}/pact`;
    } else if (netId === MAINNET_NETWORK_ID) {
        return `https://api.chainweb.com/chainweb/0.0/${MAINNET_NETWORK_ID}/chain/${DEFAULT_CHAIN_ID}/pact`;
    }
    throw new Error("networkId must be testnet or mainnet");
}

export {
    getNetworkUrl,
    executePactContract,
    getPactCommandForAllNfts,
    getPactCommandForNftByNftId,
    getPactCommandForNftsByOwner,
    getPactCommandForMintingNft,
}
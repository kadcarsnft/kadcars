import React from 'react';

async function executePactContract(pactContextObject, pactCmd) {
    const pactCode = pactCmd; 
    const meta = pactContextObject.metaData(1000000);
    console.log(pactCode)
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

export {
    executePactContract,
    getPactCommandForAllNfts,
    getPactCommandForNftByNftId,
    getPactCommandForNftsByOwner,
    getPactCommandForMintingNft,
}
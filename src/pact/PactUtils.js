import React from 'react';

async function executePactContract(pactContextObject, pactCmd) {    
    const pactCode = pactCmd; 
    const meta = pactContextObject.metaData(1000000);
    const contractOutput = await pactContextObject.readFromContract({ pactCode, meta });
    // console.log("input: " + `${pactCode}` + "output: " + `${contractOutput}` );
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

//Retrieve the Pact command to Mint new NFT ID
function getPactCommandForMintingNftId(account, amount, collection) {
    return `(free.kadcars-nft-collection)`;
}

export {
    executePactContract,
    getPactCommandForNftByNftId,
    getPactCommandForNftsByOwner,
}
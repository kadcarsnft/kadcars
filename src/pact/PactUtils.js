import React from 'react';

async function executePactContract(pactContextObject, pactCmd) {    
    const pactCode = pactCmd; 
    const meta = pactContextObject.metaData(1000000);
    const contractOutput = await pactContextObject.readFromContract({ pactCode, meta });
    // console.log("input: " + `${pactCode}` + "output: " + `${contractOutput}` );
    return contractOutput;
}

function getPactCommandForNftsByOwner(account) {
    return `(free.kadcars-nft-collection.get-kadcars-for-owner "${account}")`;
}

function getPactCommandForNftByNftId(nftId) {
    return `(free.kadcars-nft-collection.get-kadcar-for-nft-id "${nftId}")`;
}

export {
    executePactContract,
    getPactCommandForNftByNftId,
    getPactCommandForNftsByOwner,
}
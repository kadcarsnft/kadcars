import React from 'react';

async function executePactContract(pactContextObject) {    
    if (pactContextObject.chainId === null) {
        return;
    }

    const pactCode = pactContextObject.pactCmd; 
    const meta = pactContextObject.metaData(1000000);
    const contractOutput = await pactContextObject.readFromContract({ pactCode, meta });
    // console.log("input: " + `${pactCode}` + "output: " + `${contractOutput}` );
    return contractOutput;
}

function getPactCommandForNftIdsByOwner(account) {
    return `(free.kakars-nft-collection.get-ids-for-owner "${account}")`;
}

function getPactCommandForNftByNftId(nftId) {
    return `(free.kakars-nft-collection.get-kadcar-for-nft-id "${nftId}")`;
}

export {
    executePactContract,
    getPactCommandForNftByNftId,
    getPactCommandForNftIdsByOwner,
}
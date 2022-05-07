import React, { useContext } from "react";
import { PactContext } from "./PactInteractions";

function getMyKadcars() {
    const { account, readFromContract, defaultMeta } = useContext(PactContext);

  return async () => {
    const pactCode = `(free.kakars-nft-collection.get-owner "7")`; //TODO: MAKE CONSTANTS
    const meta = defaultMeta(1000000);
    return await readFromContract({ pactCode, meta });
  };
}

export {
    getMyKadcars
}
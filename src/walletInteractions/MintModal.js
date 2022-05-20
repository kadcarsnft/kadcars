import React, { useContext, useState } from "react";
import Modal from "../components/elements/Modal";
import { PactContext } from "../pact/PactContextProvider";
import { throttle } from 'throttle-debounce';
import { useMintKadcar } from "../pact/KadcarExtractor";

const MintModal = ({ showMintModal, setShowMintModal }) => {
    const mintKadcarFunction = useMintKadcar();
    const [modelSelected, setModelSelected] = useState("");

    function handleClose() {

        setShowMintModal(false);
    }



    return (
        <Modal show={showMintModal} handleClose={handleClose}>
            <div style={{justifyContent:'space-evenly', display:'flex', flexDirection:'row'}}>
            </div>
        </Modal>
    )
}

export {
    MintModal
}
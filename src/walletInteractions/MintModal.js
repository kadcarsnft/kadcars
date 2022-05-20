import React, { useContext, useState } from "react";
import Modal from "../components/elements/Modal";
import { PactContext } from "../pact/PactContextProvider";
import { throttle } from 'throttle-debounce';
import { useMintKadcar } from "../pact/KadcarExtractor";
import Select from 'react-select';
import { KADCAR_NFT_OPTIONS } from "../utils/Constants";
import Button from "../components/elements/Button";
import { checkIfItemExistsInDropdownList, checkIfNullOrUndefined } from "../utils/utils";

const MintModal = ({ showMintModal, setShowMintModal }) => {
    const mintKadcarFunction = useMintKadcar();
    const [modelSelected, setModelSelected] = useState(null);

    function handleClose() {

        setShowMintModal(false);
    }

    function onSelectModelOption(option) {
        setModelSelected(option.value);
    }

    function initiateMintKadcar() {
        if (!checkIfItemExistsInDropdownList(modelSelected, KADCAR_NFT_OPTIONS)) {
            //TODO: THROW ERROR HERE
            return;
        }

        mintKadcarFunction(1, () => console.log("HAHA"));
        setShowMintModal(false);
    }

    return (
        <Modal show={showMintModal} handleClose={handleClose}>
            <label>
                Model:
                <Select options={KADCAR_NFT_OPTIONS} onChange={onSelectModelOption} />
            </label>
            <Button onClick={initiateMintKadcar} color={'primary'} disabled={checkIfNullOrUndefined(modelSelected)}>
                Mint!
            </Button>
        </Modal>
    )
}

export {
    MintModal
}
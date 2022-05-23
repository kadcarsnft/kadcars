import React, { useCallback, useContext, useEffect, useState } from "react";
import Modal from "../components/elements/Modal";
import { PactContext } from "../pact/PactContextProvider";
import { throttle } from 'throttle-debounce';
import { useGetKadcarByNftId, useGetMyKadcarsFunction, useMintKadcar } from "../pact/KadcarExtractor";
import Select from 'react-select';
import { KADCAR_NFT_OPTIONS, REGEX_FOR_NFT_ID } from "../utils/Constants";
import Button from "../components/elements/Button";
import { checkIfItemExistsInDropdownList, checkIfNullOrUndefined } from "../utils/utils";
import { KadcarGameContext } from "../components/kadcarcomponents/KadcarGameContextProvider";
import { toast } from "react-toastify";

const MintModal = ({ show, setShow }) => {
    const mintKadcarFunction = useMintKadcar();
    const getMintedNftId = useGetKadcarByNftId();
    const updateKadcars = useGetMyKadcarsFunction();

    const { currTransactionState, signTransaction } = useContext(PactContext);
    const { myKadcars, setMyKadcars } = useContext(KadcarGameContext);
    const [modelSelected, setModelSelected] = useState(null);
    const [mintedNft, setMintedNft] = useState(null);
    const [amountToMint, setAmountToMint] = useState(0);
    
    useEffect(() => {
        console.log(mintedNft)
        if (mintedNft) {
            console.log(mintedNft)
            setMyKadcars([...myKadcars, mintedNft]);
        }
    }, [mintedNft]);

    const executeTransaction = useCallback(() => {
        if (!checkIfNullOrUndefined(currTransactionState.cmdToConfirm)) {
            signTransaction(currTransactionState.cmdToConfirm);
            console.log(currTransactionState);
        }
    }, [currTransactionState]);

    useEffect(() => {
        executeTransaction();
    }, [executeTransaction]);

    function handleClose() {
        setShow(false);
        setMintedNft(null);
        setAmountToMint(0);
        setModelSelected(null);
    }

    function onSelectModelOption(option) {
        setModelSelected(option.value);
    }

    async function updateWithMintedNftId(data) {
        if (data) {
            var nftId = data.result.data.match(REGEX_FOR_NFT_ID)[1];
            const newNft = await getMintedNftId(nftId);
            setMintedNft(newNft);
        } else {
            toast.error("Invalid data, unable to update kadcar list");
        }
        // updateKadcars();
    }

    function initiateMintKadcar() {
        if (!checkIfItemExistsInDropdownList(modelSelected, KADCAR_NFT_OPTIONS)) {
            //TODO: THROW ERROR HERE
            toast.error("Please select a Kadcar model!");
            return;
        }

        mintKadcarFunction(amountToMint, updateWithMintedNftId);
        handleClose();
    }

    function checkIfReadyToMint() {
        if (!checkIfNullOrUndefined(modelSelected) && amountToMint > 0) {
            return false;
        }
        return true;
    }

    return (
        <Modal show={show} handleClose={handleClose}>
            <label>
                Model:
                <Select options={KADCAR_NFT_OPTIONS} onChange={onSelectModelOption} />
            </label>
            <label>
                Amount:
                <input type={'number'} value={amountToMint} onChange={(event)=>setAmountToMint(event.target.value)}/>
            </label>
            <Button onClick={initiateMintKadcar} color={'primary'} disabled={checkIfReadyToMint()}>
                Mint!
            </Button>
        </Modal>
    )
}

export {
    MintModal
}
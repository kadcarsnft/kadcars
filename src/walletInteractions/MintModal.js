import React, { useCallback, useContext, useEffect, useState } from "react";
import Modal from "../components/elements/Modal";
import { PactContext } from "../pact/PactContextProvider";
import { useGetKadcarByNftId, useGetMyKadcarsFunction, useMintKadcarFunction } from "../pact/KadcarExtractor";
import Select from 'react-select';
import { KADCAR_NFT_OPTIONS, REGEX_FOR_NFT_ID } from "../utils/Constants";
import Button from "../components/elements/Button";
import { checkIfItemExistsInDropdownList, checkIfNullOrUndefined } from "../utils/utils";
import { KadcarGameContext } from "../components/kadcarcomponents/KadcarGameContextProvider";
import { toast } from "react-toastify";

const MintModal = ({ show, setShow }) => {
    const mintKadcarFunction = useMintKadcarFunction();
    const getMintedNftId = useGetKadcarByNftId();
    const updateKadcars = useGetMyKadcarsFunction();

    const { account, currTransactionState, signTransaction } = useContext(PactContext);
    const { myKadcars, setMyKadcars, pricePerKadcar } = useContext(KadcarGameContext);
    const [modelSelected, setModelSelected] = useState(null);
    const [mintedNft, setMintedNft] = useState(null);
    const [amountToMint, setAmountToMint] = useState(0);
    
    useEffect(() => {
        if (mintedNft) {
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
        if (account.balance < pricePerKadcar) {
            toast.error(`Insufficient funds! Only ${account.balance} KDA remaining.`);
            return;
        }
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
            <div style={modalStyles}>
                <div style={rowStyles}>
                    <div style={subColLabelStyles}>
                        Model:
                    </div>
                    <div style={subColInputStyles}>
                        <Select options={KADCAR_NFT_OPTIONS} onChange={onSelectModelOption} />
                    </div>
                </div>
                <div style={rowStyles}>
                    <div style={subColLabelStyles}>
                        Amount:
                    </div>
                    <div style={subColInputStyles}>
                        <input style={{ height: '45px' }} type={'number'} value={amountToMint} onChange={(event) => setAmountToMint(event.target.value)} placeholder={'e.g. 2'}/>
                    </div>
                </div>
                <div style={rowStyles}>
                    <div style={{ marginRight: '20px' }}>
                        Total for {amountToMint} Kadcars: {amountToMint * pricePerKadcar} KDA
                    </div>
                    <Button onClick={initiateMintKadcar} color={'primary'} disabled={checkIfReadyToMint()}>
                        Mint!
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

const modalStyles = {
    width: '100%',
    height: '30vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
};

const rowStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '95%',
}

const subColLabelStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    marginRight: '5px',
    alignContent: 'center',
}

const subColInputStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    marginLeft: '5px'
}

export {
    MintModal
}
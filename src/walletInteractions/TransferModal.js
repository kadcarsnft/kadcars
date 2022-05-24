import React, { useContext, useEffect, useState } from "react";
import Modal from "../components/elements/Modal";
import Select from 'react-select';
import { KadcarGameContext } from "../components/kadcarcomponents/KadcarGameContextProvider";
import { useTransferKadcars } from "../pact/KadcarExtractor";
import { checkIfNullOrUndefined } from "../utils/utils";
import Button from "../components/elements/Button";

function getKadcarOptionsForDropdown(kadcarList) {
    const kadcarOptions = kadcarList.map((kadcarNft) => {
        var newOption = {
            value: kadcarNft['nft-id'],
            label: kadcarNft['nft-id'],
        };
        return newOption;
    });
    return kadcarOptions;
}

const TransferNftModal = ({ show, setShow }) => {
    const transferKadcarsFunction = useTransferKadcars();
    const [selectedNfts, setSelectedNfts] = useState(null);
    const [receiverAccount, setReceiverAccount] = useState("");
    const { myKadcars, setMyKadcars } = useContext(KadcarGameContext);
    const [kadcarOptions, setKadcarOptions] = useState(null);

    useEffect(() => {
        function getOptions() {
            myKadcars && setKadcarOptions(getKadcarOptionsForDropdown(myKadcars));
        }
        getOptions();
    }, [myKadcars]);

    function handleTransferModalClose() {
        setShow(false);
    }

    function handleReceiverAccountChange(event) {
        setReceiverAccount(event.target.value);
    }

    function onSelectNftOptions(options) {
        setSelectedNfts(options.value);
    }

    function removeTransferredKadcarFromList() {
        const updatedList = myKadcars.filter((kadcar) => {
            return kadcar['nft-id'] !== selectedNfts;
        });
        setMyKadcars(updatedList);
        setKadcarOptions(updatedList);
        console.log(updatedList)
    }

    function initiateKadcarTransfer() {
        // transferKadcarsFunction(selectedNfts, receiverAccount);
        // transferKadcarsFunction(selectedNfts, receiverAccount, removeTransferredKadcarFromList);
        transferKadcarsFunction(selectedNfts, "k:3e84c7a7a21e69e666a82f8a38f55fe79049fa6b675860681f11f514d92ae6f5", removeTransferredKadcarFromList);
        console.log(myKadcars)
        handleTransferModalClose();
    }

    function checkIfReadyToTransfer() {
        if (checkIfNullOrUndefined(selectedNfts) || receiverAccount === "") {
            return true;
        }
        return false;
    }

    return (
        <Modal show={show} handleClose={handleTransferModalClose}>
            <div style={modalStyles}>
                <div style={rowStyles}>
                    <div style={subColLabelStyles}>
                        Receiver's address:
                    </div>
                    <div style={subColInputStyles}>
                        <input style={{ height: '45px' }} type="text" value={receiverAccount} onChange={handleReceiverAccountChange} placeholder={'e.g. k:1234...'}/>
                    </div>
                </div>
                <div style={rowStyles}>
                    <div style={subColLabelStyles}>
                        Select Kadcar to transfer:
                    </div>
                    <div style={subColInputStyles}>
                        { myKadcars && <Select options={kadcarOptions} onChange={onSelectNftOptions} /> }
                    </div>
                </div>
                <div style={rowStyles}>
                    <Button onClick={initiateKadcarTransfer} color={'primary'} disabled={checkIfReadyToTransfer()}>
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
    justifyContent: 'space-evenly',
};

const rowStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
}

const subColLabelStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignContent: 'center',
    width: '60%',
    marginRight: '5px'
}

const subColInputStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    marginLeft: '5px'
}

export {
    TransferNftModal
}
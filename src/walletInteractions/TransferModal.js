import React, { useContext, useEffect, useState } from "react";
import Modal from "../components/elements/Modal";
import Select from 'react-select';
import { throttle } from 'throttle-debounce';
import { KadcarGameContext } from "../components/kadcarcomponents/KadcarGameContextProvider";
import { useTransferKadcars } from "../pact/KadcarExtractor";
import { checkIfNullOrUndefined } from "../utils/utils";
import Button from "../components/elements/Button";
import { fetchAccountDetails } from "../pact/PactUtils";
import { DEFAULT_GAS_LIMIT, DEFAULT_GAS_PRICE } from "../utils/Constants";
import { toast } from "react-toastify";

const defaultReceiver = {
    account: "k:3e84c7a7a21e69e666a82f8a38f55fe79049fa6b675860681f11f514d92ae6f5",
    chainId: "1",
    gasPrice: DEFAULT_GAS_PRICE,
    gasLimit: DEFAULT_GAS_LIMIT
}

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
    const [receiverAccount, setReceiverAccount] = useState(defaultReceiver);
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
        const updatedReceiver = {
            ...receiverAccount,
            account: event.target.value
        }

        setReceiverAccount(updatedReceiver);
    }

    function handleReceiverChainIdChange(event) {
        const updatedReceiver = {
            ...receiverAccount,
            chainId: event.target.value
        }

        setReceiverAccount(updatedReceiver);
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
        // transferKadcarsFunction(selectedNfts, "k:3e84c7a7a21e69e666a82f8a38f55fe79049fa6b675860681f11f514d92ae6f5", removeTransferredKadcarFromList);

        validateReceiverAccount ? 
            transferKadcarsFunction(selectedNfts, receiverAccount.account, removeTransferredKadcarFromList) :
            toast.error("Sorry the receiver acount details are invalid, wallet not found");
        
        console.log(myKadcars)
        handleTransferModalClose();
    }

    function checkIfNotReadyToTransfer() {
        if (checkIfNullOrUndefined(selectedNfts) || checkIfNullOrUndefined(receiverAccount)) {
            return true;
        }
        return false;
    }

    const validateReceiverAccount = throttle(500, async () => {
        const accountDetails = await fetchAccountDetails(receiverAccount);
        if (checkIfNullOrUndefined(accountDetails)) {
            console.log(accountDetails)
            return false;
        }
        return true;
    });

    return (
        <Modal show={show} handleClose={handleTransferModalClose}>
            <div style={modalStyles}>
                <div style={rowStyles}>
                    <div style={subColLabelStyles}>
                        Receiver's address:
                    </div>
                    <div style={subColInputStyles}>
                        <input style={{ height: '45px' }} type="text" value={receiverAccount.account} onChange={handleReceiverAccountChange} placeholder={'e.g. k:1234...'}/>
                    </div>
                </div>
                <div style={rowStyles}>
                    <div style={subColLabelStyles}>
                        Receiver's wallet chain ID:
                    </div>
                    <div style={subColInputStyles}>
                        <input style={{ height: '45px' }} type="number" value={receiverAccount.chainId} onChange={handleReceiverChainIdChange} placeholder={'e.g. 0,1..'}/>
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
                    <Button onClick={initiateKadcarTransfer} color={'primary'} disabled={checkIfNotReadyToTransfer()}>
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
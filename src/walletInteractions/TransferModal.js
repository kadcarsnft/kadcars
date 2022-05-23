import React, { useContext, useEffect, useState } from "react";
import Modal from "../components/elements/Modal";
import Select from 'react-select';
import { KadcarGameContext } from "../components/kadcarcomponents/KadcarGameContextProvider";
import { useTransferKadcars } from "../pact/KadcarExtractor";

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
    const [selectedNfts, setSelectedNfts] = useState();
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

    return (
        <Modal show={show} handleClose={handleTransferModalClose}>
            <div style={modalStyles}>
                <div style={rowStyles}>
                    <div style={subColLabelStyles}>
                        <label>
                            Receiver's address:
                        </label>
                    </div>
                    <div style={subColInputStyles}>
                        <input type="text" value={receiverAccount} onChange={handleReceiverAccountChange} />
                    </div>
                </div>
                <div style={rowStyles}>
                    <div style={subColLabelStyles}>
                        <label>
                            Select Kadcar to transfer:
                        </label>
                    </div>
                    <div style={subColInputStyles}>
                        {myKadcars && <Select options={kadcarOptions} onChange={onSelectNftOptions} />}
                    </div>
                </div>
                <div style={rowStyles}>
                    <input type="submit" value="Submit" onClick={initiateKadcarTransfer} />
                </div>
            </div>
        </Modal>
    )
}

const modalStyles = {
    width: '50vh',
    height: '25vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
};

const rowStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
}

const subColLabelStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    marginRight: '5px'
}

const subColInputStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    marginLeft: '5px'
}

export {
    TransferNftModal
}
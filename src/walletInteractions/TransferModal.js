import React, { useContext, useEffect, useState } from "react";
import Modal from "../components/elements/Modal";
import { PactContext } from "../pact/PactContextProvider";
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
    const { myKadcars } = useContext(KadcarGameContext);
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

    function initiateKadcarTransfer() {
        // transferKadcarsFunction(selectedNfts, receiverAccount);
        transferKadcarsFunction(selectedNfts, "k:e4ae2e31473cbc848cbe946f158a911024af8238be8fcf42f0f89cfc0dbdd1d3");
        console.log(myKadcars)
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
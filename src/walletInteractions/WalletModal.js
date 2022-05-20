import React, { useContext, useState } from "react";
import Modal from "../components/elements/Modal";
import { PactContext } from "../pact/PactContextProvider";
import { throttle } from 'throttle-debounce';

const WalletModal = ({ showWalletNameModal, setShowWalletNameModal, initiateKadenaConnection }) => {
    const { setConnectedAccount } = useContext(PactContext);

    const [modalWallet, setModalWallet] = useState("");
    const [tempAccount, setTempAccount] = useState(null);

    function handleWalletModalClose() {
        setShowWalletNameModal(false);
        setModalWallet("");
    }

    const handleModalWalletChange = throttle(500, async (event) => {
        setModalWallet(event.target.value);
        const accountDetails = await pactContext.fetchAccountDetails(event.target.value);

        if (checkIfNullOrUndefined(accountDetails)) {
            //Insert toast error here
            console.log("wallet not found")
        } else {
            setTempAccount(accountDetails);
        }
    });

    return (
        <Modal show={showWalletNameModal} handleClose={handleWalletModalClose}>
            <label>
                Wallet Name:
                <input type="text" value={modalWallet} onChange={handleModalWalletChange} />
            </label>
            <input type="submit" value="Submit" onClick={initiateKadenaConnection} />
        </Modal>
    )
}

export {
    WalletModal
}
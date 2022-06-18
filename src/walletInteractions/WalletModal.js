import React, { useContext, useState } from "react";
import Modal from "../components/elements/Modal";
import { PactContext } from "../pact/PactContextProvider";
import { throttle } from 'throttle-debounce';
import { checkIfNullOrUndefined } from "../utils/utils";
import { toast } from "react-toastify";

const WalletModal = ({ show, setShow, isXwallet }) => {
    const pactContext = useContext(PactContext);

    const [modalWallet, setModalWallet] = useState("");
    const [tempAccount, setTempAccount] = useState(null);

    function handleWalletModalClose() {
        setTempAccount(null);
        setModalWallet("");
        setShow(false);
    }

    async function initiateKadenaConnection() {
        if (window.kadena) {
            //Connect this user's account to the app
            // connectKadena(pactContext);
            console.log(tempAccount)
            await pactContext.setConnectedWallet(tempAccount, isXwallet);
            handleWalletModalClose();
        } else {
            //TODO: render error to install extension
            toast.error('Install the X-Wallet Extension')
        }
    }

    const handleModalWalletChange = throttle(500, async (event) => {
        setModalWallet(event.target.value);
        const accountDetails = await pactContext.fetchAccountDetails(event.target.value);
        
        if (checkIfNullOrUndefined(accountDetails)) {
            //Insert toast error here
            toast.error("Wallet Not Found!");
            setTempAccount(null);
        } else {
            setTempAccount(accountDetails);
        }
    });

    return (
        <Modal show={show} handleClose={handleWalletModalClose}>
            <label>
                Wallet Name:
                <input type="text" value={modalWallet} onChange={handleModalWalletChange} />
            </label>
            <input type="submit" value="Submit" onClick={initiateKadenaConnection} disabled={tempAccount === null}/>
        </Modal>
    )
}

export {
    WalletModal
}
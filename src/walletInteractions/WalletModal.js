import React, { useContext, useState } from "react";
import Modal from "../components/elements/Modal";
import { PactContext } from "../pact/PactContextProvider";
import { throttle } from 'throttle-debounce';
import { checkIfNullOrUndefined } from "../utils/utils";
import { toast } from "react-toastify";
import Button from "../components/elements/Button";

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
            <div style={modalStyles}>
                <div style={rowStyles}>
                <div style={headerStyles}>
                    <span style={{ fontSize: '27px', fontWeight: 'bold', color: 'lightgray' }}>Connect a Wallet</span>
                </div>
                </div>
                <div style={rowStyles}>
                    <div style={subColLabelStyles}>
                        Wallet Name:
                    </div>
                    <div style={subColInputStyles}>
                        <input style={{ height: '40px' }} type="text" value={modalWallet} onChange={handleModalWalletChange} />
                    </div>
                </div>
                <div style={{ height: '20px' }} />
                <div style={footerStyles}>
                    <Button color='primary' onClick={initiateKadenaConnection} disabled={tempAccount === null} >
                        Connect
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

const modalStyles = {
    width: '100%',
    height: '175px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor:'red'
};

const headerStyles = {
    width: '100%',
    height: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: '25px'
    // backgroundColor:'blue'
}

const rowStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
}

const footerStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
}

const subColLabelStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    marginRight: '5px',
    alignContent: 'center',
}

const subColInputStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    marginLeft: '5px',
}

export {
    WalletModal
}
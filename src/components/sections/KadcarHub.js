import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { DEFAULT_GAS_PRICE, DEFAULT_NETWORK_ID, LOCAL_CHAIN_ID, NETWORK_ID, SCREEN_NAMES } from '../../utils/Constants';
import { connectKadena, disconnectKadena, getAccountSelected, getKadenaConnectStatus, getSelectedAccount, getUserWallet } from '../../kadenaInteraction/KadenaApi';
import { useGetMyKadcarsFunction, useGetAllKadcars, useGetMyKadcars, useMintKadcar, useTransferKadcars } from '../../pact/KadcarExtractor';
import { useCheckForXWalletExtension } from '../../hooks/BrowserExtensionHooks';
import { useCheckKadenaAccountConnection } from '../../hooks/KadenaCustomHooks';
import { PactContext } from '../../pact/PactContextProvider';
import { MainHeaderScreenContainer } from '../kadcarcomponents/KadcarComponents';
import { KadcarGameContext } from '../kadcarcomponents/KadcarGameContextProvider';
import { checkIfNullOrUndefined } from '../../utils/utils';
import { throttle } from 'throttle-debounce';
import { MintModal } from '../../walletInteractions/MintModal';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const KadcarHub = ({ className, topOuterDivider, bottomOuterDivider, topDivider, bottomDivider, hasBgColor, invertColor, ...props }) => {
  //Get PactContext and KadcarGameContext
  const pactContext = useContext(PactContext);
  const kadcarGameContext = useContext(KadcarGameContext);

  /**********************************************************/
  const extensionInstalled = useCheckForXWalletExtension();
  // const kadenaConnected = useCheckKadenaAccountConnection(extensionInstalled); 

  const currentUserKadcarFunction = useGetMyKadcarsFunction();
  const transferKadcarsFunction = useTransferKadcars();
  const mintKadcarFunction = useMintKadcar();

  const currentUserKadcarNfts = useGetMyKadcars();
  const allKadcarNfts = useGetAllKadcars();
  /**********************************************************/

  const [videoModalActive, setVideomodalactive] = useState(false);
  
  //Local states
  const [modalWallet, setModalWallet] = useState("");
  const [tempAccount, setTempAccount] = useState(null);
  const [showMintModal, setShowMintModal] = useState(false);
  const [showWalletNameModal, setShowWalletNameModal] = useState(false);


  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  useEffect(() => {
    console.log(pactContext.account)
  }, [pactContext]);

  // useEffect(() => {
  //   console.log(currentUserKadcarNfts)
  // }, [currentUserKadcarNfts]);

  function initiateKadenaConnection() {
    if (window.kadena) {
      //Connect this user's account to the app
      // connectKadena(pactContext);
      console.log(tempAccount)
      pactContext.setConnectedWallet(tempAccount, extensionInstalled);
      setShowWalletNameModal(false);
    } else {
      //TODO: render error to install extension
    }
  }

  //Disconnect the user's account from the app
  function disconnectKadenaAccount() {

    //Call the API function to disconnect this user's wallet from the app
    // disconnectKadena(pactContext);
    pactContext.logoutAccount();
  }

  //Display all this user's kadcars
  async function displayCurrentUserKadcars() {
    console.log(currentUserKadcarNfts)
    kadcarGameContext.setMyKadcars(currentUserKadcarNfts);
    kadcarGameContext.setCurrentScreen(SCREEN_NAMES.MY_KADCARS);

    // const connectStatus = getKadenaConnectStatus();

    // if (connectStatus) {
    //   // getMyKadcars();
    // } else {
    // }
  }

  function showDisconnect() {

  }

  function initiateMintKadcar() {
    mintKadcarFunction(1, () => console.log("HAHA"));
  }

  function initiateKadcarTransfer() {
    transferKadcarsFunction();
  }

  function handleWalletModalClose() {
    setShowWalletNameModal(false)
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
    <section
      {...props}
      className={outerClasses}
    >
      {/* <div className="container-sm"> */}
      {/* <div className={innerClasses}> */}
      <div style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: '80vh', display: 'flex' }}>
        <div className="hero-content" style={{ marginBottom: '20px' }}>
          <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
            Build the Ultimate <span className="text-color-primary">Kadcar</span>!
          </h1>
          <div className="container-sm">
            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Kadena's first car NFT where owners can collect, upgrade, race and trade their Kadcars
            </p>
            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400" style={{fontColor:'red'}}>
              This website is still in a testing environment!!!
            </p>
            <div className="reveal-from-bottom" data-reveal-delay="600">
              <ButtonGroup>
                {
                  !extensionInstalled &&
                  <Button tag="a" color="primary" wideMobile href={"https://xwallet.kaddex.com/#ux"}>
                    Install X-Wallet
                  </Button>
                }
                {
                  extensionInstalled && (pactContext.account === null || pactContext.account === 'null') &&
                  // <Button onClick={initiateKadenaConnection} tag="a" color="primary" wideMobile>
                  //   Connect X-Wallet
                  // </Button>
                  <Button onClick={()=>setShowWalletNameModal(true)} tag="a" color="primary" wideMobile>
                    Connect X-Wallet
                  </Button>
                }
                {
                  extensionInstalled && pactContext.account !== null && pactContext.account !== 'null' &&
                  <Button onClick={disconnectKadenaAccount} tag="a" color="primary" wideMobile>
                    Disconnect X-Wallet
                  </Button>
                }
                <Button onClick={initiateMintKadcar} tag="a" color="dark" wideMobile>
                  Mint Kadcar
                </Button>
                <Button onClick={displayCurrentUserKadcars} tag="a" color="dark" wideMobile>
                  My Cars
                </Button>
                <Button tag="a" color="dark" wideMobile>
                  All Kadcars
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '60%',
          height: '70%',
          alignSelf: 'center',
          marginTop: '20px',
        }}>
          <ButtonGroup className={'reveal-from-bottom'}
            style={{
              width: '15%',
              height: '70%',
              justifyContent: 'space-evenly',
              marginRight: '20px'
            }}>
            <Button tag="a" color="dark" wideMobile style={{ width: '90%' }}>
              Garage Mode
            </Button>
            <Button tag="a" color="dark" wideMobile style={{ width: '90%' }}>
              Race Mode
            </Button>
            <Button onClick={initiateKadcarTransfer} tag="a" color="dark" wideMobile style={{ width: '90%' }}>
              Transfer
            </Button>
          </ButtonGroup>
          <div style={{ width: '85%', justifyContent: 'center' }}>
            <MainHeaderScreenContainer />
          </div>
          <Modal show={showWalletNameModal} handleClose={handleWalletModalClose}>
              <label>
                Wallet Name:
                <input type="text" value={modalWallet} onChange={handleModalWalletChange} />
              </label>
              <input type="submit" value="Submit" onClick={initiateKadenaConnection}/>
          </Modal>
          <MintModal showMintModal={showMintModal}/>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

KadcarHub.propTypes = propTypes;
KadcarHub.defaultProps = defaultProps;

export default KadcarHub;
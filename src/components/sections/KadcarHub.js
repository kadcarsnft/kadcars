import { connectKadena, disconnectKadena, getAccountSelected, getKadenaConnectStatus, getSelectedAccount, getUserWallet } from '../../kadenaInteraction/KadenaApi';
import { useGetMyKadcarsFunction, useGetAllKadcars, useGetMyKadcars, useTransferKadcars, useMintKadcarFunction } from '../../pact/KadcarExtractor';
import { DEFAULT_CHAIN_ID, DEFAULT_GAS_PRICE, DEFAULT_NETWORK_ID, LOCAL_CHAIN_ID, NETWORK_ID, SCREEN_NAMES } from '../../utils/Constants';
import { KadcarGameContext } from '../kadcarcomponents/KadcarGameContextProvider';
import { MainHeaderScreenContainer } from '../kadcarcomponents/KadcarComponents';
import { useCheckForXWalletExtension } from '../../hooks/BrowserExtensionHooks';
import { useCheckKadenaAccountConnection } from '../../hooks/KadenaCustomHooks';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { TransferNftModal } from '../../walletInteractions/TransferModal';
import { MintModal } from '../../walletInteractions/MintModal';
import { PactContext } from '../../pact/PactContextProvider';
import { checkIfNullOrUndefined } from '../../utils/utils';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import { throttle } from 'throttle-debounce';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import classNames from 'classnames';
import { WalletModal } from '../../walletInteractions/WalletModal';
import md5 from 'md5';
// import hash from '../../text';
import bg from '../../assets/images/kadcarsHome.png'
import { useNavigate } from 'react-router-dom';
import { KadcarGarageContext } from '../kadcarcomponents/KadcarGarageContextProvider';
import { KadcarPreview } from '../../views/KadcarPreview';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const KadcarHub = ({ className, topOuterDivider, bottomOuterDivider, topDivider, bottomDivider, hasBgColor, invertColor, ...props }) => {
  //Get PactContext, KadcarGarageContext, and KadcarGameContext
  const pactContext = useContext(PactContext);
  const kadcarGameContext = useContext(KadcarGameContext);
  const kadcarGarageContext = useContext(KadcarGarageContext);

  /**********************************************************/
  const extensionInstalled = useCheckForXWalletExtension();
  // const kadenaConnected = useCheckKadenaAccountConnection(extensionInstalled); 

  const currentUserKadcarFunction = useGetMyKadcarsFunction();
  const transferKadcarsFunction = useTransferKadcars();
  const mintKadcarFunction = useMintKadcarFunction();

  const currentUserKadcarNfts = useGetMyKadcars();
  // const allKadcarNfts = useGetAllKadcars();
  const allKadcarNfts = "";
  /**********************************************************/

  const [videoModalActive, setVideomodalactive] = useState(false);

  //Wallet modal controls
  const [modalWallet, setModalWallet] = useState("");
  const [tempAccount, setTempAccount] = useState(null);

  //Wallet, mint, and trasnfer modal controls
  const [showMintModal, setShowMintModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showWalletNameModal, setShowWalletNameModal] = useState(false);

  const [showPassModal, setShowPassModal] = useState(false);
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

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

  const setCurrentUserKadcars = useCallback(async () => {
    const currentUserKadcars = await currentUserKadcarFunction();
    currentUserKadcars && kadcarGameContext.setMyKadcars(currentUserKadcarNfts);
  }, [currentUserKadcarNfts]);

  useEffect(() => {
    setCurrentUserKadcars();
  }, [setCurrentUserKadcars]);

  // useEffect(() => {
  //   console.log(pactContext.account)
  // }, [pactContext]);

  // useEffect(() => {
  //   kadcarGameContext.setMyKadcars(currentUserKadcarNfts);
  //   console.log(currentUserKadcarNfts)
  // }, [currentUserKadcarNfts]);

  //Disconnect the user's account from the app
  function disconnectKadenaAccount() {

    //Call the API function to disconnect this user's wallet from the app
    // disconnectKadena(pactContext);
    pactContext.logoutAccount();
  }

  //Display all this user's kadcars
  async function displayCurrentUserKadcars() {
    kadcarGameContext.setMyKadcars(currentUserKadcarNfts);
    kadcarGameContext.setCurrentScreen(SCREEN_NAMES.MY_KADCARS);
  }

  async function displayAllMintedKadcars() {
    console.log(allKadcarNfts)
  }

  function initiateMintKadcar() {
    mintKadcarFunction(1, () => console.log("HAHA"));
  }

  function handleWalletModalClose() {
    setShowWalletNameModal(false)
    setModalWallet("");
  }

  function handleOpenMintModal() {
    setShowMintModal(true);
  }

  function handleOpenWalletModal() {
    setShowWalletNameModal(true);
  }

  function handleOpenTransferModal() {
    setShowTransferModal(true);
  }



  return (
    <section
      {...props}
      className={outerClasses}
    >
      {/* <div className="container-sm"> */}
      {/* <div className={innerClasses}> */}
      <div style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%', display: 'flex' }}>
        <div className="hero-content" style={{ marginBottom: '20px' }}>
          <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
            Build the Ultimate <span className="text-color-primary">Kadcar</span>!
          </h1>
          <div className="container-sm">
            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Kadena's first car NFT where owners can collect, upgrade, race and trade their Kadcars
            </p>
            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400" style={{ fontColor: 'red' }}>
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
                  <Button onClick={() => setShowWalletNameModal(true)} tag="a" color="primary" wideMobile>
                    Connect X-Wallet
                  </Button>
                }
                {
                  extensionInstalled && pactContext.account !== null && pactContext.account !== 'null' &&
                  <Button onClick={disconnectKadenaAccount} tag="a" color="primary" wideMobile>
                    Disconnect X-Wallet
                  </Button>
                }
                <Button onClick={handleOpenMintModal} tag="a" color="dark" wideMobile>
                  Mint Kadcar
                </Button>
                <Button onClick={displayCurrentUserKadcars} tag="a" color="dark" wideMobile>
                  My Cars
                </Button>
                <Button onClick={displayAllMintedKadcars} tag="a" color="dark" wideMobile>
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
          height: '60vh',
          alignSelf: 'center',
          backgroundImage: ''
        }}>
          <ButtonGroup className={'reveal-from-bottom'}
            style={{
              width: '15%',
              height: '65%',
              justifyContent: 'space-evenly',
              marginRight: '20px',
              marginTop: '30px'
            }}>
            <Button onClick={() => { navigate("/garage") }} tag="a" color="dark" wideMobile style={{ width: '90%' }}>
              Garage Mode
            </Button>
            <Button onClick={() => setShowPassModal(true)} tag="a" color="dark" wideMobile style={{ width: '90%' }}>
              Race Mode
            </Button>
            <Button onClick={handleOpenTransferModal} tag="a" color="dark" wideMobile style={{ width: '90%' }}>
              Transfer
            </Button>
          </ButtonGroup>
          <div style={{ width: '85%', height: '60vh', justifyContent: 'center' }}>
            <MainHeaderScreenContainer />
          </div>
        </div>
        <Modal show={showPassModal} handleClose={() => setShowPassModal(false)}>
          <label>
            <input type={"text"} value={pass} onChange={(event) => { setPass(event.target.value) }} />
            <Button>
              Enter
            </Button>
          </label>
        </Modal>
        <WalletModal show={showWalletNameModal} setShow={setShowWalletNameModal} isXwallet={extensionInstalled} />
        <MintModal show={showMintModal} setShow={setShowMintModal} />
        <TransferNftModal show={showTransferModal} setShow={setShowTransferModal} />
        
      </div>
      {/* </div> */}
    </section>
  );
}

KadcarHub.propTypes = propTypes;
KadcarHub.defaultProps = defaultProps;

export default KadcarHub;
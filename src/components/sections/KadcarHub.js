import { connectKadena, disconnectKadena, getAccountSelected, getChain, getKadenaConnectStatus, getNetwork, getSelectedAccount, getUserWallet } from '../../kadenaInteraction/KadenaApi';
import { useGetMyKadcarsFunction, useGetMyKadcars, useTransferKadcars, useMintKadcarFunction } from '../../pact/KadcarExtractor';
import { SCREEN_NAMES } from '../../utils/Constants';
import { KadcarGameContext } from '../kadcarcomponents/KadcarGameContextProvider';
import { MainHeaderScreenContainer } from '../kadcarcomponents/KadcarComponents';
import { useCheckForXWalletExtension } from '../../hooks/BrowserExtensionHooks';
import { useCheckKadenaAccountConnection } from '../../hooks/KadenaCustomHooks';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { TransferNftModal } from '../../walletInteractions/TransferModal';
import { MintModal } from '../../walletInteractions/MintModal';
import { PactContext } from '../../pact/PactContextProvider';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Modal from '../elements/Modal';
import classNames from 'classnames';
import { WalletModal } from '../../walletInteractions/WalletModal';
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
  /******************* CUSTOM HOOK CALLS ********************/
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
  /**********************************************************/

  const [videoModalActive, setVideomodalactive] = useState(false);

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

  useEffect(() => {
    kadcarGameContext.setCurrentScreen(null);
  }, []);

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
    // console.log(kadcarGameContext.currentScreen)
  }

  async function displayAllMintedKadcars() {
    console.log(allKadcarNfts)
  }

  function handleOpenMintModal() {
    if (pactContext.account) {
      setShowMintModal(true);
    } else {
      setShowWalletNameModal(true);
    }
  }

  function handleOpenTransferModal() {
    if (pactContext.account) {
      setShowTransferModal(true);
    } else {
      setShowWalletNameModal(true);
    }
  }

  function handleNavigateToGarageMode() {
    navigate("/garage");
  }

  function handleHomeButtonClick() {
    kadcarGameContext.setCurrentScreen(null);
    navigate("/");
  }

  return (
    <>
      <section
        {...props}
        className={outerClasses}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          width: '95%',
        }}
      >
        <div className="container">
          <div className={innerClasses}>
            <div className="hero-content">
              <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
                Build the Ultimate <span className="text-color-primary">Kadcar</span>!
              </h1>
              <div className="container-sm">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Kadena's <span style={{fontWeight:'bold', color:'#f56be7'}}>1<sup>st</sup></span> car NFT where owners can 
                  <span style={{fontWeight:'bold', color:'#f56be7'}}> collect</span>, 
                  <span style={{fontWeight:'bold', color:'#f56be7'}}> upgrade</span> & 
                  <span style={{fontWeight:'bold', color:'#f56be7'}}> race</span> their Kadcars
                </p>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  <span style={{ fontStyle: 'italic', fontSize: 15 }}>*This website is NOT mobile responsive yet! Please only use testnet :)</span>
                </p>
                <div className="reveal-from-bottom" data-reveal-delay="600">
                  {
                    kadcarGameContext.currentScreen === null &&
                    <ButtonGroup>
                      {
                        !extensionInstalled &&
                        <Button tag="a" color="primary" wideMobile href={"https://xwallet.kaddex.com/#ux"}>
                          Install X-Wallet
                        </Button>
                      }
                      {
                        extensionInstalled && (pactContext.account === null || pactContext.account === 'null') &&
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
                      <Button tag="a" color="dark" wideMobile>
                        Race Mode
                      </Button>
                    </ButtonGroup>
                  }
                  {
                    kadcarGameContext.currentScreen === SCREEN_NAMES.MY_KADCARS &&
                    <ButtonGroup>
                      <Button onClick={() => handleHomeButtonClick()} tag="a" color="primary" wideMobile>
                        Back to Home
                      </Button>
                      <Button onClick={() => handleNavigateToGarageMode()} tag="a" color="dark" wideMobile disabled={true}>
                        Garage
                      </Button>
                      <Button onClick={handleOpenMintModal} tag="a" color="dark" wideMobile>
                        Mint Kadcar
                      </Button>
                      <Button onClick={handleOpenTransferModal} tag="a" color="dark" wideMobile>
                        Transfer
                      </Button>
                    </ButtonGroup>
                  }
                </div>
              </div>
            </div>
            <MainHeaderScreenContainer />
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
        </div>
      </section>
      {
        kadcarGarageContext.selectedKadcar ? <KadcarPreview /> : null
      }
    </>
  );
}

KadcarHub.propTypes = propTypes;
KadcarHub.defaultProps = defaultProps;

export default KadcarHub;
import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { DEFAULT_GAS_PRICE, DEFAULT_NETWORK_ID, LOCAL_CHAIN_ID, NETWORK_ID, SCREEN_NAMES } from '../../utils/Constants';
import { connectKadena, disconnectKadena, getAccountSelected, getKadenaConnectStatus, getSelectedAccount, getUserWallet } from '../../wallets/KadenaApi';
import { useGetMyKadcarsFunction, useGetAllKadcars, useGetMyKadcars, useMintKadcar, useTradeKadcars, useTransferKadcars } from '../../pact/KadcarExtractor';
import { useCheckForXWalletExtension } from '../../hooks/BrowserExtensionHooks';
import { useCheckKadenaAccountConnection } from '../../hooks/KadenaCustomHooks';
import { PactContext } from '../../pact/PactContextProvider';
import { MainHeaderScreenContainer } from '../kadcarcomponents/KadcarComponents';
import { KadcarGameContext } from '../kadcarcomponents/KadcarGameContextProvider';
import { checkIfNullOrUndefined } from '../../utils/utils';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const KadcarHub = ({ className, topOuterDivider, bottomOuterDivider, topDivider, bottomDivider, hasBgColor, invertColor, ...props }) => {
  //Get PactContext and KadcarGameContext
  const {
    account,
    chainId,
    setAccount,
    setChainId,
    defaultMeta,
    readFromContract,
    setNetworkSettings,
    useSetNetworkSettings,
    setCurrTransactionState
  } = useContext(PactContext);

  const { setCurrentScreen, setMyKadcars } = useContext(KadcarGameContext);

  //Check if the user has the X-Wallet extension installed
  const extensionInstalled = useCheckForXWalletExtension();

  //Check if the user has their X-Wallet account connected to this app
  // const kadenaConnected = useCheckKadenaAccountConnection(extensionInstalled); 

  //Kadcar hook calls
  const currentUserKadcarFunction = useGetMyKadcarsFunction();
  const transferKadcarsFunction = useTransferKadcars();
  const mintKadcarFunction = useMintKadcar();

  const currentUserKadcarNfts = useGetMyKadcars();
  const allKadcarNfts = useGetAllKadcars();

  const [videoModalActive, setVideomodalactive] = useState(false);
  const [showWalletNameModal, setShowWalletModal] = useState(false);


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
    // console.log(account)
  }, [account]);

  // useEffect(() => {
  //   console.log(currentUserKadcarNfts)
  // }, [currentUserKadcarNfts]);

  //Handle connecting user's X-Wallet
  function initiateKadenaConnection() {
    //Variable to hold required pact context parameters
    var pactContextObject = null;

    //Check if user has x-wallet downloaded
    if (window.kadena) {
      //Encapsulate all PactContext parameters to be modified by the API call as needed
      pactContextObject = {
        account: account,
        chainId: chainId,
        setAccount: setAccount,
        setChainId: setChainId,
        setNetworkSettings: setNetworkSettings,
        setCurrTransactionState: setCurrTransactionState
      }

      //Connect this user's account to the app
      connectKadena(pactContextObject);
    } else {
      //TODO: render error to install extension
    }
  }

  //Disconnect the user's account from the app
  function disconnectKadenaAccount() {
    //Encapsulate all PactContext parameters to be modified by the API call as needed
    var pactContextObject = {
      account: account,
      chainId: chainId,
      setAccount: setAccount,
      setChainId: setChainId,
      setNetworkSettings: setNetworkSettings
    }

    //Call the API function to disconnect this user's wallet from the app
    disconnectKadena(pactContextObject);
  }

  //Display all this user's kadcars
  async function displayCurrentUserKadcars() {
    setMyKadcars(currentUserKadcarNfts);
    setCurrentScreen(SCREEN_NAMES.MY_KADCARS);

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
    const recv = "k:ccf45d4b9e7a05b1f8ae03e362fac9502610d239191a3215774c5251a662c1eb";
    const nft = "0690";
    transferKadcarsFunction(nft, account, recv);
  }

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
            <div className="reveal-from-bottom" data-reveal-delay="600">
              <ButtonGroup>
                {
                  !extensionInstalled &&
                  <Button tag="a" color="primary" wideMobile href={"https://xwallet.kaddex.com/#ux"}>
                    Install X-Wallet
                  </Button>
                }
                {
                  extensionInstalled && (account === null || account === 'null') &&
                  <Button onClick={initiateKadenaConnection} tag="a" color="primary" wideMobile>
                    Connect X-Wallet
                  </Button>
                }
                {
                  extensionInstalled && account !== null && account !== 'null' &&
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
          marginTop:'20px',
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
              Trade
            </Button>
          </ButtonGroup>
          <div style={{ width: '85%', justifyContent: 'center' }}>
            <MainHeaderScreenContainer />
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

KadcarHub.propTypes = propTypes;
KadcarHub.defaultProps = defaultProps;

export default KadcarHub;
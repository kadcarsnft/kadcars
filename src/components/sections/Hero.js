import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { DEFAULT_NETWORK_ID } from '../../utils/Constants';
import { connectKadena, disconnectKadena, getAccountSelected, getKadenaConnectStatus, getSelectedAccount, getUserWallet } from '../../utils/KadenaApi';
import { useGetMyKadcars } from '../../utils/KadcarExtractor';
import { useCheckForXWalletExtension } from '../../hooks/BrowserExtensionHooks';
import { useCheckKadenaAccountConnection } from '../../hooks/KadenaCustomHooks';
import { PactContext } from '../../utils/PactContextProvider';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({ className, topOuterDivider, bottomOuterDivider, topDivider, bottomDivider, hasBgColor, invertColor, ...props }) => {
  //Establish connection requirements for session
  const { setNetworkSettings } = useContext(PactContext);
  const extensionInstalled = useCheckForXWalletExtension();
  const kadenaConnected = useCheckKadenaAccountConnection(extensionInstalled);
  const currentUserKadcarIds = useGetMyKadcars();

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

  //If the extension is installed, check if the user's account is connected to this app
  useEffect(() => {
  }, [extensionInstalled]);

  useEffect(() => {
  }, [kadenaConnected])

  function initiateKadenaConnection() {
    //Check if user has x-wallet downloaded
    if (window.kadena) {
      connectKadena(setNetworkSettings);
    } else {
      //TODO: render error to install extension
    }
  }

  async function getKadcarsForWallet() {
    const result = await currentUserKadcarIds();
    // const connectStatus = getKadenaConnectStatus();

    // if (connectStatus) {
    //   // getMyKadcars();
    // } else {

    // }
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Build the Ultimate <span className="text-color-primary">Kadcar</span>!
            </h1>
            <div className="container-sm">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
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
                    extensionInstalled && !kadenaConnected &&
                    <Button onClick={initiateKadenaConnection} tag="a" color="primary" wideMobile>
                      Connect X-Wallet
                    </Button>
                  }
                  {
                    extensionInstalled && kadenaConnected &&
                    <Button onClick={disconnectKadena} tag="a" color="primary" wideMobile>
                      Disconnect X-Wallet
                    </Button>
                  }
                  <Button tag="a" color="dark" wideMobile>
                    Mint Kadcar
                  </Button>
                  <Button onClick={getKadcarsForWallet} tag="a" color="dark" wideMobile>
                    My Cars
                  </Button>
                  <Button tag="a" color="dark" wideMobile>
                    All Kadcars
                  </Button>
                  <Button onClick={disconnectKadena} tag="a" color="dark" wideMobile>
                    Disconnect Wallet
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/video-placeholder.jpg')}
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
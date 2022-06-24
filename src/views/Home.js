import React, { useContext, useEffect } from 'react';
// import sections
import KadcarHub from '../components/sections/KadcarHub';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Roadmap from '../components/sections/Roadmap';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import { PactContext } from '../pact/PactContextProvider';
import { DEFAULT_CHAIN_ID, DEFAULT_GAS_PRICE, NETWORK_ID, SCREEN_NAMES } from '../utils/Constants';
import { KadcarGameContext } from '../components/kadcarcomponents/KadcarGameContextProvider';

const Home = () => {
  const { useSetNetworkSettings } = useContext(PactContext);
  const { currentScreen } = useContext(KadcarGameContext);
  useSetNetworkSettings(NETWORK_ID, DEFAULT_CHAIN_ID, DEFAULT_GAS_PRICE);

  useEffect(() => {
    console.log(currentScreen)
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <KadcarHub />
      {
        currentScreen === null &&
        <Roadmap />
      }
      {/* <FeaturesTiles /> */}
      {/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Testimonial topDivider />
      <Cta split /> */}
    </div>
  );
}

export default Home;
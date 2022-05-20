import React, { useContext } from 'react';
// import sections
import KadcarHub from '../components/sections/KadcarHub';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import { PactContext } from '../pact/PactContextProvider';
import { KadcarGameContextProvider } from '../components/kadcarcomponents/KadcarGameContextProvider';
import { DEFAULT_CHAIN_ID, DEFAULT_GAS_PRICE, NETWORK_ID } from '../utils/Constants';

const Home = () => {
  const { useSetNetworkSettings } = useContext(PactContext);
  useSetNetworkSettings(NETWORK_ID, DEFAULT_CHAIN_ID, DEFAULT_GAS_PRICE);

  return (
      <KadcarGameContextProvider>
        <KadcarHub className="illustration-section-01" />
      {/* <FeaturesTiles /> */}
      {/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" /> */}
      {/* <Testimonial topDivider /> */}
      {/* <Cta split /> */}
      </KadcarGameContextProvider>
  );
}

export default Home;
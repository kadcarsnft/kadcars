import React, { useContext } from 'react';
// import sections
import KadcarHub from '../components/sections/KadcarHub';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Roadmap from '../components/sections/Roadmap';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import { PactContext } from '../pact/PactContextProvider';
import { DEFAULT_CHAIN_ID, DEFAULT_GAS_PRICE, NETWORK_ID } from '../utils/Constants';

const Home = () => {
  const { useSetNetworkSettings } = useContext(PactContext);
  useSetNetworkSettings(NETWORK_ID, DEFAULT_CHAIN_ID, DEFAULT_GAS_PRICE);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <KadcarHub/>
      {/* <Roadmap/> */}
      {/* <FeaturesTiles /> */}
      {/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Testimonial topDivider />
      <Cta split /> */}
    </div>
  );
}

export default Home;
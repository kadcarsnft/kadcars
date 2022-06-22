import React, { useContext } from 'react';
// import sections
import KadcarHub from '../components/sections/KadcarHub';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import { PactContext } from '../pact/PactContextProvider';
import { DEFAULT_CHAIN_ID, DEFAULT_GAS_PRICE, NETWORK_ID } from '../utils/Constants';
import { KadcarGarageContext } from '../components/kadcarcomponents/KadcarGarageContextProvider';
import { KadcarPreview } from './KadcarPreview';

const Home = () => {
  const kadcarGarageContext = useContext(KadcarGarageContext);
  const { useSetNetworkSettings } = useContext(PactContext);
  useSetNetworkSettings(NETWORK_ID, DEFAULT_CHAIN_ID, DEFAULT_GAS_PRICE);

  return (
    <>
      <KadcarHub style={{ position: 'absolute' }} />
      {
        kadcarGarageContext.selectedKadcar ? <KadcarPreview /> : null
      }
      {/* <FeaturesTiles /> */}
      {/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" /> */}
      {/* <Testimonial topDivider /> */}
      {/* <Cta split /> */}
    </>
  );
}

export default Home;
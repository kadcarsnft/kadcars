import React from 'react';
// import sections
import KadcarHub from '../components/sections/KadcarHub';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import { PactContextProvider } from '../pact/PactContextProvider';
import { KadcarGameContextProvider } from '../components/kadcarcomponents/KadcarGameContext';

const Home = () => {

  return (
    <PactContextProvider>
      <KadcarGameContextProvider>
        <KadcarHub className="illustration-section-01" />
      </KadcarGameContextProvider>
      {/* <FeaturesTiles /> */}
      {/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" /> */}
      {/* <Testimonial topDivider /> */}
      {/* <Cta split /> */}
    </PactContextProvider>
  );
}

export default Home;
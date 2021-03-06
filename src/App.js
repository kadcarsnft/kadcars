import React, { useRef, useEffect } from 'react';
import { useLocation, Routes, Route, Outlet } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import { PactContextProvider } from './pact/PactContextProvider';

import "swiper/css/bundle"
import { Atrium } from './games/Atrium';
import { Garage } from './garage/Garage';
import { KadcarGameContextProvider } from './components/kadcarcomponents/KadcarGameContextProvider';
import { KadcarGarageContextProvider } from './components/kadcarcomponents/KadcarGarageContextProvider';

// Initialize Google Analytics
// ReactGA.initialize(process.env.REACT_APP_GA_CODE);
ReactGA.initialize('UA-000000-01');

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <PactContextProvider>
      <KadcarGameContextProvider>
        <KadcarGarageContextProvider>
          <ScrollReveal
            ref={childRef}
            children={() => (
              <Routes>
                <Route path="/" element={
                  <LayoutDefault>
                    <Outlet />
                  </LayoutDefault>
                }>
                  <Route path="/" element={<Home />} />
                  {/* <Route path="atrium/" element={<Atrium />} /> */}
                </Route>
                {/* <Route path="garage/" element={<Garage />} /> */}
              </Routes>
            )} />
        </KadcarGarageContextProvider>
      </KadcarGameContextProvider>
    </PactContextProvider>
  );
}

export default App;
import React, { useContext } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { MainBackgroundCard, MainBody } from './StyledLayoutComponents';
import { KadcarGameContext } from '../components/kadcarcomponents/KadcarGameContextProvider';

const LayoutDefault = ({ children }) => {
  const kadcarGameContext = useContext(KadcarGameContext);

  return (
    <MainBody>
      <MainBackgroundCard>
        <main className="site-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Header navPosition="right" className="reveal-from-bottom" style={{ paddingTop: '15px' }} />
          { children }
          {
            kadcarGameContext.currentScreen === null &&
            <Footer topDivider />
          }
        </main>
      </MainBackgroundCard>
    </MainBody>
  )
};

export default LayoutDefault;  
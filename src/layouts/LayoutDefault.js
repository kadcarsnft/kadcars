import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { MainBackgroundCard, MainBody } from './StyledLayoutComponents';

const LayoutDefault = ({ children }) => (
  <MainBody>
    <MainBackgroundCard>

    <Header navPosition="right" className="reveal-from-bottom" style={{marginTop: '15px'}}/>
    <main className="site-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <MainBackgroundCard /> */}
      {children}
    </main>
    </MainBackgroundCard>
  </MainBody>
);

export default LayoutDefault;  
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { MainBackgroundCard, MainBody } from './StyledLayoutComponents';

const LayoutDefault = ({ children }) => (
  <MainBody>
    <Header navPosition="right" className="reveal-from-bottom" />
    <main className="site-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MainBackgroundCard />
      {children}
    </main>
  </MainBody>
);

export default LayoutDefault;  
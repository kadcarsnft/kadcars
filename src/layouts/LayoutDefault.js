import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children }) => (
  <div className='illustration-section-01'>
    <Header navPosition="right" className="reveal-from-bottom" />
    <main className="site-content" style={{ display: 'flex', justifyContent: 'center' }}>
      {children}
    </main>
  </div>
);

export default LayoutDefault;  
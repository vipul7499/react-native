import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children,toggleHandler }) => (
  <>
  <div style={{backgroundColor:"#F8C9D4"}}>

    <Header navPosition="right" className="reveal-from-bottom" toggleHandler={toggleHandler}/>
    <main className="site-content">
      {children}
    </main>
    <Footer />
    </div>
  </>
);

export default LayoutDefault;  
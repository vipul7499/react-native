import React from 'react';
import './assets/scss/style.scss';



// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
// const cx  = cn.bind(styles)


// Initialize Google Analytics

const Dash = ({toggleHandler}) => {
  return (
   
<div className="lander">
    <LayoutDefault  toggleHandler={toggleHandler}>
              <Home/>
          </LayoutDefault>
          </div>
  );
}

export default Dash;
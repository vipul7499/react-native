import React from "react";
import Header from './Header'
import { Link } from "@reach/router";

const Home = () => {
  return (
    <nav className="features-nav">
          <Header/>

      <Link to="/map">Map</Link>
      <Link to="/period">Period</Link>

    </nav>
  );
};

export default Home;

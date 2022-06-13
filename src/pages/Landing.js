import React from "react";
// logos
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
// css
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobster logo" className="logo" />
      </nav>
      <div className="container page">
        {/* Info */}
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            iure unde possimus esse assumenda illum labore quos neque deserunt,
            voluptatibus nam fugit quaerat, recusandae laborum.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} className="main-img" alt="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;

import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
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
          <Link to={`/register`} className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} className="main-img" alt="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;

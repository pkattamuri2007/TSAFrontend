import React from "react";
import "./Logo.css";
import logoImage from "./logo.png"; // Update the path to your logo image

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" />
    </div>
  );
};

export default Logo;

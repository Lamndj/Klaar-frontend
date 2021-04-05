import React from "react";
import "./Header.css";

function Header({ title }) {
  return (
    <div className="header">
      <h3 className="header__title">{title}</h3>
      <hr className="header__underline" />
    </div>
  );
}

export default Header;

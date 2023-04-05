import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const data = useSelector((state) => state)
  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <h2>FakeShop</h2>
        <h2><Link to="/checkout">Cart</Link></h2>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" d-block d-md-none">
      <div className=" position-fixed bottom-0 d-flex justify-content-around w-100 bg-black text-white p-2">
        <Link to="/" className=" fs-2">
          <i className="fa-solid fa-house"></i>
        </Link>
        <Link to="/image" className=" fs-2">
          <i className="fa-regular fa-image"></i>
        </Link>
        <Link to="/videoupload" className=" fs-2">
          <i className="fa-regular fa-square-plus"></i>
        </Link>
        <Link to="/imageupload" className=" fs-2">
        <i className="fa-solid fa-images"></i>
        </Link>
        <Link to="/profile" className=" fs-2">
          <i className="fa-regular fa-user"></i>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

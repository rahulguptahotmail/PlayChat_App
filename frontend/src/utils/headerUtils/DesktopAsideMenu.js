import React from "react";
import { Link } from "react-router-dom";

const DesktopAsideMenu = ({ controller }) => {
  return (
    <>
      {controller ? (
        <>
          <aside
            className=" bg-black position-fixed float-start z-3 d-none d-md-block"
            style={{ width: "230px", height: "92vh" }}
          >
            <div className=" my-3 p-1 text-center text-white">
              <div className=" my-1 border pointer">
                <Link to="/" className="btn fs-5 text-white">
                  <i className="fa-solid fa-house"></i> Home
                </Link>
              </div>
              <div className=" my-1 border pointer">
                <Link to="/profile" className="btn fs-5 text-white">
                  <i className="fa-regular fa-user"></i> Profile
                </Link>
              </div>
              <div className=" my-1 border pointer">
                <Link to="/followers" className="btn fs-5 text-white">
                  <i className="fa-solid fa-user-group"></i> Followers
                </Link>
              </div>
              <div className=" my-1 border pointer">
                <Link to="/about" className="btn fs-5 text-white">
                  <i className="fa-solid fa-circle-info"></i> About
                </Link>
              </div>
            </div>

            <div
              className=" p-1 text-center text-white"
              style={{ marginTop: "35vh" }}
            >
              <div className=" my-1 border p-2 pointer">
                <Link className="btn fs-5 text-white">
                  <i className="fa-solid fa-gear"></i> Setting
                </Link>
              </div>
              <div className=" my-1 border pointer">
                <Link to="/support" className="btn fs-5 text-white">
                  <i className="fa-solid fa-question border p-1 px-2 rounded-circle"></i>{" "}
                  Support
                </Link>
              </div>
            </div>
          </aside>
        </>
      ) : (
        <aside
          className=" bg-black float-start position-fixed d-none d-md-inline-block"
          style={{ width: "75px", height: "92vh" }}
        >
          <div className=" ms-3 text-white">
            <div className=" fs-2 my-4 pointer">
              <Link to="/">
                <i className="fa-solid fa-house"></i>
              </Link>
            </div>
            <div className=" fs-2 my-4 pointer">
              <Link to="/image">
                <i className="fa-regular fa-image"></i>
              </Link>
            </div>
            <div className=" fs-2 my-4 pointer">
              <Link to="/videoupload">
                <i className="fa-regular fa-square-plus"></i>
              </Link>
            </div>
            <div className=" fs-2 my-4 pointer">
              <Link to="/imageupload">
              <i className="fa-solid fa-images"></i>
              </Link>
            </div>
            <div className=" fs-2 my-4 pointer">
              <Link to="/profile">
                <i className="fa-regular fa-user"></i>
              </Link>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default DesktopAsideMenu;

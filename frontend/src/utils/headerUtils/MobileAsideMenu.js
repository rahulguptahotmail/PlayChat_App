import React from "react";
import { Link } from "react-router-dom";
import MobileLoginLogout from "./MobileLoginLogout";

const MobileAsideMenu = (props) => {
  return (
    <>
      {" "}
      {props.controller ? (
        <div className=" d-block d-md-none">
          <div
            className=" d-flex position-absolute"
            style={{ height: "92vh", width: "100vw" }}
          >
            <div
              className=" w-50 bg-white bg-opacity-25"
              onClick={() => props.setFalse()}
            ></div>

            <div
              className=" w-50 bg-black text-white"
              onClick={() => props.setFalse()}
            >
              {/* Top */}
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

              {/* Middle */}

              <MobileLoginLogout />

              {/* Bottom */}

              <div
                className=" p-1 text-center text-white"
                style={{ marginTop: "25vh" }}
              >
                <div className=" my-1 border p-2 pointer">
                  <Link to="/setting" className="btn fs-5 text-white">
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
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MobileAsideMenu;

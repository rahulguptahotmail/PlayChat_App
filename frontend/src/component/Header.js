import React, { useState } from "react";
import DesktopAsideMenu from "../utils/headerUtils/DesktopAsideMenu";
import MobileAsideMenu from "../utils/headerUtils/MobileAsideMenu";
import LoginLogout from "../utils/headerUtils/LoginLogout";
import SearchedValues from "../utils/universalUtils/SearchedValues";

const Header = () => {
  const [searchState, setSearchState] = useState(false);
  const [optionState, setOptionState] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const stateManage = () => {
    setOptionState(false);
  };

  // search input handler
  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    setSearch(true)
    if ((e.target.value).length === 0) setSearch(false);
    else  setSearch(true);
  };
  return (
    <>
      <div style={{ marginTop: "8vh", display: "block" }}></div>
      <nav className=" z-3 position-fixed top-0 w-100 ">
        <header
          className=" d-flex justify-content-between align-items-center bg-black text-white"
          style={{
            height: "8.3vh",
          }}
        >
          <div className=" ms-2 d-flex">
            {/* desktop view aside controller */}
            <div
              className="d-none d-md-block me-4 ms-2"
              onClick={() => setOptionState(!optionState)}
            >
              {!optionState ? (
                <i className="fa-solid fa-ellipsis-vertical fs-1 px-3 pointer"></i>
              ) : (
                <i className="fa-solid fa-xmark fs-1 px-1 pointer"></i>
              )}
            </div>

            {/* Logo */}
            <img
              src={require(".././static/Logo.png")}
              alt="Logo"
              style={{
                height: "6vh",
              }}
            />
          </div>

          {/* mobile view search bar */}
          <div className={searchState ? "d-block " : "d-none d-md-block"}>
            <input
              type="text"
              placeholder="&#x2315; Search"
              className=" shadow border  bg-dark-subtle fw-bold py-1 px-1 rounded px-md-5"
              value={searchQuery}
              onChange={(e) => searchHandler(e)}
              
            />
          </div>

          {/* mobile view search controller */}
          {searchState ? (
            ""
          ) : (
            <i
              className="fa-solid fa-magnifying-glass d-block d-md-none fs-1 pointer"
              onClick={() => setSearchState(true)}
            ></i>
          )}

          {/* desktop view sign options */}
          <LoginLogout />

          {/* mobile view aside controller */}
          <div
            className="d-block d-md-none me-4"
            onClick={() => setOptionState(!optionState)}
          >
            {!optionState ? (
              <i className="fa-solid fa-ellipsis-vertical fs-1 px-2 pointer"></i>
            ) : (
              <i className="fa-solid fa-xmark fs-1 px-1 pointer"></i>
            )}
          </div>

          {/* search query */}
          {search ? (
            <SearchedValues searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearch={setSearch}/>
          ) : (
            ""
          )}

          {/* search query close */}
        </header>

        {/* mobile view aside menu */}
        <MobileAsideMenu controller={optionState} setFalse={stateManage} />
      </nav>
      {/* desktop view aside menu */}
      <DesktopAsideMenu controller={optionState} />
    </>
  );
};

export default Header;

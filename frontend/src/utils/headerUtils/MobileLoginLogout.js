import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MobileLoginLogout = () => {
  const [login, setLogin] = useState(false);

  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    setLogin(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  return (
    <div className=" d-block d-md-none ">
      {!login ? (
        <div className=" d-flex justify-content-evenly">
          <Link to="/login" className=" fw-bold btn btn-primary">
            Sign in
          </Link>
          <Link to="/register" className=" btn btn-outline-success fw-bold">
            Sign up
          </Link>
        </div>
      ) : (
        <div className=" text-center">
          <Link
            onClick={() => logoutHandler()}
            className=" btn btn-outline-danger fw-bold"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileLoginLogout;

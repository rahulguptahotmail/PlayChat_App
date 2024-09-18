import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoginLogout = () => {
  const [login, setLogin] = useState(false);

  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    setLogin(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  return (
    <div className=" d-none d-md-block">
      {!login ? (
        <div className=" d-flex me-3 align-items-center">
          <Link to="/login" className=" fw-bold btn text-white">
            Sign in
          </Link>
          <Link to="/register" className=" btn btn-outline-primary fw-bold">
            Sign up
          </Link>
        </div>
      ) : (
        <div className=" me-3 ">
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

export default LoginLogout;

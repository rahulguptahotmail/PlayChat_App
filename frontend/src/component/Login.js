import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [passView, setPassView] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    if(!email)
       setError("Please enter a valid email")
      else if( password.length < 6)
       setError("Password must be at least 6 Digiits")
      else{
        document.getElementById("loader").classList.remove("d-none");
        await axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}api/v1/user/login`,
            { email, password },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            const token = res.data?.token;
            setError(res.data.message + " Go To Home Page");
            if (token) {
              localStorage.setItem("token", token);
              navigate("/");
              window.location.reload();
            }
          })
          .catch((err) => {
            setError(err.response?.data?.message);
          });
          document.getElementById("loader").classList.add("d-none");
        }
  };
  return (
    <div className=" ms-md-4 ps-md-5">
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 bg-info bg-opacity-10">
                      <div className="text-center">
                        <img
                          src={require("../static/Logo.png")}
                          style={{ width: "120px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-3 pb-1">
                          We are The Play Chat Members
                        </h4>
                      </div>

                      <form>
                        <p>Please login to your account</p>

                        <div data-mdb-input-init className="form-outline mb-2">
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control shadow border-2"
                            placeholder="Username or Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Username or Email Address
                          </label>
                        </div>

                        <div
                          data-mdb-input-init
                          className="form-outline mb-1 position-relative"
                        >
                          {passView ? (
                            <input
                              type="text"
                              placeholder="Password"
                              id="form2Example22"
                              className="form-control shadow border-2"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          ) : (
                            <input
                              type="password"
                              placeholder="Password"
                              id="form2Example22"
                              className="form-control shadow border-2"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          )}

                          <p
                            className=" position-absolute pointer "
                            style={{ left: "90%", bottom: "35%" }}
                            onClick={() => setPassView(!passView)}
                          >
                            {passView ? (
                              <i className="fa-regular fa-eye"></i>
                            ) : (
                              <i className="fa-regular fa-eye-slash"></i>
                            )}
                          </p>
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password
                          </label>
                        </div>
                        <div className=" text-danger mb-2 ms-3">{error}</div>
                        <Link
                          className="text-muted fw-bold position-relative"
                          style={{ left: "60%", bottom: "20px" }}
                          to="/forgotpassword"
                        >
                          Forgot password?
                        </Link>

                        <div className="text-center mb-3 pb-1">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-success  btn-lg fw-bold shadow d-flex align-items-center gap-1"
                            type="button"
                            onClick={(e) => loginHandler(e)}
                          >
                            <div id="loader" className=" loader d-none"></div>
                            Log in
                          </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link
                            to="/register"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-danger btn-sm fw-bold"
                          >
                            Create new
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-whit px-3 py-4 p-md-5 mx-md-4 mb-4">
                      <h4 className="mb-4">About this Project</h4>
                      <p className="small mb-0">
                        During my studies, I’ve developed a strong foundation in
                        MERN-STACK, and I’ve worked on various projects that
                        have allowed me to gain hands-on experience in CRUD
                        Operation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

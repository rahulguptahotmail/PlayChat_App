import React, { useState } from "react";
import axios from "axios";
import TimeStamp from "../utils/registerUtils/TimeStamp";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [OtpController, setOtpController] = useState(false);

  // forgot Handler

  const forgotHandler = async (e) => {
    e.preventDefault();

    if(!email)
       setError("Enter Your Username or Email")
      else if( newPassword.length < 6)
       setError("Password must be at least 6 digits")
      else{
        document.getElementById("loader").classList.remove("d-none");
        
        await axios
          .patch(
            `${process.env.REACT_APP_BACKEND_URL}api/v1/user/forgotpassword`,
            {
              email,
              password: newPassword,
              Otp: otp,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setError(res.data.message);
            if (res.data.message === "Forgot successfull") navigate("/login");
            if (res.data.success) setOtpController(true);
            setTimeout(() => {
              setOtpController(false);
            }, 60000);
          })
          .catch((err) => {
            setError(err.response.data.message);
          })
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
                <div className="card-body p-md-5 bg-info bg-opacity-10">
                  <form>
                    <p>Please login to your account</p>

                    <div data-mdb-input-init className="form-outline mb-2">
                      <input
                        type="email"
                        id="form2Example11"
                        className="form-control shadow border-2"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example11">
                        Email Address
                      </label>
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline mb-1 position-relative"
                    >
                      <input
                        type="text"
                        placeholder="Enter New Password"
                        id="form2Example22"
                        className="form-control shadow border-2"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example22">
                        Enter New Password
                      </label>
                    </div>
                    {OtpController ? (
                      <div>
                        <input
                          type="text"
                          id="otphandler"
                          placeholder="Enter Your OTP"
                          className="form-control form-control-lg shadow border-2"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <div className=" d-flex justify-content-between px-3">
                          <label className="form-label" htmlFor="otphandler">
                            Enter Your OTP
                          </label>
                          <div>
                            <TimeStamp />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className=" text-danger mb-2 ms-3">{error}</div>

                    <div className="text-center mb-3 mt-4 pb-1 w-100">
                      <button
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success  btn-lg fw-bold shadow d-flex gap-1 align-items-center"
                        type="button"
                        onClick={(e) => forgotHandler(e)}
                      >
                        <div id="loader" className=" loader d-none"></div>
                        Forgot
                      </button>
                    </div>
                    <p className="text-center text-muted mt-3 mb-0">
                      Remembered Your Password?{" "}
                      <Link to="/login" className="fw-bold fs-5 text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;

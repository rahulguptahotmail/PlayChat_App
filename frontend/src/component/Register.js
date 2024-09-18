import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TimeStamp from "../utils/registerUtils/TimeStamp";

const Register = () => {
  const navigate = useNavigate();
  const [passView, setPassView] = useState(0);
  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [otp, setOtp] = useState("");
  const [OtpController, setOtpController] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (!fullName) setError("Please Enter Full Name");
    else if (!email || !email.includes("@"))
      setError("Please Enter a Valid Email");
    else if (password.length < 6)
      setError("Password should be at least 6 digits");
    else if (password !== password2) setError("Password not matched");
    else {
      document.getElementById("loader").classList.remove("d-none");
      let image =
        "https://as1.ftcdn.net/v2/jpg/06/07/41/96/1000_F_607419630_4VxkvMK8OqUPI713ljUJmIhtwCl0W0EV.webp";
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET_NAME); // Replace with your Cloudinary upload preset

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`, // Replace with your Cloudinary cloud name
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        image = response
          ? response.data?.url
          : "https://as1.ftcdn.net/v2/jpg/06/07/41/96/1000_F_607419630_4VxkvMK8OqUPI713ljUJmIhtwCl0W0EV.webp";
      } else
        image =
          "https://as1.ftcdn.net/v2/jpg/06/07/41/96/1000_F_607419630_4VxkvMK8OqUPI713ljUJmIhtwCl0W0EV.webp";

      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}api/v1/user/register`,
          {
            image,
            fullName,
            email,
            password,
            Otp: otp,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data?.token) {
            localStorage.setItem("token", res.data?.token);
            navigate("/");
            window.location.reload();
            return;
          } else if (res.data.success) setOtpController(true);
          setTimeout(() => {
            setOtpController(false);
          }, 600000);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
      document.getElementById("loader").classList.add("d-none");
    }
  };

  const imageHandler = (e) => {
    setFile(e.target.files[0]);
    document.getElementById("selectedAvatar").src = URL.createObjectURL(
      e.target.files[0]
    );
  };
  return (
    <div className=" ms-md-4 ps-md-5">
      <section
        className="vh-80 bg-image my-5"
        style={{
          backgroundImage: `url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)`,
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card my-5" style={{ borderRadius: "15px" }}>
                  <div className="card-body px-5 bg-info bg-opacity-10">
                    <h2 className="text-uppercase text-center mb-3">
                      Create an account
                    </h2>

                    <form>
                      <div>
                        <div className="d-flex justify-content-center">
                          <img
                            id="selectedAvatar"
                            src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
                            className="rounded-circle"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                            }}
                            alt="example placeholder"
                          />
                        </div>
                        <div className="d-flex justify-content-center">
                          <div data-mdb-ripple-init className="btn btn-rounded">
                            <label
                              className="form-label text-white"
                              htmlFor="customFile2"
                            >
                              <img
                                src={require("../static/image-upload.png")}
                                alt="upload"
                                style={{ width: "50px" }}
                              />
                            </label>
                            <input
                              type="file"
                              className="form-control d-none"
                              id="customFile2"
                              onChange={(e) => imageHandler(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div data-mdb-input-init className="form-outline mb-2">
                        <input
                          type="text"
                          id="form3Example1cg"
                          placeholder="FullName"
                          className="form-control form-control-lg shadow border-2"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <label
                          className="form-label"
                          HTMLhtmlFor="form3Example1cg"
                        >
                          FullName
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-2">
                        <input
                          type="email"
                          placeholder="Email Address"
                          name="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg shadow border-2"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                          className="form-label"
                          HTMLhtmlFor="form3Example3cg"
                        >
                          Your Email
                        </label>
                      </div>

                      <div
                        data-mdb-input-init
                        className="form-outline mb-2  position-relative"
                      >
                        {passView ? (
                          <input
                            type="text"
                            id="form3Example4cg"
                            placeholder="Password"
                            className="form-control form-control-lg shadow border-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        ) : (
                          <input
                            type="password"
                            id="form3Example4cg"
                            placeholder="Password"
                            className="form-control form-control-lg shadow border-2"
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
                          HTMLhtmlFor="form3Example4cg"
                        >
                          Password
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-2">
                        {passView ? (
                          <input
                            type="text"
                            id="form3Example4cdg"
                            placeholder="Repeat Password"
                            className="form-control form-control-lg shadow border-2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                          />
                        ) : (
                          <input
                            type="password"
                            id="form3Example4cdg"
                            placeholder="Repeat Password"
                            className="form-control form-control-lg shadow border-2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                          />
                        )}
                        <label
                          className="form-label"
                          HTMLhtmlFor="form3Example4cdg"
                        >
                          Repeat your password
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
                            <label
                              className="form-label"
                              HTMLhtmlFor="otphandler"
                            >
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

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn fw-bold shadow btn-success btn-block btn-lg gradient-custom-4 text-body d-flex align-items-center gap-1"
                          onClick={(e) => submitHandler(e)}
                        >
                          <div id="loader" className=" loader d-none"></div>
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-3 mb-0">
                        Have already an account?{" "}
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
        </div>
      </section>
    </div>
  );
};

export default Register;

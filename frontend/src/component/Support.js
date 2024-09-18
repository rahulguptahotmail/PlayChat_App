import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const supportHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      !name
        ? setError("Name is required")
        : !email
        ? setError("Email is required")
        : !email.includes("@")
        ? setError("@ is required")
        : !message
        ? setError("Message is required")
        : await axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}api/v1/universal/support`,
              {
                name,
                email,
                message,
                token,
              }
            )
            .then((res) => navigate("/"));
    } catch (err) {
      setError("Try Again");
    }
  };

  return (
    <div className=" ps-md-4 ms-md-5">
      {" "}
      <header className="hero text-center">
        <div className="container">
          <h1 className="display-4">Support Center</h1>
          <p className="lead">How can we assist you today?</p>
        </div>
      </header>
      <section id="contact" className="container my-5">
        <h2 className="text-center">Contact Us</h2>
        <form>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className=" text-danger mb-2 ms-3">{error}</div>
          <button
            type="submit"
            onClick={(e) => supportHandler(e)}
            className="btn btn-primary mt-3"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Support;

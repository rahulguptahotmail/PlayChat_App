import React, { useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const imageHandler = (e) => {
    document.getElementById("selectedAvatar").src = URL.createObjectURL(
      e.target.files[0]
    );
  };

  //   submit handler

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
    const token = localStorage.getItem("token");
    const file = document.getElementById("customFile2").files[0];

    let image = "";
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
      image = response ? response.data?.url : "";
    }

    await axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/user/userprofileedit`,
        { fullName, userName, token, image },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    }catch(err){
      setError("try Again")
    }
  };
  return (
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
          <div className="btn btn-rounded">
            <label className="form-label text-white" htmlFor="customFile2">
              <i className="fa-solid fa-cloud-arrow-up text-black fs-3"></i>
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
      <div className="form-outline mb-2">
        <input
          type="text"
          id="form3Example1cg"
          placeholder="FullName"
          className="form-control form-control-md shadow border-2"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label className="form-label" htmlFor="form3Example1cg">
          FullName
        </label>
      </div>
      <div className="form-outline mb-2">
        <input
          type="text"
          id="username"
          placeholder="User Name"
          className="form-control form-control-md  shadow border-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="form-label" htmlFor="username">
          UserName
        </label>
      </div>
      <div className=" text-danger mb-2 ms-3">{error}</div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn fw-bold shadow btn-success btn-block btn-md gradient-custom-4 text-body d-flex align-items-center gap-1"
          onClick={(e) => submitHandler(e)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditProfile;

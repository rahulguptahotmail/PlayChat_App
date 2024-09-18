import React, { useEffect, useState } from "react";
import UserInfo from "../utils/profileUtils/UserInfo";
import ProfileVideos from "../utils/profileUtils/ProfileVideos";
import ProfileImages from "../utils/profileUtils/ProfileImages";
import ProfilePlaylist from "../utils/profileUtils/ProfilePlaylist";
import ProfileAbout from "../utils/profileUtils/ProfileAbout";
import axios from "axios";
import EditProfile from "../utils/profileUtils/EditProfile";

const Profile = () => {
  const [index, setIndex] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [followerInfo, setFollowerInfo] = useState({});
  const [edit, setEdit] = useState(false);

  const changeCover = async (e) => {
    e.preventDefault();
    try{
    const token = localStorage.getItem("token");
    const file = e.target.files[0];

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
    const coverImage = response.data?.url;

    await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/user/coverimageupdate`,
      { token, coverImage },
      { headers: { "Content-Type": "application/json" } }
    );
    window.location.reload();
  }catch(err){
    window.location.reload();
  }
  };

  useEffect(() => {
    const followInfo = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/follower/getfollowers`,
        { params: { token } }
      );
      setFollowerInfo(res.data.Follow);
    };

    followInfo();

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUserInfo(userDetails);
    const lists = document.querySelectorAll("ul li");

    const removeColor = () => {
      lists?.forEach((list) => {
        list.classList.remove("bg-danger");
      });
    };
    lists?.forEach((list, idx) => {
      list.addEventListener("click", () => {
        removeColor();
        list.classList.add("bg-danger");
        setIndex(idx);
      });
    });
  }, []);

  return (
    <div className=" ms-md-4 ps-md-5">
      {edit ? (
        <div
          className=" position-absolute bg-body-tertiary rounded shadow ms-5 p-5  z-3"
          style={{ top: "8.3vh" }}
        >
          <EditProfile />
        </div>
      ) : (
        ""
      )}

      <div className=" position-relative">
        <img
          // src={require("../static/thumbnail.jpg")}
          src={userInfo.coverImage}
          alt={"hello"}
          style={{ height: "120px", width: "100%" }}
        />
        <label
          htmlFor="coverImage"
          className=" position-absolute end-0 bottom-0 text-white fs-4 pointer"
        >
          <i className="fa-solid fa-cloud-arrow-up"></i>
        </label>
        <input
          type="file"
          id="coverImage"
          accept="image/*"
          onChange={(e) => changeCover(e)}
          className=" d-none"
        />
      </div>

      <UserInfo
        image={userInfo.image}
        fullName={userInfo.fullName}
        userName={userInfo.userName}
        followersInfo={followerInfo}
      />
      <div className=" position-relative">
        <i
          className="fa-solid fa-pen-to-square position-absolute bottom-50 end-0 pb-3 pe-3 fs-4 pointer "
          onClick={() => setEdit(!edit)}
        ></i>
      </div>

      <div>
        <ul className=" d-flex justify-content-between align-items-center text-center list-unstyled fw-bold">
          <li className="border rounded w-25 py-1 bg-danger">Videos</li>
          <li className="border rounded w-25 py-1">Images</li>
          <li className="border rounded w-25 py-1">Playlist</li>
          <li className="border rounded w-25 py-1">About</li>
        </ul>
      </div>
      {index === 0 ? (
        <ProfileVideos />
      ) : index === 1 ? (
        <ProfileImages />
      ) : index === 2 ? (
        <ProfilePlaylist />
      ) : index === 3 ? (
        <ProfileAbout />
      ) : (
        index
      )}
    </div>
  );
};

export default Profile;

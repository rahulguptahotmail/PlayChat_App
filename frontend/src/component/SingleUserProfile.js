import React, { useEffect, useState } from "react";
import UserInfo from "../utils/profileUtils/UserInfo";
import axios from "axios";
import SingleUserVideoUtils from "../utils/singleUserUtils/SingleUserVideoUtils";
import SingleUserImageUtils from "../utils/singleUserUtils/SingleUserImageUtils";
import SingleUserPlaylistUtils from "../utils/singleUserUtils/SingleUserPlaylistUtils";
import SingleUserAboutUtils from "../utils/singleUserUtils/SingleUserAboutUtils";

const SingleUserProfile = () => {
  const [index, setIndex] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [followerInfo, setFollowerInfo] = useState({});

  useEffect(() => {
    const followInfo = async () => {
      const userId = window.location.pathname.split("/")[2];

      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/follower/getuserfollowers`,
        { params: { userId } }
      );

      setFollowerInfo(res.data.Follow);
    };

    followInfo();

    const userInf = async () => {
      const userId = window.location.pathname.split("/")[2];

      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/user/singleuser/${userId}`
      );
      setUserInfo(res.data.user);
    };
    userInf();

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
  }, [window.location.pathname.split("/")[2]]);

  return (
    <div className=" ms-md-4 ps-md-5">
      <div>
        <img
          // src={require("../static/thumbnail.jpg")}
          src={userInfo.coverImage}
          alt={"hello"}
          style={{ height: "120px", width: "100%" }}
        />
      </div>

      <UserInfo
        image={userInfo.image}
        fullName={userInfo.fullName}
        userName={userInfo.userName}
        followersInfo={followerInfo}
      />

      <div>
        <ul className=" d-flex justify-content-between align-items-center text-center list-unstyled fw-bold">
          <li className="border rounded w-25 py-1 bg-danger">Videos</li>
          <li className="border rounded w-25 py-1">Images</li>
          <li className="border rounded w-25 py-1">Playlist</li>
          <li className="border rounded w-25 py-1">About</li>
        </ul>
      </div>
      {index === 0 ? (
        <SingleUserVideoUtils userImage={userInfo.image} userId={window.location.pathname.split("/")[2]}/>
      ) : index === 1 ? (
        <SingleUserImageUtils userImage={userInfo.image} userId={window.location.pathname.split("/")[2]}/>
      ) : index === 2 ? (
        <SingleUserPlaylistUtils/>
      ) : index === 3 ? (
        <SingleUserAboutUtils fullName={userInfo.fullName} createdAt={userInfo.createAccountAt} userId={userInfo._id}/>
      ) : (
        index
      )}
    </div>
  );
};

export default SingleUserProfile;

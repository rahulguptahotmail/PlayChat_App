import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentBox from "../utils/universalUtils/CommentBox";
import { useNavigate } from "react-router-dom";
import SingleVideoUtils from "../utils/universalUtils/SingleVideoUtils";
// import Home from "./Home"

const SingleVideo = () => {
  const navigate = useNavigate();
  const [singleVideo, setSingleVideo] = useState({});
  const [singleUser, setSingleUser] = useState({});
  const [comment, setComment] = useState(false);

  const [refresh, setRefresh] = useState();

  const stateHandler = () => {
    if (refresh === 1) setRefresh(0);
    else setRefresh(1);
  };

  const token = localStorage.getItem("token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const videoLike = async (videoId) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/video/videolike`, {
      videoId,
      token,
    });
    stateHandler();
  };

  useEffect(() => {
    const fetchSingelVideo = async () => {
      const videoId = window.location.pathname.split("/")[2];
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/video/singlevideo/${videoId}`
      );
      setSingleVideo(res.data.videoDetails.video);
      setSingleUser(res.data.videoDetails.user);
    };

    fetchSingelVideo();
  }, [refresh, window.location.pathname.split("/")[2]]);

  return (
    <div className="d-flex flex-wrap ms-md-4 ps-md-5 text-center border position-relative">
      <div className="col-12 col-md-6 col-lg-7 col-xl-8 position-fixed z-2 ">
        {/* desktop view */}
        <div className=" d-md-block d-none">
          <video
            src={singleVideo.videoPath}
            className=" border-top rounded-bottom-3 shadow b w-100 position-sticky object-fit-contain bg-black"
            style={{ width: "100vw", maxHeight: "30vw" }}
            controls
          ></video>
        </div>
        {/* mobile view */}
        <div className=" d-md-none d-block">
          <video
            // src={require("../static/rk.mp4")}
            src={singleVideo.videoPath}
            className=" border-top rounded-bottom-3 shadow b w-100 position-sticky object-fit-contain bg-black"
            style={{ width: "100vw", maxHeight: "60vw" }}
            controls
          ></video>
        </div>

        {/* editing */}
        <div
          className=" shadow d-flex justify-content-between bg-body-tertiary position-relative"
          style={{ bottom: "10px" }}
        >
          <div className=" d-flex justify-content-start align-items-center">
            <Link
              to={`/user/${singleVideo.owner}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{ width: "35px", height: "35px" }}>
                <img
                  src={singleUser.image}
                  // src={require("../static/Logo.png")}
                  id="ownerimage"
                  alt="thumbnail"
                  className=" ms-3 rounded-circle shadow "
                  style={{ width: "35px", height: "35px" }}
                />
              </div>
            </Link>
            <h4
              className=" overflow-hidden fs-6 text-start ms-4 py-2"
              style={{ height: "50px" }}
            >
              {singleVideo.title}
            </h4>
          </div>
          <div>
            <i
              className="fa-solid fa-ellipsis-vertical fs-4 pe-3 mt-3 pointer rounded-circle"
              // onClick={() => {
              //   if (option) setOption(false);
              //   else setOption(index + 1);
              // }}
            ></i>
          </div>
        </div>

        <div
          className=" shadow text-start bg-body-tertiary position-relative"
          style={{ bottom: "12px" }}
        >
          <p
            className=" position-absolute  bottom-50 ms-5 fst-italic"
            id="username"
          >
            {singleUser.userName}
          </p>
          <div className=" px-4 d-flex pt-2 justify-content-between align-items-start">
            {singleVideo?.likedBy?.some(
              (x) => x?.userName === userDetails.userName
            ) ? (
              <div className=" d-flex justify-content-center gap-1">
                {" "}
                <i
                  className="fa-solid fa-heart fs-4 text-danger pointer"
                  onClick={() => videoLike(singleVideo._id)}
                ></i>
                <p>{singleVideo?.likedBy?.length} Likes</p>
              </div>
            ) : (
              <div className=" d-flex justify-content-center gap-1">
                {" "}
                <i
                  className="fa-regular fa-heart fs-4 pointer"
                  onClick={() => videoLike(singleVideo._id)}
                ></i>
                <p>{singleVideo?.likedBy?.length} Likes</p>
              </div>
            )}
            <div className="d-flex justify-content-center gap-1">
              <i
                className="fa-regular fa-comment fs-4"
                onClick={() => {
                  if (comment) setComment(false);
                  else setComment(true);
                }}
              ></i>
              <p>{singleVideo.commentBy?.length}</p>
            </div>
          </div>
          <p
            className=" ms-5 position-absolute fst-italic"
            style={{
              fontSize: "12px",
              bottom: "-15px",
            }}
          >
            {" "}
            Uploaded At : {JSON.stringify(singleVideo?.createdAt)?.slice(1, 11)}
          </p>
          <div
            className=" position-relative bg-body-tertiary"
            style={{ top: "-100px", marginRight: "70px" }}
          >
            {comment ? (
              <CommentBox
                id={singleVideo._id}
                Mode="video"
                comments={singleVideo?.commentBy}
                func={stateHandler}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="col-12 col-md-5 col-lg-4 col-xl-3 position-absolute end-0">
        <SingleVideoUtils />
      </div>
    </div>
  );
};

export default SingleVideo;

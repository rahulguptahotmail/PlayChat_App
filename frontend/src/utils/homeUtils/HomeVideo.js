import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentBox from "../universalUtils/CommentBox";
import axios from "axios";

const HomeVideo = (props) => {
  const [option, setOption] = useState(false);
  const [comment, setComment] = useState(false);
  const [singleVideo, setSingleVideo] = useState({});
  const [singleUser, setSingleUser] = useState({});
  const [refresh, setRefresh] = useState();
  const [isFollow, setIsFollow] = useState("Follow"); //

  const stateHandler = () => {
    if (refresh === 1) setRefresh(0);
    else setRefresh(1);
  };

  const token = localStorage.getItem("token");

  // videoLike handler

  const videoLike = async (videoId) => {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/video/videolike`,
      {
        videoId,
        token,
      }
    );
    stateHandler();
  };

  // follower handler

  const followerHandler = async (ownerId) => {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/follower/followers`,
      {
        ownerId,
        token,
      }
    );
    stateHandler();
  };

  useEffect(() => {
    const fetchSingelVideo = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/video/singlevideo/${props.video._id}`
      );
      setSingleVideo(res.data.videoDetails.video);
      setSingleUser(res.data.videoDetails.user);

      if (
        singleUser.userName ===
        JSON.parse(localStorage.getItem("userDetails")).userName
      )
        setIsFollow("");
      else {
        const followRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/v1/follower/isfollow/${props.video.owner}`,
          {
            params: {
              token,
            },
          }
        );
        if (followRes.data.value) setIsFollow("Followed");
        else setIsFollow("Follow");
      }
    };

    fetchSingelVideo();
  }, [refresh]);

  return (
    <div key={props.index} className=" mb-2 col-12 col-md-6 col-lg-4 col-xl-3">
      <div>
        <video
          src={singleVideo.videoPath}
          className=" rounded shadow b image-healing-animation"
          style={{ width: "85%", height: "180px" }}
          controls
        ></video>
      </div>
      <div className=" mx-4 rounded-pill d-flex justify-content-between bg-body-tertiary">
        <div className=" d-flex justify-content-start align-items-center">
          <Link
            to={`/user/${singleVideo.owner}`}
            style={{ textDecoration: "none" }}
          >
            <div style={{ width: "35px", height: "35px" }}>
              <img
                src={singleUser.image}
                id={singleVideo.owner}
                alt="thumbnail"
                className=" ms-3 rounded-circle shadow "
                style={{ width: "35px", height: "35px" }}
              />
            </div>
          </Link>
          <Link
            to={`/video/${singleVideo._id}`}
            style={{ textDecoration: "none" }}
          >
            <h4
              className=" overflow-hidden fs-6 text-start ms-4 py-2 text-black"
              style={{ height: "50px" }}
            >
              {singleVideo.title?.length > 59
                ? singleVideo.title.slice(0, 60) + "..."
                : singleVideo.title + "."}
            </h4>
          </Link>
        </div>

        <div>
          <i
            className="fa-solid fa-ellipsis-vertical fs-4 pe-3 mt-3 pointer rounded-circle"
            onClick={() => {
              if (option) setOption(false);
              else setOption(props.index + 1);
            }}
          ></i>
        </div>
      </div>

      <div className=" text-start mx-5 bg-body-tertiary rounded-bottom-3 position-relative">
        <div className=" position-relative">
          <p
            className=" position-absolute bottom-5 ms-1 fst-italic"
            style={{ bottom: "-28px" }}
          >
            {singleUser.userName}
          </p>
          {singleUser.userName !==
          JSON.parse(localStorage.getItem("userDetails")).userName ? (
            <p
              onClick={() => followerHandler(singleVideo.owner)}
              className=" position-absolute end-0  me-1 fw-bold btn btn-primary btn-sm rounded-pill fst-italic"
              style={{ top: "-11px" }}
              id={singleVideo.owner + props.index + 2}
            >
              {isFollow}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className=" px-4 d-flex pt-2 justify-content-between align-items-start">
          {singleVideo.likedBy?.some(
            (x) =>
              x?.userName ===
              JSON.parse(localStorage.getItem("userDetails")).userName
          ) ? (
            <div className=" d-flex justify-content-center mt-3 gap-1">
              {" "}
              <i
                className="fa-solid fa-heart fs-4 text-danger pointer"
                onClick={() => videoLike(singleVideo._id)}
              ></i>
              <p>{singleVideo.likedBy.length} Likes</p>
            </div>
          ) : (
            <div className=" d-flex justify-content-center mt-3 gap-1">
              {" "}
              <i
                className="fa-regular fa-heart fs-4 pointer"
                onClick={() => videoLike(singleVideo._id)}
              ></i>
              <p>{singleVideo.likedBy?.length} Likes</p>
            </div>
          )}
          <div className="d-flex justify-content-center gap-1">
            <i
              className="fa-regular fa-comment fs-4 pt-3"
              onClick={() => {
                if (comment) setComment(false);
                else setComment(props.index + 1);
              }}
            ></i>
            <p className=" pt-3">{singleVideo.commentBy?.length}</p>
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
          Uploaded At : {JSON.stringify(singleVideo.createdAt)?.slice(1, 11)}
        </p>
        {comment === props.index + 1 ? (
          <div className=" position-absolute z-3 bg-body-tertiary w-100 shadow">
            <CommentBox
              id={singleVideo._id}
              Mode="video"
              comments={singleVideo.commentBy}
              func={stateHandler}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HomeVideo;

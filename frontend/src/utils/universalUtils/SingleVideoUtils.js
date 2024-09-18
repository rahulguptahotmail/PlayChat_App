import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import axios from "axios";
import { Link } from "react-router-dom";

const SingleVideoUtils = () => {
  const [items, setItems] = useState([]);
  const [option, setOption] = useState(false);
  const [comment, setComment] = useState(false);
  const [refresh, setRefresh] = useState();

  const stateHandler = () => {
    if (refresh === 1) setRefresh(0);
    else setRefresh(1);
  };

  const token = localStorage.getItem("token");

  const videoLike = async (videoId) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/video/videolike`, {
      videoId,
      token,
    });
    stateHandler();
  };

  const user = async (userId, index) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/user/singleuser/${userId}`
    );

    document.getElementById(userId + index).src = res.data.user.image;
    document.getElementById(userId + index + 1).innerText =
      res.data.user.userName;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/v1/video/videos`);
      setItems(res.data.videos);
    };

    fetchVideos();
  }, [refresh]);
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className=" mb-2 ">
          <Link to={`/video/${item._id}`} style={{ textDecoration: "none" }}>
          <div className=" w-100">
            <video
              src={item.videoPath}
              className=" rounded shadow b image-healing-animation"
              style={{ width: "85%", height: "180px" }}
            ></video>
          </div>
          </Link>
          <div className=" mx-4 rounded-pill d-flex justify-content-between bg-body-tertiary">
            <Link to={`/video/${item._id}`} style={{ textDecoration: "none" }}>
              <div className=" d-flex justify-content-start align-items-center">
                <div style={{ width: "35px", height: "35px" }}>
                  <img
                    // src={userDetails.image}
                    src={user(item.owner, index)}
                    id={item.owner + index}
                    alt="thumbnail"
                    className=" ms-3 rounded-circle shadow "
                    style={{ width: "35px", height: "35px" }}
                  />
                </div>
                <h4
                  className=" overflow-hidden fs-6 text-start ms-4 py-2 text-black"
                  style={{ height: "50px" }}
                >
                  {item.title.length > 59
                    ? item.title.slice(0, 60) + "..."
                    : item.title + "."}
                </h4>
              </div>
            </Link>

            <div>
              <i
                className="fa-solid fa-ellipsis-vertical fs-4 pe-3 mt-3 pointer rounded-circle"
                onClick={() => {
                  if (option) setOption(false);
                  else setOption(index + 1);
                }}
              ></i>
            </div>
          </div>

          <div className=" text-start mx-5 bg-body-tertiary rounded-bottom-3 position-relative">
            <p
              className=" position-absolute bottom-50 ms-4 fst-italic"
              id={item.owner + index + 1}
            ></p>
            <div className=" px-4 d-flex pt-2 justify-content-between align-items-start">
              {item.likedBy.some(
                (x) =>
                  x?.userName ===
                  JSON.parse(localStorage.getItem("userDetails")).userName
              ) ? (
                <div className=" d-flex justify-content-center gap-1">
                  {" "}
                  <i
                    className="fa-solid fa-heart fs-4 text-danger pointer"
                    onClick={() => videoLike(item._id)}
                  ></i>
                  <p>{item.likedBy.length} Likes</p>
                </div>
              ) : (
                <div className=" d-flex justify-content-center gap-1">
                  {" "}
                  <i
                    className="fa-regular fa-heart fs-4 pointer"
                    onClick={() => videoLike(item._id)}
                  ></i>
                  <p>{item.likedBy.length} Likes</p>
                </div>
              )}
              <div className="d-flex justify-content-center gap-1">
                <i
                  className="fa-regular fa-comment fs-4"
                  onClick={() => {
                    if (comment) setComment(false);
                    else setComment(index + 1);
                  }}
                ></i>
                <p>{item.commentBy?.length}</p>
              </div>
            </div>
            {comment === index + 1 ? (
              <CommentBox
                id={item._id}
                Mode="video"
                comments={item.commentBy}
                func={stateHandler}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleVideoUtils;

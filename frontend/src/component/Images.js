import React, { useEffect, useState,useRef } from "react";
import CommentBox from "../utils/universalUtils/CommentBox";
import axios from "axios";
import { Link } from "react-router-dom";

const Images = () => {
  const [items, setItems] = useState([]);
  const [option, setOption] = useState(false);
  const [comment, setComment] = useState(false);
  const [refresh, setRefresh] = useState();
  const loaderRef = useRef(null);

  const stateHandler = () => {
    if (refresh === 1) setRefresh(0);
    else setRefresh(1);
  };

  const token = localStorage.getItem("token");
  // special
  if (window.document.getElementById("homeImages")) {
    window.document.addEventListener("scroll", (e) => {
      if (
        window.document.getElementById("homeImages").clientHeight <
        window.scrollY + window.innerHeight
      )
        stateHandler();
    });
  }

  // imageLike Handler
  const imageLike = async (imageId) => {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/image/imagelike`,
      {
        imageId,
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

  // const imageOwner Image Source Handler
  const user = async (userId, index) => {
    const imgRes = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/user/singleuser/${userId}`
    );

    document.getElementById(userId + index).src = imgRes.data.user.image;
    document.getElementById(userId + index + 1).innerText =
      imgRes.data.user.userName;

    const followRes = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/follower/isfollow/${userId}`,
      {
        params: {
          token,
        },
      }
    );

    if (
      imgRes.data.user.userName ===
      JSON.parse(localStorage.getItem("userDetails")).userName
    )
      document.getElementById(userId + index + 2).style.display = "none";
    else if (followRes.data.value)
      document.getElementById(userId + index + 2).innerHTML = "Followed";
    else document.getElementById(userId + index + 2).innerText = "Follow";
  };

  useEffect(() => {
    const fetchimages = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/image/images`,
        { params: { length: items.length } }
      );
      loaderRef.current.classList.add("d-none");
      setItems(res.data.images);
    };
    // if (items.length % 10 === 0)
    fetchimages();
  }, [refresh]);

  return (
    <div
      id="homeImages"
      className="d-flex flex-wrap ms-md-4 ps-md-5 pt-2 text-center border"
    >
     <div id="loader" className=" w-100 fw-bold p-3" ref={loaderRef}>
        <div className="loader m-auto"></div>
        Loading...
      </div>
      {items.map((item, index) => (
        <div key={index} className=" mb-2 col-12 col-md-6 col-lg-4 col-xl-3">
          <Link to={`/image/${item._id}`}>
            <div>
              <img
                src={item.imagePath}
                className=" rounded shadow b image-healing-animation"
                style={{ width: "80%", height: "250px" }}
              />
            </div>
          </Link>
          <div className=" mx-4 rounded-pill d-flex justify-content-between bg-body-tertiary">
            <Link
              to={`/user/${item.owner}`}
              style={{ textDecoration: "none" }}
              className=" d-flex justify-content-start align-items-center"
            >
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
            <div className=" position-relative">
              <p
                className=" position-absolute bottom-5 ms-4 fst-italic"
                style={{ bottom: "-28px" }}
                id={item.owner + index + 1}
              >
                rahulguptahotamil
              </p>
              <p
                onClick={() => followerHandler(item.owner)}
                className=" position-absolute end-0  me-2 fw-bold btn btn-primary btn-sm rounded-pill fst-italic"
                style={{ top: "-11px" }}
                id={item.owner + index + 2}
              >
                Follow
              </p>
            </div>
            <div className=" px-4 d-flex pt-2 justify-content-between align-items-start">
              {item.likedBy.some(
                (x) =>
                  x?.userName ===
                  JSON.parse(localStorage.getItem("userDetails")).userName
              ) ? (
                <div className=" d-flex justify-content-center mt-3 gap-1">
                  {" "}
                  <i
                    className="fa-solid fa-heart fs-4 text-danger pointer"
                    onClick={() => imageLike(item._id)}
                  ></i>
                  <p>{item.likedBy.length} Likes</p>
                </div>
              ) : (
                <div className=" d-flex justify-content-center mt-3 gap-1">
                  {" "}
                  <i
                    className="fa-regular fa-heart fs-4 pointer"
                    onClick={() => imageLike(item._id)}
                  ></i>
                  <p>{item.likedBy.length} Likes</p>
                </div>
              )}
              <div className="d-flex justify-content-center gap-1">
                <i
                  className="fa-regular fa-comment fs-4 pt-3"
                  onClick={() => {
                    if (comment) setComment(false);
                    else setComment(index + 1);
                  }}
                ></i>
                <p className=" pt-3">{item.commentBy?.length}</p>
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
              Uploaded At : {JSON.stringify(item.createdAt).slice(1, 11)}
            </p>
            {comment === index + 1 ? (
              <div className=" position-absolute z-3 bg-body-tertiary w-100 shadow">
                <CommentBox
                  id={item._id}
                  Mode="image"
                  comments={item.commentBy}
                  func={stateHandler}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Images;

import React, { useEffect, useState } from "react";
import CommentBox from "../universalUtils/CommentBox";
import { Link } from "react-router-dom";
import axios from "axios";

const SingleUserImageUtils = (props) => {
  const [items, setItems] = useState([]);
  const [comment, setComment] = useState(false);
  const [refresh, setRefresh] = useState();

  const stateHandler = () => {
    if (refresh === 1) setRefresh(0);
    else setRefresh(1);
  };

  const token = localStorage.getItem("token");

  const imageLike = async (imageId) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/image/imagelike`, {
      imageId,
      token,
    });
    stateHandler();
  };

  useEffect(() => {
    const fetchImages = async () => {
      const userId = props.userId;
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/image/singleuserprofile/${userId}`
      );
      setItems(res.data.images);
    };

    fetchImages();
  }, [refresh]);
  return (
    <div className="pt-2 d-flex flex-wrap text-center border pb-4">
      {items.length < 1 ? (
        <div className=" w-100 m-auto">
          <h1 className=" w-100 mt-5">No Image Uploaded</h1>
        </div>
      ) : (
        ""
      )}
      {items.map((item, index) => (
        <div key={index} className=" mb-2 col-12 col-md-6 col-lg-4 col-xl-3">
          <div>
            <img
              src={item.imagePath}
              className=" rounded shadow b image-healing-animation"
              style={{ width: "80%", height: "250px" }}
            />
          </div>
          <div className=" mx-4 rounded-pill d-flex justify-content-between bg-body-tertiary">
            <div className=" d-flex justify-content-start align-items-center">
              <img
                src={props.userImage}
                alt="thumbnail"
                className=" ms-3 rounded-circle shadow "
                style={{ width: "35px", height: "35px" }}
              />
              <h4
                className=" overflow-hidden fs-5 text-start ps-2 py-2"
                style={{ height: "50px" }}
              >
                {item.title}
              </h4>
            </div>
          </div>

          <div className=" text-start mx-5 bg-body-tertiary rounded-bottom-3">
            <div className=" px-4 d-flex  justify-content-between align-items-start">
              {/* this is your localStorage username if match then heart red else black */}
              {item.likedBy.some(
                (x) =>
                  x?.userName ===
                  JSON.parse(localStorage.getItem("userDetails")).userName
              ) ? (
                <div className=" d-flex justify-content-center gap-1">
                  {" "}
                  <i
                    className="fa-solid fa-heart fs-4 text-danger pointer"
                    onClick={() => imageLike(item._id)}
                  ></i>
                  <p>{item.likedBy.length} Likes</p>
                </div>
              ) : (
                <div className=" d-flex justify-content-center gap-1">
                  {" "}
                  <i
                    className="fa-regular fa-heart fs-4 pointer"
                    onClick={() => imageLike(item._id)}
                  ></i>
                  <p>{item.likedBy?.length} Likes</p>
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
                Mode="image"
                comments={item.commentBy}
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

export default SingleUserImageUtils;

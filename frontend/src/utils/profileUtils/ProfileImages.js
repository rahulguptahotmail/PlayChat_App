import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentBox from "../universalUtils/CommentBox";

const ProfileImages = () => {
  const [items, setItems] = useState([]);
  const [option, setOption] = useState(false);
  const [comment, setComment] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const token = localStorage.getItem("token");

  const imageLike = async (imageId) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/image/imagelike`, {
      imageId,
      token,
    });
  };

  const deleteImage = async (imageId) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/v1/image/delete/${imageId}`);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/image/profile/${token}`
      );
      setItems(res.data.images);
    };

    fetchImages();
  }, [deleteImage]);
  return (
    <div className="pt-2 d-flex flex-wrap text-center border pb-4">
      {items.length < 1 ? (
        <div className=" w-100 m-auto">
          <h1 className=" w-100 mt-5">No Image Uploaded</h1>
          <Link to="/imageupload" className=" btn btn-outline-primary mb-2">
            Upload Image
          </Link>
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
                src={userDetails.image}
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
            <div>
              <i
                className="fa-solid fa-ellipsis-vertical fs-4 pe-3 mt-3 pointer rounded-circle"
                onClick={() => {
                  if (option) setOption(false);
                  else setOption(index + 1);
                }}
              ></i>
              {option === index + 1 ? (
                <div className=" bg-info shadow bg-opacity-50 text-white position-absolute p-2 rounded">
                  <p
                    className=" btn btn-sm btn-outline-danger"
                    onClick={() => deleteImage(item._id)}
                  >
                    <i class="fa-solid fa-trash"></i> Delete
                  </p>
                </div>
              ) : (
                ""
              )}
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

export default ProfileImages;

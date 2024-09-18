import React, { useState } from "react";
import axios from "axios";

const CommentBox = (props) => {
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const id = props.id;

  const videoComment = async (e, id) => {
    e.preventDefault();
    if (!comment)
      setComment(JSON.parse(localStorage.getItem("userDetails")).userName);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/video/videocomment`, {
      videoId: id,
      token,
      comment,
    });
    setComment("");
    props.func();
  };

  const imageComment = async (e, id) => {
    e.preventDefault();
    if (!comment)
      setComment(JSON.parse(localStorage.getItem("userDetails")).userName);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/image/imagecomment`, {
      imageId: id,
      token,
      comment,
    });
    setComment("");
  };

  return (
    <div className="container border">
      <div className=" position-relative">
        <form>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label fw-bold">
              comment
            </label>
            <textarea
              className="form-control"
              id="comment"
              rows="2"
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className=" position-absolute top-50 end-0">
            {props.Mode === "video" ? (
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                onClick={(e) => videoComment(e, id)}
              >
                <i className="fa-regular fa-paper-plane"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                onClick={(e) => imageComment(e, id)}
              >
                <i className="fa-regular fa-paper-plane"></i>
              </button>
            )}
          </div>
        </form>
      </div>
      <div className=" overflow-scroll" style={{ height: "100px" }}>
        {props.comments.map((comment, index) => {
          return (
            <div
              key={index}
              className=" overflow-scroll border pt-2 mb-3 rounded ps-1 d-flex gap-3"
              style={{ height: "80px" }}
            >
              <img
                src={comment.image}
                alt={comment.image}
                className=" rounded-circle"
                style={{ width: "30px", height: "30px" }}
              />
              <div className=" d-flex flex-column">
                <p>{comment.userName}</p>
                <p className=" rounded border bg-body-secondary px-1 mb-3 me-3">
                  {comment.comment}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentBox;

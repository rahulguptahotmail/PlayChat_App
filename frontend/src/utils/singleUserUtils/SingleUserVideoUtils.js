import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommentBox from '../universalUtils/CommentBox';

const SingleUserVideo = ( props) => {
    const [items, setItems] = useState([]);
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
  
  
    useEffect(() => {
      const fetchVideos = async () => {
        const userId = props.userId;
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/v1/video/singleuserprofile/${userId}`
        );
        setItems(res.data.videos);
      };
  
      fetchVideos();
    }, [refresh]);
    return (
      <div className="pt-2 d-flex flex-wrap text-center border pb-4">
        {items.length < 1 ? (
          <div className=" w-100 m-auto">
            <h1 className=" w-100 mt-5">No Video Uploaded</h1>
          </div>
        ) : (
          ""
        )}
        {items.map((item, index) => (
          <div key={index} className=" mb-2 col-12 col-md-6 col-lg-4 col-xl-3">
            <div>
              <video
                src={item.videoPath}
                className=" rounded shadow b image-healing-animation"
                style={{ width: "85%", height: "180px" }}
                controls
              ></video>
            </div>
            <div className=" mx-4 rounded-pill d-flex justify-content-between bg-body-tertiary">
              <div className=" d-flex justify-content-start align-items-center">
                <div style={{ width: "35px", height: "35px" }}>
                  <img
                    src={props.userImage}
                    alt="thumbnail"
                    className=" ms-3 rounded-circle shadow "
                    style={{ width: "35px", height: "35px" }}
                  />
                </div>
                <h4
                  className=" overflow-hidden fs-6 text-start ms-4 py-2"
                  style={{ height: "50px" }}
                >
                  {item.title.length > 59
                    ? item.title.slice(0, 60) + "..."
                    : item.title + "."}
                </h4>
              </div>
            </div>
  
            <div className=" text-start mx-5 bg-body-tertiary rounded-bottom-3">
              <div className=" px-4 d-flex  justify-content-between align-items-start">
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
                <div className=" position-absolute z-3 bg-body-tertiary text-center shadow">
                  <CommentBox
                    id={item._id}
                    Mode="video"
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
}

export default SingleUserVideo
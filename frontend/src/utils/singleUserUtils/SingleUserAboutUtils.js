import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SingleUserAboutUtils = (props) => {
const [videoItems,setVideoItems] =useState([])
const [imageItems,setImageItems] =useState([])

  useEffect(() => {
    // video length
    const fetchVideosLength = async () => {
      const userId = props.userId;
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/video/singleuserprofile/${userId}`
      );
      setVideoItems(res.data.videos);
    };

    // image length
    const fetchImagesLength = async () => {
      const userId = props.userId;
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/image/singleuserprofile/${userId}`
      );
      setImageItems(res.data.images);
    };

    fetchImagesLength();


    fetchVideosLength();
  }, []);
  return (
    <div className=" ps-md-4 ms-md-5">
    <div className=" d-flex justify-content-center align-items-center">
      <div className=" bg-body-tertiary p-4 rounded shadow">
        <h3>
          {" "}
          Hello Mr.{" "}
          <span className=" text-warning fst-italic">{props.fullName}</span>
        </h3>
        <h3>
          You have Total <span className=" text-danger">{videoItems.length}</span>{" "}
          Video Uploaded
        </h3>
        <h3>
          You have Total <span className=" text-danger"> {imageItems.length}</span>{" "}
          Image Uploaded
        </h3>
        <h4>
          {props.fullName} Account CreatedAt :{" "}
          <span className=" text-info fw-bold fst-italic">
        {JSON.stringify(props.createdAt).slice(1,11)}
          </span>
        </h4>
      </div>
    </div>
  </div>
  )
}

export default SingleUserAboutUtils
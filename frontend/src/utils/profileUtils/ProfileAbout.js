import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileAbout = () => {
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);

  const createdAt = JSON.parse(localStorage.getItem("userDetails")).createdAt;

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/image/${token}`
      );
      setImages(res.data.images);
    };
    const fetchVideos = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/video/${token}`
      );
      setVideos(res.data.videos);
    };

    fetchVideos();

    fetchImages();
  }, []);
  return (
    <div className=" ps-md-4 ms-md-5">
      <div className=" d-flex justify-content-center align-items-center">
        <div className=" bg-body-tertiary p-4 rounded shadow">
          <h3>
            {" "}
            Hello Mr.{" "}
            <span className=" text-warning fst-italic">Rahul Gupta</span>
          </h3>
          <h3>
            You have Total <span className=" text-danger">{videos.length}</span>{" "}
            Video Uploaded
          </h3>
          <h3>
            You have Total <span className=" text-danger">{images.length}</span>{" "}
            Image Uploaded
          </h3>
          <h4>
            Your Account CreatedAt :{" "}
            <span className=" text-info fw-bold fst-italic">
              {createdAt.toString().slice(0, 10)}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;

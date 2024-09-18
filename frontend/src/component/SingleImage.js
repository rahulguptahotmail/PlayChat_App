import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const SingleImage = () => {
  useEffect(() => {
    const fetchImage = async () => {
      const imageId = window.location.pathname.split("/")[2];
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}api/v1/image/fetchsingleimage`, {
          params: { imageId },
        })
        .then((res) => {
          document.getElementById("singleimage").src = res.data.imageDetails.image.imagePath;
        });
    };

    fetchImage();
  }, []);
  return (
    <div className=" ms-md-4 ps-md-5 w-100 w-100 h-100 d-flex justify-content-center align-items-center">
      <div className=" position-relative mt-3 b w-75 rounded text-center">
        <Link
          to="/image"
          className=" position-absolute top-0 end-0 me-2 text-black fs-5 fw-bold text-capitalize"
          style={{ textDecoration: "none" }}
        >
          x
        </Link>
        <img
          src={require("../static/thumbnail.jpg")}
          alt="image"
          id="singleimage"
          className=" rounded shadow mx-4 my-4 w-75"
          style={{ maxHeight: "700px" }}
        />
      </div>
    </div>
  );
};

export default SingleImage;

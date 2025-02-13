import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import HomeVideo from "../utils/homeUtils/HomeVideo";

const Home = () => {
  const [items, setItems] = useState([]);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/video/videos`
      );
      loaderRef.current.classList.add("d-none");
      setItems(res.data.videos);
    };

    fetchVideos();
  }, []);

  return (
    <div
      id="homeVideos"
      className="d-flex flex-wrap ms-md-4 ps-md-5 pt-2 text-center border"
    >
      <div id="loader" className=" w-100 fw-bold p-3" ref={loaderRef}>
        <div className="loader m-auto"></div>
        Loading...
      </div>
      {items.map((item, idx) => (
        <HomeVideo index={idx} video={item} />
      ))}
    </div>
  );
};

export default Home;

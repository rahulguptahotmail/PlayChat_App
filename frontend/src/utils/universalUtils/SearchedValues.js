import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchedValues = (props) => {
  const [user, setUser] = useState({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const searchQuery = props.searchQuery;

    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/v1/video/search`, {
        params: {
          searchQuery,
        },
      });
      setUser(res.data.result.user);
      setVideos(res.data.result.videos);
    };

    fetchData();
  }, [props.searchQuery]);
  return (
    <div
      className=" bg-body-secondary position-absolute align-self-center rounded-bottom-3 shadow"
      style={{
        width: "60%",
        height: "300px",
        top: "8vh",
        left: "20%",
      }}
      onClick={() => {
        props.setSearchQuery("");
        props.setSearch(false);
      }}
    >
      <div className=" overflow-hidden">
        <ul>
          {user ? (
            <Link
              to={`/user/${user._id}`}
              className=" searched-element"
              style={{ textDecoration: "none" }}
            >
              <li
                className=" border mt-2 overflow-hidden rounded-bottom shadow me-2 px-2"
                style={{ height: "50px" }}
              >
                <div className=" d-flex justify-content-between align-items-center">
                  <img
                    src={user.image}
                    alt="user"
                    className=" p-1"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <p className=" text-black ps-1">{user.userName}</p>
                </div>
              </li>
            </Link>
          ) : (
            ""
          )}
          {videos.map((video, index) => (
            <Link
              key={index}
              to={`/video/${video._id}`}
              className="searched-element"
              style={{ textDecoration: "none" }}
            >
              <li
                className=" border mt-2 overflow-hidden rounded-bottom shadow me-2"
                style={{ height: "50px" }}
              >
                <div className=" d-flex justify-content-between">
                  <p className=" text-black ps-1">{video.title}</p>
                  <video
                    src={video.videoPath}
                    className=" shadow"
                    style={{ width: "70px", height: "50px" }}
                  ></video>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {!user && videos.length < 1 ? (
        <div className=" text-black text-center">
          <h1>Not Found</h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchedValues;

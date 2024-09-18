import React, { useEffect, useState } from "react";
import axios from "axios";

const Followers = () => {
  const [items, setItems] = useState([]);

  const followInfo = async (userId, index) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/follower/getuserfollowers`,
      { params: { userId } }
    );
    document.getElementById("followers" + index).innerText =
      res.data.Follow.followers.length;
    document.getElementById("followed" + index).innerText =
      res.data.Follow.followed.length;
  };
  useEffect(() => {
    const fetchFollowers = async () => {
      document.getElementById("loader").classList.remove("d-none");
      document.getElementById("noFollowers").classList.add("d-none");

      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/user/userfollowers`,
        { params: { token } }
      );
      setItems(res.data.followers);
      document.getElementById("loader").classList.add("d-none");
      document.getElementById("noFollowers").classList.remove("d-none");
    };

    fetchFollowers();
  }, []);
  return (
    <div className=" ms-md-4 ps-md-5 pt-3">
      <div id="loader" className=" d-flex justify-content-center d-none">
        <div className="loader"></div>
      </div>
      {items.length < 1 ? (
        <div id="noFollowers" className=" d-flex justify-content-center align-items-center w-100 h-100">
          <div>No Followers</div>
        </div>
      ) : (
        ""
      )}
      {items?.map((item, index) => (
        <div
          key={index}
          className="my-2 mx-2 rounded-5 overflow-hidden b shadow"
        >
          <div className="d-flex align-items-center py- w-100">
            <img
              src={item.image}
              alt={"logo"}
              className="rounded-circle ms-3"
              style={{ width: "120px", height: "120px" }}
            />

            <div className=" col-auto ms-3">
              <h2>{item.fullName}</h2>
              <p className=" fst-italic">{item.userName}</p>
              <p>
                <span
                  id={"followers" + index}
                  src={followInfo(item._id, index)}
                ></span>{" "}
                Followers
              </p>
              <p>
                <span id={"followed" + index}></span> Followed
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Followers;

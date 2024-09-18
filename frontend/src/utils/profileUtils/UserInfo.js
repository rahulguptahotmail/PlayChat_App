import React from "react";

const userInfo = (props) => {
  return (
    <div className="d-flex align-items-center py-3 b w-100">
      <img
        // src={require("../../static/Logo.png")}
        src={props.image}
        alt={"logo"}
        className="rounded-circle ms-3"
        style={{ width: "150px", height: "150px" }}
      />

      <div className=" col-auto ms-3">
        <h2>{props.fullName}</h2>
        <p>{props.userName}</p>
        <p>
          {props.followersInfo?.followers?.length
            ? props.followersInfo?.followers?.length
            : 0}{" "}
          Followers
        </p>
        <p>
          {props.followersInfo?.followed?.length
            ? props.followersInfo?.followed?.length
            : 0}{" "}
          Followed
        </p>
      </div>
    </div>
  );
};

export default userInfo;

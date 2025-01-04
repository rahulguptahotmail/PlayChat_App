import React from "react";

const ProfileAbout = () => {

  const createdAt = JSON.parse(localStorage.getItem("userDetails")).createdAt;

  
  return (
    <div className=" ps-md-4 ms-md-5">
      <div className=" d-flex justify-content-center align-items-center">
        <div className=" bg-body-tertiary p-4 rounded shadow">
          <h3>
            {" "}
            Hello Mr.{" "}
            <span className=" text-warning fst-italic">{JSON.parse(localStorage.getItem("userDetails")).fullName}</span>
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

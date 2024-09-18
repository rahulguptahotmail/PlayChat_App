import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VideoUpload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const File = event.target.files[0];
    if (File && File.type.startsWith("video/")) {
      setFile(File);
      setVideoPreviewUrl(URL.createObjectURL(File));
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) return setError("Please select a video file");
      setError("");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET_NAME); // Replace with your Cloudinary upload preset

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`, // Replace with your Cloudinary cloud name
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      // request submitting

      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}api/v1/video/upload`,
          {
            videoPath: response.data.url,
            title,
            description,
            tags,
            token: localStorage.getItem("token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          navigate("/");
        });
    } catch (error) {
      setError("Upload failed Because of Big File");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">Upload Your Video</h1>
      <div className="video-upload text-center mb-4">
        <label htmlFor="videoFile" className="btn btn-primary">
          Choose Video
        </label>
        <input
          type="file"
          id="videoFile"
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <p className="mt-2">Less than 100 mb of video</p>
      </div>

      {videoPreviewUrl && (
        <div className="video-preview mb-4 w-100 text-center">
          <video
            className=" rounded shadow"
            style={{
              width: "350px",
              height: "300px",
            }}
            controls
          >
            <source src={videoPreviewUrl} type={file.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <form>
        <div className="form-group">
          <label htmlFor="videoTitle">Title</label>
          <input
            type="text"
            className="form-control shadow border"
            id="videoTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="videoDescription">Description</label>
          <textarea
            className="form-control shadow border"
            id="videoDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoTags">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control shadow border"
            id="videoTags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter video tags"
          />
        </div>
        <div className=" text-danger mb-2 mt-2 ms-3">{error}</div>
        {uploadProgress > 0 && (
          <div className=" d-flex justify-content-center gap-2">
            <div>Upload Progress: {uploadProgress}%</div>
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary mb-5 mt-4 ms-3"
          onClick={(e) => handleSubmit(e)}
        >
          Upload Video
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;

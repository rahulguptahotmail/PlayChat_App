import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VideoUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const File = event.target.files[0];
    if (File && File.type.startsWith("image/")) {
      setFile(File)
      setImagePreviewUrl(URL.createObjectURL(File));
    } else {
      setError("Please select a valid Image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
    if (!file) return setError("Please select a image file");
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET_NAME); // Replace with your Cloudinary upload preset

    try {
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
          `${process.env.REACT_APP_BACKEND_URL}api/v1/image/upload`,
          {
            imagePath: response.data.url,
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
          navigate("/image");
        });
    } catch (error) {
      setError("Upload failed Because of Big File");
    }
  }catch(err){
    setError("Uploading failed try again")
  }
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">Upload Your Image</h1>
      <div className="image-upload text-center mb-4">
        <label htmlFor="imageFile" className="btn btn-primary">
          Choose Image
        </label>
        <input
          type="file"
          id="imageFile"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <p className="mt-2">
          Drag and drop a imgage file here or click to select one.
        </p>
      </div>

      {imagePreviewUrl && (
        <div className="image-preview mb-4 w-100 text-center">
          <img
            className=" rounded shadow"
            style={{
              width: "350px",
              height: "350px",
            }}
            src={imagePreviewUrl}
          />
        </div>
      )}

      <form>
        <div className="form-group">
          <label htmlFor="imageTitle">Title</label>
          <input
            type="text"
            className="form-control shadow border"
            id="imageTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="imageDescription">Description</label>
          <textarea
            className="form-control shadow border"
            id="imageDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter image description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageTags">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control shadow border"
            id="imageTags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter image tags"
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
          onClick={(e) => handleSubmit(e)}
          className="btn btn-primary mb-5 mt-4 ms-3"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;

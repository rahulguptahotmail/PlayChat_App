import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Profile from "./component/Profile";
import ImageUpload from "./component/ImageUpload";
import VideoUpload from "./component/VideoUpload";
import Login from "./component/Login";
import Register from "./component/Register";
import Images from "./component/Images";
import Setting from "./component/Setting";
import Support from "./component/Support";
import About from "./component/About";
import { useEffect } from "react";
import PageNotFound from "./component/PageNotFound";
import axios from "axios";
import ForgotPassword from "./component/ForgotPassword";
import SingleVideo from "./component/SingleVideo";
import SingleUserProfile from "./component/SingleUserProfile";
import SingleImage from "./component/SingleImage";
import Followers from "./component/Followers";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const authentication = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}api/v1/user/authentication`, {
          params: { token },
        })
        .then((res) => {
          const userDetails = res.data.userDetails;
          if (
            !(
              localStorage.getItem("userDetails") ===
              JSON.stringify(userDetails)
            )
          ) {
            localStorage.removeItem("userDetails");
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
          }
        })
        .catch((err) => {
          navigate("/login");
        });
    };

    authentication();
  }, [window.location.pathname]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/image" element={<Images />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/support" element={<Support />} />
        <Route path="/imageupload" element={<ImageUpload />} />
        <Route path="/videoupload" element={<VideoUpload />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/about" element={<About />} />
        <Route path="/video/:videoid" element={<SingleVideo />} />
        <Route path="/image/:imageid" element={<SingleImage />} />
        <Route path="/user/:userid" element={<SingleUserProfile />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

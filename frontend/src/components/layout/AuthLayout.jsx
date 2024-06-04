import React from "react";
import { Outlet } from "react-router-dom";
import image from "../../assets/images/authbg.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-[100vh] "
      style={{
        backgroundImage: `url(${image})` /* Center and scale the image nicely */,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center mb-4 md:mb-0">
        <span className="ml-3 text-6xl text-indigo-500 font-bold">
          TODO APP
        </span>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

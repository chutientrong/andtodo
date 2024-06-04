import React from "react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import { Outlet } from "react-router-dom";


const HomeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div
        className=" w-screen flex container mx-auto"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <div className="w-[220px]">
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-center h-full"><Outlet /></div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;

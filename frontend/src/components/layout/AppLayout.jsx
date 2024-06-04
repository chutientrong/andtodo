import React from "react";
import { Toaster } from "react-hot-toast";

const AppLayout = ({ children }) => {
  return (
    <div className="bg-white">
      <Toaster position="top-right" gutter={8} />
      {children}
    </div>
  );
};

export default AppLayout;

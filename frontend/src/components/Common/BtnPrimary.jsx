import React from "react";

const BtnPrimary = (props) => {
  return (
    <button
      {...props}
      className={`text-indigo-50 bg-indigo-500 text-sm px-4 py-2 border border-indigo-500 rounded-md hover:bg-indigo-600/90 transition-colors ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default BtnPrimary;

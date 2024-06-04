import React from "react";

const Input = (props) => {
  return (
    <input
      {...props}
      className="border border-gray-300 rounded-md w-full text-sm py-2.5 px-2.5 focus:border-indigo-500 focus:outline-offset-1 focus:outline-indigo-400"
    />
  );
};

export default Input;

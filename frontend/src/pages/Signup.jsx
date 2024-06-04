import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../apis/authApi";
import { routes } from "../router";
import BtnPrimary from "../components/Common/BtnPrimary";
import Input from "../components/Common/Input";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    submitdata();
    setForm({
      name: "",
      email: "",
      password: "",
    });
  };
  const submitdata = async () => {
    try {
      const response = await authApi.signup(form);
      if (response.status === 201) {
        toast.success(response.data.data.message);
        setTimeout(() => {
          navigate(routes.LOGIN);
        }, 1000);
      } else {
        toast.error(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-md p-12 space-y-4 text-center bg-gray-50 text-gray-800 mx-auto my-6  rounded-lg">
      <h1 className="text-3xl font-semibold">Sign up to your account</h1>
      <form
        onSubmit={handleSubmit}
        noValidate=""
        className="space-y-4 ng-untouched ng-pristine ng-valid"
      >
        <div className="flex flex-col space-y-5 ">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <Input
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            id="name"
            type="name"
            placeholder="Name"
          />
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <Input
            required
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            id="email"
            type="email"
            placeholder="Email address"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Input
            required
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center gap-2">
          Already have an account?
          <Link
            to={routes.LOGIN}
            relative="path"
            className="cursor-pointer text-blue-800 text-sm font-bold"
          >
            {" "}
            Login
          </Link>
        </div>
        <BtnPrimary type="submit" className="w-full">
          Sign up
        </BtnPrimary>
        {/* <button
          type="submit"
          className="px-8 py-3 space-x-2 font-semibold rounded bg-indigo-600 text-gray-50"
        >
         
        </button> */}
      </form>
    </div>
  );
};

export default Signup;

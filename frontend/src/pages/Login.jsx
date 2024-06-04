import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../apis/authApi";
import { routes } from "../router";
import Input from "../components/Common/Input";
import BtnPrimary from "../components/Common/BtnPrimary";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    submitdata();
    setForm({
      email: "",
      password: "",
    });
  };
  const submitdata = async () => {
    try {
      const response = await authApi.login(form);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        toast.success("Login successfull");
        setTimeout(() => {
          navigate(routes.HOMEPAGE);
        }, 1000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("user not exist");
    }
  };
  return (
    <div className="flex flex-col w-full max-w-md p-12 space-y-4 text-center bg-gray-50 text-gray-800 mx-auto my-6   rounded-lg">
      <h1 className="text-3xl font-semibold">Login to your account</h1>
      <form
        onSubmit={handleSubmit}
        noValidate=""
        className="space-y-4 ng-untouched ng-pristine ng-valid "
      >
        <div className="flex flex-col space-y-5 ">
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
          Don't have an account?
          <Link
            to={routes.SIGNUP}
            relative="path"
            className="cursor-pointer text-blue-800 text-sm  font-bold"
          >
            {" "}
            Signup
          </Link>
        </div>

        <BtnPrimary type="submit" className="w-full">
          Log in
        </BtnPrimary>
      </form>
    </div>
  );
};

export default Login;

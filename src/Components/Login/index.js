import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/features/auth/actions";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const onSubmit = async (data) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    dispatch(login(formData))
      .then((data) => {
        console.log("ini data", data);
        if (data !== null && data.role === "admin") {
          navigate("/dashboard");
        } else if (data !== null && data.role === "adminMitra") {
          navigate("/booking");
        }
      })
      .catch((error) => {
        setLoading(false);
        navigate("/login");
      });
  };

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <div>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            {...register("username", {
              required: "Username harus di isi!",
              maxLength: {
                value: 100,
                message: "Maksimal karakter password adalah 100",
              },
              minLength: {
                value: 6,
                message: "Password minimal 6 karakter",
              },
            })}
            placeholder="Enter Username"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          />
          {errors.username && (
            <p style={{ color: "#bf1650" }}>{errors.username.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Password</label>
          <input
            {...register("password", {
              required: "Password harus di isi!",
              maxLength: {
                value: 500,
                message: "Maksimal karakter password adalah 500",
              },
              minLength: {
                value: 6,
                message: "Password minimal 6 karakter",
              },
            })}
            type="password"
            placeholder="Enter Password"
            minLength={6}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
          />
          {errors.password && (
            <p style={{ color: "#bf1650" }}>{errors.password.message}</p>
          )}
        </div>
        <div className="text-right mt-2">
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
          >
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
        >
          {loading ? (
            <BiLoader className="text-white animate-spin  text-2xl mx-auto" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;

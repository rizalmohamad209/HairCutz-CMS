import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/features/auth/actions";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    dispatch(login(formData))
      .then((data) => {
        if (data !== null && data.role === "admin") {
          navigate("/");
          window.location.reload();
        } else if (data !== null && data.role === "adminMitra") {
          navigate("/booking");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
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
          {errors.password && (
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
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;

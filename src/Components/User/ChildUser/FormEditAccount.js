import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { getDetailUser, updateUser } from "../../../Services/auth-services";

const FormEditAccount = () => {
  const [partner, setPartner] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: partner });

  const onSubmit = (data) => {
    console.log(data);
    let formData = new FormData();
    let role = "adminMitra";
    formData.append("nama_user", data.nama_user);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", role);
    formData.append("no_hp", data.no_hp);
    formData.append("gender", data.gender);
    console.log(data);
    updateUser(formData)
      .then((data) => {
        if (data.data.status === 200) {
          alert("Berhasil Update Akun");
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("Username or Email is already exists");
        }
        // swal("Error!", , "error");
      });
  };

  useEffect(() => {
    getDetailUser().then((data) => {
      setPartner(data.data.data);
      reset(data.data.data);
    });
  }, [reset]);
  return (
    <div className="ml-64">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white drop-shadow-lg px-4 py-4"
      >
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          User Information
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlfor="grid-password"
              >
                Username
              </label>

              <input
                {...register("username")}
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm drop-shadow-md  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlfor="grid-password"
              >
                No Hp
              </label>
              <input
                {...register("no_hp")}
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm drop-shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlfor="grid-password"
              >
                Full Names
              </label>
              <input
                {...register("nama_user")}
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm drop-shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlfor="grid-password"
              >
                Gender
              </label>
              <input
                {...register("gender")}
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm drop-shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>
        <hr className="mt-6 border-b-1 border-blueGray-300" />
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Account Information
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlfor="grid-password"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm drop-shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlfor="grid-password"
              >
                Password
              </label>
              <input
                {...register("password")}
                autoComplete="on"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm drop-shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="masukan password baru anda"
              />
            </div>
          </div>
        </div>
        <div class="px-5 py-4 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditAccount;

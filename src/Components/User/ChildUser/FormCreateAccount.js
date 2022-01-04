import React from "react";
import { useForm } from "react-hook-form";
import { signUpService } from "../../../Services/auth-services";

const FormCreateAccountComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("nama_user", data.nama_user);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("no_hp", data.no_hp);
    formData.append("gender", data.gender);
    console.log(data);
    signUpService(formData)
      .then((data) => {
        if (data.data.status === 200) {
          alert("Berhasil Membuat Akun");
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("Username or Email is already exists");
        }
        // swal("Error!", , "error");
      });

    //    dispatch(postMitra(formData));
  };
  return (
    <div class="mt-5 ml-64 md:mt-0 md:col-span-2 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-7 py-8 bg-gray-200 sm:p-6 ">
            <div class="grid grid-cols-6 gap-6 px-7 py-7">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="first-name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  {...register("nama_user")}
                  type="text"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="last-name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  {...register("username")}
                  type="text"
                  class="mt-1 focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="email-address"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  {...register("email", {
                    required: "email harus di isi!",
                    maxLength: {
                      value: 500,
                      message: "Maksimal karakter email adalah 500",
                    },
                    pattern: {
                      value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/,
                      message: "Email tidak valid",
                    },
                  })}
                  type="text"
                  class="mt-1 focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div class="col-span-6 sm:col-span-3 ">
                <label
                  for="city"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  class="mt-1 focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="country"
                  class="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  {...register("gender")}
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>male</option>
                  <option>female</option>
                </select>
              </div>

              <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                <label
                  for="region"
                  class="block text-sm font-medium text-gray-700"
                >
                  No Hp
                </label>
                <input
                  {...register("no_hp")}
                  type="text"
                  class="mt-1 focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />

                <input
                  {...register("role")}
                  type="hidden"
                  value="adminMitra"
                  class="mt-1 focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreateAccountComponent;

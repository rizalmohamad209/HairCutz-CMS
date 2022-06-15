import React from "react";
import { useForm } from "react-hook-form";
import { postPartner } from "../../../Services/partner-service";
import { useNavigate } from 'react-router-dom'


const FormCreatePartnerComponent = () => {
  const navigate = useNavigate()

  const [preview, setPreview] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState();
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const id_mitra = JSON.parse(localStorage.getItem("id_mitra"));
    let newImage = data.image[0];


    let formData = new FormData();
    formData.append("image", newImage);

    formData.append("user_id", id_mitra);
    formData.append("nama_mitra", data.nama_mitra);
    formData.append("alamat_mitra", data.alamat_mitra);
    formData.append("jmlh_tukangCukur", data.jmlh_tukangCukur);

    postPartner(formData)
      .then((data) => {
        if (data.data.status === 200) {
          alert("Berhasil Membuat Mitra");
          navigate("/partner");
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("Username or Email is already exists");
        }

      });
  };


  const onSelectFile = (e) => {
    if (e.target.files[0]) {

      setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div className="ml-64">
      <form>
        <div class="md:flex items-center gap-3">
          <div class="w-full md:w-1/3 flex flex-col">
            <label class="font-semibold leading-none">Nama Mitra</label>
            <input
              {...register("nama_mitra")}
              class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
          </div>
          <div class="w-full md:w-1/3 flex flex-col  md:mt-0 mt-4">
            <label class="font-semibold leading-none">Kota</label>
            <input
              {...register("alamat_mitra")}
              class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
          </div>
          <div class="w-full md:w-1/3 flex flex-col">
            <label class="font-semibold leading-none">
              Jumlah Tukang Cukur
            </label>
            <input
              {...register("jmlh_tukangCukur")}
              class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
          </div>
        </div>
        <div class="md:flex items-center mt-8">
          <div class="w-full flex flex-col">
            <label class="font-semibold leading-none mb-5">Upload Image</label>
            <div class="flex items-center justify-center w-full">
              <label class="flex flex-col w-full h-auto border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div class="flex flex-col items-center justify-center pt-7">
                  {preview === null ? (
                    <>
                      {" "}
                      <img
                        className="w-24 h-20"
                        src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1640608958/upload_hzzrnu.png"
                        alt=""
                      />
                    </>
                  ) : (
                    <>
                      <img src={preview} alt="" className="w-24 h-20" />
                    </>
                  )}

                  <p class="px-2 py-3 rounded-xl text-sm tracking-wider text-white bg-blue-700  group-hover:text-gray-600">
                    Choose Image
                  </p>
                </div>
                <input
                  type="file"
                  class="opacity-0"
                  {...register("image")}
                  onChange={onSelectFile}
                />
              </label>
            </div>
          </div>
        </div>
        <div>

        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCreatePartnerComponent;

import React, { useEffect, useState } from "react";
import MapMitra from "../../Mapmitra/index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { detailMitra, updatePartner } from "../../../Services/partner-service";

const FormEditPartnerComponent = () => {
  let navigate = useNavigate();
  const [latLong, setLatLong] = React.useState(null);
  const [selectedFile, setselectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [partner, setPartner] = React.useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: partner });

  function handleLatLong(latlong) {
    setLatLong(latlong);
  }
  const onSubmit = (data) => {
    let newImage = data.image[0];
    let lat = latLong[1];
    let long = latLong[0];
    console.log(newImage);
    console.log("ini form data update mitra", data);
    let formData = new FormData();
    formData.append("image", newImage);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("jmlh_tukangCukur", data.jmlh_tukangCukur);
    formData.append("nama_mitra", data.nama_mitra);
    formData.append("alamat_mitra", data.alamat_mitra);
    updatePartner(formData)
      .then((data) => {
        if (data.data.status === 200) {
          alert("Berhasil Update Mitra");
          navigate("/dashboard-mitra");
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("Failed Update Mitra");
        }
      });
  };

  useEffect(() => {
    detailMitra().then((data) => {
      setPartner(data.data.data);
      reset(data.data.data);
    });
  }, [reset]);

  const onSelectFile = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setselectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div className="ml-64">
      <form className="bg-white shadow-2xl px-4 py-4">
        <div class="md:flex items-center gap-3">
          <div class="w-full md:w-1/3 flex flex-col">
            <label class="font-semibold leading-none">Nama Mitra</label>
            <input
              {...register("nama_mitra")}
              defaultValue={partner.nama_mitra}
              class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
          </div>
          <div class="w-full md:w-1/3 flex flex-col  md:mt-0 mt-4">
            <label class="font-semibold leading-none">Kota</label>
            <input
              {...register("alamat_mitra")}
              defaultValue={partner.alamat_mitra}
              class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
          </div>
          <div class="w-full md:w-1/3 flex flex-col">
            <label class="font-semibold leading-none">
              Jumlah Tukang Cukur
            </label>
            <input
              {...register("jmlh_tukangCukur")}
              defaultValue={partner.jmlh_tukangCukur}
              class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
          </div>
        </div>
        <div class="md:flex items-center mt-8">
          <div class="w-full flex flex-col">
            <label class="font-semibold leading-none mb-5">Upload Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {preview === null ? (
                  <>
                    <img src={partner.image} className="w-80 h-50" alt="" />
                  </>
                ) : (
                  <>
                    <img src={preview} alt="" className="w-80 h-50" />
                  </>
                )}

                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      {...register("image")}
                      onChange={onSelectFile}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="w-full flex flex-col mt-8 ">
            <label class="font-semibold leading-none mb-5">Location</label>
            <MapMitra
              handleLatLong={handleLatLong}
              dataLat={partner.lat}
              dataLong={partner.long}
            />
          </div>
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditPartnerComponent;

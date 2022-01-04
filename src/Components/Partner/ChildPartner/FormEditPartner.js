import React from "react";
import { useLocation } from "react-router-dom";
import MapMitra from "../../Mapmitra/index";
import { useForm } from "react-hook-form";
import { getDetailPartner } from "../../../Services/partner-service";
import { signUpService } from "../../../Services/auth-services";

const FormEditPartnerComponent = () => {
  const location = useLocation();
  const partnerId = location.state.partnerId;
  const [latLong, setLatLong] = React.useState(null);
  const [selectedFile, setselectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [partner, setPartner] = React.useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    const getDetailUser = () => {
      getDetailPartner(partnerId)
        .then((data) => {
          setPartner(data.data.data);
        })
        .catch((error) => {
          console.log("Error ", error);
        });
    };
    getDetailUser();
  }, []);
  console.log(partnerId);
  function handleLatLong(latlong) {
    setLatLong(latlong);
  }
  const onSubmit = (data) => {
    let id = data.id;
    let newImage = data.image[0];
    let lat = latLong[1];
    let long = latLong[0];
    console.log(newImage);
    let formData = new FormData();
    formData.append("image", newImage);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("nama_mitra", data.nama_mitra);
    formData.append("alamat", data.alamat);

    reset();
  };

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
      <form>
        <div class="md:flex items-center">
          <div class="w-full md:w-1/2 flex flex-col">
            <label class="font-semibold leading-none">Nama Mitra</label>
            <input
              {...register("nama_mitra")}
              defaultValue={partner.nama_mitra}
              class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
          </div>
          <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
            <label class="font-semibold leading-none">Kota</label>
            <input
              {...register("alamat")}
              defaultValue={partner.alamat_mitra}
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
                      <img className="w-24 h-20" src={partner.image} alt="" />
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
          <div class="w-full flex flex-col mt-8 ">
            <label class="font-semibold leading-none mb-5">Alamat</label>
            <MapMitra
              handleLatLong={handleLatLong}
              dataLat={partner.lat}
              dataLong={partner.long}
            />
          </div>
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

export default FormEditPartnerComponent;

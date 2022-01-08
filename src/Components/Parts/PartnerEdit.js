import React from "react";
import { BiUser, BiCut } from "react-icons/bi";
import { Link } from "react-router-dom";
const PartnerEditComponent = () => {
  return (
    <div className="ml-64 px-5 py-5">
      <div className="w-auto bg-white shadow-lg rounded-lg flex flex-col px-4 py-5">
        <h1 className="font-medium text-2xl border-b border-gray-400 px-4 py-4">
          Lihat/Edit Profil
        </h1>
        <div className="px-4 py-4">
          <Link to="/edit-account-partner">
            <h1 className="text-black font-medium text-xl mb-5 flex flex-wrap items-center ">
              {" "}
              <BiUser />
              Data Admin
            </h1>
          </Link>
          <Link to="/partner-edit">
            <h1 className="text-black font-medium text-xl flex-wrap flex items-center">
              {" "}
              <BiCut />
              Data Barber
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerEditComponent;

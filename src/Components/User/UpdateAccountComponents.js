import React from "react";
import FormEditAccount from "./ChildUser/FormEditAccount";

const UpdateAccountComponents = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-5 mb-5 ml-64">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-medium font-poppins mb-1">Account</div>
            <div className="text-sm">Edit Account</div>
          </div>
        </div>
      </div>
      <div className="">
        <div className=" bg-white rounded-md p-5  h-auto">
          <FormEditAccount />
        </div>
      </div>
    </div>
  );
};

export default UpdateAccountComponents;

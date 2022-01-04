import React from "react";
import FormCreateAccountComponent from "./ChildUser/FormCreateAccount";

const CreateAccountComponent = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="mt-5 mb-5 ml-64">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                Account Partner
              </div>
              <div className="text-sm">Create Account Partner</div>
            </div>
          </div>
        </div>
        <div className=" px-5">
          <div className=" bg-white rounded-md p-5  h-auto">
            <FormCreateAccountComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccountComponent;

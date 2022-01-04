import React from "react";
import FormCreatePartnerComponent from "./ChildPartner/FormCreatePartner";

const CreateNewPartnerComponent = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="mt-5 mb-5 ml-64">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                Partner
              </div>
              <div className="text-sm">Create Partner</div>
            </div>
          </div>
        </div>
        <div className=" px-5">
          <div className=" bg-white rounded-md p-5  h-auto">
            <FormCreatePartnerComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewPartnerComponent;

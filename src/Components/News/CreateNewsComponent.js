import React from "react";
import FormCreateNewsComponent from "./ChildNews/FormCreateNews";

const CreateNewsComponent = () => {
  return (
    <div className=" ml-64">
      <div className="mt-5 mb-5 px-10 ">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-medium font-poppins mb-1">News</div>
            <div className="text-sm">Create News</div>
          </div>
        </div>
      </div>
      <div className=" px-5 ">
        <div className=" bg-white rounded-md p-5 w-full  h-auto">
          <FormCreateNewsComponent />
        </div>
      </div>
    </div>
  );
};

export default CreateNewsComponent;

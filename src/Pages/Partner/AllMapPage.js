import React from "react";
import AllMapComponent from "../../Components/Mapmitra/allMap";

const AllMapPage = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="mt-5 mb-5 ml-64">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                Map Partner
              </div>
              <div className="text-sm mb-10">All Scattered Partners</div>
            </div>
          </div>
          <AllMapComponent />
        </div>
      </div>
    </div>
  );
};

export default AllMapPage;

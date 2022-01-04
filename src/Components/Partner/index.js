import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getAllPartner } from "../../Services/partner-service";

const PartnerComponent = () => {
  const [partner, setPartner] = useState([]);
  const navigate = useNavigate();
  const handleDetailUser = (e) => {
    console.log(e.target.id);
    navigate("/partner-edit", {
      state: {
        partnerId: e.target.id,
      },
    });
  };

  useEffect(() => {
    getAllPartner().then((data) => {
      setPartner(data.data.data);
    });
  }, []);
  const columns = [
    {
      name: "Nama Mitra",
      selector: "nama_mitra",
      sortable: true,
    },
    {
      name: "Kota",
      selector: "alamat_mitra",
      sortable: true,
    },
    {
      name: "Opsi",
      selector: "id_mitra",
      cell: (state) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleDetailUser}
            className="bg-yellow-300 font-bold py-2 px-4 rounded"
            id={state.id}
          >
            Edit
          </button>
          <button
            className="bg-red-500 font-bold py-2 px-4 rounded text-white"
            id={state.id}
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  const handleCreateNewUser = () => {
    navigate("/create-partner");
  };
  return (
    <div className="mx-auto ml-64 px-4 py-4">
      <div className="mt-10 px-1 w-64">
        <button
          onClick={handleCreateNewUser}
          className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-700 w-full"
        >
          Create Mitra
        </button>
      </div>

      <div className="border  bg-white rounded-md p-5 w-auto h-auto shadow-md mt-5">
        <DataTable
          title="Partners Data"
          columns={columns}
          data={partner}
          noDataComponent="No Available Data"
          defaultSortField="squads_name"
          pagination
          customStyles={customStyles}
          className="border-2 rounded shadow"
        />
      </div>
    </div>
  );
};

const customStyles = {
  headCells: {
    style: {
      fontWeigth: "bold",
      fontSize: "16px",
      textAlign: "center",
      textTransform: "uppercase",
      background: "#F9FAFB",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

export default PartnerComponent;

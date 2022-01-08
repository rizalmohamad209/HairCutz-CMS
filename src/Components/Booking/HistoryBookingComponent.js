import React, { useState, useEffect } from "react";
import { getBooking } from "../../Services/booking-services";

import DataTable from "react-data-table-component";

const HistoryBookingComponent = () => {
  const [timer, setTimer] = React.useState(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [booking, setBooking] = useState([]);
  console.log(booking);

  const getDataBooking = () => {
    getBooking().then((data) => {
      setBooking(data.data.data);
    });
    clearTimeout(timer);
    setTimer(setTimeout(getDataBooking, 2000));
  };

  useEffect(() => {
    if (!isMounted) {
      getDataBooking();
      setIsMounted(true);
    }
  }, []);

  let selesai = booking.filter((e) => {
    return e.status === "selesai";
  });
  const columns = [
    {
      name: "User Name",
      selector: "nama_user",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Status",
      selector: "id_mitra",
      cell: (state) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className="bg-green-500 font-bold py-2 px-4 rounded text-white"
            id={state.id}
          >
            Done
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="mx-auto ml-64 px-4 py-4">
        <div className="mt-10 px-1 text-2xl font-medium w-64">History</div>
        <div className="border  bg-white rounded-md p-5 w-auto h-auto shadow-md mt-10">
          <DataTable
            title="History "
            columns={columns}
            data={selesai}
            noDataComponent="No Available Data"
            defaultSortField="squads_name"
            pagination
            customStyles={customStyles}
            className="border-2 rounded shadow"
          />
        </div>
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
      background: "#017AFF",
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

export default HistoryBookingComponent;

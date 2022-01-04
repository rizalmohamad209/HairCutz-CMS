import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getBooking } from "../../Services/booking-services";

const BookingComponent = () => {
  const [booking, setBooking] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleStatusBook = (e) => {
    // console.log(e.target.id);
    // navigate("/partner-edit", {
    //   state: {
    //     partnerId: e.target.id,
    //   },
    // });
  };
  let today = new Date();
  console.log(booking);
  let date =
    today.getFullYear() +
    "-" +
    ("0" + today.getMonth() + 1).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  // let waitingListToday = useCallback(() => {
  //   booking.filter((e) => {
  //     return e.date === date;
  //   });
  // });

  useEffect(() => {
    getBooking().then((data) => {
      setBooking(data.data.data);
      setLoading(true);
    });
  }, []);

  // console.log(waitingListToday);
  // useEffect(() => {
  //   let waitingListToday = booking.filter((e) => {
  //     return e.date === date;
  //   });
  //   setWaiting(waitingListToday);
  // }, []);

  const columns = [
    {
      name: "Nama User",
      selector: "nama_user",
      sortable: true,
    },
    {
      name: "No Urut",
      selector: "no_urut",
      sortable: true,
    },
    {
      name: "Kota",
      selector: "alamat_mitra",
      sortable: true,
    },
    {
      name: "Updte Status",
      selector: "id_mitra",
      cell: (state) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className="bg-red-500 font-bold py-2 px-4 rounded text-white"
            id={state.id}
          >
            Update To Process
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="mx-auto ml-64 px-4 py-4">
      <div className="mt-10 px-1 w-64">Waiting</div>
      <div className="border  bg-white rounded-md p-5 w-auto h-auto shadow-md mt-5">
        <DataTable
          title="Waiting List Today"
          columns={columns}
          data={booking}
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

export default BookingComponent;

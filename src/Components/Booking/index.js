import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getBooking, updateStatus } from "../../Services/booking-services";

const BookingComponent = () => {
  const [timer, setTimer] = React.useState(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [booking, setBooking] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const handleStatusBookProses = (e) => {
    let status = "proses";
    let formData = new FormData();
    formData.append("status", status);

    updateStatus(e.target.id, formData).then((data) => {
      if (data.data.status === 200) {
        alert("berhasil update status");
        setRefresh((oldKey) => oldKey + 1);
      }
    });
  };

  const handleStatusBookSelesai = (e) => {
    let status = "Done";
    let formData = new FormData();
    formData.append("status", status);

    updateStatus(e.target.id, formData).then((data) => {
      if (data.data.status === 200) {
        alert("berhasil update status");
        setRefresh((oldKey) => oldKey + 1);
      }
    });
  };
  let today = new Date();

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
  console.log(date);

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

  let waitingListToday = booking.filter((e) => {
    let status = "menunggu";
    return e.status === status && e.date === date;
  });

  console.log("waitingListToday", waitingListToday);

  let proses = booking.filter((e) => {
    return e.date === date && e.status === "proses";
  });

  let selesai = booking.filter((e) => {
    return e.date === date && e.status === "selesai";
  });

  console.log("ini booking", booking);

  // console.log(waitingListToday);
  // useEffect(() => {
  //   let waitingListToday = booking.filter((e) => {
  //     return e.date === date;
  //   });
  //   setWaiting(waitingListToday);
  // }, []);

  const columns = [
    {
      name: "User Name",
      selector: "nama_user",
      sortable: true,
    },
    {
      name: "Queues",
      selector: "no_urut",
      sortable: true,
    },
    {
      name: "Address",
      selector: "alamat_mitra",
      sortable: true,
    },
    {
      name: "Updte Status",
      selector: "id_mitra",
      cell: (state) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleStatusBookProses}
            className="bg-red-500 font-bold py-2 px-4 rounded text-white"
            id={state.id}
          >
            Update To Process
          </button>
        </div>
      ),
    },
  ];

  const columnsSelesai = [
    {
      name: "User Name",
      selector: "nama_user",
      sortable: true,
    },
    {
      name: "Queues",
      selector: "no_urut",
      sortable: true,
    },
    {
      name: "address",
      selector: "alamat_mitra",
      sortable: true,
    },
    {
      name: "Status",
      selector: "id_mitra",
      cell: (state) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className="bg-green-600 font-bold py-2 px-4 rounded text-white"
            id={state.id}
          >
            Done
          </button>
        </div>
      ),
    },
  ];
  const columnsProcess = [
    {
      name: "User Name",
      selector: "nama_user",
      sortable: true,
    },
    {
      name: "Queues",
      selector: "no_urut",
      sortable: true,
    },
    {
      name: "Address",
      selector: "alamat_mitra",
      sortable: true,
    },
    {
      name: "Updte Status",
      selector: "id_mitra",
      cell: (state) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleStatusBookSelesai}
            className="bg-blue-500 font-bold py-2 px-4 rounded text-white"
            id={state.id}
          >
            Update To Done
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="mx-auto ml-64 px-4 py-4">
      <div className="mt-10 px-1 text-2xl font-medium w-64">Data Booking</div>

      <div className="border  bg-white rounded-md p-5 w-auto h-auto shadow-md mt-5">
        <DataTable
          title="Process"
          columns={columnsProcess}
          data={proses}
          noDataComponent="No Available Data"
          defaultSortField="squads_name"
          pagination
          customStyles={customStyles}
          className="border-2 rounded shadow"
        />
      </div>
      <div className="border  bg-white rounded-md p-5 w-auto h-auto shadow-md mt-10">
        <DataTable
          title="Waiting List "
          columns={columns}
          data={waitingListToday}
          noDataComponent="No Available Data"
          defaultSortField="squads_name"
          pagination
          customStyles={customStyles}
          className="border-2 rounded shadow"
        />
      </div>
      <div className="border  bg-white rounded-md p-5 w-auto h-auto shadow-md mt-10">
        <DataTable
          title="Done"
          columns={columnsSelesai}
          data={selesai}
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

export default BookingComponent;

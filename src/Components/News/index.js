import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { deleteNews, getAllNews } from "../../Services/news-services";

const NewsComponent = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getAllNews().then((data) => {
      setNews(data.data.data);
    });
  }, [refresh]);
  const handleEditNews = (e) => {
    console.log(e.target.id);
    navigate("/news-edit", {
      state: {
        newsId: e.target.id,
      },
    });
  };

  const handleDeleteNews = (e) => {
    if (window.confirm("Are you sure you want to delete this data>")) {
      deleteNews(e.target.id)
        .then((data) => {
          if (data.data.status === 200) {
            alert("Sukses hapus data");
            setRefresh((oldKey) => oldKey + 1);
          }
        })
        .catch((error) => {
          console.log(error);
          // swal("Error!", error.response.data.error, "error");
        });
    } else {
      return;
    }
  };
  const columns = [
    {
      name: "News Title",
      selector: "title",
      sortable: true,
    },

    {
      name: "Options",
      selector: "id_news",
      cell: (state) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleEditNews}
            className="bg-blue-600 font-bold py-2 px-4 rounded text-white"
            id={state.id_news}
          >
            Update
          </button>
          <button
            onClick={handleDeleteNews}
            className="bg-red-500 font-bold py-2 px-4 rounded text-white"
            id={state.id_news}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleCreateNewNews = () => {
    navigate("/create-news");
  };
  return (
    <div>
      <div className="mx-auto ml-64 px-4 py-4">
        <div className="mt-5 mb-5 ">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">News</div>
            </div>
          </div>
        </div>
        <div className=" px-1 w-40">
          <button
            onClick={handleCreateNewNews}
            className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-700 w-full"
          >
            Create News
          </button>
        </div>
        <div className="border  bg-white rounded-md p-5 w-auto h-auto shadow-md mt-5">
          <DataTable
            title="News"
            columns={columns}
            data={news}
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

export default NewsComponent;

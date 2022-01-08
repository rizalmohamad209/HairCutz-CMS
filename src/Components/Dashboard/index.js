import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import PieChart from "../PieChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "2020",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "2019",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const DashboardComponent = () => {
  return (
    <div>
      <div class="container mx-auto">
        <div className="ml-64 mt-5 mb-5">
          <div className="container mx-auto">
            <div className="flex">
              <h1 className="text-black text-2xl ">Dashboard Admin</h1>
            </div>
          </div>
        </div>
        <div className="ml-64 ">
          <div className="gap-4 flex">
            <div className="bg-white border-opacity-75 px-5 shadow-2xl border-black w-1/3 rounded-lg h-40 mt-5">
              <div className="bg-purple-700 rounded-xl shadow-inner border-opacity-60 border-black -mt-5">
                <h1 className="text-center py-5 font-bold">Active Users</h1>
              </div>
              <h1 className="text-center py-6 text-4xl font-extrabold">200</h1>
            </div>
            <div className="bg-white border-opacity-75 px-5 shadow-2xl w-1/3 rounded-lg h-40 mt-5">
              <div className="bg-yellow-300 rounded-xl shadow-inner border-opacity-60 border-black -mt-5">
                <h1 className="text-center py-5 font-bold">Partners</h1>
              </div>
              <h1 className="text-center py-6 text-4xl font-extrabold">30</h1>
            </div>
            <div className="bg-white border-opacity-75 px-5 shadow-2xl w-1/3 rounded-lg h-40 mt-5">
              <div className="bg-green-400 rounded-xl shadow-inner border-opacity-60 border-black -mt-5">
                <h1 className="text-center py-5 font-bold">Published News</h1>
              </div>
              <h1 className="text-center py-6 text-4xl font-extrabold">10</h1>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <div className="bg-white w-2/3 shadow-2xl h-auto rounded-lg px-3 ">
              <h1 className="text-center py-5 font-bold">Partners</h1>
              <Line options={options} data={data} />
            </div>
            <div className="bg-white shadow-2xl w-1/3 h-auto rounded-lg">
              <h1 className="text-center py-5 font-bold">Info Pengguna</h1>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;

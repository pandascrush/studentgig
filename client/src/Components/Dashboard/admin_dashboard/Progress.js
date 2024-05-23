// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// function Barchart() {
//   const [Data, setData] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/admin/skill`).then((res) => {
//       setData(res.data.result);
//     });
//   }, []);

//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
//   );

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Bar Chart",
//       },
//     },
//   };

//   const data = {
//     labels: Data.map(e => e.skill_name),
//     datasets: [
//       {
//         label: "SKILLS",
//         data: Data.map(e=>e.num_students_with_skill),
//         // data: Data,
//         backgroundColor: "blue",
//         borderRadius: "5px",
//       },
//     ],
//   };

//   return (
//     <div className="col-lg-6">
//       <Bar options={options} data={data} className="col-lg-6" />
//     </div>
//   );
// }

// export default Barchart;

// npm install chart.js react-chartjs-2
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Kgcas = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/skill`).then((res) => {
      setData(res.data.result);
    });
  }, []);

  const data = {
    labels: Data.map(e => e.skill_name),
    datasets: [
      {
        label: "Dataset",
        backgroundColor: "rgb(52, 138, 186)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
        borderRadius: 5,
        data: Data.map(e=>e.num_students_with_skill),
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Disable grid lines on x-axis
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Disable grid lines on y-axis
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        barThickness: 5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ Width: "100px", margin: "0 auto", height: "300px" }}>
      <Bar data={data} options={options} width={1000} height={600} />
    </div>
  );
};

export default Kgcas;

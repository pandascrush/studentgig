import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function Barchart() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/skill`).then((res) => {
      setData(res.data.result);
    });
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
      title: {
        display: true,
        text: "Bar Chart",
      },
    },
  };

  const data = {
    labels: Data.map(e => e.skill_name),
    datasets: [
      {
        label: "SKILLS",
        data: Data.map(e=>e.num_students_with_skill),
        // data: Data,
        backgroundColor: "blue",
        borderRadius: "5px",
      },
    ],
  };

  return (
    <div className="col-lg-6">
      <Bar options={options} data={data} className="col-lg-12" />
    </div>
  );
}

export default Barchart;

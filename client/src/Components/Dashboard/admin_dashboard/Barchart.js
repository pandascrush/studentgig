import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const DoughnutPieChart = () => {
  
  const [clg,setClg] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/college`).then((res) => {
      // console.log(res.data)
      setClg(res.data.msg)
    });
  }, []);

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={clg}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {clg.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            label={null}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default DoughnutPieChart;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Pie } from "react-chartjs-2";
// import axios from "axios";

// function Kgcas() {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   const [kgcas, setKgcas] = useState("");
//   const [kgkite, setKgkite] = useState("");
//   const [other,setOther] = useState(0)

//   useEffect(() => {
//     axios.get(`http://localhost:5000/admin/college`).then((res) => {
//       // console.log(res.data)
//       setKgcas(res.data.msg[0].num_students);
//       setKgkite(res.data.msg[1].num_students);
//     });
//   }, []);

//   ChartJS.register(ArcElement, Tooltip, Legend);
//   const data = {
//     labels: ["KGCAS", "KITE", "OTHERS"],
//     datasets: [
//       {
//         data: [kgcas, kgkite, other],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2"],
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="col-lg-6">
//         <Pie data={data} className="col-lg-6" />
//       </div>
//     </>
//   );
// }

// export default Kgcas;

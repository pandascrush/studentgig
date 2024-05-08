import React, { useState } from "react";
import axios from "axios";

function Profile() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [Name, setName] = useState("");
  const [git, setGit] = useState("");

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("name", Name);
    formData.append('git',git)

    try {
      await axios.post("http://localhost:5000/stu/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <br></br>
        Profile : <input type="file" name="file1" onChange={handleFile1Change} />
        <br />
        Resume : <input type="file" name="file2" onChange={handleFile2Change} />
        <br />
        <input type="url" onChange={(e) => setGit(e.target.value)} />
        <br></br>
        <select>
          <option>--Skill--</option>
          <option>Html</option>
          <option>Css</option>
          <option>JavaScript</option>
        </select>
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}

export { Profile };

// Old One

// import React, { useEffect, useState } from "react";
// import upperimg from "../../Assets/upper.png";
// import "../student_dashboard/Studentmenu.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAdd } from "@fortawesome/free-solid-svg-icons";
// import { useParams } from "react-router-dom";

// export function Profile() {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     degree: "",
//     year: "",
//     specialization: "",
//     college: "",
//   });

//   const { id } = useParams();

//   useEffect(() => {
//     fetch("http://localhost:5000/stu/getdata/" + id)
//       .then((res) => res.json())
//       .then((data) => {
//         setFormData({
//           name: data.name,
//           email: data.email,
//           degree: data.degree,
//           year: data.year,
//           specialization: data.specialization,
//         });
//       });
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <>
//     <div className="container-fluid bgimage col-lg-8">
//         <h1 className="p-5">Profile</h1>
//         <div
//           style={{
//             // height: "85%",
//             // width: "10%",
//             height:"200px",
//             width:"200px",
//             border: "1px solid black",
//             borderRadius: "50%",
//           }}
//         ></div>
//         <form>
//           <div class="form-group">
//             <label class="form-control-label">Name:</label>
//             <input
//               type="text"
//               class="form-control"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div class="form-group">
//             <label class="form-control-label">Email:</label>
//             <input
//               type="email"
//               class="form-control"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div class="form-group">
//             <label class="form-control-label">Degree:</label>
//             <input
//               type="text"
//               class="form-control"
//               name="degree"
//               value={formData.degree}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div class="form-group">
//             <label class="form-control-label">Year:</label>
//             <input
//               type="text"
//               class="form-control"
//               name="year"
//               value={formData.year}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div class="form-group">
//             <label class="form-control-label">Specialization:</label>
//             <input
//               type="text"
//               class="form-control"
//               name="specialization"
//               value={formData.specialization}
//               onChange={handleInputChange}
//             />
//           </div>
//       <div  class="form-group">
//                                     <label class="form-control-label">College:</label>
//                                     <select name="college" class="form-control" value={formData.college} onChange={handleInputChange}>
//                                     <option value="">Select College</option>
//                                     {college.map((value,index)=>(
//                                         <option value={value.college_id}>{value.college_name}</option>
//                                     ))}
//                                     </select>
//                                 </div>
//       <button type="submit" className="btn btn-success mt-3 col-lg-12">
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

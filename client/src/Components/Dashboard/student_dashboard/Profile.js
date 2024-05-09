import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import filetransfer from "../../Assets/Animation - 1715065850571.gif";

function Profile() {
  const { id } = useParams();

  const [selectedSkill, setSelectedSkill] = useState("");
  const [skills, setSKills] = useState([]);
  const [skillUrl, setSkillUrl] = useState("");
  const [des, setDes] = useState("");

  const handleChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/stu/getdata/${id}`).then((res) => {
      setName(res.data.msg[0].name);
    });
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:5000/college/skill").then((res) => {
      setSKills(res.data.msg);
    });
  }, []);

  const [file1, setFile1] = useState(null);
  // const [file2, setFile2] = useState(null);
  const [Name, setName] = useState("");
  const [git, setGit] = useState("");

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  // const handleFile2Change = (e) => {
  //   setFile2(e.target.files[0]);
  // };

  // File Handling --> using this to store the resume
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Onsubmit handler function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", selectedFile);
    formData.append("name", Name);
    formData.append("git", git);
    formData.append("id", id);
    formData.append("skill", selectedSkill);
    formData.append("url", skillUrl);
    formData.append("des", des);

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
    <>
      <div className="container-fluid  main">
        <div className="profile-image">
          <img src={""} alt="" className="ai-girl" />
        </div>
      </div>
      <div>
        <h3>{Name}</h3>
        <Link
          to={`/update/${id}`}
          className="btn btn-primary rounded-5  px-4 m-3"
        >
          Edit Profile
        </Link>
        <button className="btn  rounded-5  px-4 border-black">Settings</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="  main-2 row">
          <div className=" col-lg-6 col-sm-12">
            <div>
              <label>Profile Picture :</label>
              <input type="file" accept=".jpg,.jpeg,.png," name="file1" onChange={handleFile1Change} />
            </div>
            <h3>Skillset</h3>

            <select
              id="skillSelect"
              value={selectedSkill}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {skills.map((val, ind) => {
                return <option value={val.skill_id}>{val.skill_name}</option>;
              })}
            </select>
            <br />

            <input
              onChange={(e) => setSkillUrl(e.target.value)}
              type="text"
              placeholder="Paste URL"
              className="border-black rounded-4  focus:outline-none focus:border-blue-500 input"
            />
            <br />
            <textarea
              onChange={(e) => setDes(e.target.value)}
              className=" project_description mt-4 border-black-5 rounded-4  focus:border-black "
              placeholder="Project Description"
            ></textarea>
          </div>

          <div className="col-lg-6 col-sm-12">
            <button className="btn btn-primary m-4 rounded-5  px-5">
              Github Link
            </button>
            <br />
            <input
              onChange={(e) => setGit(e.target.value)}
              type="text"
              placeholder="Paste URL"
              className="border-black rounded-4  focus:outline-none focus:border-blue-500 input"
            />
            <br />
            <button className="btn btn-primary rounded-5 m-4  px-5">
              Resume
            </button>

            <div>
              <h2>File Uploader</h2>
              <div
                style={{
                  border: "2px dashed #ccc",
                  height: "200px",
                  width: "400px",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {selectedFile ? (
                  <p>{selectedFile.name}</p>
                ) : (
                  <p>Drag & Drop or Choose a file</p>
                )}
                <input
                  className="btn btn-warning text-dark"
                  style={{ width: "100px" }}
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.pdf"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{
                border: "2px dashed #ccc",
                height: "200px",
                width: "400px",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="fileInput"
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  padding: "10px 20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#E49B0F",
                  color: "#333",
                }}
              >
                <strong>Browse</strong>
              </label>
              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              <img src={filetransfer} className="ms-5 col-lg-6"/>
              <br />
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
        <button type="submit" className="btn btn-success float-end me-5">
          Submit
        </button>
      </form>
    </>

    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" onChange={(e) => setName(e.target.value)} />
    //     <br></br>
    //     Profile : <input type="file" name="file1" onChange={handleFile1Change} />
    //     <br />
    //     Resume : <input type="file" name="file2" onChange={handleFile2Change} />
    //     <br />
    //     <input type="url" onChange={(e) => setGit(e.target.value)} />
    //     <br></br>
    //     <select>
    //       <option>--Skill--</option>
    //       <option>Html</option>
    //       <option>Css</option>
    //       <option>JavaScript</option>
    //     </select>
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
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

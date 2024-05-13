import React, { useEffect, useState } from "react";
import gifimg from "../../Assets/Animation - 1715065850571.gif";
import dragim from "../../Assets/arrow.jpg";
import backgroundimg from "../../Assets/upper.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import filetransfer from "../../Assets/Animation - 1715065850571.gif";
import "../../../App.css";

export default function Profile() {
  const { id } = useParams();

  const [image,setImage] = useState()
  useEffect(()=>{
    axios.get(`http://localhost:5000/stu/getall/${id}`)
    .then(res => {
        // console.log(res.data.result[0].profile_photo)
        setImage(res.data.result[0].profile_photo)
    })
  },[id])

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

//   const [file1, setFile1] = useState(null);
//   const [file2, setFile2] = useState(null);
  const [Name, setName] = useState("");
  const [git, setGit] = useState("");

//   const handleFile1Change = (e) => {
//     setFile1(e.target.files[0]);
//   };

//   const handleFile2Change = (e) => {
//     setFile2(e.target.files[0]);
//   };

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
    // formData.append("file1", file1);
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
    <div>
      <div className="background"></div>
      <div className="imgposition ms-5">
        <img
          src={`http://localhost:5000/images/${image}`}
          className="portfolioimg"
          alt="Load"
        />
      </div>
      {/* text */}
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <h1>{Name}</h1>
            {/* <button className="btn btn-primary rounded-5 p-3 border-black my-2 me-3">Edit Profile</button> */}
            <Link
              to={`/update/${id}`}
              className="btn btn-primary rounded-5  p-3 my-2 me-2 border-black"
            >
              Edit Profile
            </Link>
            <button className="btn  rounded-5  p-3 border-black my-2">
              Settings
            </button>

            <h1>Skillset</h1>
            <select
              className="my-3"
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
              type="textarea"
              placeholder="Paste URL"
              className="custom-input"
            />
            <br />
            <textarea
              rows="4"
              cols="30"
              placeholder="Project Description"
              className="project_description mt-4 border-black-5 rounded-4  focus:border-black "
              onChange={(e) => setDes(e.target.value)}
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <p className="bg-primary labeltext">Github Link</p>

            <input
              onChange={(e) => setGit(e.target.value)}
              type="textarea"
              placeholder="Paste URL"
              className="custom-input"
            />
            <p className="bg-primary labeltext">Resume</p>
            <div className="row dropbox">
              <div className="col">
                <div id="dropArea">
                  <img id="dropImage" src={dragim} alt="Drop files here" />
                  <p>Drag and Drop Files to Upload</p>
                  <p>OR</p>
                  {/* <button className='btn btn-warning '>Browse</button> */}
                  <input
                    className="btn btn-warning text-dark"
                    style={{ width: "100px" }}
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="col">
                <img src={gifimg} height="200px" />
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

// export default Profile;

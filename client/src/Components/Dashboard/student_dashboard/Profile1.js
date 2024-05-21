import React, { useEffect, useState } from "react";
import gifimg from "../../Assets/Animation - 1715065850571.gif";
import dragim from "../../Assets/Group 1.png";
import backgroundimg from "../../Assets/upper.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import filetransfer from "../../Assets/Animation - 1715065850571.gif";
import "../../../App.css";

export default function Profile() {
  const { id } = useParams();

  const [image, setImage] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/stu/getall/${id}`).then((res) => {
      // console.log(res.data.result[0].profile_photo)
      setImage(res.data.result[0].profile_photo);
    });
  }, [id]);

  const [selectedSkill, setSelectedSkill] = useState("");
  const [skills, setSKills] = useState([]);
  const [skillUrl, setSkillUrl] = useState("");
  const [github, setGithub] = useState("");
  const [des, setDes] = useState("");
  const [skillname, setSkillname] = useState([]);

  const handleChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/stu/getdata/${id}`).then((res) => {
      setName(res.data.msg[0].name);
      setGithub(res.data.msg[0].github_link);
    });
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:5000/college/skill").then((res) => {
      setSKills(res.data.msg);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/stu/getSkill/${id}`).then((res) => {
      const data = res.data;
      const Skill_name = data.map((e) => {
        return e.skill_name;
      });
      setSkillname(Skill_name);
    });
  }, [id]);

  const [Name, setName] = useState("");
  const [git, setGit] = useState("");

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
      await axios
        .post("http://localhost:5000/stu/upload", formData)
        .then((res) => {
          console.log(res);
          if (res.data === "Files uploaded successfully") {
            alert("Files uploaded successfully!");
          } else if (res.data === "Skill_already_exists_for_this_student") {
            alert("Skill is Already Exist");
          }
        });
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  };
  return (
    <div>
      <div className="background">
        <h1 className="text-center text-white p-5 ">KGGL Gig</h1>
      </div>
      <div className="imgposition ms-5  ">
        <img
          src={
            image ? `http://localhost:5000/images/${image}` : `${backgroundimg}`
          }
          className="portfolioimg"
          alt="Load"
        />
      </div>
      {/* text */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-lg-5 ms-5">
            <h1 className=" text-capitalize">{Name}</h1>
            <Link
              to={`/update/${id}`}
              className="btn btn-primary rounded-5 my-1"
            >
              Edit Profile
            </Link>
            {/* <button className="btn btn-primary rounded-5 p-3 border-black my-2 me-3">Edit Profile</button> */}
            {/* <button className="btn  rounded-5 ms-2 border-black my-2">
              Settings
            </button> */}
            <div className="d-flex">
              <h3>Skill </h3>
              {skillname.map((e) => {
                return (
                  <h3
                    style={{ fontSize: "15px", marginLeft: "10px" }}
                    className="pt-1 bg-secondary text-light border border-dark rounded-5 px-3"
                  >
                    {e}{" "}
                  </h3>
                );
              })}
            </div>
            <h4>Add New Skill</h4>

            <select
              className="my-3 border form-control"
              id="skillSelect"
              value={selectedSkill}
              onChange={handleChange}
            >
              <option value="">Select your Skill</option>
              {skills.map((val, ind) => {
                return <option value={val.skill_id}>{val.skill_name}</option>;
              })}
            </select>
            <br />
            <input
              onChange={(e) => setSkillUrl(e.target.value)}
              type="textarea"
              placeholder="Paste project URL "
              className="form-control"
              value={skillUrl}
            />
            <br />
            <textarea
              rows="4"
              cols="30"
              placeholder="Project Description"
              className="project_description mt-4 border-black-5 rounded-4 form-control"
              onChange={(e) => setDes(e.target.value)}
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <h4 className="ms-5 mb-4">Github Link</h4>

            <input
              onChange={(e) => setGit(e.target.value)}
              type="text"
              placeholder="Paste Github URL"
              className="form-control ms-5"
              value={github}
            />
            <h4 className="ms-5 mt-3">Resume</h4>
            <div className="container dropbox mx-5 mt-3">
              <div className="row">
                <div id="dropArea" className="col-lg-5">
                  <img
                    id="dropImage"
                    src={dragim}
                    alt="Drop files here"
                    className="col-lg-3"
                  />
                  <p>Drag and Drop Files to Upload</p>
                  <p>OR</p>
                  {/* <button className='btn btn-warning '>Browse</button> */}
                  <input
                    className="btn btn-warning text-dark form-control"
                    id="actual-btn"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    hidden
                  />
                  <label for="actual-btn" className="btn btn-warning">
                    Browse
                  </label>
                </div>
                <div className="col-lg-6">
                  <img src={gifimg} className="container-fluid" />
                </div>
              </div>
            </div>

            <button
              className="btn btn-success float-end  my-5 me-5"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //     <div className="">
    //     </div>
    // </div>
  );
}

// export default Profile;

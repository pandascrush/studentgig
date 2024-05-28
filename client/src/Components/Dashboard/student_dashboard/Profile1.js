import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import gifimg from "../../Assets/Animation - 1715065850571.gif";
import dragim from "../../Assets/Group 1.png";
import backgroundimg from "../../Assets/upper.png";
import "../../../App.css";

export default function Profile() {
  const { id } = useParams();
  const decoded = atob(id);
  console.log(id, decoded);

  const [image, setImage] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillUrl, setSkillUrl] = useState("");
  const [github, setGithub] = useState("");
  const [description, setDescription] = useState("");
  const [skillNames, setSkillNames] = useState([]);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [githubError, setGithubError] = useState("");
  const [skillError, setSkillError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/stu/getall/${decoded}`).then((res) => {
      setImage(res.data.result[0].profile_photo);
    });
  }, [decoded]);

  useEffect(() => {
    axios.get(`http://localhost:5000/stu/getdata/${decoded}`).then((res) => {
      setName(res.data.msg[0].name);
      setGithub(res.data.msg[0].github_link);
    });
  }, [decoded]);

  useEffect(() => {
    axios.get("http://localhost:5000/college/skill").then((res) => {
      setSkills(res.data.msg);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/stu/getSkill/${decoded}`).then((res) => {
      const skillNames = res.data.map((e) => e.skill_name);
      setSkillNames(skillNames);
    });
  }, [decoded]);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const words = value.split(/\s+/);
    if (words.length > 100) {
      setDescriptionError("Description cannot exceed 100 words");
    } else {
      setDescriptionError("");
    }
    setDescription(value);
  };

  const validateGithubUrl = (url) => {
    const githubRegex =
      /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9._%+-]+(\/[A-Za-z0-9._%+-]+)*\/?$/;
    return githubRegex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const words = description.split(/\s+/);
    if (words.length > 100) {
      setDescriptionError("Description cannot exceed 100 words");
      return;
    }

    if (!validateGithubUrl(github)) {
      setGithubError("Please enter a valid GitHub URL");
      return;
    } else {
      setGithubError("");
    }

    if (!selectedSkill) {
      setSkillError("Skill is required");
      return;
    } else {
      setSkillError("");
    }

    if (!skillUrl) {
      setUrlError("URL is required");
      return;
    } else {
      setUrlError("");
    }

    const formData = new FormData();
    formData.append("file2", selectedFile);
    formData.append("name", name);
    formData.append("git", github);
    formData.append("id", decoded);
    formData.append("skill", selectedSkill);
    formData.append("url", skillUrl);
    formData.append("des", description);

    try {
      const res = await axios.post(
        "http://localhost:5000/stu/upload",
        formData
      );
      if (res.data === "Profile updated successfully") {
        alert("Files uploaded successfully!");
      } else if (res.data === "Skill_already_exists_for_this_student") {
        alert("Skill already exists");
      }
    } catch (error) {
      console.error("Error uploading files: ", error);
      setGeneralError("An error occurred during the upload. Please try again.");
    }
  };

  return (
    <div>
      <div className="background">
        <h1 className="text-center text-white p-5">KGGL Gig</h1>
      </div>
      <div className="imgposition ms-5">
        <img
          src={image ? `http://localhost:5000/images/${image}` : backgroundimg}
          className="portfolioimg"
          alt="Profile"
        />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-lg-5 ms-5">
            <h1 className="text-capitalize">{name}</h1>
            <Link
              to={`/update/${id}`}
              className="btn btn-primary rounded-5 my-1"
            >
              Edit Profile
            </Link>
            <div className="">
              <h3 className="mt-3">Skills</h3>
              <div className="d-flex flex-wrap mb-3">
                {skillNames.map((skill, index) => (
                  <span
                    key={index}
                    className="badge bg-secondary me-2 mb-2 text-light"
                    style={{ fontSize: "14px" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <h4>Add New Skill</h4>
            <label htmlFor="skillSelect">
              Select your Skill <span className="text-danger">*</span>
            </label>
            <select
              className="my-3 border form-control"
              id="skillSelect"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">Select your Skill</option>
              {skills.map((skill, index) => (
                <option key={index} value={skill.skill_id}>
                  {skill.skill_name}
                </option>
              ))}
            </select>
            {skillError && <p className="text-danger">{skillError}</p>}
            
            <label htmlFor="skillUrl">
              Project GitHub URL (or Netlify link) <span className="text-danger">*</span>
            </label>
            <input
              id="skillUrl"
              type="textarea"
              placeholder="Paste project URL"
              className="form-control"
              value={skillUrl}
              onChange={(e) => setSkillUrl(e.target.value)}
            />
            {urlError && <p className="text-danger">{urlError}</p>}
            
            <label htmlFor="description">
              Project Description <span className="text-danger">*</span>
            </label>
            <textarea
              id="description"
              rows="4"
              cols="30"
              placeholder="Project Description"
              className="project_description mt-4 border-black-5 rounded-4 form-control"
              value={description}
              onChange={handleDescriptionChange}
            />
            {descriptionError && <p className="text-danger">{descriptionError}</p>}
          </div>
          <div className="col-sm-12 col-lg-6">
            <h4 className="ms-5 mb-3">GitHub Link</h4>
            <div className="ms-5">
              <label htmlFor="github" className="form-label">
                Paste GitHub URL <span className="text-danger">*</span>
              </label>
              <input
                id="github"
                type="text"
                placeholder="Paste GitHub URL"
                className="form-control"
                value={github}
                onChange={(e) => {
                  setGithub(e.target.value);
                  if (!validateGithubUrl(e.target.value)) {
                    setGithubError("Please enter a valid GitHub URL");
                  } else {
                    setGithubError("");
                  }
                }}
              />
              {githubError && <p className="text-danger">{githubError}</p>}
            </div>

            <h4 className="ms-5 mt-3">Resume</h4>
            <div
              className="container dropbox mx-5 mt-3"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
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
                  <input
                    className="btn btn-warning text-dark form-control"
                    id="actual-btn"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    hidden
                  />
                  <label htmlFor="actual-btn" className="btn btn-warning">
                    Browse
                  </label>
                  {fileName && <p className="mt-2 text-success">{fileName}</p>}
                </div>
                <div className="col-lg-6">
                  <img
                    src={gifimg}
                    className="container-fluid"
                    alt="File Upload Animation"
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-success my-5 me-5 float-end"
              onClick={handleSubmit}
            >
              Submit
            </button>
            {generalError && <p className="text-danger">{generalError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

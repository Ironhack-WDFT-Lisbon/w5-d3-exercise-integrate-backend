import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

const DEFAULT_PROFILE_PICTURE =
  "https://i.pinimg.com/736x/00/70/16/00701602b0eac0390b3107b9e2a665e0.jpg";

export default function UpdateStudent({ students, updateStudent }) {
  const { studentId } = useParams();

  // find student using .find()
  const foundStudent = students.find((student) => student.id === studentId);
  // if student is not found, redirect to students list
  if (!foundStudent) return <Navigate to="/students" />;

  const navigate = useNavigate();
  const [name, setName] = useState(foundStudent.name);
  const [imgURL, setImgURL] = useState(foundStudent.img);
  const [age, setAge] = useState(foundStudent.age);
  const [bootcamp, setBootcamp] = useState(foundStudent.bootcamp);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImgChange = (e) => {
    setImgURL(e.target.value);
  };

  const handleAgeChange = (e) => {
    const value = Number(e.target.value) || "";
    if (value < 0) return;
    setAge(value);
  };

  const handleBootcampChange = (e) => {
    setBootcamp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !age || !bootcamp) {
      alert("Please fill in all fields");
      return;
    }

    // Create a new student object
    const updatedStudent = {
      id: studentId,
      name,
      img: imgURL ? imgURL : DEFAULT_PROFILE_PICTURE,
      age,
      bootcamp,
    };

    // Update student
    updateStudent(updatedStudent);

    // redirect to students list
    navigate("/students");
  };

  return (
    <div>
      <h1>Update Student</h1>
      <form>
        <div className="input-wrapper">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="input-wrapper">
          <label>Image URL:</label>
          <input
            type="text"
            name="imgURL"
            value={imgURL}
            onChange={handleImgChange}
          />
        </div>
        <div className="input-wrapper">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={handleAgeChange}
          />
        </div>
        <div className="input-wrapper">
          <label>Bootcamp:</label>
          <div className="select-wrapper">
            <select
              name="bootcamp"
              value={bootcamp}
              onChange={handleBootcampChange}
            >
              <option value="">Select a bootcamp</option>
              <option value="Web Development">Web Development</option>
              <option value="UX/UI Design">UX/UI Design</option>
              <option value="Data Analytics">Data Analytics</option>
            </select>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
}

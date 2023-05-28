import axios from "axios";
import { useState } from "react";

const GetStudent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [student, setStudent] = useState(null);

  const handleSubmitGet = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3500/students?firstName=${firstName}&lastName=${lastName}`
      );
      setStudent(response.data);
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 404) {
        alert("Student not found");
      } else if (err?.response?.status === 500) {
        alert("Failed to get student");
      }
    }
  };

  const handleBack = () => {
    setStudent(null);
  };

  if (student) {
    return <ShowStudent student={student} onBack={handleBack} />;
  }

  return (
    <div className="form-container">
      <form className="get-form" onSubmit={handleSubmitGet}>
      <h2>Search Student Details</h2>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <br />
      <button onClick={() => props.onFormSwitch("addStudent")}>
        Add Student
      </button>
    </div>
  );
};

const ShowStudent = ({ student, onBack }) => {
  return (
    <div className="form-container">
      <form className="add-form">
        <h2>Student Details</h2>
        <label htmlFor="firstName">First Name</label>
        <input value={student.firstName} readOnly />
        <label htmlFor="lastName">Last Name</label>
        <input value={student.lastName} readOnly />
        <label htmlFor="telephone">Telephone</label>
        <input value={student.telephone} readOnly />
        <label htmlFor="email">Email</label>
        <input value={student.email} readOnly />
        <button type="button" onClick={onBack}>
          Back
        </button>
      </form>
    </div>
  );
};

export default GetStudent;

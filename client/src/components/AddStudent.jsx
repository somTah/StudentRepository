import { useState } from "react";
import axios from "axios";
const AddStudent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    let payload = {
      firstName: firstName,
      lastName: lastName,
      telephone: telephone,
      email: email,
    };

    await axios
      .post("http://localhost:3500/students", payload)
      .then(() => {
        alert("Student information added successfully.");
      })
      .catch((err) => {
        console.error(err);
        if (err?.response?.status === 400) {
          alert("All fields are required");
        } else if (err?.response?.status === 500) {
          alert("Failed to add student information");
        }
      });
  };

  return (
    <div className="form-container">
      <form className="add-form" onSubmit={handleSubmitAdd}>
        <h2>Add Student</h2>
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
        <label htmlFor="telephone">Telephone</label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <br />
      <button onClick={() => props.onFormSwitch("getStudent")}>
        Search Student
      </button>
    </div>
  );
};

export default AddStudent;

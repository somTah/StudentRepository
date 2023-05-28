import { useState } from "react";
import "./App.css";
import GetStudent from "./components/GetStudent";
import AddStudent from "./components/AddStudent";

function App() {
  const [currentForm, setCurrentForm] = useState("getStudent");

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <div className="App">
      {currentForm === "getStudent" ? <GetStudent onFormSwitch={toggleForm} /> : <AddStudent onFormSwitch={toggleForm} />}
    </div>
  );
}

export default App;

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import studentsData from "./studentsData";

// Components
import Navbar from "./components/Navbar";

// Pages
import Homepage from "./pages/Homepage";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import UpdateStudent from "./pages/UpdateStudent";
import SingleStudent from "./pages/SingleStudent";
import Error from "./pages/Error";

function App() {
  const [items, setItems] = useState(studentsData);

  const createStudent = (newStudent) => {
    const updatedStudents = [...items, newStudent];

    const sortedStudents = updatedStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setItems(sortedStudents);
  };

  const updateStudent = (updatedStudent) => {
    const updatedStudents = items.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );

    const sortedStudents = updatedStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setItems(sortedStudents);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage students={items} />} />
        <Route
          path="/students"
          element={<Students students={items} deleteItem={deleteItem} />}
        />
        <Route
          path="/students/new"
          element={<AddStudent createStudent={createStudent} />}
        />
        <Route
          path="/students/:studentId"
          element={<SingleStudent students={items} />}
        />
        <Route
          path="/students/:studentId/edit"
          element={
            <UpdateStudent students={items} updateStudent={updateStudent} />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;

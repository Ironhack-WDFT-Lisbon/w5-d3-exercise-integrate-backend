# React - Integrate with Backend

## Project routes / endpoints

| HTTP Verb | URL                  | Request body | Action                     |
| --------- | -------------------- | ------------ | -------------------------- |
| GET       | /students            | (empty)      | Returns all the students   |
| POST      | /students            | JSON         | Creates a new students     |
| GET       | /students/:studentId | (empty)      | Returns a specific student |
| PUT       | /students/:studentId | JSON         | Edits a specific student   |
| DELETE    | /students/:studentId | (empty)      | Deletes a specific student |

### v1 - Start Code

- Removed the query string params from component Card.jsx

### v2 - Read Students from API / DB

1. Create a lib folder where we'll store all the functions that handle requests to the API
2. In this folder create an index.js with the following content:

   ```
   export const API_URL = "https://pleasantly-sweet-cricket.ngrok-free.app/api";

   export { getAllStudents } from "./students";
   ```

3. In this folder create another folder called students
4. Inside students create an index.js with the following content:

   ```
    import axios from "axios";

    export const getAllStudents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/students`);
        return res.data;
      } catch (err) {
        return {
          status: err.response.status,
          message: err.message,
        };
      }
    };
   ```

5. App.jsx:

   1. Import the getAllStudents function from lib:

   ```
    import { getAllStudents } from "../../lib";
   ```

   2. Import useEffect
   3. Change the initial state of students to an empty array
   4. Create a useEffect and as follows:

   ```
    useEffect(() => {
      getAllStudents().then((data) => {
        setStudents(data);
      });
    }, []);
   ```

6. Change in all files the student.id to student.\_id to match the objects that come from the DB:
   1. Components
   2. Functions
   3. ...

### v3 - Create Student

1. lib/students/index.js:
   ```
    export const createStudent = async (student) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/students`,
          student
        );
        return res.data;
      } catch (err) {
        return {
          status: err.response.status,
          message: err.message,
        };
      }
    };
   ```
2. In lib/index.js add the createStudent function to the export
3. App.jsx:
   1. Import the createStudent function from lib
   2. Rename the createStudent function to addStudent and add the following:
   ```
      const addStudent = (student) => {
        createStudent(student).then((studentData) => {
          setItems([...items, studentData]);
        });
      };
   ```
   3. Adjust the props in the Add Student route
4. AddStudent.jsx:
   1. Accept the addStudent prop
   2. Refactor the handleSubmit function:
      1. Remove the id generator uuid
      2. Remove id from the student object (it will be automatically generated on student created in the db)

### v4 - Delete Specific Student

1. lib/students/index.js:
   ```
    export const deleteStudent = async (id) => {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/students/${id}`
        );
        return res.data;
      } catch (err) {
        return {
          status: err.response.status,
          message: err.message,
        };
      }
    };
   ```
2. In lib/index.js add the deleteStudent function to the export
3. App.jsx:
   1. Import the deleteStudent function from lib
   2. Refactor the deleteStudent function:
   ```
      const deleteItem = (id) => {
        deleteStudent(id).then((data) => {
          setItems(items.filter((item) => item._id !== id));
        });
      };
   ```

### v5 - Update Specific Student

1. lib/students/index.js:
   ```
    export const updateStudent = async (student) => {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/students/${student._id}`,
          student
        );
        return res.data;
      } catch (err) {
        console.log(err);
        return {
          status: err.response.status,
          message: err.message,
        };
      }
    };
   ```
2. In lib/index.js add the updateStudent function to the export
3. App.jsx:
   1. Import the updateStudent function from lib
   2. Add an editStudent function:
   ```
    const editStudent = (student) => {
      updateStudent(student).then((studentData) => {
        setStudents(
          students.map((student) =>
            student._id === studentData._id ? studentData : student
          )
        );
      });
    };
   ```
   3. Adjust the props in the updateStudent route
4. UpdateStudent.jsx:
   1. Refactor the updatedStudent object in the handleSubmit function:
      ```
        updatedStudent({ _id: studentId, ... });
      ```

### v6 - Get Specific Student by Id

1. lib/students/index.js:
   ```
    export const getStudentById = async (id) => {
      try {
        const res = await axios.get(`${API_URL}/students/${id}`);
        return res.data;
      } catch (err) {
        return {
          status: err.response.status,
          message: err.message,
        };
      }
    };
   ```
2. In lib/index.js add the getStudentById function to the export
3. UpdateStudent.jsx:

   1. Refactor:

   ```
     import { useEffect, useState } from "react";
     import { useParams, useNavigate, Navigate } from "react-router-dom";
     import { getStudentById } from "../../../lib";

     export default function UpdateStudent({ students, editStudent }) {
        const { studentId } = useParams();
        const navigate = useNavigate();
        const [name, setName] = useState(foundStudent.name);
        const [imgURL, setImgURL] = useState(foundStudent.img);
        const [age, setAge] = useState(foundStudent.age);
        const [bootcamp, setBootcamp] = useState(foundStudent.bootcamp);

        useEffect(() => {
          let student = students.find((student) => student._id === studentId);

          if (student) {
            setName(student.name);
            setImgURL(student.img);
            setAge(student.age);
            setBootcamp(student.bootcamp);
          } else
            getStudentById(studentId).then((student) => {
              if (!student) return <Navigate to="/students" />;

              setName(student.name);
              setImgURL(student.img);
              setAge(student.age);
              setBootcamp(student.bootcamp);
            });
        }, []);

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
            _id: studentId,
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
           <h1>Add Student</h1>
           <form>
             <div className="input-wrapper">
               <label>Name:</label>
               <input
                 type="text"
                 name="name"
                 value={foundStudent.name || ""}
                 onChange={handleNameChange}
               />
             </div>
             <div className="input-wrapper">
               <label>Image URL:</label>
               <input
                 type="text"
                 name="imgURL"
                 value={foundStudent.imgURL || ""}
                 onChange={handleImgChange}
               />
             </div>
             <div className="input-wrapper">
               <label>Age:</label>
               <input
                 type="number"
                 name="age"
                 value={foundStudent.age || 0}
                 onChange={handleAgeChange}
               />
             </div>
             <div className="input-wrapper">
               <label>Bootcamp:</label>
               <div className="select-wrapper">
                 <select
                   name="bootcamp"
                   value={foundStudent.bootcamp || ""}
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

   ```

4. SingleStudent.jsx:

   1. Refactor:

   ```
    import "./SingleStudent.css";
    import { useEffect, useState } from "react";
    import { useParams, navigate, useSearchParams } from "react-router-dom";

    export default function SingleStudent({ students }) {
      const { studentId } = useParams();
      const [searchParams, setSearchParams] = useSearchParams();
      const navigate = useNavigate();
      const [foundStudent, setFoundStudent] = useState(null);

      useEffect(() => {
        if (students.length === 0) return;

        let student = students.find((student) => student._id === studentId);

        if (student) {
          setFoundStudent(student);
        } else {
          return navigate("/not-found");
        }
      }, [students]);

      return (
        <div className="profile-wrapper">
          <div className="profile card">
            <img
              src={foundStudent.img}
              alt={`${foundStudent.name} profile picture`}
              width={300}
              height="auto"
              style={{ borderRadius: "50%" }}
            />
            <h2>{foundStudent.name}</h2>
            <p>{foundStudent.age} anos</p>
            <p>{foundStudent.bootcamp}</p>
          </div>
        </div>
      );
    }

   ```

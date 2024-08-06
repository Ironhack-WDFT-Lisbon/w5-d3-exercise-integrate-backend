import { useParams, Navigate, useSearchParams } from "react-router-dom";
import "./SingleStudent.css";

export default function SingleStudent({ students }) {
  const { studentId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter the correct student using the studentId
  const foundStudent = students.filter(
    (student) => student.id === studentId
  )[0];

  // return the user to "somewhere" if the student is not found
  if (!foundStudent) {
    return <Navigate to="/not-found" />;
  }

  // show/hide information with query params
  const showAge = searchParams.get("showAge");
  const showBootcamp = searchParams.get("showBootcamp");

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

        {showAge !== "hide" && <p>Age: {foundStudent.age}</p>}
        {showBootcamp !== "hide" && <p>Bootcamp: {foundStudent.bootcamp}</p>}
      </div>
    </div>
  );
}

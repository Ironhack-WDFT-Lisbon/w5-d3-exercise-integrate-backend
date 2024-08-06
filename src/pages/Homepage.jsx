import "./Homepage.css";
import Counter from "../components/Counter";

export default function Homepage({ students }) {
  return (
    <div className="home-wrapper">
      <h1>Hi Ironhackers</h1>
      <h3>This is our amazing students list app with routing</h3>
      <Counter count={students.length} />
    </div>
  );
}

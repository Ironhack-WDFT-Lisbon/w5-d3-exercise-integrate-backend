import { Link } from "react-router-dom";

export default function Card({ item, deleteFunc }) {
  return (
    <li className="card">
      <Link to={`/students/${item.id}`}>{item.name}</Link>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link className="button" to={`/students/${item.id}/edit`}>
          ✏️
        </Link>
        <button onClick={() => deleteFunc(item.id)}>🗑️</button>
      </div>
    </li>
  );
}

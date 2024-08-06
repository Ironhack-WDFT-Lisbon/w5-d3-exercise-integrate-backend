import { useState } from "react";
import "./Listing.css";
import Card from "./Card";

export default function Listing({ data, deleteItem }) {
  const [category, setCategory] = useState("");

  const handleCategoryFilter = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="wrapper">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h5>Filter by Bootcamp:</h5>
        <div className="category-select-wrapper">
          <select name={category} onChange={handleCategoryFilter}>
            <option value="">All</option>
            <option value="Web Development">Web Development</option>
            <option value="UX/UI Design">UX/UI Design</option>
            <option value="Data Analytics">Data Analytics</option>
          </select>
        </div>
      </div>
      <ul>
        {data.map((item) => {
          if (category === "" || item.bootcamp === category) {
            return <Card key={item.id} item={item} deleteFunc={deleteItem} />;
          }
        })}
      </ul>
    </div>
  );
}

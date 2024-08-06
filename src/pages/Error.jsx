import { useNavigate } from "react-router-dom";

const imgURL =
  "https://www.dpmarketingcommunications.com/wp-content/uploads/2016/11/404-Page-Featured-Image.png";

export default function Error() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        gap: "50px",
      }}
    >
      <img
        src={imgURL}
        alt="Not Found Page"
        width={600}
        height="auto"
        style={{ filter: "invert(1)" }}
      />
      <button onClick={handleNavigate}>Return to Homepage</button>
    </div>
  );
}

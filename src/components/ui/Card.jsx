import "../../assets/css/components.css";

function Card({ title, value, icon, bgColor }) {
  return (
    <div
      style={{
        background: bgColor || "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        color: "white",
      }}
    >
      {icon && <div style={{ marginBottom: "10px" }}>{icon}</div>}
      {title && <h3 style={{ marginBottom: "10px" }}>{title}</h3>}
      <h2>{value}</h2>
    </div>
  );
}

export default Card;

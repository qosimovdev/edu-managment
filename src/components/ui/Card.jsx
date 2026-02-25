import "../../assets/css/components.css";

function Card({ children, title }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        // marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      {title && <h3 style={{ marginBottom: "0" }}>{title}</h3>}
      {children}
    </div>
  );
}

export default Card;

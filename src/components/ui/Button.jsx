import "../../assets/css/components.css";

function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} ${disabled ? "btn-disabled" : ""}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;

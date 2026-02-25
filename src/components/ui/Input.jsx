function Input({ name, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;

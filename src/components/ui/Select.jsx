function Select({ name, value, onChange, options }) {
  return (
    <div className="select-wrapper">
      <select name={name} value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

// function Select({ name, value, onChange, options }) {
//   return (
//     <div className="select-wrapper">
//       <select name={name} value={value} onChange={onChange}>
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

function Select({ name, value, onChange, options }) {
  return (
    <div className="select-wrapper">
      <select
        name={name}
        value={value || ""}
        onChange={(e) => {
          const val =
            name === "groupId" ? parseInt(e.target.value) : e.target.value;
          onChange({ target: { name, value: val } });
        }}
      >
        {/* <option value="">Select group</option> */}
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

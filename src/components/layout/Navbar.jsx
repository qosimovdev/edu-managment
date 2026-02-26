import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();
  // const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // navigate("/login");
  return (
    <div className="navbar">
      <h3>Dashboard</h3>

      <div className="navbar-right" ref={dropdownRef}>
        <span className="notification">🔔</span>

        <div className="avatar" onClick={() => setOpenDropdown(!openDropdown)}>
          A
        </div>

        {openDropdown && (
          <div className="dropdown">
            {["Profile", "Logout"].map((item) => (
              <button key={item} onClick={() => alert(item)}>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

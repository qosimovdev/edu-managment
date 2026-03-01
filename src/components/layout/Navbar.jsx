import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getMe } from "../../api/auth.service";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.user);
      } catch (err) {
        console.log("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const avatarLetter = user?.fullName?.charAt(0)?.toUpperCase() || "A";
  const name = user?.fullName;
  return (
    <div className="navbar">
      <h3>{name}</h3>
      <div className="navbar-right" ref={dropdownRef}>
        <span className="notification">🔔</span>
        <div className="avatar" onClick={() => setOpenDropdown(!openDropdown)}>
          {avatarLetter}
        </div>
        {openDropdown && (
          <div className="dropdown">
            <button onClick={() => navigate("/profile")}>Profile</button>

            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

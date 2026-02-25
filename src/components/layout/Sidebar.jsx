import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaLayerGroup,
  FaMoneyBill,
  FaClipboardCheck,
  FaChartPie,
  FaBars,
} from "react-icons/fa";

function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaChartPie /> },
    { name: "Students", icon: <FaUserGraduate /> },
    { name: "Teachers", icon: <FaChalkboardTeacher /> },
    { name: "Courses", icon: <FaBook /> },
    { name: "Groups", icon: <FaLayerGroup /> },
    { name: "Payments", icon: <FaMoneyBill /> },
    { name: "Attendance", icon: <FaClipboardCheck /> },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div
        style={{
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <span
          className="logo-text"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Edu Admin
        </span>

        <FaBars
          style={{ cursor: "pointer" }}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* MENU */}
      <ul>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={`/${item.name.toLowerCase()}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li
              className={active === item.name ? "active" : ""}
              onClick={() => setActive(item.name)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: "10px",
              }}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

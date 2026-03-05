import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "../../assets/css/layout.css";

function Layout() {
  return (
    <main className="layout">
      <Sidebar />
      <div className="content">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;

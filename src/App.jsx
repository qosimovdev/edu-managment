// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import Layout from "./components/layout/Layout";
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Students = lazy(() => import("./pages/Students"));
// const Teachers = lazy(() => import("./pages/Teachers"));
// const Groups = lazy(() => import("./pages/Groups"));
// const Payments = lazy(() => import("./pages/Payments"));
// const Attendance = lazy(() => import("./pages/Attendance"));
// const Login = lazy(() => import("./pages/auth/Login"));
// import "./assets/css/pages.css";

// const token = localStorage.getItem("token");
// function App() {
//   return (
//     if(!token) {
//       return <Route path="/login" element={<Login/>}/>
//     }
//     <Suspense fallback={<div>Loading...</div>}>

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="students" element={<Students />} />
//           <Route path="teachers" element={<Teachers />} />
//           <Route path="groups" element={<Groups />} />
//           <Route path="payments" element={<Payments />} />
//           <Route path="attendance" element={<Attendance />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// }

// export default App;
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Students = lazy(() => import("./pages/Students"));
const Teachers = lazy(() => import("./pages/Teachers"));
const Groups = lazy(() => import("./pages/Groups"));
const Payments = lazy(() => import("./pages/Payments"));
const Attendance = lazy(() => import("./pages/Attendance"));
const Login = lazy(() => import("./pages/auth/Login"));

import "./assets/css/pages.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Agar token yo‘q bo‘lsa login page ga yo‘naltiradi */}
        {!token ? <Route path="*" element={<Navigate to="/login" />} /> : null}

        <Route path="/login" element={<Login />} />

        {/* Authenticated pages */}
        {token && (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="groups" element={<Groups />} />
            <Route path="payments" element={<Payments />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
}

export default App;

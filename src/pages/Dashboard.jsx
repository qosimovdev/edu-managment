import { Bar } from "react-chartjs-2";
import Card from "../components/ui/Card";
import "../assets/css/pages.css";
import "chart.js/auto";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
} from "react-icons/fa";

// ❌ Fake student & teacher data
const students = [
  { id: 1, name: "Ali", status: "Present", due: 0 },
  { id: 2, name: "Vali", status: "Absent", due: 200 },
  { id: 3, name: "Olim", status: "Present", due: 0 },
  { id: 4, name: "Sara", status: "Late", due: 100 },
];

const teachers = [
  { id: 1, name: "Mr. John" },
  { id: 2, name: "Ms. Mary" },
];

// Cards & attendance calculations
const totalStudents = students.length;
const totalTeachers = teachers.length;
const totalPresent = students.filter((s) => s.status === "Present").length;
const totalAbsent = students.filter((s) => s.status === "Absent").length;
const totalLate = students.filter((s) => s.status === "Late").length;
const totalDue = students.filter((s) => s.due > 0).length;

const attendanceValues = students.map((s) =>
  s.status === "Present" ? 100 : s.status === "Late" ? 50 : 0,
);
const attendanceAvg =
  attendanceValues.reduce((sum, val) => sum + val, 0) / students.length;

// Fake monthly attendance
const months = ["Jan", "Feb", "Mar", "Apr"];
const monthlyAttendance = months.map(() => {
  const values = students.map((s) =>
    s.status === "Present" ? 100 : s.status === "Late" ? 50 : 0,
  );
  return values.reduce((a, b) => a + b, 0) / students.length;
});
const monthlyDue = months.map(() => students.filter((s) => s.due > 0).length);

const chartData = {
  labels: months,
  datasets: [
    {
      label: "Monthly Attendance %",
      data: monthlyAttendance,
      backgroundColor: "#3b82f6",
      borderRadius: 5,
    },
    {
      label: "Students with Due",
      data: monthlyDue,
      backgroundColor: "#f97316",
      borderRadius: 5,
    },
  ],
};

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="cards-grid">
        <Card
          title="Students"
          value={totalStudents}
          icon={<FaUserGraduate size={24} />}
          bgColor="#1e40af"
        />
        <Card
          title="Teachers"
          value={totalTeachers}
          icon={<FaChalkboardTeacher size={24} />}
          bgColor="#047857"
        />
        <Card
          title="Attendance %"
          value={`${attendanceAvg.toFixed(0)}%`}
          icon={<FaClipboardCheck size={24} />}
          bgColor="#b45309"
        />
        <Card
          title="Present"
          value={totalPresent}
          icon={<FaClipboardCheck size={24} />}
          bgColor="#16a34a"
        />
        <Card
          title="Absent"
          value={totalAbsent}
          icon={<FaClipboardCheck size={24} />}
          bgColor="#dc2626"
        />
        <Card
          title="Late"
          value={totalLate}
          icon={<FaClipboardCheck size={24} />}
          bgColor="#f59e0b"
        />
        <Card
          title="Due Students"
          value={totalDue}
          icon={<FaClipboardCheck size={24} />}
          bgColor="#f97316"
        />
      </div>

      <div className="chart-container small-chart">
        <h2>Monthly Student Attendance</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Card from "../components/ui/Card";
import "chart.js/auto";
import { getDashboard } from "../api/dashboard.service";
import {
  FaUsers,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaChalkboardTeacher,
} from "react-icons/fa";

function Dashboard() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();
        setSummary(res.summary);
      } catch (err) {
        console.log("Dashboard fetch error:", err);
      }
    };
    fetchDashboard();
  }, []);

  if (!summary.length) return <p>Loading...</p>;

  const totalStudents = summary.reduce(
    (sum, group) => sum + group.studentCount,
    0,
  );

  const totalPayments = summary.reduce(
    (sum, group) => sum + group.totalPayments,
    0,
  );

  const avgAttendance =
    summary.reduce(
      (sum, group) => sum + Number(group.attendancePercentage),
      0,
    ) / summary.length;

  const chartData = {
    labels: summary.map((g) => g.groupName),
    datasets: [
      {
        label: "Attendance %",
        data: summary.map((g) => Number(g.attendancePercentage)),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
      {
        label: "Payments",
        data: summary.map((g) => g.totalPayments),
        backgroundColor: "#22c55e",
        borderRadius: 6,
      },
    ],
  };
  const mentorIds = summary.map((g) => g.mentor.id);
  const uniqueMentors = new Set(mentorIds);
  const totalMentors = uniqueMentors.size;
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="cards-grid">
        <Card
          title="Total Students"
          value={totalStudents}
          icon={<FaUsers size={24} />}
          bgColor="#1e40af"
        />

        <Card
          title="Total Payments"
          value={`${totalPayments.toLocaleString()} so'm`}
          icon={<FaMoneyBillWave size={24} />}
          bgColor="#047857"
        />

        <Card
          title="Avg Attendance"
          value={`${avgAttendance.toFixed(0)}%`}
          icon={<FaClipboardCheck size={24} />}
          bgColor="#b45309"
        />

        <Card
          title="Mentors"
          value={totalMentors}
          icon={<FaChalkboardTeacher size={24} />}
          bgColor="#7c3aed"
        />
      </div>

      <div className="chart-container">
        <h2>Group Statistics</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default Dashboard;

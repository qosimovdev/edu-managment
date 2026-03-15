import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import { getGroups } from "../api/group.service";
import {
  getAttendanceByGroup,
  saveAttendance,
} from "../api/attendance.service";

function Attendance() {
  const today = new Date().toISOString().slice(0, 10);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [date, setDate] = useState(today);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { label: "Present", value: "present" },
    { label: "Absent", value: "absent" },
    { label: "Late", value: "late" },
  ];
  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await getGroups();
      const options = res.map((g) => ({ label: g.name, value: g.id }));
      console.log("API response:", res);

      setGroups(options);
      if (options.length) setSelectedGroup(options[0].value);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!selectedGroup || !date) return;
      setLoading(true);
      try {
        const res = await getAttendanceByGroup(selectedGroup, date);
        setStudents(res.students || []);
        console.log("API response:", res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [selectedGroup, date]);

  const handleStatusChange = (studentId, status) => {
    setStudents(
      students.map((s) => (s.id === studentId ? { ...s, status } : s)),
    );
  };

  const handlePresentAll = () => {
    setStudents(students.map((s) => ({ ...s, status: "present" })));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveAttendance(
        students.map((s) => ({
          studentId: s.id,
          status: s.status,
          date,
          attendanceId: s.attendanceId,
        })),
      );
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save attendance.");
    } finally {
      setLoading(false);
    }
  };

  const columns = ["name", "status"];
  const data = (students || []).map((s) => ({
    name: s.fullName,
    status: (
      <Select
        value={s.status}
        options={statusOptions}
        onChange={(e) => handleStatusChange(s.id, e.target.value)}
      />
    ),
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Select
          value={selectedGroup}
          options={groups}
          onChange={(e) => setSelectedGroup(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button onClick={handlePresentAll}>Present All</Button>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>

      <Table columns={columns} data={data} />
    </div>
  );
}

export default Attendance;

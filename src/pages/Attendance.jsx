import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import {
  getAttendance,
  updateAttendance,
  createAttendance,
} from "../api/attendance.service";
import { getStudents } from "../api/students.service";

function Attendance() {
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [allStudents, setAllStudents] = useState([]);

  const [statusOptions] = useState([
    { label: "Present", value: "present" },
    { label: "Absent", value: "absent" },
    { label: "Late", value: "late" },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({
    studentId: "",
    date: "",
    status: "present",
  });

  // Fetch attendances
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAttendance();
        const attendances = res.attendances || [];
        const studentsData = attendances.map((a) => ({
          id: a.student.id,
          name: a.student.fullName,
          group: a.student.group?.name || "No Group",
          status: a.status,
          attendanceId: a.id,
        }));
        setStudents(studentsData);
        const uniqGroups = [
          ...new Map(
            studentsData.map((s) => [
              s.group,
              { label: s.group, value: s.group },
            ]),
          ).values(),
        ];
        setGroups(uniqGroups);
        setSelectedGroup(uniqGroups[0]?.value || "");
        const studentsRes = await getStudents();
        setAllStudents(studentsRes.students || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter((s) => s.group === selectedGroup);
  const handleStatusChange = (id, newStatus) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
    );
  };

  const handleSaveChanges = async () => {
    try {
      for (const s of filteredStudents) {
        await updateAttendance(s.attendanceId, { status: s.status });
      }
      alert("Attendance updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update attendance.");
    }
  };

  // Add Attendance
  const handleAddAttendance = async () => {
    if (!form.studentId || !form.date) {
      alert("Please select student and date");
      return;
    }

    try {
      const res = await createAttendance(form);
      const newStudent = {
        id: res.attendance.student.id,
        name: res.attendance.student.fullName,
        group: res.attendance.student.group?.name || "No Group",
        status: res.attendance.status,
        attendanceId: res.attendance.id,
      };
      setStudents([newStudent, ...students]);
      setIsAddOpen(false);
      setForm({ studentId: "", date: "", status: "present" });
      alert("Attendance added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add attendance.");
    }
  };

  const columns = ["name", "group", "status"];

  const data = filteredStudents.map((s) => ({
    ...s,
    status: (
      <Select
        value={s.status}
        options={statusOptions}
        onChange={(e) => handleStatusChange(s.id, e.target.value)}
      />
    ),
  }));

  return (
    <div style={{ padding: "15px", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "15px" }}>Attendance</h2>

      <div
        style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
      >
        <label style={{ marginRight: "10px" }}>Select Group:</label>
        <Select
          value={selectedGroup}
          options={groups}
          onChange={(e) => setSelectedGroup(e.target.value)}
          style={{ minWidth: "200px" }}
        />
        <Button
          variant="success"
          onClick={() => setIsAddOpen(true)}
          style={{ marginLeft: "15px" }}
        >
          Add Attendance
        </Button>
      </div>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          overflowX: "auto",
        }}
      >
        <Table columns={columns} data={data} />
      </div>

      <div style={{ marginTop: "15px" }}>
        <Button variant="success" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>

      {/* Add Attendance Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Add Attendance</h3>
        <Select
          name="studentId"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          options={allStudents.map((s) => ({
            label: s.fullName + " (" + s.group?.name + ")",
            value: s.id,
          }))}
          placeholder="Select Student"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <Select
          name="status"
          value={form.status}
          options={statusOptions}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />
        <div
          style={{
            transform: "translate(-75px, 62px)",
            textAlign: "right",
          }}
        >
          <Button variant="success" onClick={handleAddAttendance}>
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Attendance;

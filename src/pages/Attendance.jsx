import { useState } from "react";
import Table from "../components/ui/Table";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

function Attendance() {
  const groups = [
    { label: "Frontend Group A", value: "Frontend Group A" },
    { label: "Backend Group B", value: "Backend Group B" },
  ];

  const statusOptions = [
    { label: "Present", value: "Present" },
    { label: "Absent", value: "Absent" },
    { label: "Late", value: "Late" },
  ];

  const initialStudents = [
    { id: 1, name: "Ali", group: "Frontend Group A", status: "Present" },
    { id: 2, name: "Vali", group: "Frontend Group A", status: "Absent" },
    { id: 3, name: "Olim", group: "Backend Group B", status: "Present" },
  ];

  const [selectedGroup, setSelectedGroup] = useState(groups[0].value);
  const [students, setStudents] = useState(initialStudents);

  const filteredStudents = students.filter((s) => s.group === selectedGroup);

  const handleStatusChange = (id, newStatus) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
    );
  };

  const handleSaveChanges = () => {
    const groupStudents = filteredStudents.map((s) => ({
      id: s.id,
      status: s.status,
    }));
    console.log("Send to backend:", groupStudents);
    alert("Attendance changes saved (frontend only).");
  };

  const columns = ["name", "status"];

  const data = filteredStudents.map((s) => ({
    ...s,
    status: (
      <Select
        name="status"
        value={s.status}
        options={statusOptions}
        onChange={(e) => handleStatusChange(s.id, e.target.value)}
      />
    ),
  }));

  return (
    <div
      style={{
        padding: "15px",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Attendance</h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <label style={{ marginRight: "10px" }}>Select Group:</label>
        <Select
          name="group"
          value={selectedGroup}
          options={groups}
          onChange={(e) => setSelectedGroup(e.target.value)}
          style={{ minWidth: "200px" }}
        />
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
    </div>
  );
}

export default Attendance;

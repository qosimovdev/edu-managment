import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/students.service";
import { getGroups } from "../api/group.service";

function Students() {
  const [students, setStudents] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [groupsOptions, setGroupsOtions] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    groupId: "",
    status: "active",
    balance: "",
  });

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await getGroups();
        setGroupsOtions(groups.map((g) => ({ label: g.name, value: g.id })));
      } catch (err) {
        console.log("Fetch groups error:", err);
      }
    };
    fetchGroups();
  }, []);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getStudents();
        setStudents(students);
      } catch (err) {
        console.error("Fetch students error:", err);
      }
    };
    fetchStudents();
  }, []);

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (isEditOpen) {
      setCurrentStudent({ ...currentStudent, [name]: value });
    } else {
      setForm({
        ...form,
        [name]: name === "groupId" ? parseInt(value) : value,
      });
    }
  };

  // Add student
  const handleAdd = async () => {
    try {
      console.log("Form data:", form);
      if (!form.fullName || !form.phone || !form.groupId) {
        console.error("Fill all required fields!");
        return;
      }
      const payload = {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        groupId: parseInt(form.groupId),
        balance: parseFloat(form.balance) || 0,
        status: form.status,
      };
      const student = await createStudent(payload);
      setStudents([...students, student]);
      setForm({
        fullName: "",
        phone: "",
        groupId: "",
        status: "active",
        balance: 0,
      });
      setIsAddOpen(false);
    } catch (err) {
      console.error("Add student error:", err);
    }
  };
  // Edit student
  const handleEdit = async () => {
    try {
      const updatedStudent = await updateStudent(
        currentStudent.id,
        currentStudent,
      );
      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.id === updatedStudent.id ? updatedStudent : s,
        ),
      );
      setCurrentStudent(null);
      setIsEditOpen(false);
    } catch (err) {
      console.error("Edit student error:", err);
    }
  };

  // Delete student
  const handleDelete = async (student) => {
    if (!window.confirm(`Delete ${student.fullName}?`)) return;
    try {
      await deleteStudent(student.id);
      setStudents(students.filter((s) => s.id !== student.id));
    } catch (err) {
      console.error("Delete student error:", err);
    }
  };

  // Toggle status
  const toggleStatus = async (student) => {
    try {
      const updated = {
        ...student,
        status: student.status === "active" ? "inactive" : "active",
      };
      const updatedStudent = await updateStudent(student.id, updated);
      setStudents(
        students.map((s) => (s.id === student.id ? updatedStudent : s)),
      );
    } catch (err) {
      console.error("Toggle status error:", err);
    }
  };

  const columns = [
    "Name",
    "Group",
    "Mentor",
    "Phone",
    "Balance",
    "Status",
    "Actions",
  ];

  const data = students.map((s) => ({
    Name: s.fullName,
    Group: s.group?.name,
    Phone: s.phone,
    Balance: s.balance.toLocaleString(),
    Status: (
      <Button
        variant={s.status === "active" ? "success" : "danger"}
        onClick={() => toggleStatus(s)}
      >
        {s.status === "active" ? "Active" : "Inactive"}
      </Button>
    ),
    Actions: (
      <>
        <Button
          onClick={() => {
            setCurrentStudent(s);
            setIsViewOpen(true);
          }}
        >
          View
        </Button>
        <Button
          variant="success"
          onClick={() => {
            setCurrentStudent(s);
            setIsEditOpen(true);
          }}
        >
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDelete(s)}>
          Delete
        </Button>
      </>
    ),
  }));

  return (
    <div style={{ padding: "15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <h2>Students</h2>
        <Button variant="success" onClick={() => setIsAddOpen(true)}>
          Add Student
        </Button>
      </div>
      <div
        style={{ background: "#1e293b", padding: "20px", borderRadius: "12px" }}
      >
        <Table columns={columns} data={data} />
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h3>Add Student</h3>
        <Input
          name="fullName"
          value={form.fullName}
          onChange={handleFormChange}
          placeholder="Full Name"
        />
        <Select
          name="groupId"
          value={groupsOptions.find((g) => g.value === form.groupId)}
          onChange={handleFormChange}
          options={groupsOptions}
        />
        {/* <select name="groupId" value={form.groupId} onChange={handleFormChange}>
          <option value="">Select group</option>
          {groupsOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select> */}
        <Input
          name="phone"
          value={form.phone}
          onChange={handleFormChange}
          placeholder="Phone"
        />
        <Input
          name="balance"
          value={form.balance}
          onChange={handleFormChange}
          placeholder="Balance"
          type="number"
        />
        <div
          style={{
            transform: "translate(-75px, 62px)",
            textAlign: "right",
          }}
        >
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h3>Edit Student</h3>
        {currentStudent && (
          <>
            <Input
              name="fullName"
              value={currentStudent.fullName}
              onChange={handleFormChange}
            />
            <Select
              name="groupId"
              value={currentStudent.groupId}
              onChange={handleFormChange}
              options={groupsOptions}
            />
            <Input
              name="phone"
              value={currentStudent.phone}
              onChange={handleFormChange}
            />
            <Input
              name="balance"
              value={currentStudent.balance}
              onChange={handleFormChange}
              type="number"
            />
            <div
              style={{
                transform: "translate(-75px, 62px)",
                textAlign: "right",
              }}
            >
              <Button variant="success" onClick={handleEdit}>
                Update
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)}>
        <h3>View Student</h3>
        {currentStudent && (
          <div>
            <p>
              <strong>Name:</strong> {currentStudent.fullName}
            </p>
            <p>
              <strong>Group:</strong> {currentStudent.group?.name}
            </p>
            <p>
              <strong>Mentor:</strong> {currentStudent.group?.mentor?.fullName}
            </p>
            <p>
              <strong>Phone:</strong> {currentStudent.phone}
            </p>
            <p>
              <strong>Balance:</strong>{" "}
              {currentStudent.balance.toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {currentStudent.status === "active" ? "Active" : "Inactive"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Students;

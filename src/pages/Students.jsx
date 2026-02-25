import { useState } from "react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

function Students() {
  const initialData = [
    {
      id: 1,
      name: "Ali",
      group: "Frontend",
      phone: "998901234567",
      email: "ali@mail.com",
      status: "Paid",
    },
    {
      id: 2,
      name: "Vali",
      group: "Backend",
      phone: "998907654321",
      email: "vali@mail.com",
      status: "Debt",
    },
  ];

  const groupsOptions = [
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Fullstack", value: "Fullstack" },
  ];

  const [students, setStudents] = useState(initialData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const [form, setForm] = useState({
    name: "",
    group: "",
    phone: "",
    email: "",
  });

  // Handlers
  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAddOpen(false);
    }, 1500);
    const newStudent = { ...form, id: Date.now(), status: "Debt" }; // default qarzdor
    setStudents([...students, newStudent]);
    setForm({ name: "", group: "", phone: "", email: "" });
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    setStudents(
      students.map((s) =>
        s.id === currentStudent.id ? { ...currentStudent } : s,
      ),
    );
    setCurrentStudent(null);
    setIsEditOpen(false);
  };

  const handleDelete = (student) => {
    if (window.confirm(`Delete ${student.name}?`)) {
      setStudents(students.filter((s) => s.id !== student.id));
    }
  };

  const handleView = (student) => {
    setCurrentStudent(student);
    setIsViewOpen(true);
  };
  const handleOpenEdit = (student) => {
    setCurrentStudent(student);
    setIsEditOpen(true);
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (isEditOpen) setCurrentStudent({ ...currentStudent, [name]: value });
    else setForm({ ...form, [name]: value });
  };

  // **New: toggle status inline**
  const toggleStatus = (id) => {
    setStudents(
      students.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Paid" ? "Debt" : "Paid" }
          : s,
      ),
    );
  };

  const columns = ["name", "group", "phone", "email", "status", "actions"];

  const data = students.map((s) => ({
    ...s,
    status: (
      <Button
        variant={s.status === "Paid" ? "success" : "danger"}
        onClick={() => toggleStatus(s.id)}
      >
        {s.status === "Paid" ? "To'lagan" : "Qarzdor"}
      </Button>
    ),
    actions: (
      <>
        <Button onClick={() => handleView(s)}>See</Button>
        <Button variant="success" onClick={() => handleOpenEdit(s)}>
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
        <Button
          variant="success"
          loading={isAdding}
          onClick={() => setIsAddOpen(true)}
        >
          Add Student
        </Button>
      </div>
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          // marginTop: "20px",
        }}
      >
        <Table columns={columns} data={data} />
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Add Student</h3>
        <Input
          name="name"
          value={form.name}
          onChange={handleFormChange}
          placeholder="Student Name"
        />
        <Select
          name="group"
          value={form.group}
          onChange={handleFormChange}
          options={groupsOptions}
        />
        <Input
          name="phone"
          value={form.phone}
          onChange={handleFormChange}
          placeholder="Phone"
        />
        <Input
          name="email"
          value={form.email}
          onChange={handleFormChange}
          placeholder="Email"
        />
        <div
          style={{ transform: "translate(-75px, 62px)", textAlign: "right" }}
        >
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>View Student</h3>
        {currentStudent && (
          <div>
            <p>
              <strong>Name:</strong> {currentStudent.name}
            </p>
            <p>
              <strong>Group:</strong> {currentStudent.group}
            </p>
            <p>
              <strong>Phone:</strong> {currentStudent.phone}
            </p>
            <p>
              <strong>Email:</strong> {currentStudent.email}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {currentStudent.status === "Paid" ? "To'lagan" : "Qarzdor"}
            </p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Edit Student</h3>
        {currentStudent && (
          <>
            <Input
              label="Name"
              name="name"
              value={currentStudent.name}
              onChange={handleFormChange}
            />
            <Select
              label="Group"
              name="group"
              value={currentStudent.group}
              onChange={handleFormChange}
              options={groupsOptions}
            />
            <Input
              label="Phone"
              name="phone"
              value={currentStudent.phone}
              onChange={handleFormChange}
            />
            <Input
              label="Email"
              name="email"
              value={currentStudent.email}
              onChange={handleFormChange}
            />
            <div
              style={{
                transform: "translate(-75px, 62px)",
                textAlign: "right",
              }}
            >
              <Button variant="update" onClick={handleEdit}>
                Update
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Students;

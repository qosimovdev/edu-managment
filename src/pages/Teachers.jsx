import { useState } from "react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

function Teachers() {
  const initialData = [
    {
      id: 1,
      name: "Olim",
      subject: "Math",
      phone: "998901112233",
      email: "olim@mail.com",
    },
    {
      id: 2,
      name: "Jumong",
      subject: "Physics",
      phone: "998907774455",
      email: "jumong@mail.com",
    },
  ];

  const subjectOptions = [
    { label: "Math", value: "Math" },
    { label: "Physics", value: "Physics" },
    { label: "Chemistry", value: "Chemistry" },
    { label: "English", value: "English" },
  ];

  const [teachers, setTeachers] = useState(initialData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    phone: "",
    email: "",
  });

  // Handlers
  const handleAdd = () => {
    const newTeacher = { ...form, id: Date.now() };
    setTeachers([...teachers, newTeacher]);
    setForm({ name: "", subject: "", phone: "", email: "" });
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    setTeachers(
      teachers.map((t) =>
        t.id === currentTeacher.id ? { ...currentTeacher } : t,
      ),
    );
    setCurrentTeacher(null);
    setIsEditOpen(false);
  };

  const handleDelete = (teacher) => {
    if (window.confirm(`Delete ${teacher.name}?`)) {
      setTeachers(teachers.filter((t) => t.id !== teacher.id));
    }
  };

  const handleView = (teacher) => {
    setCurrentTeacher(teacher);
    setIsViewOpen(true);
  };
  const handleOpenEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setIsEditOpen(true);
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (isEditOpen) setCurrentTeacher({ ...currentTeacher, [name]: value });
    else setForm({ ...form, [name]: value });
  };

  // Table columns
  const columns = ["name", "subject", "phone", "email", "actions"];

  const data = teachers.map((teacher) => ({
    ...teacher,
    actions: (
      <>
        <Button onClick={() => handleView(teacher)}>See</Button>
        <Button variant="success" onClick={() => handleOpenEdit(teacher)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDelete(teacher)}>
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
        <h2>Teachers</h2>
        <Button variant="success" onClick={() => setIsAddOpen(true)}>
          Add Teacher
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
        <h3 style={{ marginBottom: "15px" }}>Add Teacher</h3>
        <Input
          name="name"
          value={form.name}
          onChange={handleFormChange}
          placeholder="Teacher Name"
        />
        <Select
          name="subject"
          value={form.subject}
          onChange={handleFormChange}
          options={subjectOptions}
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
        <h3 style={{ marginBottom: "15px" }}>View Teacher</h3>
        {currentTeacher && (
          <div>
            <p>
              <strong>Name:</strong> {currentTeacher.name}
            </p>
            <p>
              <strong>Subject:</strong> {currentTeacher.subject}
            </p>
            <p>
              <strong>Phone:</strong> {currentTeacher.phone}
            </p>
            <p>
              <strong>Email:</strong> {currentTeacher.email}
            </p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Edit Teacher</h3>
        {currentTeacher && (
          <>
            <Input
              label="Name"
              name="name"
              value={currentTeacher.name}
              onChange={handleFormChange}
            />
            <Select
              label="Subject"
              name="subject"
              value={currentTeacher.subject}
              onChange={handleFormChange}
              options={subjectOptions}
            />
            <Input
              label="Phone"
              name="phone"
              value={currentTeacher.phone}
              onChange={handleFormChange}
            />
            <Input
              label="Email"
              name="email"
              value={currentTeacher.email}
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

export default Teachers;

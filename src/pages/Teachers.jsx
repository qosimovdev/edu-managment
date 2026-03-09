import { useState, useEffect } from "react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import {
  getMentors,
  createMentor,
  // updateMentor,
  // deleteMentor,
} from "../api/mentor.service";

// const subjectOptions = [
//   { label: "Math", value: "Math" },
//   { label: "Physics", value: "Physics" },
//   { label: "Chemistry", value: "Chemistry" },
//   { label: "English", value: "English" },
// ];

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    subject: "",
    email: "",
    password: "",
  });

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await getMentors();
        setTeachers(res.mentors);
      } catch (err) {
        console.error("Fetch teachers error:", err);
        setError("Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (isEditOpen) setCurrentTeacher({ ...currentTeacher, [name]: value });
    else setForm({ ...form, [name]: value });
  };

  // CRUD handlers
  const handleAdd = async () => {
    try {
      const newTeacher = await createMentor(form);
      setTeachers([...teachers, newTeacher]);
      setForm({ fullName: "", subject: "", email: "", password: "" });
      setIsAddOpen(false);
    } catch (err) {
      console.error("Create teacher error:", err);
      // console.log(form);
      setError("Failed to add teacher");
    }
  };

  // const handleEdit = async () => {
  //   try {
  //     const updated = await updateMentor(currentTeacher.id, currentTeacher);
  //     setTeachers(teachers.map((t) => (t.id === updated.id ? updated : t)));
  //     setCurrentTeacher(null);
  //     setIsEditOpen(false);
  //   } catch (err) {
  //     console.error("Update teacher error:", err);
  //     setError("Failed to update teacher");
  //   }
  // };

  // const handleDelete = async (teacher) => {
  //   if (!window.confirm(`Delete ${teacher.name}?`)) return;
  //   try {
  //     await deleteMentor(teacher.id);
  //     setTeachers(teachers.filter((t) => t.id !== teacher.id));
  //   } catch (err) {
  //     console.error("Delete teacher error:", err);
  //     setError("Failed to delete teacher");
  //   }
  // };

  const handleView = (teacher) => {
    setCurrentTeacher(teacher);
    setIsViewOpen(true);
  };

  // const handleOpenEdit = (teacher) => {
  //   setCurrentTeacher(teacher);
  //   setIsEditOpen(true);
  // };

  // Table columns
  const columns = ["fullName", "subject", "email", "password", "actions"];
  const data = teachers.map((teacher) => ({
    ...teacher,
    actions: (
      <>
        <Button onClick={() => handleView(teacher)}>See</Button>
        {/* <Button variant="success" onClick={() => handleOpenEdit(teacher)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDelete(teacher)}>
          Delete
        </Button> */}
      </>
    ),
  }));

  if (loading) return <p>Loading teachers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
        style={{ background: "#1e293b", padding: "20px", borderRadius: "12px" }}
      >
        <Table columns={columns} data={data} />
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Add Teacher</h3>
        <Input
          name="fullName"
          value={form.fullName}
          onChange={handleFormChange}
          placeholder="Teacher Name"
        />
        {/* <Select
          name="subject"
          value={form.subject}
          onChange={handleFormChange}
          options={subjectOptions}
        /> */}
        <Input
          name="subject"
          value={form.subject}
          onChange={handleFormChange}
          placeholder="Subject"
        />
        <Input
          name="email"
          value={form.email}
          onChange={handleFormChange}
          placeholder="Email"
        />
        <Input
          name="password"
          value={form.password}
          onChange={handleFormChange}
          placeholder="Password"
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

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>View Teacher</h3>
        {currentTeacher && (
          <div>
            <p>
              <strong>Name:</strong> {currentTeacher.fullName}
            </p>
            <p>
              <strong>Subject:</strong> {currentTeacher.subject}
            </p>
            <p>
              <strong>Email:</strong> {currentTeacher.email}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Teachers;

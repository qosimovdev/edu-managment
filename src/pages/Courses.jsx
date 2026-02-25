import { useState } from "react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

function Courses() {
  const initialData = [
    { id: 1, name: "React Basics", duration: "4 weeks", price: "200$" },
    { id: 2, name: "Node.js Fundamentals", duration: "6 weeks", price: "250$" },
  ];

  const [courses, setCourses] = useState(initialData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const [form, setForm] = useState({ name: "", duration: "", price: "" });

  const handleAdd = () => {
    const newCourse = { ...form, id: Date.now() };
    setCourses([...courses, newCourse]);
    setForm({ name: "", duration: "", price: "" });
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    setCourses(
      courses.map((c) =>
        c.id === currentCourse.id ? { ...currentCourse } : c,
      ),
    );
    setCurrentCourse(null);
    setIsEditOpen(false);
  };

  const handleDelete = (course) => {
    if (window.confirm(`Delete ${course.name}?`)) {
      setCourses(courses.filter((c) => c.id !== course.id));
    }
  };

  const handleView = (course) => {
    setCurrentCourse(course);
    setIsViewOpen(true);
  };
  const handleOpenEdit = (course) => {
    setCurrentCourse(course);
    setIsEditOpen(true);
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (isEditOpen) setCurrentCourse({ ...currentCourse, [name]: value });
    else setForm({ ...form, [name]: value });
  };

  const columns = ["name", "duration", "price", "actions"];

  const data = courses.map((course) => ({
    ...course,
    actions: (
      <>
        <Button onClick={() => handleView(course)}>See</Button>
        <Button variant="success" onClick={() => handleOpenEdit(course)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDelete(course)}>
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
        <h2>Courses</h2>
        <Button variant="success" onClick={() => setIsAddOpen(true)}>
          Add Course
        </Button>
      </div>

      <div
        style={{ background: "#1e293b", padding: "20px", borderRadius: "12px" }}
      >
        <Table columns={columns} data={data} />
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Add Course</h3>
        <Input
          name="name"
          value={form.name}
          onChange={handleFormChange}
          placeholder="Name"
        />
        <Input
          name="duration"
          value={form.duration}
          onChange={handleFormChange}
          placeholder="Duration"
        />
        <Input
          name="price"
          value={form.price}
          onChange={handleFormChange}
          placeholder="Price"
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
        <h3 style={{ marginBottom: "15px" }}>View Course</h3>
        {currentCourse && (
          <>
            <p>
              <strong>Name:</strong> {currentCourse.name}
            </p>
            <p>
              <strong>Duration:</strong> {currentCourse.duration}
            </p>
            <p>
              <strong>Price:</strong> {currentCourse.price}
            </p>
          </>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Edit Course</h3>
        {currentCourse && (
          <>
            <Input
              label="Name"
              name="name"
              value={currentCourse.name}
              onChange={handleFormChange}
            />
            <Input
              label="Duration"
              name="duration"
              value={currentCourse.duration}
              onChange={handleFormChange}
            />
            <Input
              label="Price"
              name="price"
              value={currentCourse.price}
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

export default Courses;

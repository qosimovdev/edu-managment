import { useState } from "react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
// import {
//   getGroups,
//   createGroup,
//   updateGroup,
//   deleteGroup,
// } from "../api/group.service";

function Groups() {
  const initialData = [
    {
      id: 1,
      name: "Frontend Group A",
      course: "React Basics",
      teacher: "Olim",
    },
    {
      id: 2,
      name: "Backend Group B",
      course: "Node.js Fundamentals",
      teacher: "Mira",
    },
  ];

  const courseOptions = [
    { label: "React Basics", value: "React Basics" },
    { label: "Node.js Fundamentals", value: "Node.js Fundamentals" },
  ];

  const teacherOptions = [
    { label: "Olim", value: "Olim" },
    { label: "Mira", value: "Mira" },
  ];

  const [groups, setGroups] = useState(initialData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);

  const [form, setForm] = useState({
    name: "",
    course: "",
    mentorId: "2",
  });

  const handleAdd = () => {
    const newGroup = { ...form, id: Date.now() };
    setGroups([...groups, newGroup]);
    setForm({ name: "", course: "", teacher: "" });
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    setGroups(
      groups.map((g) => (g.id === currentGroup.id ? { ...currentGroup } : g)),
    );
    setCurrentGroup(null);
    setIsEditOpen(false);
  };

  const handleDelete = (group) => {
    if (window.confirm(`Delete ${group.name}?`)) {
      setGroups(groups.filter((g) => g.id !== group.id));
    }
  };

  const handleView = (group) => {
    setCurrentGroup(group);
    setIsViewOpen(true);
  };
  const handleOpenEdit = (group) => {
    setCurrentGroup(group);
    setIsEditOpen(true);
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (isEditOpen) setCurrentGroup({ ...currentGroup, [name]: value });
    else setForm({ ...form, [name]: value });
  };

  const columns = ["name", "course", "teacher", "actions"];

  const data = groups.map((group) => ({
    ...group,
    actions: (
      <>
        <Button onClick={() => handleView(group)}>See</Button>
        <Button variant="success" onClick={() => handleOpenEdit(group)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDelete(group)}>
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
        <h2>Groups</h2>
        <Button variant="success" onClick={() => setIsAddOpen(true)}>
          Add Group
        </Button>
      </div>

      <div
        style={{ background: "#1e293b", padding: "20px", borderRadius: "12px" }}
      >
        <Table columns={columns} data={data} />
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Add Group</h3>
        <Input
          name="name"
          value={form.name}
          onChange={handleFormChange}
          placeholder="Group Name"
        />
        <Select
          name="course"
          value={form.course}
          onChange={handleFormChange}
          options={courseOptions}
          placeholder="Select Course"
        />
        <Select
          name="teacher"
          value={form.teacher}
          onChange={handleFormChange}
          options={teacherOptions}
          placeholder="Select Teacher"
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
        <h3 style={{ marginBottom: "15px" }}>View Group</h3>
        {currentGroup && (
          <>
            <p>
              <strong>Name:</strong> {currentGroup.name}
            </p>
            <p>
              <strong>Course:</strong> {currentGroup.course}
            </p>
            <p>
              <strong>Teacher:</strong> {currentGroup.teacher}
            </p>
          </>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Edit Group</h3>
        {currentGroup && (
          <>
            <Input
              label="Group Name"
              name="name"
              value={currentGroup.name}
              onChange={handleFormChange}
            />
            <Select
              label="Course"
              name="course"
              value={currentGroup.course}
              onChange={handleFormChange}
              options={courseOptions}
            />
            <Select
              label="Teacher"
              name="teacher"
              value={currentGroup.teacher}
              onChange={handleFormChange}
              options={teacherOptions}
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

export default Groups;

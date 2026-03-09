import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../api/group.service";

import { getMentors } from "../api/mentor.service";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [form, setForm] = useState({
    name: "",
    mentorId: "",
    startDate: "",
    schedule: "",
    status: "active",
  });

  const fetchGroups = async () => {
    try {
      const data = await getGroups();
      setGroups(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMentors = async () => {
    try {
      const data2 = await getMentors();

      const options = data2.mentors.map((m) => ({
        label: m.fullName,
        value: m.id,
      }));

      setMentors(options);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchMentors();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (isEditOpen) {
      setCurrentGroup({ ...currentGroup, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAdd = async () => {
    try {
      const group = await createGroup(form);
      setGroups([group, ...groups]);
      setForm({
        name: "",
        mentorId: "",
        startDate: "",
        schedule: "",
        status: "active",
      });
      setIsAddOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      const updated = await updateGroup(currentGroup.id, currentGroup);
      setGroups(groups.map((g) => (g.id === updated.id ? updated : g)));
      setIsEditOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (group) => {
    if (!window.confirm("Delete group?")) return;
    await deleteGroup(group.id);
    setGroups(groups.filter((g) => g.id !== group.id));
  };

  const columns = [
    "name",
    "mentor",
    "students",
    "schedule",
    "status",
    "actions",
  ];

  const data = groups.map((g) => ({
    ...g,
    mentor: g.mentor?.fullName || "-",
    students: g.students?.length || 0,
    actions: (
      <>
        <Button
          variant="success"
          onClick={() => {
            setCurrentGroup(g);
            setIsEditOpen(true);
          }}
        >
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDelete(g)}>
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
      {/* ADD */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h3>Add Group</h3>
        <Input
          name="name"
          value={form.name}
          onChange={handleFormChange}
          placeholder="Group name"
        />
        <Select
          name="mentorId"
          value={form.mentorId}
          onChange={handleFormChange}
          options={mentors}
          placeholder="Select mentor"
        />
        <Input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleFormChange}
        />
        <Input
          name="schedule"
          value={form.schedule}
          onChange={handleFormChange}
          placeholder="Mon Wed Fri"
        />
        <Select
          name="status"
          value={form.status}
          onChange={handleFormChange}
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
        <div
          style={{
            transform: "translate(-75px, 62px)",
            textAlign: "right",
          }}
        >
          <Button variant="success" onClick={handleAdd}>
            Create
          </Button>
        </div>
      </Modal>

      {/* EDIT */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h3>Edit Group</h3>
        {currentGroup && (
          <>
            <Input
              name="name"
              value={currentGroup.name}
              onChange={handleFormChange}
            />
            <Select
              name="mentorId"
              value={currentGroup.mentorId}
              onChange={handleFormChange}
              options={mentors}
            />
            <Input
              type="date"
              name="startDate"
              value={currentGroup.startDate || ""}
              onChange={handleFormChange}
            />
            <Input
              name="schedule"
              value={currentGroup.schedule || ""}
              onChange={handleFormChange}
            />
            <Select
              name="status"
              value={currentGroup.status}
              onChange={handleFormChange}
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
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

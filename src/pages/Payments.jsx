import { useState } from "react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

function Payments() {
  const initialData = [
    {
      id: 1,
      student: "Ali",
      amount: "200$",
      date: "2026-02-01",
      method: "Card",
    },
    {
      id: 2,
      student: "Vali",
      amount: "250$",
      date: "2026-02-03",
      method: "Cash",
    },
  ];

  const paymentMethods = [
    { label: "Cash", value: "Cash" },
    { label: "Card", value: "Card" },
    { label: "Online", value: "Online" },
  ];

  const [payments, setPayments] = useState(initialData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);

  const [form, setForm] = useState({
    student: "",
    amount: "",
    date: "",
    method: "",
  });

  const handleAdd = () => {
    const newPayment = { ...form, id: Date.now() };
    setPayments([...payments, newPayment]);
    setForm({ student: "", amount: "", date: "", method: "" });
    setIsAddOpen(false);
  };

  //   const handleEdit = () => {
  //     setPayments(
  //       payments.map((p) =>
  //         p.id === currentPayment.id ? { ...currentPayment } : p,
  //       ),
  //     );
  //     setCurrentPayment(null);
  //     setIsEditOpen(false);
  //   };

  const handleDelete = (payment) => {
    if (window.confirm(`Delete payment of ${payment.student}?`)) {
      setPayments(payments.filter((p) => p.id !== payment.id));
    }
  };

  const handleView = (payment) => {
    setCurrentPayment(payment);
    setIsViewOpen(true);
  };
  //   const handleOpenEdit = (payment) => {
  //     setCurrentPayment(payment);
  //     setIsEditOpen(true);
  //   };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (isEditOpen) setCurrentPayment({ ...currentPayment, [name]: value });
    else setForm({ ...form, [name]: value });
  };

  const columns = ["student", "amount", "date", "method", "actions"];

  const data = payments.map((payment) => ({
    ...payment,
    actions: (
      <>
        <Button onClick={() => handleView(payment)}>See</Button>
        {/* <Button variant="success" onClick={() => handleOpenEdit(payment)}>
          Edit
        </Button> */}
        <Button variant="danger" onClick={() => handleDelete(payment)}>
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
        <h2>Payments</h2>
        <Button variant="success" onClick={() => setIsAddOpen(true)}>
          Add Payment
        </Button>
      </div>

      <div
        style={{ background: "#1e293b", padding: "20px", borderRadius: "12px" }}
      >
        <Table columns={columns} data={data} />
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Add Payment</h3>
        <Input
          name="student"
          value={form.student}
          onChange={handleFormChange}
          placeholder="Student"
        />
        <Input
          name="amount"
          value={form.amount}
          onChange={handleFormChange}
          placeholder="Amount"
        />
        <Input
          name="date"
          type="date"
          value={form.date}
          onChange={handleFormChange}
          placeholder="Date"
        />
        <Select
          name="method"
          value={form.method}
          onChange={handleFormChange}
          options={paymentMethods}
          placeholder="Payment Method"
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
        <h3 style={{ marginBottom: "15px" }}>View Payment</h3>
        {currentPayment && (
          <>
            <p>
              <strong>Student:</strong> {currentPayment.student}
            </p>
            <p>
              <strong>Amount:</strong> {currentPayment.amount}
            </p>
            <p>
              <strong>Date:</strong> {currentPayment.date}
            </p>
            <p>
              <strong>Method:</strong> {currentPayment.method}
            </p>
          </>
        )}
      </Modal>

      {/* Edit Modal */}
      {/* <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h3 style={{ marginBottom: "15px" }}>Edit Payment</h3>
        {currentPayment && (
          <>
            <Input
              name="student"
              value={currentPayment.student}
              onChange={handleFormChange}
              placeholder="Student"
            />
            <Input
              name="amount"
              value={currentPayment.amount}
              onChange={handleFormChange}
              placeholder="Amount"
            />
            <Input
              name="date"
              type="date"
              value={currentPayment.date}
              onChange={handleFormChange}
              placeholder="Date"
            />
            <Select
              name="method"
              value={currentPayment.method}
              onChange={handleFormChange}
              options={paymentMethods}
              placeholder="Payment Method"
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
      </Modal> */}
    </div>
  );
}

export default Payments;

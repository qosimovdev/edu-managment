import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { getPayments, createPayment } from "../api/payment.service";
import { getStudents } from "../api/students.service";

function Payments() {
  const paymentMethods = [
    { label: "Cash", value: "cash" },
    { label: "Card", value: "card" },
    { label: "Online", value: "online" },
  ];

  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);

  const [form, setForm] = useState({
    studentId: "",
    amount: "",
    paymentDate: "",
    method: "",
  });

  // Fetch payments va students
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getPayments();
        setPayments(res || []);
      } catch (err) {
        console.error("Fetch payments error:", err);
      }
    };

    const fetchStudents = async () => {
      try {
        const res = await getStudents();
        setStudents(res || []);
      } catch (err) {
        console.error("Fetch students error:", err);
      }
    };

    fetchPayments();
    fetchStudents();
  }, []);

  const handleAdd = async () => {
    try {
      if (
        !form.studentId ||
        !form.amount ||
        !form.paymentDate ||
        !form.method
      ) {
        alert("Please fill all fields");
        return;
      }
      const res = await createPayment(form);
      setPayments([res.payment, ...payments]);
      setForm({ studentId: "", amount: "", paymentDate: "", method: "" });
      setIsAddOpen(false);
    } catch (err) {
      console.error("Create payment error:", err);
    }
  };

  const handleView = (payment) => {
    setCurrentPayment(payment);
    setIsViewOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const columns = ["student", "amount", "date", "method", "actions"];
  const data = (payments || []).map((p) => ({
    id: p?.id,
    student: p?.student?.fullName || `ID: ${p?.studentId}`,
    amount: p?.amount,
    date: p?.paymentDate?.split("T")[0] || "",
    method: p?.method,
    actions: (
      <>
        <Button onClick={() => handleView(p)}>See</Button>
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
        <Select
          name="studentId"
          value={form.studentId}
          onChange={handleFormChange}
          options={(students || []).map((s) => ({
            label: s.fullName,
            value: s.id,
          }))}
          placeholder="Select Student"
        />
        <Input
          name="amount"
          value={form.amount}
          onChange={handleFormChange}
          placeholder="Amount"
        />
        <Input
          name="paymentDate"
          type="date"
          value={form.paymentDate}
          onChange={handleFormChange}
          placeholder="Payment Date"
        />
        <Select
          name="method"
          value={form.method}
          onChange={handleFormChange}
          options={paymentMethods}
          placeholder="Payment Method"
        />
        <div style={{ textAlign: "right", marginTop: "15px" }}>
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
              <strong>Student:</strong>{" "}
              {currentPayment.student?.fullName ||
                `ID: ${currentPayment.studentId}`}
            </p>
            <p>
              <strong>Amount:</strong> {currentPayment.amount}
            </p>
            <p>
              <strong>Date:</strong> {currentPayment.paymentDate?.split("T")[0]}
            </p>
            <p>
              <strong>Method:</strong> {currentPayment.method}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Payments;

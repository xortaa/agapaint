import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Appointment, Payments } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";

function ServiceStatus({
  payment,
  appointment,
  setActiveAppointments,
  setCurrentBalance,
}: {
  payment: Payments;
  appointment: Appointment;
  setActiveAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  setCurrentBalance: React.Dispatch<React.SetStateAction<number>>;
}) {
  // Service Status
  const [selectedOption, setSelectedOption] = useState(payment.status);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    const updatePaymentStatus = new Promise((resolve, reject) => {
      const data = { status: event.target.value };
      axios
        .patch(`/api/appointment/${appointment._id}/payment/${payment._id}`, data)
        .then((res) => {
          setActiveAppointments((prev) =>
            prev.map((appointment) => (appointment._id === res.data._id ? res.data : appointment))
          );

          // Calculate the new balance
          let newBalance = appointment.currentBalance;
          if (payment.status === "Unpaid" && event.target.value === "Paid") {
            newBalance -= payment.amount;
          } else if (payment.status === "Paid" && event.target.value === "Unpaid") {
            newBalance += payment.amount;
          }

          // Update the current balance
          setCurrentBalance(newBalance);

          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to update payment status", error);
          reject(error);
        });
    });

    toast.promise(updatePaymentStatus, {
      pending: "Updating payment status...",
      success: "Payment status updated successfully",
      error: "Failed to update payment status",
    });
  };

  const [maxOptionLength, setMaxOptionLength] = useState(0);

  useEffect(() => {
    const options = ["Unpaid", "Paid"];
    const maxLength = Math.max(...options.map((option) => option.length));
    setMaxOptionLength(maxLength);
  }, []);

  const getColor = () => {
    return selectedOption === "Paid" ? "text-success" : "text-danger";
  };
  return (
    <div>
      <Form.Select
        value={selectedOption}
        onChange={handleChange}
        className={`fw-bold ${getColor()} `}
        style={{ width: `${maxOptionLength}em` }}
        size="sm"
      >
        <option value="Unpaid" className="text-danger fw-bold small">
          Unpaid
        </option>
        <option value="Paid" className="text-success fw-bold small">
          Paid
        </option>
      </Form.Select>
    </div>
  );
}

export default ServiceStatus;

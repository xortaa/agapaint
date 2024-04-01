import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Appointment } from "../types";
import axios from "axios";
import { toast } from "react-toastify";

function ServiceStatus({
  width,
  option,
  setActiveAppointments,
  appointment,
}: {
  width: string;
  option: string;
  setActiveAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  appointment: Appointment;
}) {
  // Service Status
  const [selectedOption, setSelectedOption] = useState(option);

  useEffect(() => {
    setSelectedOption(option);
  }, [option]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    const data = { status: event.target.value };

    const updateStatus = new Promise((resolve, reject) => {
      axios
        .patch(`/api/appointment/${appointment._id}`, data)
        .then((res) => {
          setActiveAppointments((prev) =>
            prev.map((appointment) => (appointment._id === res.data._id ? res.data : appointment))
          );
          resolve(res);
        })
        .catch((error) => {
          console.error("Failed to update status", error);
          reject(error);
        });
    });

    toast.promise(updateStatus, {
      pending: "Updating status...",
      success: "Status updated!",
      error: "Failed to update status",
    });
  };

  const getColor = () => {
    switch (selectedOption) {
      case "Complete":
        return "text-success";
      case "For Release":
        return "text-info";
      case "Ongoing":
        return "text-warning";
      case "Awaiting Payment":
        return "text-secondary";
      default:
        return "text-danger";
    }
  };

  return (
    <Form.Select
      value={selectedOption}
      onChange={handleChange}
      className={`fw-bold ${getColor()} `}
      style={{ width: width as string }}
      size="sm"
    >
      <option value="Pending" className="text-danger fw-bold">
        Pending
      </option>
      <option value="Awaiting Payment" className="text-secondary fw-bold">
        Awaiting Payment
      </option>
      <option value="Ongoing" className="text-warning fw-bold">
        Ongoing
      </option>
      <option value="For Release" className="text-info fw-bold">
        For Release
      </option>
      <option value="Complete" className="text-success fw-bold">
        Complete
      </option>
    </Form.Select>
  );
}

export default ServiceStatus;

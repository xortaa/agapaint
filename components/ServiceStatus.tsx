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
          if (event.target.value === "Complete") {
            handleCompletedAppointment();
          }
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

  const handleCompletedAppointment = () => {
    const CompleteAppointment = new Promise<void>((resolve, reject) => {
      const emailData = {
        nanoid: appointment.nanoid,
        carManufacturer: appointment.carManufacturer,
        carModel: appointment.carModel,
        email: appointment.email,
      };

      axios
        .post("/api/email/completed", emailData)
        .then((emailRes) => {
          console.log(emailRes.data);
          resolve(); // resolve the promise when the axios request is successful
        })
        .catch((error) => {
          console.error("Failed to send email", error);
          reject(error); // reject the promise if the axios request fails
        });
    });

    toast.promise(CompleteAppointment, {
      pending: "Sending Appointment Completed email...",
      success: "Appointment Completed email has been sent to the customer.",
      error: "Failed to send Appointment Completed email, Please try again.",
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

  return selectedOption === "Awaiting Payment" || selectedOption === "Pending" ? (
    <p className={`fw-bold small ${getColor()} lh-05 mb-0`}>{selectedOption}</p>
  ) : (
    <Form.Select
      value={selectedOption}
      onChange={handleChange}
      className={`fw-bold ${getColor()} `}
      style={{ width: width as string }}
      size="sm"
    >
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

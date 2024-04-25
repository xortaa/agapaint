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
    error: "Failed to update status",
  });

  const handleCompletedAppointment = () => {
    const CompleteAppointment = new Promise<string>((resolve, reject) => {
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
          setSelectedOption(event.target.value);
          resolve("Updated status, Appointment Completed email has been sent to the customer.");
        })
        .catch((error) => {
          console.error("Failed to send email", error);
          reject(error);
        });
    });

    toast.promise(CompleteAppointment, {
      pending: "Sending Appointment Completed email...",
      success: "Appointment Completed email sent!",
      error: "Failed to send Appointment Completed email, Please try again.",
    });
  };

  const handleForReleaseAppointment = () => {
    const forReleaseAppointment = new Promise<string>((resolve, reject) => {
      const date = new Date(appointment.date);
      const formattedDate = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getDate()} ${date.getFullYear()}`;

      const emailData = {
        nanoid: appointment.nanoid,
        email: appointment.email,
        date: formattedDate,
        time: appointment.time,
        paymentTerm: appointment.paymentTerm,
        startingBalance: appointment.startingBalance,
        currentBalance: appointment.currentBalance,
        carManufacturer: appointment.carManufacturer,
        carModel: appointment.carModel,
        url: `${process.env.NEXT_PUBLIC_URL}/customer/appointment/payment?id=${appointment._id}`,
        payments: appointment.payments,
      };

      if (appointment.paymentTerm === "Partial") {
        axios.post("/api/email/forReleasePartialPayment", emailData).then((emailRes) => {
          console.log(emailRes.data);
          setSelectedOption(event.target.value);
          resolve("Updated status, For Release email sent!");
        });
      } else if (appointment.paymentTerm === "Full") {
        axios.post("/api/email/forReleaseFullPayment", emailData).then((emailRes) => {
          console.log(emailRes.data);
          setSelectedOption(event.target.value);
          resolve("Updated status, For Release email sent!");
        });
      }
    });

    toast.promise(forReleaseAppointment, {
      pending: "Sending For Release email...",
      success: "For Release email sent!",
      error: "Failed to send For Release email, Please try again.",
    });
  };

  if (event.target.value === "Complete") {
    handleCompletedAppointment();
  }
  if (event.target.value === "For Release") {
    handleForReleaseAppointment();
  }
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

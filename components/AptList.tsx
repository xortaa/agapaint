import React from "react";
import { Table, Badge } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";
import StatusBadge from "@/components/StatusBadge";
import { Appointment } from "@/types";

function AptList({ onClick, appointment }: { onClick: () => void; appointment: Appointment }) {
  const date = new Date(appointment.date);
  const formattedDate = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;
  const month = date.toLocaleString("default", { month: "short" }); // Month (MMM)
  const day = date.getDate(); // Day (DD)
  const year = date.getFullYear(); // Year (YYYY)

  //time 12-hour format AM PM
  const appointmentDate = new Date(`1970-01-01T${appointment.time}:00+08:00`);
  const formattedTime = appointmentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <tr onClick={onClick}>
      {/* Appointment Id */}
      <td>1</td>
      {/* Date */}
      <td>
        <div className="lh-1 d-flex flex-column align-items-center">
          <p className="text-dark small m-0" style={{ fontSize: "0.8rem" }}>
            {month}
          </p>
          <p className="fw-bold fs-4 m-0">{day}</p>
          <p className="text-secondary small m-0" style={{ fontSize: "0.7rem" }}>
            {year}
          </p>
        </div>
      </td>
      {/* Appointment: Car Manuf and Car Model && Time */}
      <td>
        <div>
          <p className="fw-semibold m-0">{`${appointment.carManufacturer} ${appointment.carModel} ${appointment.plateNumber}`}</p>
          <p className="text-secondary m-0" style={{ fontSize: "0.85rem" }}>
            {formattedTime} •{" "}
            {appointment.servicesId.slice(0, 3).map((service, index) => (
              <span key={index}>{service.name}</span>
            ))}
            {appointment.servicesId.length > 3 && <span>...</span>}
          </p>
        </div>
      </td>
      {/* Status */}
      <td className="text-center">
        <StatusBadge status={appointment.status as "Pending" | "Ongoing" | "For Release" | "Complete"} />
      </td>
      {/* Payment */}
      <td>
        <div className="lh-sm d-flex flex-column align-items-end">
          <p className="fw-semibold m-0">₱{appointment.servicesId.reduce((acc, service) => acc + service.price, 0)}</p>
          <p className="text-secondary m-0" style={{ fontSize: "0.85rem" }}>
            {appointment.paymentTerm}
          </p>
        </div>
      </td>
    </tr>
  );
}

export default AptList;
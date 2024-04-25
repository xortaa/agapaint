import React from "react";
import { Badge } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

interface StatusBadgeProps {
  status: "Pending" | "Awaiting Payment" | "Ongoing" | "For Release" | "Complete" | "Cancelled";
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bg, text, icon;

  switch (status) {
    case "Pending":
      bg = "danger-subtle";
      text = "text-danger-emphasis";
      break;
    case "Awaiting Payment":
      bg = "warning-subtle";
      text = "text-secondary-emphasis";
      break;
    case "Ongoing":
      bg = "warning-subtle";
      text = "text-warning-emphasis";
      break;
    case "For Release":
      bg = "info-subtle";
      text = "text-info-emphasis";
      break;
    case "Complete":
      bg = "success-subtle";
      text = "text-success-emphasis";
      icon = <CheckCircleFill className="text-success me-1" />;
      break;
    case "Cancelled":
      bg = "danger";
      text = "text-white";
      break;
    default:
      bg = "danger";
      text = "text-danger-emphasis";
  }

  return (
    <Badge bg={bg} className={`${text} p-2 d-inline-flex align-items-center`}>
      {icon}
      <span>{status}</span>
    </Badge>
  );
};

export default StatusBadge;

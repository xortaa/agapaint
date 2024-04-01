import React from "react";
import { Badge } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

interface PaymentStatusBadgeProps {
  status: "Unpaid" | "Paid";
}

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
  let bg, text, icon;

  switch (status) {
    case "Unpaid":
      bg = "warning-subtle";
      text = "text-warning-emphasis";
      break;
    case "Paid":
      bg = "success-subtle";
      text = "text-success-emphasis";
      icon = <CheckCircleFill className="text-success me-1" />;
      break;
    default:
      bg = "secondary";
      text = "text-secondary";
  }

  return (
    <Badge bg={bg} pill className={`${text} p-2 d-inline-flex align-items-center`}>
      {icon}
      <span>{status}</span>
    </Badge>
  );
};

export default PaymentStatusBadge;

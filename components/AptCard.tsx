import { Container, Row, Col, Image, Table, Badge, InputGroup, Card } from "react-bootstrap";
import custaptStyles from "@/styles/custapt.module.scss";
import { Appointment } from "@/types";
import StatusBadge from "@/components/StatusBadge";

function AptCard({ onClick, appointment }: { onClick: () => void; appointment: Appointment }) {
  const date = new Date(appointment.date);
  const formattedDate = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;
  //time 12-hour format AM PM
  const appointmentDate = new Date(`1970-01-01T${appointment.time}:00+08:00`);
  const formattedTime = appointmentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Col lg={4} md={6} sm={12}>
      <Card className={`${custaptStyles.card} p-2`} onClick={onClick} style={{ borderRadius: "18px" }}>
        <Card.Body className="lh-sm">
          <div className="d-flex justify-content-between mb-3">
            <StatusBadge status={appointment.status as "Pending" | "Ongoing" | "For Release" | "Complete"} />
            <p className="fst-italic small">APT#1</p>
          </div>
          <p className="fs-5 fw-semibold mb-0">{formattedDate}</p>
          <p className="text-secondary fw-medium">{formattedTime}</p>
          <hr />
          <p className="fw-semibold small mb-2">{`${appointment.carManufacturer} ${appointment.carModel} ${appointment.plateNumber}`}</p>
          <p className="small fw-semibold mb-0">Services Availed</p>
          {appointment.servicesId.slice(0, 3).map((service, index) => (
            <span className="small text-secondary mb-1" key={index}>
              {service.name},
            </span>
          ))}
          {appointment.servicesId.length > 3 && <span>...</span>}
          <hr />
          <p className="text-secondary small mb-2">{appointment.paymentTerm} Payment Term</p>
          <p className="fw-semibold small mb-0">
            Total Amount: ₱{appointment.servicesId.reduce((acc, service) => acc + service.price, 0)}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AptCard;

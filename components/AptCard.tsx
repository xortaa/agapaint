import { Container, Row, Col, Image, Table, Badge, InputGroup, Card } from "react-bootstrap";
import custaptStyles from "@/styles/custapt.module.scss";
import { Appointment } from "@/types";

function AptCard({ onClick, appointment }: { onClick: () => void; appointment: Appointment }) {
  const date = new Date(appointment.date);
  const formattedDate = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <Col lg={4} md={6} sm={12}>
      <Card className={`${custaptStyles.card} p-2`} onClick={onClick}>
        <Card.Body>
          <h6 className="fst-italic">{appointment._id}</h6>
          <h3 className="fw-bold">{formattedDate}</h3>
          <h4 className="fw-medium">{appointment.time}</h4>
          <hr />
          <Row className="justify-content-between">
            <Col>
              <p>Car Info:</p>
            </Col>
            <Col className="text-end">
              <p className="fw-bold">{`${appointment.carManufacturer} ${appointment.carModel}`}</p>
            </Col>
          </Row>

          <Row className="justify-content-between">
            <Col>
              <p>Plate#</p>
            </Col>
            <Col className="text-end">
              <p className="fw-bold">{appointment.plateNumber}</p>
            </Col>
          </Row>

          <Row className="justify-content-between">
            <Col>
              <p>Services</p>
            </Col>
            <Col className="text-end">
              {appointment.servicesId.map((service) => (
                <p className="fw-bold">{service.name}</p>
              ))}
            </Col>
          </Row>

          <hr />

          <Row className="justify-content-between">
            <Col>
              <p>Payment Term:</p>
            </Col>
            <Col className="text-end">
              <p className="fw-bold">{appointment.paymentTerm}</p>
            </Col>
          </Row>

          <Row className="justify-content-between">
            <Col>
              <p>Total Service Amount:</p>
            </Col>
            <Col className="text-end">
              <p className="fw-bold">{appointment.servicesId.reduce((acc, service) => acc + service.price, 0)}</p>
            </Col>
          </Row>

          <hr />

          <Row className="justify-content-between">
            <Col>
              <p>Service Status:</p>
            </Col>
            <Col>
              <InputGroup className="justify-content-end">
                <InputGroup.Text
                  className={`fw-bold ${
                    appointment.status === "Ongoing"
                      ? "text-primary"
                      : appointment.status === "Complete"
                      ? "text-success"
                      : appointment.status === "For Release"
                      ? "text-info"
                      : "text-danger"
                  }`}
                >
                  {appointment.status}
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AptCard;

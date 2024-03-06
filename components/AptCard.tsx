import { Container, Row, Col, Image, Table, Badge, InputGroup, Card } from "react-bootstrap";
import custaptStyles from "@/styles/custapt.module.scss";

function AptCard({
  onClick,
  aptId,
  aptDate,
  aptTime,
  carInfo,
  plateNo,
  paymentTerm,
  totalServiceAmount,
  serviceStatus,
}) {
  return (
    <Col lg={4} md={6} sm={12}>
      <Card className={`${custaptStyles.card} p-2`} onClick={onClick}>
        <Card.Body>
          <h6 className="fst-italic">{aptId}</h6>
          <h3 className="fw-bold">{aptDate}</h3>
          <h4 className="fw-medium">{aptTime}</h4>
          <hr />
          <Row className="justify-content-between">
            <Col>
              <p>Car Info:</p>
            </Col>
            <Col className="text-end">
              <p className="fw-bold">{carInfo}</p>
            </Col>
          </Row>

          <Row className="justify-content-between">
            <Col>
              <p>Plate#</p>
            </Col>
            <Col className="text-end">
              <p className="fw-bold">{plateNo}</p>
            </Col>
          </Row>

          <Row className="justify-content-between">
            <Col>
              <p>Services</p>
            </Col>
            <Col className="text-end">
              <p className="fw-bold">Services Placeholder</p>
            </Col>
          </Row>

          <hr />

          <Row className="justify-content-between">
            <Col>
              <p>Payment Term:</p>
            </Col>
            <Col className="text-end">
              <p className="fw-bold">{paymentTerm}</p>
            </Col>
          </Row>

          <Row className="justify-content-between">
            <Col>
              <p>Total Service Amount:</p>
            </Col>
            <Col className="text-end">
              <p className="fw-bold">{totalServiceAmount}</p>
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
                    serviceStatus === "Ongoing"
                      ? "text-primary"
                      : serviceStatus === "Complete"
                      ? "text-success"
                      : serviceStatus === "For Release"
                      ? "text-info"
                      : "text-danger"
                  }`}
                >
                  {serviceStatus}
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

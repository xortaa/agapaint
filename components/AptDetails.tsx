import { Col, Row, Card, Table, Modal, Button, Accordion, Form } from "react-bootstrap";
import { InboxFill, CarFrontFill, GearWideConnected } from "react-bootstrap-icons";

import { useState } from "react";
import ServiceStatus from "@/components/ServiceStatus";
import PaymentStatus from "@/components/PaymentStatus";
import { Appointment } from "@/types";

function AptDetails({ appointment }: { appointment: Appointment }) {
  //   Archive Modal
  const [smShow, setSmShow] = useState(false);
  const handleCloseModal = () => setSmShow(false);

  return (
    <>
      <Col sm={3}>
        <Card className="border-0 shadow-sm p-1" style={{ fontSize: "14px" }}>
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="fw-bold mb-0">Appointment Details</h4>
              <InboxFill size={24} className="me-2 text-danger" onClick={() => setSmShow(true)} />
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold me-3">1</h4>
              <ServiceStatus width="43%" option={appointment.status} />
            </div>
            <hr />
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Date</p>
              <p className="ms-auto">{appointment.date.split("T")[0]}</p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Time</p>
              <p className="ms-auto">{appointment.time}</p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Customer</p>
              <p className="ms-auto">
                {appointment.firstName} {appointment.lastName}
              </p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Email</p>
              <p className="ms-auto">
                <a href="mailto:malizalde@gmail.com" className="text-decoration-none text-dark">
                  {appointment.email}
                </a>
              </p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Contact</p>
              <p className="ms-auto">{appointment.phoneNumber}</p>
            </Row>
            <p className="fw-bold">Requests</p>
            <p className="ms-auto">{appointment.requests}</p>

            <hr />
            <Row className="align-items-center justify-content-between lh-1">
              <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <CarFrontFill className="me-2 text-secondary" size={20} />
                    Vehicle Information
                  </Accordion.Header>
                  <Accordion.Body className="pb-0">
                    <Row xs="auto" className="lh-05">
                      <p className="text-secondary">Vehicle Model</p>
                      <p className="ms-auto">{appointment.carModel}</p>
                    </Row>
                    <Row xs="auto" className="lh-05">
                      <p className="text-secondary">Vehicle Type</p>
                      <p className="ms-auto">{appointment.carType}</p>
                    </Row>
                    <Row xs="auto" className="lh-05">
                      <p className="text-secondary">Vehicle Color</p>
                      <p className="ms-auto">{appointment.carColor}</p>
                    </Row>
                    <Row xs="auto" className="lh-05">
                      <p className="text-secondary">Plate#</p>
                      <p className="ms-auto">{appointment.plateNumber}</p>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="p-0 shadow-sm">
                  <Accordion.Header>
                    <GearWideConnected className="me-2 text-secondary" size={20} />
                    Services Availed
                  </Accordion.Header>
                  <Accordion.Body className="small pb-0">
                    {appointment.servicesId.map((service) => (
                      <Row xs="auto" className="lh-05 text-secondary" key={service._id}>
                        <p>{service.name}</p>
                        <p className="ms-auto">{service.price}</p>
                      </Row>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Form.Group controlId="dob" style={{ marginLeft: "auto" }}>
                <Form.Label className="mt-3 mb-1 small">Target End Date</Form.Label>
                <Form.Control type="date" name="dob" placeholder="Target End Date" size="sm" />
              </Form.Group>
            </Row>
            <hr />
            <Row className="align-items-center justify-content-between mb-2">
              <Col xs="auto" className="lh-05 fw-bold">
                <p>Payment Term</p>
                <p className="m-0">Remaining Balance</p>
              </Col>
              <Col xs="auto" className="lh-05 text-end">
                <p>{appointment.paymentTerm}</p>
                <p className="m-0 fs-5 fw-bold">{appointment.currentBalance}</p>
              </Col>
            </Row>

            <p className="fs-5 agapaint-yellow m-0">Breakdown</p>
            <Table striped responsive style={{ fontSize: "13px" }} className="align-middle">
              <thead>
                <tr>
                  <th>Term</th>
                  <th>%</th>
                  <th>Amount</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st</td>
                  <td>50%</td>
                  <td>{appointment.startingBalance * 0.5}</td>
                  <td>
                    <PaymentStatus />
                  </td>
                </tr>
                <tr>
                  <td>2nd</td>
                  <td>25%</td>
                  <td>{appointment.startingBalance * 0.25}</td>
                  <td>
                    <PaymentStatus />
                  </td>
                </tr>
                <tr>
                  <td>3rd</td>
                  <td>25%</td>
                  <td>{appointment.startingBalance * 0.25}</td>
                  <td>
                    <PaymentStatus />
                  </td>
                </tr>
              </tbody>
            </Table>
            <Row className="align-items-center justify-content-between mb-2">
              <Col xs="auto" className="lh-1 fw-bold">
                <p className="m-0 fs-6">Total Service Amount</p>
              </Col>
              <Col xs="auto" className="lh-1 text-end">
                <p className="m-0 fs-5 fw-bold">{appointment.startingBalance}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="archive-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Archive Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-4">Are you sure you want to archive?</p>
          <div className="lh-05">
            <p>Appointment Id: Placeholder</p>
            <p>Customer: Placeholder</p>
            <p>Service Status: Placeholder</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={() => console.log("Archive")}>
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AptDetails;

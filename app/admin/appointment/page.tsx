"use client";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Table,
  Badge,
  InputGroup,
  Card,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Filter, Search, BoxSeam, InboxFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import AdminHeader from "@/components/AdminHeader";

function manageAppointment() {
  // Service Status
  const [color, setColor] = useState("fw-bold");

  const handleChange = (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
      case "Pending":
        setColor("text-danger");
        break;
      case "Ongoing":
        setColor("text-warning fw-bold");
        break;
      case "For Release":
        setColor("text-info fw-bold");
        break;
      case "Complete":
        setColor("text-success fw-bold");
        break;
      default:
        setColor("fw-bold");
    }
  };

  // Show Appointment Detail
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("tr") && event.target.closest("Card")) {
        setShowComponent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   Archive Modal
  const [smShow, setSmShow] = useState(false);
  const handleCloseModal = () => setSmShow(false);

  // Material Used Modal
  const [muShow, setMuShow] = useState(false);
  const handleClose = () => setMuShow(false);

  //   Form
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        <Row>
          {/* Side Bar Nav */}

          {/* Header Row */}
          <AdminHeader
            title="Manage Appointment"
            subtitle="View all your appointment"
            userName="AdminLuigi"
            dateTime="November 15, 2023 11:38PM"
            userPhoto="https://w7.pngwing.com/pngs/802/786/png-transparent-google-account-google-search-customer-service-google-logo-login-button-blue-sphere-car-rental-thumbnail.png"
          />

          {/* Search Row */}
          <CSSTransition in={true} timeout={300} classNames="slide" unmountOnExit>
            <Col>
              <Row className="mt-2 mb-4" sm={8}>
                <Col lg={4} md={6}>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">
                      <Search size={20} />
                    </InputGroup.Text>
                    <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                  </InputGroup>
                </Col>
              </Row>

              {/* Confirmed Appointments */}

              <Row className="mb-4">
                <Col>
                  <h6 className="fw-bold agapaint-yellow mb-3">Confirmed Appointments</h6>
                  <Card className="border-0 rounded">
                    <Table striped hover className="align-middle">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Customer</th>
                          <th>Plate#</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Total Service</th>
                          <th>Service Status</th>
                          <th>INV</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr onClick={() => setShowComponent(true)}>
                          <td className="fw-bold">1</td>
                          <td>Mark Alizalde</td>
                          <td>PLT 456</td>
                          <td>November 15, 2023</td>
                          <td>11:00 AM</td>
                          <td>P10,000</td>
                          <td>
                            <Form.Select className="fw-bold" onChange={handleChange}>
                              <option className="text-danger fw-bold">Pending</option>
                              <option className="text-warning fw-bold">Ongoing</option>
                              <option className="text-info fw-bold">For Release</option>
                              <option className="text-success fw-bold">Complete</option>
                            </Form.Select>
                          </td>
                          <td>
                            <BoxSeam size={24} className="text-success" onClick={() => setMuShow(true)} />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>

              {/* Pending Appointments */}
              <Row className="mb-4">
                <Col>
                  <h6 className="fw-bold agapaint-yellow mb-3">Pending Appointments</h6>
                  <Card className="border-0 rounded">
                    <Table striped hover className="align-middle">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Customer</th>
                          <th>Plate#</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Total Service</th>
                          <th>Service Action</th>
                          <th>INV</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="fw-bold">1</td>
                          <td>Mark Alizalde</td>
                          <td>PLT 456</td>
                          <td>November 15, 2023</td>
                          <td>11:00 AM</td>
                          <td>P10,000</td>
                          <td></td>
                          <td>
                            <BoxSeam size={24} className="text-success" onClick={() => setMuShow(true)} />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
            </Col>
          </CSSTransition>

          {/* Trigger to View Apt Details */}
          <CSSTransition in={showComponent} timeout={300} classNames="slide" unmountOnExit>
            <Col sm={3}>
              <Card className="border-0 shadow-sm p-1" style={{ fontSize: "14px" }}>
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="fw-bold mb-0">Appointment Details</h4>
                    <InboxFill size={24} className="me-2 text-danger" onClick={() => setSmShow(true)} />
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold">1</h4>
                  </div>
                  <hr />
                  <Row className="align-items-center justify-content-between">
                    <Col xs="auto" className="lh-05 fw-bold">
                      <p>Date</p>
                      <p>Time</p>
                      <p>Customer</p>
                      <p>Email</p>
                      <p className="m-0">Phone#</p>
                    </Col>
                    <Col xs="auto" className="lh-05 text-end">
                      <p>Nov 15, 2023</p>
                      <p>11:00 AM</p>
                      <p>Mark Alizalde</p>
                      <p>malizalde@gmail.com</p>
                      <p className="m-0">09123456789</p>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="align-items-center justify-content-between lh-1">
                    <p className="fw-bold lh-05">Vehicle Information</p>
                    <Col xs="auto" className="lh-05 fw-bold">
                      <p>Car Model</p>
                      <p className="m-0">Plate#</p>
                    </Col>
                    <Col xs="auto" className="lh-05 text-end">
                      <p>Nissan Almera 2015</p>
                      <p className="m-0">PLT 456</p>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="align-items-center justify-content-between">
                    <p className="fw-bold lh-05">Service Information</p>
                    <Col xs="auto" className="lh-05 text-secondary">
                      <p>Under Coating - Sedan</p>
                      <p>Rims/Mags Repaint</p>
                      <p>Glass Detailing</p>
                      <p className="m-0">Headlight Detailing</p>
                    </Col>
                    <Col xs="auto" className="lh-05 text-end text-secondary">
                      <p>3,500</p>
                      <p>3,500</p>
                      <p>1,500</p>
                      <p className="m-0">1,500</p>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="align-items-center justify-content-between mb-2">
                    <Col xs="auto" className="lh-05 fw-bold">
                      <p>Payment Term</p>
                      <p className="m-0">Remaining Balance</p>
                    </Col>
                    <Col xs="auto" className="lh-05 text-end">
                      <p>Partial</p>
                      <p className="m-0 fs-5 fw-bold">P5,000</p>
                    </Col>
                  </Row>

                  <p className="fs-5 agapaint-yellow m-0">Breakdown</p>
                  <Table striped responsive style={{ fontSize: "13px" }} className="align-middle">
                    <thead>
                      <tr>
                        <th>Term</th>
                        <th>Percent</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1st</td>
                        <td>50%</td>
                        <td>P5,000</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>2nd</td>
                        <td>25%</td>
                        <td>P2,500</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>3rd</td>
                        <td>25%</td>
                        <td>P2,500</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                  <Row className="align-items-center justify-content-between mb-2">
                    <Col xs="auto" className="lh-1 fw-bold">
                      <p className="m-0 fs-6">Total Service Amount</p>
                    </Col>
                    <Col xs="auto" className="lh-1 text-end">
                      <p className="m-0 fs-5 fw-bold">P10,000</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </CSSTransition>

          {/* Modal: Archive Appointment*/}
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

          {/* Modal: Material Used */}
          <Modal size="lg" show={muShow} onHide={() => setMuShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title className="fs-6">Material Used [APT# 1]</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Modal.Body className="p-4">
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Material Name</Form.Label>
                    <Form.Select aria-label="material-name-select">
                      <option value="1">Weber Red</option>
                      <option value="2">Anzhal</option>
                      <option value="3">Nason</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Quantity Used</Form.Label>
                    <Form.Control required type="number" placeholder="2 L" min={0} />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>Action</Form.Label>
                    <Button variant="success" type="submit">
                      Add Material
                    </Button>
                  </Form.Group>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="success" type="submit">
                  Save Materials
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>

          {/* COMPLETE STAT Modal 1 : Material Used Confirmation*/}

          {/* COMPLETE STAT Modal 2: End Date Confirmation*/}
        </Row>
      </Container>
    </main>
  );
}

export default manageAppointment;

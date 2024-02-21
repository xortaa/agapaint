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
  Alert,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Funnel, Search, BoxSeam } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ServiceStatus from "@/components/ServiceStatus";
import PaymentStatus from "@/components/PaymentStatus";
import AdminHeader from "@/components/AdminHeader";
import AptDetails from "@/components/AptDetails";
import AptMaterial from "@/components/AptMaterial";
import { Metadata } from 'next'
 
function manageAppointment() {
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

  // Material Used Modal
  const [muShow, setMuShow] = useState(false);

  // Service Status
  const [showAptMaterial, setShowAptMaterial] = useState(false);

  const handleServiceStatusChange = (selectedValue) => {
    if (selectedValue === "4") {
      setShowAptMaterial(true);
    }
  };

  const handleCloseModal = () => {
    setMuShow(false);
    setShowAptMaterial(false);
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
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <InputGroup>
                      <InputGroup.Text id="basic-addon1">
                        <Search size={20} />
                      </InputGroup.Text>
                      <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                    </InputGroup>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <Funnel />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>

              {/* Conditional Render: Alerts */}
              <Row className="ps-2 pe-2" hidden>
                <Alert variant="success">
                  <p className="mb-0">
                    Hooray! <strong>Material Used for APT#1</strong> is added successfully!
                  </p>
                </Alert>

                <Alert variant="danger" hidden>
                  <p className="mb-0">
                    Oops! <strong>Material Used for APT#1</strong> is not added, Please try again!
                  </p>
                </Alert>
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
                            <ServiceStatus width="73%" onChange={handleServiceStatusChange} />
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
                            <ServiceStatus width="73%" />
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
            </Col>
          </CSSTransition>

          {/* Trigger to View Apt Details and Archive Modal*/}
          <CSSTransition in={showComponent} timeout={300} classNames="slide" unmountOnExit>
            <AptDetails />
          </CSSTransition>

          {/* Modal: Material Used */}
          <AptMaterial title="Material Used [APT #1]" show={muShow} hide={handleCloseModal} status="ongoing" />

          {/* COMPLETE STAT Modal 1 : Material Used Confirmation*/}
          {showAptMaterial && (
            <AptMaterial
              title="Finalize Material Used [APT #1]"
              show={showAptMaterial}
              hide={handleCloseModal}
              status="complete"
            />
          )}
          {/* COMPLETE STAT Modal 2: End Date Confirmation*/}
        </Row>
      </Container>
    </main>
  );
}

export default manageAppointment;

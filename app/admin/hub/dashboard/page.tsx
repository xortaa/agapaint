"use client";

import React, { useState } from "react";

//components
import PageHeader from "@/components/AdminHeader";
import Sidebar from "@/components/Sidenav";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { Calendar2Week, Cart, CreditCard, ArrowRight, BoxSeam } from "react-bootstrap-icons";

//scss
import dashboardStyles from "@/styles/dashboard.module.scss";

//components
import ServiceStatus from "@/components/ServiceStatus";
import AptMaterial from "@/components/AptMaterial";

function dashboard() {
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

  //card footer clickable
  const handleClick = () => {
    // Handle click action here
    console.log("Card.Footer clicked");
  };

  return (
    <main>
      <PageHeader
        title="Dashboard"
        userName="AdminLuigi"
        dateTime="November 15, 2023 11:38PM"
        userPhoto="https://w7.pngwing.com/pngs/802/786/png-transparent-google-account-google-search-customer-service-google-logo-login-button-blue-sphere-car-rental-thumbnail.png"
        style={{ margin: "10px" }}
      />

      {/* For summary cards */}
      <Row className="my-5 mx-3" style={{ zIndex: 1 }}>
        <Col className="m-1">
          <Card
            className="text-start border-2 h-100"
            style={{ background: "linear-gradient(to right, #f1b038, #f9d268)" }}
          >
            <Card.Body className="pt-4 pb-3 text-dark">
              <Card.Title className="text-primary text-dark">
                <Row>
                  <Col className="text-start pt-1" sm={9}>
                    <Calendar2Week className="mx-2 mb-1" /> Active Appointments
                  </Col>
                  <Col className="text-end pe-4 fw-bold" style={{ fontSize: "30px" }} sm={3}>
                    0
                  </Col>
                </Row>
              </Card.Title>
            </Card.Body>
            <Card.Footer className="ps-4 text-dark text-start" style={{ cursor: "pointer" }} onClick={handleClick}>
              View Details
              <ArrowRight className="text-dark" style={{ marginLeft: "245px" }} />
            </Card.Footer>
          </Card>
        </Col>

        {/* TOTAL REVENUE */}
        <Col className="m-1">
          <Card className="text-start border-2 h-100" style={{ backgroundColor: "#f9d268" }}>
            <Card.Body className="pt-4 pb-3 text-dark">
              <Card.Title className="text-primary text-dark">
                <Row>
                  <Col className="text-start pt-1" sm={9}>
                    <Calendar2Week className="mx-2 mb-1" /> Total Revenue
                  </Col>
                  <Col className="text-end pe-4 fw-bold" style={{ fontSize: "30px" }} sm={3}>
                    0
                  </Col>
                </Row>
              </Card.Title>
            </Card.Body>
            <Card.Footer className="ps-4 text-dark text-start" style={{ cursor: "pointer" }} onClick={handleClick}>
              View Details
              <ArrowRight className="text-dark" style={{ marginLeft: "245px" }} />
            </Card.Footer>
          </Card>
        </Col>

        {/* SERVICES AVAILABLE */}
        <Col className="m-1">
          <Card
            className="text-start border-2 h-100"
            style={{ background: "linear-gradient(to left, #f1b038, #f9d268)" }}
          >
            <Card.Body className="pt-4 pb-3 text-dark">
              <Card.Title className="text-primary text-dark">
                <Row>
                  <Col className="text-start pt-1" sm={9}>
                    <Calendar2Week className="mx-2 mb-1" /> Services Available
                  </Col>
                  <Col className="text-end pe-4 fw-bold" style={{ fontSize: "30px" }} sm={3}>
                    0
                  </Col>
                </Row>
              </Card.Title>
            </Card.Body>
            <Card.Footer className="ps-4 text-dark text-start" style={{ cursor: "pointer" }} onClick={handleClick}>
              View Details
              <ArrowRight className="text-dark" style={{ marginLeft: "245px" }} />
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* for table of summary of Appoinment Services */}
      <h4 className="fw-bold mx-3">Appointment Overview</h4>

      <Container className="me-5 ms-0">
        <Table striped className="my-3 mx-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Plate #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Total Service</th>
              <th>Service Status</th>
              <th>INV</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold">1</td>
              <td>Mark Alizalde</td>
              <td>PLT 456</td>
              <td>Nov-15-2023</td>
              <td>11:00 AM</td>
              <td>10,000</td>
              <td>
                <ServiceStatus width="73%" onChange={handleServiceStatusChange} />
              </td>
              <td>
                <BoxSeam
                  size={24}
                  className="text-success"
                  onClick={() => setMuShow(true)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">1</td>
              <td>Mark Alizalde</td>
              <td>PLT 456</td>
              <td>Nov-15-2023</td>
              <td>11:00 AM</td>
              <td>10,000</td>
              <td>
                <ServiceStatus width="73%" onChange={handleServiceStatusChange} />
              </td>
              <td>
                <BoxSeam
                  size={24}
                  className="text-success"
                  onClick={() => setMuShow(true)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">1</td>
              <td>Mark Alizalde</td>
              <td>PLT 456</td>
              <td>Nov-15-2023</td>
              <td>11:00 AM</td>
              <td>10,000</td>
              <td>
                <ServiceStatus width="73%" onChange={handleServiceStatusChange} />
              </td>
              <td>
                <BoxSeam
                  size={24}
                  className="text-success"
                  onClick={() => setMuShow(true)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

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
    </main>
  );
}

export default dashboard;

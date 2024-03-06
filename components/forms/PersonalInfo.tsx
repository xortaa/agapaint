"use client";
import { Container, Row, Col, Card, Form, Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { AppointmentData } from "@/types";

function PersonalInfo({
  setAppointmentData,
}: {
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}) {

  //  Payment Term
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <main>
      <Row className="mb-lg-3">
        {/* First Name */}
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Mia"
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, firstName: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a first name</Form.Control.Feedback>
        </Form.Group>
        {/* Last Name */}
        <Form.Group as={Col} md="6" className="py-2 py-lg-0" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Eleazar"
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, lastName: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a last name</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-lg-3">
        {/* Email */}
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="agapaint@gmail.com"
            required
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, email: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
        </Form.Group>
        {/* Phone Number */}
        <Form.Group as={Col} md="6" className="py-2 py-lg-0" controlId="validationCustom04">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="09123456789"
            required
            pattern="^((\+63)|0)\d{10}$"
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-lg-3">
        {/* Car Manufacturer */}
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Car Manufacturer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Toyota"
            required
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, carManufacturer: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid car manufacturer</Form.Control.Feedback>
        </Form.Group>
        {/* Car Model */}
        <Form.Group as={Col} md="5" className="py-2 py-lg-0" controlId="validationCustom04">
          <Form.Label>Car Model</Form.Label>
          <Form.Control
            type="text"
            placeholder="Fortuner 2022"
            required
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, carModel: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid car model</Form.Control.Feedback>
        </Form.Group>
        {/* Plate Number */}
        <Form.Group as={Col} md="3" className="py-2 py-lg-0" controlId="validationCustom04">
          <Form.Label>Plate #</Form.Label>
          <Form.Control
            type="text"
            placeholder="ABC 123"
            required
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, plateNumber: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid car model</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        {/* Payment Term */}
        <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Label>Payment Term</Form.Label>
          <ButtonGroup className="d-block w-100">
            <Button
              variant={selectedOption === "option1" ? "warning" : "outline-warning"}
              onClick={() => handleOptionChange("option1")}
              className="text-dark w-50"
            >
              Full
            </Button>
            <Button
              variant={selectedOption === "option2" ? "warning" : "outline-warning"}
              onClick={() => handleOptionChange("option2")}
              className="text-dark w-50"
            >
              Partial
            </Button>
          </ButtonGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        {/* Comments/Request */}
        <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Label>Comments/Request</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "50px" }}
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, requests: e.target.value }))}
          />
        </Form.Group>
      </Row>
    </main>
  );
}

export default PersonalInfo;

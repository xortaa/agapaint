"use client";
import { Container, Row, Col, Card, Form, Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { AppointmentData } from "@/types";
import InputMask from "react-input-mask";

function PersonalInfo({
  setAppointmentData,
}: {
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}) {
  const optionToPaymentTerm = {
    option1: "Full",
    option2: "Partial",
  };

  //  Payment Term
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
    const paymentTerm = optionToPaymentTerm[optionId];
    setAppointmentData((prev) => ({ ...prev, paymentTerm }));
  };

  return (
    <main>
      <Row className="mb-lg-3">
        {/* First Name */}
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Mike"
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, firstName: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a first name</Form.Control.Feedback>
        </Form.Group>
        {/* Last Name */}
        <Form.Group as={Col} md="4" className="py-2 py-lg-0" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Victorio"
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, lastName: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a last name</Form.Control.Feedback>
        </Form.Group>
        {/* Phone Number */}
        <Form.Group as={Col} md="4" className="py-2 py-lg-0" controlId="validationCustom04">
          <Form.Label>Phone Number</Form.Label>
          <InputMask
            mask="+63 (999) 999-9999"
            maskChar={null}
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
          >
            {() => <Form.Control type="tel" placeholder="+63 (917) 123-4567" required />}
          </InputMask>
          <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-lg-3">
        {/* Car Manufacturer */}
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Vehicle Manufacturer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Toyota"
            required
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, carManufacturer: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a vehicle manufacturer</Form.Control.Feedback>
        </Form.Group>
        {/* Car Model */}
        <Form.Group as={Col} md="4" className="py-2 py-lg-0" controlId="validationCustom04">
          <Form.Label>Vehicle Model</Form.Label>
          <Form.Control
            type="text"
            placeholder="Fortuner 2022"
            required
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, carModel: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a vehicle model</Form.Control.Feedback>
        </Form.Group>
        {/* Car Color */}
        <Form.Group as={Col} md="2" controlId="validationCustom03">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Silver"
            required
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, carColor: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a color</Form.Control.Feedback>
        </Form.Group>
        {/* Plate Number */}
        <Form.Group as={Col} md="2" className="py-2 py-lg-0" controlId="validationCustom04">
          <Form.Label>Plate #</Form.Label>
          <Form.Control
            type="text"
            placeholder="ABC 123"
            required
            onChange={(e) => setAppointmentData((prev) => ({ ...prev, plateNumber: e.target.value }))}
          />
          <Form.Control.Feedback type="invalid">Please provide a plate#</Form.Control.Feedback>
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
          <Form.Label>
            Comments/Request <span className="fs-6 text-secondary small">(Optional)</span>
          </Form.Label>
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

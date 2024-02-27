"use client"
import { Modal, Row, Col, Button, Form, InputGroup, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

import { FaPlus } from "react-icons/fa";

import logStyles from "@/styles/logModal.module.scss";

function LogModal() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false); // Add this line

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  //  Trans Type
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleClose = () => setShow(false); // Add this function
  const handleShow = () => setShow(true); // Add this function

  return (
    <main>
      <Button variant="primary" onClick={handleShow}>
        <FaPlus className="me-2" />
        Add Log
      </Button>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Add Log</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            {/* Transaction Type */}
            <Row className="mb-3">
              <Form.Label>Transaction Type</Form.Label>
              <ButtonGroup>
                <Button
                  variant={selectedOption === "option1" ? "success" : "outline-danger"}
                  onClick={() => handleOptionChange("option1")}
                  className={logStyles.inBtn}
                >
                  In
                </Button>
                <Button
                  variant={selectedOption === "option2" ? "danger" : "outline-success"}
                  onClick={() => handleOptionChange("option2")}
                  className={logStyles.outBtn}
                >
                  Out
                </Button>
              </ButtonGroup>
            </Row>

            {/* Material Name Select */}
            <Row className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Material Name</Form.Label>
                <Form.Select aria-label="material-name-select" required>
                  <option value="1">Weber Red</option>
                  <option value="2">Anzhal</option>
                  <option value="3">Nason</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a material name</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Category and Current Stock from DB */}
            <Row className="mb-3">
              <Col>
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" placeholder="Placeholder text" disabled />
              </Col>
              <Col>
                <Form.Label>Current Stock</Form.Label>
                <Form.Control type="number" placeholder="Placeholder text" disabled />
              </Col>
            </Row>

            {/* Transaction Quantity and Date */}
            <Row className="mb-3">
              <Col>
                <Form.Label>Transaction Quantity</Form.Label>
                <Form.Control type="number" placeholder="Placeholder text" required min={0} />
                <Form.Control.Feedback type="invalid">Please provide a quantity</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label>Transaction Date</Form.Label>
                <Form.Control type="date" placeholder="Placeholder text" required />
                <Form.Control.Feedback type="invalid">Please provide a date</Form.Control.Feedback>
              </Col>
            </Row>

            {/* Notes */}
            <Row className="mb-3 p-3 pb-0">
              <Form.Label className="p-0">Notes (Optional)</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </main>
  );
}

export default LogModal;

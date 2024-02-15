import { Modal, Form, Row, Col, Button } from "react-bootstrap";

import { XCircle } from "react-bootstrap-icons";
import { useState } from "react";

function AptMaterial(props) {
  // Material Used Modal
  const [muShow, setMuShow] = useState(false);
  const [showAptMaterial, setShowAptMaterial] = useState(false);
  const handleCloseModal = () => {
    setMuShow(false);
    setShowAptMaterial(false);
  };

  // Form
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // Second modal
  const [showSecondModal, setShowSecondModal] = useState(false);
  const handleCloseSecondModal = () => setShowSecondModal(false);
  const handleShowSecondModal = () => {
    setShowSecondModal(true); // Open the second modal
    handleCloseModal();
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={() => {
          setMuShow(props.hide);
          setShowAptMaterial(props.hide);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">{props.title}</Modal.Title>
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
                <br />
                <Button variant="danger" type="submit">
                  <XCircle size={24} />
                </Button>
              </Form.Group>
            </Row>

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
            <Button variant="secondary" onClick={props.hide}>
              Close
            </Button>
            {props.status == "complete" ? (
              <Button
                variant="success"
                type="submit"
                onClick={() => {
                  handleShowSecondModal();
                }}
              >
                Next
              </Button>
            ) : (
              <Button variant="success" type="submit">
                Save Materials
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>

      {/* 2nd Step Finalize Target Date */}
      <Modal show={showSecondModal} onHide={handleCloseSecondModal}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Finalize the Appointment Completion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ps-4 pe-4">
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="startDate" style={{ marginLeft: "auto" }}>
                <Form.Label className="mt-3 mb-1 small">Start Date</Form.Label>
                <Form.Control type="date" name="startDate" placeholder="Start Date" size="sm" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate" style={{ marginLeft: "auto" }}>
                <Form.Label className="mt-3 mb-1 small">End Date</Form.Label>
                <Form.Control type="date" name="endDate" placeholder="End Date" size="sm" />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSecondModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleCloseSecondModal}>
            Appointment Complete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AptMaterial;

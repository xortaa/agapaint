import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

function InvAddMaterialModal() {
  const [show, setShow] = useState(false);
  const [material, setMaterial] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    if (material.trim() === "") {
      setError("Please provide a material name");
    } else {
      console.log(material);
      handleClose();
    }
  };

  return (
    <>
      <Button style={{ backgroundColor: "#17A2B8 ", border: "none" }} onClick={handleShow}>
        <FaPlus /> Add Material
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Material Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter material name"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                isInvalid={!!error}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a material name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Category Name</Form.Label>
                  <Form.Select aria-level={1} required>
                    <option>Color Paint</option>
                    <option>Wood Paint</option>
                    <option>Other</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Current Stock</Form.Label>
                  <Form.Control type="number" placeholder="Enter current stock" min="0" isInvalid={!!error} />
                  <Form.Control.Feedback type="invalid">Please provide current stock</Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InvAddMaterialModal;

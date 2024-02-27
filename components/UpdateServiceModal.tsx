"use client";
import React from "react";
import AdminServiceStyles from "@/styles/AdminService.module.scss";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Dropdown, FormControl } from "react-bootstrap";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";

function UpdateServiceModal() {
  const [show, setShow] = useState(false);
  const [service, setService] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    if (service.trim() === "") {
      setError("Please provide a service name");
    } else {
      console.log(service);
      handleClose();
    }
  };
  return (
    <>
      <Pencil size={20} className="text-success me-2" onClick={handleShow}>
        <MdEdit />
      </Pencil>

      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Update Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                isInvalid={!!error}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a service name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Service Description</Form.Label>
              <Form.Control as="textarea" rows={3} isInvalid={!!error} required />
              <Form.Control.Feedback type="invalid">Please provide a service description</Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" accept=".jpg,.jpeg,.png" isInvalid={!!error} required />
                  <Form.Control.Feedback type="invalid">
                    Please input .jpg, .jpeg, .png files only
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Service Price</Form.Label>
                  <Form.Control type="number" isInvalid={!!error} required min="0" />
                  <Form.Control.Feedback type="invalid">Please provide a service price</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Car Type</Form.Label>
              <Form.Control type="text" isInvalid={!!error} required />
              <Form.Control.Feedback type="invalid">Please provide a car type</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className={AdminServiceStyles.addserviceformclose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className={AdminServiceStyles.updateserviceformupdate} variant="success" onClick={handleAdd}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateServiceModal;
